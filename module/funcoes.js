/******************************************************************************************
 * Objetivo: Arquivo responsável por armazenar as funções necessárias para a criação da API 
 * Autor: Samuel Silva Moreira Dos Santos
 * Data início: 08/04/2026
 * Versão: 1.0
 ******************************************************************************************/

const contatos = require("./contatos")
const listaContatos = contatos.contatos

function getListaUsuarios(){
    let listaUsers = {
        "usuarios":[
        ]
    }

    listaContatos["whats-users"].forEach((users) => {
        listaUsers.usuarios.push(users)
    })

    if (listaUsers.usuarios.length == 0)
        return false
    else
        return listaUsers
}

function getDadosUsuario(num){
    let numero = String(num)

    let dadosUser = {

    }

    listaContatos["whats-users"].forEach((user) => {
        if(numero == user.number){
            dadosUser = {
                "nome":user.account,
                "nick":user.nickname,
                "foto":user["profile-image"],
                "numero":user.number,
                "cor_de_fundo":user.background,
                "criacao":user["created-since"].start,
                "encerramento":user["created-since"].end
            }
        }  
    })

    if(Object.keys(dadosUser).length == 0)
        return false
    else
        return dadosUser
}

function getDadosContatos(num){
    let numero = String(num)

    let listaMeusContatos = []

    listaContatos["whats-users"].forEach((user) => {
        if (numero == user.number) {
            user.contacts.forEach((contacts) => [
                listaMeusContatos.push(
                    {"nome":contacts.name,"foto_perfil":contacts.image,"descricao":contacts.description}
                )
            ])
           
        } 
    })

    if(listaMeusContatos.length == 0)
        return false
    else
        return listaMeusContatos
}

function getListaUserMessages(num) {
    let listaMensagens = []
    let numero = String(num)

    listaContatos["whats-users"].forEach((user) => {
        if (numero == user.number) {
            user.contacts.forEach((contato) => {
                listaMensagens.push(
                    {"nome_contato":contato.name,"menssagens":contato.messages}
                )
            })
        }
    })
}



