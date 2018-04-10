import {

    MUDA_EMAIL,
    MUDA_SENHA

   } from '../actions/types.js'

const INITIAL_STATE = {

    email:'',
    senha:''

}

export default (state = INITIAL_STATE, action) =>{
    // console.log(action.type)
    if (action.type == MUDA_EMAIL){
     return { ...state, email: action.payload }
    }
    if (action.type == MUDA_SENHA){
     return { ...state, senha: action.payload }
    }

return state
}