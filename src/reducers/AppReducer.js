import {

    MUDA_EMAIL,
    MUDA_SENHA,
    MUDA_USER_KEY,
    MUDA_DADOS_CONTATO,
    MUDA_LIST_ROLES,
    MUDA_TELEFONES,
    MUDA_VALUE_TELEFONE

   } from '../actions/types.js'

const INITIAL_STATE = {

    email:'tiagodprovenzano@gmail.com',
    senha:'1234',
    userKey:'',
    contatos:[],
    listRoles:[],
    phoneTypes:[
                    {
                        "Id": 1,
                        "Name": "Comercial"
                    },
                    {
                        "Id": 2,
                        "Name": "Celular"
                    },
                    {
                        "Id": 3,
                        "Name": "Residencial"
                    },
                    {
                        "Id": 4,
                        "Name": "Fax"
                    },
                    {
                        "Id": 5,
                        "Name": "Outros"
                    }
                ],

    telefones:[],
    valueTelefone:'',

}

export default (state = INITIAL_STATE, action) =>{
    // console.log(action.type)
    if (action.type == MUDA_EMAIL){
     return { ...state, email: action.payload }
    }
    if (action.type == MUDA_SENHA){
     return { ...state, senha: action.payload }
    }
    if (action.type == MUDA_USER_KEY){
     return { ...state, userKey: action.payload }
    }
    if (action.type == MUDA_DADOS_CONTATO){
     return { ...state, contatos: action.payload }
    }
    if (action.type == MUDA_LIST_ROLES){
     return { ...state, listRoles: action.payload }
    }
    if (action.type == MUDA_TELEFONES){
     return { ...state, telefones: action.payload }
    }
    if (action.type == MUDA_VALUE_TELEFONE){
     return { ...state, valueTelefone: action.payload }
    }

return state
}