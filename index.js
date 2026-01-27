var requicisao= require('readline-sync')

class Veiculo{
    constructor(placa,modelo,marca,cor){
        this.placa=placa;
        this.modelo=modelo;
        this.modelomarca=marca;
        this.cor=cor;

    }
}

class Condutor{
    constructor(ID_unica, nome, cpf, nascimento, email,senha){
        this.ID_unica=ID_unica;
        this.nome=nome;
        let _cpf=cpf;
        this.nascimento=nascimento;
        this.email=email;
        let _senha=senha;
        
        this.retornarCPF=function(){
            return _cpf;
        }
        this.retornarSenha=function(){
            return _senha;
        }
        this.tipo="CONDUTOR"
    }
}

class Agente{
    constructor(ID_unica, nome, cpf, email,senha,matricula_agente){
        this.ID_unica=ID_unica;
        this.nome=nome;
        let _cpf=cpf;
        this.email=email;
        let _senha=senha;
        this.matricula_agente=matricula_agente;

        this.retornarCPF=function(){
            return _cpf;
        }
        this.retornarSenha=function(){
            return _senha
        }
        this.tipo="AGENTE"
    }

}

class Multa{
    constructor(ID_unica,ID_cliente,infracao,valor,data_multa,status){
        this.ID_unica=ID_unica;
        this.ID_cliente=ID_cliente;
        this.infracao=infracao;
        this.valor=valor;
        this.data_multa=data_multa;
        let _status= status || "pendente";

        this.retornarStatus=function(){
            return _status;
        }
        this.mudarStatus =function(novoStatus){
            _status=novoStatus;
        }

    }

}

class Sistema{
    constructor(){
        this.listaCondutores=[];
        this.listaAgentes=[];
        this.listaMultas=[];
        this.listaVeiculos=[];
        this.usuarioLogado=null;

        this.login_de_usuarios=function(){
            return this.usuarioLogado;
        
        }

        this.fazerLogout = function () {
                this.usuarioLogado = null;
            }

        this.Cadastro = function(){            
            let nome = requicisao.question("Nome: ");
            let cpf = requicisao.question("CPF: ");
            /*fazer para que datas negativos ou maior que 140 anos nao possam e tbm limitar os dias e mes*/
            let nascimento = requicisao.question("Data de nascimento (dd/mm/aaaa): ");
            let email= requicisao.question("Email: ");
            let senha = requicisao.question("Senha: ");
            let novoCondutor= new Condutor(this.listaCondutores.length + 1, nome, cpf, nascimento, email, senha);
            this.listaCondutores.push(novoCondutor);
            console.log(nome +" " + "cadastrado com sucesso");
        }

        this.Login = function(){
            let emailInformado=requicisao.question("Email: ");
            let senhaInformada=requicisao.question("Senha: ");
            let usuarioAchado=this.listaCondutores.find(function(condutor){
                return condutor.email == emailInformado;
            })

            if(usuarioAchado==null){
                usuarioAchado=this.listaAgentes.find(function(agente){
                    return agente.email == emailInformado;
                })
            }

            if (usuarioAchado != null && usuarioAchado.retornarSenha() == senhaInformada) {
                this.usuarioLogado = usuarioAchado;
                console.log("Login realizado!");
                return true;
            }

            else {
                console.log("Email ou senha incorretos");
                return false;
            }
        }
    }
}

/*funcao principal do codigo*/
const app = new Sistema()
function menu_princial() {
    /*loop para quebrar caso seja necessario sair do aplicativo*/
    while (true) {
        let usuarios = app.login_de_usuarios()

        if (usuarios == null) {
            let pergunta_principal = requicisao.question("\nSistema de Gerenciamento\n(1)Fazer Cadastro\n(2)Fazer Login\n(0)Sair\nEscolha um numero: ")
            
            if (pergunta_principal == "1") {
                app.Cadastro();
            } else if (pergunta_principal == "2") {
                app.Login();
            } else if (pergunta_principal == "0") {
                break;
            } else {
                console.log("\nDigite um numero valido");
            }
        }
        /*parte para usuarios logados como condutor*/ 
        else if (usuarios.tipo == "CONDUTOR") {
            console.log("\nBem Vindo " + " "+ usuarios.nome)
            let pergunta_condutor = requicisao.question("\n(1)Ver meus dados\n(2)Ver minhas multas\n(3)Cadastrar veiculo\n(4)Pagar multa\n(5)Recorrer multa\n(0)Sair\nEscolha um numero: ")
            
            if (pergunta_condutor == "1") {

            } 

            else if (pergunta_condutor == "2") {

            } 

            else if (pergunta_condutor == "3") {

            } 

            else if (pergunta_condutor == "4") {

            } 

            else if (pergunta_condutor == "5") {

            } 

            else if (pergunta_condutor == "0") {
                app.fazerLogout();

            } 

            else {
                console.log("\nDigite um numero valido");

            }
        } 
        /*parte para usuarios logados como agentes*/
        else if (usuarios.tipo == "AGENTE") {
            console.log("\nBem Vindo Agente " + " "+  usuarios.nome)
            let pergunta_agente = requicisao.question("\n(1)Ver meus dados\n(2)Ver lista de veiculos\n(3)Ver lista de condutores\n(4)Aplicar multa\n(5)Ver todas as multas\n(6)Alterar status da multa\n(0)Sair\nEscolha um numero: ")
            
            if (pergunta_agente == "1") {

            } 

            else if (pergunta_agente == "2") {

            }

            else if (pergunta_agente == "3") {

            } 

            else if (pergunta_agente == "4") {

            } 

            else if (pergunta_agente == "5") {

            } 

            else if (pergunta_agente == "6") {

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