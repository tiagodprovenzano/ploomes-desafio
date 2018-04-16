import {
    MUDA_EMAIL,
    MUDA_SENHA,
    MUDA_USER_KEY,
    MUDA_DADOS_CONTATO,
    MUDA_LIST_ROLES,
    MUDA_TELEFONES,
    MUDA_VALUE_TELEFONE,
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
    
  } from '../actions/types.js';
  
  const INITIAL_STATE = {
    email: 'tiagodprovenzano@gmail.com',
    senha: '1234',
    userKey: '',
    contatos: [],
    listRoles: [],
    departamentos: [],
    phoneTypes: [
      {
        Id: 1,
        Name: 'Comercial',
      },
      {
        Id: 2,
        Name: 'Celular',
      },
      {
        Id: 3,
        Name: 'Residencial',
      },
      {
        Id: 4,
        Name: 'Fax',
      },
      {
        Id: 5,
        Name: 'Outros',
      },
    ],
  
    telefones: [],
    valueTelefone: '',
    empresas: [],
    modalStates: false,
    modalEmpresas: false,
    modalCargos: false,
    modalDepartamentos: false,
    modalTeamMembers: false,
    activePhoneModal: '',
    obj: {},
    teamMembers: [],
    shouldFormReset: false,
    editThisUser: {},
    lineOfBusiness: [],
    origin: [],
  };
  
  export default (state = INITIAL_STATE, action) => {
    // console.log(action.type)
    if (action.type == MUDA_EMAIL) {
      return { ...state, email: action.payload };
    }
    if (action.type == MUDA_SENHA) {
      return { ...state, senha: action.payload };
    }
    if (action.type == MUDA_USER_KEY) {
      return { ...state, userKey: action.payload };
    }
    if (action.type == MUDA_DADOS_CONTATO) {
      return { ...state, contatos: action.payload };
    }
    if (action.type == MUDA_LIST_ROLES) {
      return { ...state, listRoles: action.payload };
    }
    if (action.type == MUDA_TELEFONES) {
      return { ...state, telefones: action.payload };
    }
    if (action.type == MUDA_VALUE_TELEFONE) {
      return { ...state, valueTelefone: action.payload };
    }
    if (action.type == MUDA_EMPRESAS) {
      return { ...state, empresas: action.payload };
    }
    if (action.type == MUDA_MODAL_STATES) {
      return { ...state, modalStates: action.payload };
    }
    if (action.type == MUDA_MODAL_EMPRESAS) {
      return { ...state, modalEmpresas: action.payload };
    }
    if (action.type == MUDA_MODAL_CARGOS) {
      return { ...state, modalCargos: action.payload };
    }
    if (action.type == MUDA_MODAL_DEPARTAMENTOS) {
      return { ...state, modalDepartamentos: action.payload };
    }
    if (action.type == MUDA_MODAL_TEAM_MEMBERS) {
      return { ...state, modalTeamMembers: action.payload };
    }
    if (action.type == MUDA_DEPARTAMENTOS) {
      return { ...state, departamentos: action.payload };
    }
    if (action.type == MUDA_ACTIVE_PHONE_MODAL) {
      return { ...state, activePhoneModal: action.payload };
    }
    if (action.type == MUDA_TEAM_MEMBERS) {
      return { ...state, teamMembers: action.payload };
    }
    if (action.type == RESET_FORM) {
      return { ...state, shouldFormReset: action.payload };
    }
    if (action.type ==  EDIT_THIS_USER) {
      return { ...state, editThisUser: action.payload };
    }
    if (action.type ==  RESET_OBJ) {
      return { ...state, obj: action.payload };
    }
    if (action.type ==  MUDA_LINE_OF_BUSINESS) {
      return { ...state, lineOfBusiness: action.payload };
    }
    if (action.type ==  MUDA_ORIGIN) {
      return { ...state, origin: action.payload };
    }
  
    return state;
  };
  