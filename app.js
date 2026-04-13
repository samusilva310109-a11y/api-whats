/******************************************************************************************
 * Objetivo: Arquivo responsável por armazenar a API e seus endpoints 
 * Autor: Samuel Silva Moreira Dos Santos
 * Data início: 08/04/2026
 * Versão: 1.0
 ******************************************************************************************/

const express = require("express")
const cors = require("cors")

const app = express()

const corsOption = {
    origin:["*"],
    methods:"GET",
    allowedHeaders:["Content-type", "Authorization"]
}

app.use(cors(corsOption))

const funcoes = require("./module/funcoes")


app.get("/v1/whatsapp/usuarios", (request, response) => {
    let usuarios = funcoes.getListaUsuarios()

    if (usuarios) {
        response.status(200)
        response.json(usuarios)
    }else{
        response.status(400)
        response.json(
            {"message":"usuários não encontrados"}
        )
    }
})

app.get("/v1/whatsapp/dados/usuario/:numeroUser", (resquest, response) => {
    let numeroUsuario = resquest.params.numeroUser
    let dados = funcoes.getDadosUsuario(numeroUsuario)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json(
            {"message":"número de usuário não encontrado"}
        )
    }
})

app.get("/v1/whatsapp/usuario/dados/contatos/:numUser",(request, response) => {
    let numeroUsuario = request.params.numUser
    let dadosContatos = funcoes.getDadosContatos(numeroUsuario)

    if (dadosContatos) {
        response.status(200)
        response.json(dadosContatos)
    }else{
        response.status(404)
        response.json(
            {"message":"contatos não encontrado ou número de usuário"}
        )
    }
})

app.get("/v1/whatsapp/usuario/menssagens/:numUser", (request, response) => {
    let numeroUsuario = request.params.numUser
    let menssagens = funcoes.getListaUserMessages(numeroUsuario)

    if (menssagens) {
        response.status(200)
        response.json(menssagens)
    }else{
        response.status(404)
        response.json(
            {"message":"nenhuma conversa encontrada ou numero de usuario errado"}
        )
    }
})

app.get("/v1/whatsapp/dados/conversa/:numeroUser/", (request, response) => {
    
    let numeroUsuario = request.params.numeroUser
    const {nomeContato} = request.query

    if (!numeroUsuario || !nomeContato) {
        response.status(404)
        response.json(
            {"messagem":"numero de usuario ou nome de contato inválido"}
        )
    }


    let conversa = funcoes.getDadosConversa(numeroUsuario, nomeContato)

    if (conversa) {
        response.status(200)
        response.json(conversa)
    }else{
        response.status(404)
        response.json(
            {"message":"numero usuario ou contato não encontrado"}
        )
    }
})

app.get("/v1/whatsapp/filtro/conversas/:numUser/", (request, response) => {
    let numeroUsuario = request.params.numUser
    const {nomeContato , keyWord} = request.query

    if (!numeroUsuario || !nomeContato || !keyWord) {
        response.status(404)
        response.json(
            {"message":"variaveis inválidas"}
        )
    }

    let conversas = funcoes.filtrarConversas(numeroUsuario,nomeContato, keyWord)

    if (conversas) {
        response.status(200)
        response.json(conversas)
    }else{
        response.status(400)
        response.json(
            {"message":"conversas não encontradas"}
        )
    }
})

app.get("/v1/whatsapp/doc",(resquest, response) => {

    let docAPI = {
        "api-description":"API para manipular dados do aplicativo Whatsapp",
        "date":"2026/04/13",
        "development":"Samuel Silva Moreira Dos Santos",
        "version":1.0,
        "endpoints":[
            {"rota1":"/v1/whatsapp/usuarios",
             "description":"Retorna a lista de todos os usuário ativos e não ativos do aplicativo"
            },
            {"rota2":"/v1/whatsapp/dados/usuario/:numeroUser",
                "description":"Retorna dados de um usuário pelo seu número de telefone"
            },
            {"rota3":"/v1/whatsapp/usuario/dados/contatos/:numUser",
                "description":"Retorna uma lista de contatos e seus respectivos dados de um usuário pelo número de telefone do usuário"
            },
            {"rota4":"/v1/whatsapp/usuario/menssagens/:numUser",
                "description":"Retorna todas as mensagens de um usuário com os seus contatos pesquisando pelo número de telefone do usário"
            },
            {"rota5":"/v1/whatsapp/dados/conversa/:numeroUser/?nomeContato=",
                "description":"Retorna dados de uma conversa do usuário com um contato específico pesquisando pelo número de usuário e nome do contato"
            },
            {"rota6":"/v1/whatsapp/filtro/conversas/:numUser/?nomeContato=&keyWord=",
                "description":"Retorna mensagens específicas de um usuário com um contato pesquisando pelo número de usuário, nome do contato e uma palavra chave"
            }
        ]
    }

    response.status(200)
    response.json(docAPI)
})

app.listen(8080, () => {
    console.log("API aguardando novas requisições...");
})