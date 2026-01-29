/*classe para agente*/
class Agente {
    #cpf;
    #senha;
    constructor(ID_unica, nome, cpf, email, senha, matricula_agente) {
        this.ID_unica = ID_unica;
        this.nome = nome;
        this.#cpf = cpf;
        this.email = email;
        this.#senha = senha;
        this.matricula_agente = matricula_agente;

        this.retornarCPF = function () {
            return this.#cpf;
        }
        this.retornarSenha = function () {
            return this.#senha
        }
        this.tipo = "AGENTE"
    }
}

module.exports= Agente