import {

    MUDA_EMAIL,
    MUDA_SENHA,
    MUDA_USER_KEY,
    MUDA_DADOS_CONTATO,
    MUDA_LIST_ROLES,
    MUDA_TELEFONES,
    MUDA_VALUE_TELEFONE

} from './types'

export const mudaEmail = (email) => {
    return {
        type: MUDA_EMAIL,
        payload: email
    }
}
export const mudaSenha = (senha) => {
    return {
        type: MUDA_SENHA,
        payload: senha
    }
}

export const mudaUserKey = (key) => {
    return {
        type: MUDA_USER_KEY,
        payload: key
    }
}
export const mudaDadosContatos = (contatos) => {
    return {
        type: MUDA_DADOS_CONTATO,
        payload: contatos
    }
}
export const mudaListRoles = (list) => {
    return {
        type: MUDA_LIST_ROLES,
        payload: list
    }
}
export const mudaPhoneTypes = (list) => {
    return {
        type: MUDA_PHONE_TYPES,
        payload: list
    }
}
export const mudaValueTelefone = (v) => {
        
        v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
        v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
        v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos

    return {
        type: MUDA_VALUE_TELEFONE,
        payload: v
    }
}

