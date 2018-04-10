import {

    MUDA_EMAIL,
    MUDA_SENHA

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
