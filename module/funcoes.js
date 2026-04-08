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
        users.contacts.forEach((i) => {
           
        })
    })

    if (listaUsers.usuarios.length == 0)
        return false
    else
        return listaUsers
}


