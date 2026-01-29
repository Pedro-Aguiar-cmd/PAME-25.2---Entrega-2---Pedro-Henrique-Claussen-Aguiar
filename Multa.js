/*classe para multa*/
class Multa {
    #status;
    constructor(ID_unica, ID_cliente, infracao, valor, data_multa, status) {
        this.ID_unica = ID_unica;
        this.ID_cliente = ID_cliente;
        this.infracao = infracao;
        this.valor = valor;
        this.data_multa = data_multa || new Date().toLocaleDateString();
        this.#status = status || "pendente";

        this.retornarStatus = function () {
            return this.#status;
        }
        this.mudarStatus = function (novoStatus) {
            let permitidos = ["pendente", "paga", "cancelada", "recorrida"];
            let statusFormatado = novoStatus.toLowerCase();
            if (permitidos.includes(statusFormatado)){
                this.#status = statusFormatado;
            } else {
                console.log("Status invalido\n Use: pendente, paga, cancelada ou recorrida.");
            }
        }
    }
}

module.exports= Multa