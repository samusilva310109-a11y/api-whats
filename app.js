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

app.listen(8080, () => {
    console.log("API aguardando novas requisições...");
})