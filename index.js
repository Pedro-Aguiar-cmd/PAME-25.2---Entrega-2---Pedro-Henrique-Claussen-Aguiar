const Sistema = require('./Sistema')
const Multa = require('./Multa')
const Agente = require('./Agente')
const Condutor = require('./Condutor')
const Veiculo = require('./Veiculo')
var requicisao = require('readline-sync')

const app = new Sistema()

/*funcao principal*/
function menu_princial() {
    while (true) {
        let usuarios = app.login_de_usuarios()
        /*menu principal sem cadastro*/
        if (usuarios == null) {
            let pergunta_principal = requicisao.question("\nSISTEMA DE GERENCIAMENTO\n(1)Cadastro de Condutor\n(2)Cadastro de Agente\n(3)Login\n(0)Sair\nEscolha um numero: ")

            if (pergunta_principal == "1") {
                app.Cadastro();
            } else if (pergunta_principal == "2") {
                app.CadastroAgente();
            } else if (pergunta_principal == "3") {
                app.Login();
            } else if (pergunta_principal == "0") {
                break;
            } else {
                console.log("\nDigite um numero valido");
            }
        }
        /*menu principal para condutor*/
        else if (usuarios.tipo == "CONDUTOR") {
            console.log("\nBem Vindo Condutor " + usuarios.nome)
            let pergunta_condutor = requicisao.question("\n(1)Ver meus dados\n(2)Ver minhas multas\n(3)Cadastrar veiculo\n(4)Pagar multa\n(5)Recorrer multa\n(0)Sair\nEscolha um numero: ")

            if (pergunta_condutor == "1") {
                app.verMeusDados();
            }
            else if (pergunta_condutor == "2") {
                app.verMinhasMultas();
            }
            else if (pergunta_condutor == "3") {
                app.cadastrarVeiculoCondutor();
            }
            else if (pergunta_condutor == "4") {
                app.mudarProprioStatus("paga");
            }
            else if (pergunta_condutor == "5") {
                app.mudarProprioStatus("recorrida");
            }
            else if (pergunta_condutor == "6") {
                app.editarDados();
            }
            else if (pergunta_condutor == "7") {
                app.excluirVeiculo();
            }
            else if (pergunta_condutor == "8") {
                app.buscarVeiculoPorPlaca();
            }
            else if (pergunta_condutor == "0") {
                app.fazerLogout();
            }
            else {
                console.log("\nDigite um numero valido");
            }
        }
        /*menu principal para agente*/
        else if (usuarios.tipo == "AGENTE") {
            console.log("\nBem Vindo Agente " + usuarios.nome)
            let pergunta_agente = requicisao.question("\n(1)Ver meus dados\n(2)Ver lista de veiculos\n(3)Ver lista de condutores\n(4)Aplicar multa\n(5)Ver todas as multas\n(6)Alterar status da multa\n(0)Sair\nEscolha um numero: ")

            if (pergunta_agente == "1") {
                app.verMeusDados();
            }
            else if (pergunta_agente == "2") {
                app.verVeiculosGeral();
            }
            else if (pergunta_agente == "3") {
                app.verCondutoresGeral();
            }
            else if (pergunta_agente == "4") {
                app.aplicarMultaAgente();
            }
            else if (pergunta_agente == "5") {
                app.verTodasMultasAgente();
            }
            else if (pergunta_agente == "6") {
                app.alterarStatusAgente();
            }
            else if (pergunta_agente == "7") {
                app.editarDados();
            }
            else if (pergunta_agente == "8") {
                app.buscarVeiculoPorPlaca();
            }
            else if (pergunta_agente == "0") {
                app.fazerLogout();
            }
            else {
                console.log("\nDigite um numero valido");
            }
        }
    }
}

menu_princial();