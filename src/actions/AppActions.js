import {

    MUDA_EMAIL,
    MUDA_SENHA,
    MUDA_USER_KEY,
    MUDA_DADOS_CONTATO,
    MUDA_LIST_ROLES,
    MUDA_TELEFONES,
    MUDA_EMPRESAS,
    MUDA_MODAL_STATES,
    MUDA_MODAL_EMPRESAS,
    MUDA_MODAL_CARGOS,
    MUDA_MODAL_DEPARTAMENTOS,
    MUDA_DEPARTAMENTOS,
    MUDA_ACTIVE_PHONE_MODAL,

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

export const mudaEmpresas = (list) => {
    return {
        type: MUDA_EMPRESAS,
        payload: list
    }
}
export const mudaModalStates = (state) => {

    state = !state
    return {
        type: MUDA_MODAL_STATES,
        payload: state
    }
}
export const mudaModalEmpresas = (state) => {

    state = !state
    return {
        type: MUDA_MODAL_EMPRESAS,
        payload: state
    }
}
export const mudaModalCargos = (state) => {

    state = !state
    return {
        type: MUDA_MODAL_CARGOS,
        payload: state
    }
}
export const mudaModalDepatamentos = (state) => {

    state = !state
    return {
        type: MUDA_MODAL_DEPARTAMENTOS,
        payload: state
    }
}
export const mudaDepatamentos = (state) => {

    return {
        type: MUDA_DEPARTAMENTOS,
        payload: state
    }
}
export const mudaActivePhoneModal = (state) => {

    return {
        type: MUDA_ACTIVE_PHONE_MODAL,
        payload: state
    }
}


