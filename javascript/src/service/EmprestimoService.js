const { constantes } = require("../utils/constants");

class EmprestimoService {
    static autorizarEmprestimo(usuario, livro) {
        return this.validarUsuario(usuario) && this.validarLivro(livro);
    }

    static validarUsuario(usuario) {
        if (!usuario.ativo) return false;
        if (usuario.emprestimosAtivos >= constantes.USUARIO_LIMITE_EMPRESTIMOS) return false;
        if (usuario.multaPendente >= constantes.USUARIO_LIMITE_MULTA) return false;
        return true;
    }

    static validarLivro(livro) {
        if (!livro.disponivel) throw new Error("Livro indisponível");
        return true;
    }
}

module.exports = { EmprestimoService };
