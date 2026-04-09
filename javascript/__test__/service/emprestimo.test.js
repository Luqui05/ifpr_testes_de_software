const { Livro } = require("../../src/model/Livro");
const { Usuario } = require("../../src/model/Usuario");
const { EmprestimoService } = require("../../src/service/EmprestimoService");
const { constantes } = require("../../src/utils/constants");
const casos = require("../data/emprestimo.json");

describe("Emprestimo", () => {
    test("Testa usuario e livro valido", () => {
        const usuario = new Usuario({
            id: 1,
            nome: "Teste",
            ativo: true,
            emprestimosAtivos: 1,
            multaPendente: 5,
        });
        const livro = new Livro({
            id: 1,
            titulo: "Chapeuzinho Vermelho",
            disponivel: true,
        });

        const saida = EmprestimoService.autorizarEmprestimo(usuario, livro);

        expect(saida).toBe(true);
    });

    test("Testa usuario valido e livro invalido", () => {
        const usuario = new Usuario({
            id: 1,
            nome: "Teste",
            ativo: true,
            emprestimosAtivos: 1,
            multaPendente: 5,
        });
        const livro = new Livro({
            id: 1,
            titulo: "Chapeuzinho Vermelho",
            disponivel: false,
        });

        expect(() => EmprestimoService.autorizarEmprestimo(usuario, livro)).toThrow(
            "Livro indisponível",
        );
    });

    test("Testa usuario invalido (emprestimo) e livro valido", () => {
        const usuario = new Usuario({
            id: 1,
            nome: "Teste",
            ativo: true,
            emprestimosAtivos: constantes.USUARIO_LIMITE_EMPRESTIMOS + 1,
            multaPendente: 5,
        });
        const livro = new Livro({
            id: 1,
            titulo: "Chapeuzinho Vermelho",
            disponivel: true,
        });

        const saida = EmprestimoService.autorizarEmprestimo(usuario, livro);

        expect(saida).toBe(false);
    });

    test("Testa usuario invalido (multa) e livro valido", () => {
        const usuario = new Usuario({
            id: 1,
            nome: "Teste",
            ativo: true,
            emprestimosAtivos: 0,
            multaPendente: constantes.USUARIO_LIMITE_MULTA + 1,
        });
        const livro = new Livro({
            id: 1,
            titulo: "Chapeuzinho Vermelho",
            disponivel: true,
        });

        const saida = EmprestimoService.autorizarEmprestimo(usuario, livro);

        expect(saida).toBe(false);
    });

    test.each(casos)('$descricao', (caso) => {
        const usuario = new Usuario({
            id: 1,
            nome: "Teste",
            ativo: caso.ativo,
            emprestimosAtivos: caso.emprestimosAtivos,
            multaPendente: caso.multaPendente,
        });
        const livro = new Livro({
            id: 1,
            titulo: "Chapeuzinho Vermelho",
            disponivel: caso.livroDisponivel,
        });

        if (caso.livroDisponivel) {
            const saida = EmprestimoService.autorizarEmprestimo(usuario, livro);
            expect(caso.saida).toBe(saida);
        }
        expect(() => EmprestimoService.autorizarEmprestimo(usuario, livro)).toThrow(
            "Livro indisponível",
        );
    });
});
