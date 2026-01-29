/* classe para sistema*/
const Condutor = require('./Condutor')
const Agente = require('./Agente')
const Multa = require ('./Multa')
const Veiculo=require('./Veiculo')
var requicisao = require('readline-sync')

class Sistema {
    constructor() {
        this.listaCondutores = [];
        this.listaAgentes = [];
        this.listaMultas = [];
        this.listaVeiculos = [];
        this.usuarioLogado = null;

        /*agente teste*/
        this.listaAgentes.push(new Agente(1, "Pedro Agente", "11122233344", "agente", "123", "MAT-01"));
        /*usuario logado*/
        this.login_de_usuarios = function () {
            return this.usuarioLogado;
        }
        /*logout*/
        this.fazerLogout = function () {
            this.usuarioLogado = null;
        }
        /*parte do cadastro condutor*/
        this.Cadastro = function () {
            console.log("\nCADASTRO DE CONDUTOR")
            let nome = requicisao.question("Nome: ");
            let cpf = requicisao.question("CPF (12345678912): ");
            while (this.validarCPF(cpf) == false) {
                console.log("O CPF deve ter 11 digitos sem espaco");
                cpf = requicisao.question("Digite o CPF novamente: ");
            }
            let nascimento = requicisao.question("Data de nascimento (dd/mm/aaaa): ");
            let email = requicisao.question("Email: ");
            let senha = requicisao.question("Senha: ");
            let novoCondutor = new Condutor(this.listaCondutores.length + 1, nome, cpf, nascimento, email, senha);
            this.listaCondutores.push(novoCondutor);
            console.log(nome + " cadastrado com sucesso");
        }
        /*parte cadastro agente*/
        this.CadastroAgente = function () {
            console.log("\nCADASTRO DE AGENTE");
            let nome = requicisao.question("Nome: ");
            let cpf = requicisao.question("CPF (11 numeros): ");

            while (this.validarCPF(cpf) == false) {
                console.log("Erro: O CPF deve ter 11 digitos (apenas numeros).");
                cpf = requicisao.question("Digite o CPF novamente: ");
            }

            let email = requicisao.question("Email: ");
            let senha = requicisao.question("Senha: ");
            let matricula = requicisao.question("Matricula: ");

            let novoAgente = new Agente(this.listaAgentes.length + 1, nome, cpf, email, senha, matricula);
            this.listaAgentes.push(novoAgente);
            console.log("Agente " + nome + " cadastrado com sucesso");
        }
        /*verifica se foi cadastrado a senha e o email para logar*/
        this.Login = function () {
            let emailInformado = requicisao.question("Email: ");
            let senhaInformada = requicisao.question("Senha: ");
            let usuarioAchado = this.listaCondutores.find(function (condutor) {
                return condutor.email == emailInformado;
            })
            /*usuario condutor*/
            if (usuarioAchado == null) {
                usuarioAchado = this.listaAgentes.find(function (agente) {
                    return agente.email == emailInformado;
                })
            }
            /*usuario agente*/
            if (usuarioAchado != null && usuarioAchado.retornarSenha() == senhaInformada) {
                this.usuarioLogado = usuarioAchado;
                console.log("Login realizado");
                return true;
            }
            /*sem usuario*/
            else {
                console.log("Email ou senha incorretos");
                return false;
            }
        }
        /*dados do usuario logado*/
        this.verMeusDados = function () {
            console.log("\n DADOS DO PERFIL");
            console.log("Nome: " + this.usuarioLogado.nome);
            console.log("Email: " + this.usuarioLogado.email);
            console.log("CPF: " + this.usuarioLogado.retornarCPF());
            if (this.usuarioLogado.tipo == "AGENTE") console.log("Matricula: " + this.usuarioLogado.matricula_agente);
        }
        /*multas do proprio usuario*/
        this.verMinhasMultas = function () {
            let filtro = this.listaMultas.filter(function (m) {
                return m.ID_cliente == this.usuarioLogado.ID_unica;
            }.bind(this));

            if (filtro.length === 0) {
                console.log("\nVoce nao possui multas");
            }
            else {
                console.log("\nMINHAS MULTAS");
        
                filtro.forEach(function (m) {
                    console.log("ID da Multa: " + m.ID_unica);
                    console.log("Infracao: " + m.infracao);
                    console.log("Valor: R$ " + m.valor);
                    console.log("Data: " + m.data_multa);
                    console.log("Status: " + m.retornarStatus()); 
                });
        
            }
        }
        /*cadastro veiculo condutor*/
        this.cadastrarVeiculoCondutor = function () {
            let p = requicisao.question("Placa: ");
            let mo = requicisao.question("Modelo: ");
            let ma = requicisao.question("Marca: ");
            let c = requicisao.question("Cor: ");
            this.listaVeiculos.push(new Veiculo(p, mo, ma, c));
            console.log("Veiculo cadastrado");
        }
        /*mudar status da multa*/
        this.mudarProprioStatus = function (status) {
            let id = parseInt(requicisao.question("ID da Multa: "));
            let multa = this.listaMultas.find(function (m) {
                return m.ID_unica == id && m.ID_cliente == this.usuarioLogado.ID_unica;
            }.bind(this));
            if (multa) {
                multa.mudarStatus(status);
                console.log("Feito");
            }
            else {
                console.log("Multa nao encontrada");
            }
        }
        /*ver veiculos agente*/
        this.verVeiculosGeral = function () {
            if (this.listaVeiculos.length === 0) {
                console.log("\nNenhum veiculo cadastrado.");
            }
            else {
                console.log("\nLISTA GERAL DE VEICULOS");
                this.listaVeiculos.forEach(function (v) {
                    console.log("Placa: " + v.placa);
                    console.log("Modelo: " + v.modelo);
                    console.log("Marca: " + v.marca);
                    console.log("Cor: " + v.cor);
                })
            }
        }
        /*ver multas agente*/
        this.verTodasMultasAgente = function () {
            if (this.listaMultas.length === 0) {
                console.log("\nNenhuma multa registrada no sistema");
            }
            else {
                console.log("\nTODAS AS MULTAS DO SISTEMA");
                this.listaMultas.forEach(function (m) {
                    console.log("ID Multa: " + m.ID_unica);
                    console.log("ID Condutor: " + m.ID_cliente);
                    console.log("Infracao: " + m.infracao);
                    console.log("Valor: " + m.valor);
                    console.log("Data: " + m.data_multa);
                    console.log("Status: " + m.retornarStatus()); 
                })
            }
        }
        /*ver condutores agentes*/        
        this.verCondutoresGeral = function () {
            this.listaCondutores.forEach(function (c) {
                console.log("ID: " + c.ID_unica + " Nome: " + c.nome + " CPF: " + c.retornarCPF());
            });
        }
        /*cria multa agente*/
        this.aplicarMultaAgente = function () {
            let idC = parseInt(requicisao.question("ID do Condutor: "));
            let infr = requicisao.question("Infracao: ");
            let valor = requicisao.question("Valor: ");
            this.listaMultas.push(new Multa(this.listaMultas.length + 1, idC, infr, valor));
            console.log("Multa aplicada");
        }
        /*altera status de multa agente*/
        this.alterarStatusAgente = function () {
            let id = parseInt(requicisao.question("ID da Multa: "));
            let m = this.listaMultas.find(function (multa) {
                return multa.ID_unica == id;
            })
            if (m) {
                let novo = requicisao.question("Novo status(paga/pendente/cancelada/recorrida): ");
                m.mudarStatus(novo);
                console.log("Status alterado para: " + m.retornarStatus());
            }
            else {
                console.log("Multa nao encontrada");
            }
        }
        /*edita dados*/
        this.editarDados = function () {
            console.log("\nEDITAR DADOS");            
            let querMudarNome = requicisao.question("Deseja alterar o NOME?(s/n): ");
            if (querMudarNome.toLowerCase() == "s") {
                let novo = requicisao.question("Novo Nome: ");
                this.usuarioLogado.nome = novo;
                console.log("Nome alterado");
            }

            let querMudarEmail = requicisao.question("Deseja alterar o EMAIL?(s/n): ");
            if (querMudarEmail.toLowerCase() == "s") {
                let novo = requicisao.question("Novo Email: ");
                this.usuarioLogado.email = novo;
                console.log("Email alterado");
            }
        }
        /*exclui veiculos*/
        this.excluirVeiculo = function () {
            let placa = requicisao.question("Digite a PLACA do veiculo para excluir: ");
            
            let posicao = this.listaVeiculos.findIndex(function(v) {
                return v.placa == placa;
            })

            if (posicao > -1) {
                this.listaVeiculos.splice(posicao, 1);
                console.log("Veiculo excluido da lista");
            }
            else {
                console.log("Veiculo nao encontrado");
            }
        }
        /*mostra veiculo por placa*/
        this.buscarVeiculoPorPlaca = function () {
            let placa = requicisao.question("Digite a PLACA para buscar: ");
            
            let achado = this.listaVeiculos.find(function(v) {
                return v.placa == placa;
            })

            if (achado) {
                console.log("\nVEICULO ENCONTRADO");
                console.log("Placa: " + achado.placa);
                console.log("Modelo: " + achado.modelo);
                console.log("Marca: " + achado.marca);
                console.log("Cor: " + achado.cor);
            }
            else {
                console.log("Nenhum veiculo com essa placa");
            }
        }
        /* valida tamanho, tipo string e se é numérico usando matematica */
        this.validarCPF = function(cpf) {
            if (typeof cpf !== 'string') {
                return false;
            }
            if (cpf.length != 11) {
                return false;
            }
            if (cpf % 1 !== 0) {
                return false;
            }

            return true;
        }

    }
}

module.exports=Sistema