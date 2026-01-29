/*classe para condutor*/
class Condutor {
    #cpf;
    #senha;
    constructor(ID_unica, nome, cpf, nascimento, email, senha) {
        this.ID_unica = ID_unica;
        this.nome = nome;
        this.#cpf= cpf;
        this.nascimento = nascimento;
        this.email = email;
        this.#senha = senha;

        this.retornarCPF = function () {
            return this.#cpf;
        }
        this.retornarSenha = function () {
            return this.#senha;
        }
        this.tipo = "CONDUTOR"
    }
}

module.exports = Condutor