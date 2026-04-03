const { Livro } = require("../../src/model/Livro");
const { Usuario } = require("../../src/model/Usuario");
const { EmprestimoService } = require("../../src/service/EmprestimoService");

test("Testa usuario e livro valido", () => {
    // Arrange
    const usuario = new Usuario({ id: 1, nome: "Teste", ativo: true, emprestimosAtivos: 1, multaPendente: 5 });
    const livro = new Livro({ id: 1, titulo: "Chapeuzinho Vermelho", disponivel: true });

    // Act
    const saida = EmprestimoService.autorizarEmprestimo(usuario, livro);

    // Assert
    expect(true).toBe(saida);
});
