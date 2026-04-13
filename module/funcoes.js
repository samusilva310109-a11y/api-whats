/******************************************************************************************
 * Objetivo: Arquivo responsável por armazenar as funções necessárias para a criação da API 
 * Autor: Samuel Silva Moreira Dos Santos
 * Data início: 08/04/2026
 * Versão: 1.0
 ******************************************************************************************/

const contatos = require("./contatos")
const listaContatos = contatos.contatos

function getListaUsuarios() {
    let listaUsers = {
        "usuarios": [
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

function getDadosUsuario(num) {
    let numero = String(num)

    let dadosUser = {

    }

    listaContatos["whats-users"].forEach((user) => {
        if (numero == user.number) {
            dadosUser = {
                "nome": user.account,
                "nick": user.nickname,
                "foto": user["profile-image"],
                "numero": user.number,
                "cor_de_fundo": user.background,
                "criacao": user["created-since"].start,
                "encerramento": user["created-since"].end
            }
        }
    })

    if (Object.keys(dadosUser).length == 0)
        return false
    else
        return dadosUser
}

function getDadosContatos(num) {
    let numero = String(num)

    let listaMeusContatos = {
        "contacts":[]
    }

    listaContatos["whats-users"].forEach((user) => {
        if (numero == user.number) {
            user.contacts.forEach((contacts) => {
                listaMeusContatos.contacts.push(
                    { "nome": contacts.name, "foto_perfil": contacts.image, "descricao": contacts.description }
                )
            })

        }
    })

    if (listaMeusContatos.contacts.length == 0)
        return false
    else
        return listaMeusContatos
}

function getListaUserMessages(num) {
    let listaMensagens = {
        "messages":[]
    }
    let numero = String(num)

    listaContatos["whats-users"].forEach((user) => {
        if (numero == user.number) {
            user.contacts.forEach((contato) => {
                listaMensagens.messages.push(
                    { "nome_contato": contato.name, "menssagens": contato.messages }
                )
            })
        }
    })

    if (listaMensagens.messages.length == 0)
        return false
    else
        return listaMensagens
}

function getDadosConversa(numUser, contactName) {
    let numUsuario = String(numUser)
    let nomeContato = String(contactName)

    let dadosConversa = {}

    listaContatos["whats-users"].forEach((user) => {
        if (numUsuario == user.number) {
            user.contacts.forEach((contact) => {
                if (nomeContato == contact.name) {

                    dadosConversa = {
                        "usuario": user.account,
                        "nome_contato": contact.name,
                        "conversas": contact.messages
                    }

                }
            })
        }
    })

    if (Object.keys(dadosConversa).length == 0)
        return false
    else
        return dadosConversa
}

function filtrarConversas(numUser, nameContact, keyWord) {
    let numeroUser = String(numUser)
    let nomeContact = String(nameContact)
    let palavraChave = String(keyWord).toUpperCase()

    let listaConvesas = {"conversas":[]}

    listaContatos["whats-users"].forEach((user) => {
        if (user.number == numeroUser) {
            user.contacts.forEach((contacts) => {
                if (contacts.name == nomeContact) {
                    contacts.messages.forEach((messages) => {
                        if (messages.content.toUpperCase().substring().includes(palavraChave)) {
                            listaConvesas.conversas.push(
                                { "quem_enviou": messages.sender, "conteudo": messages.content, "hora_envio": messages.time }
                            )
                        }
                    })
                }
            })
        }
    })

    if (listaConvesas.conversas.length == 0)
        return false
    else
        return listaConvesas
}

module.exports = {
    getListaUsuarios,
    getDadosUsuario,
    getDadosContatos,
    getListaUserMessages,
    getDadosConversa,
    filtrarConversas
}