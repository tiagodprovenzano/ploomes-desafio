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
    MUDA_TEAM_MEMBERS, 
    MUDA_MODAL_TEAM_MEMBERS,
    RESET_FORM,
    EDIT_THIS_USER, 
    RESET_OBJ,
    MUDA_LINE_OF_BUSINESS,
    MUDA_ORIGIN

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
export const mudaTeamMembers = (state) => {

    return {
        type: MUDA_TEAM_MEMBERS,
        payload: state
    }
}
export const mudaModalTeamMembers = (state) => {
    state = !state
    return {
        type: MUDA_MODAL_TEAM_MEMBERS,
        payload: state
    }
}
export const resetForm = (state) => {
    
    return {
        type: RESET_FORM,
        payload: state
    }
}
export const editUser = (state) => {
    
    return {
        type: EDIT_THIS_USER,
        payload: state
    }
}

export const resetObj = () => {
    
    return {
        type: RESET_OBJ,
        payload: {}
    }
}
export const mudaLineOfBusiness = (arr) => {
    
    return {
        type: MUDA_LINE_OF_BUSINESS,
        payload: arr
    }
}
export const mudaOrigin = (arr) => {
    
    return {
        type: MUDA_ORIGIN,
        payload: arr
    }
}


