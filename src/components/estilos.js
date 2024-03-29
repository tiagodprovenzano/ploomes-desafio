import React from 'react';
import { StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';

var contentBackground = '#f6f8f9';
var headerColor = '#786fb0';

export default (estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'stretch',
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    padding: 10,
    flex: 1,
    margin: 3,
    width: 'auto',
    textAlignVertical: 'top',
    fontSize: 17,
    fontFamily: 'lato',
  },
  inputRow: {
    padding: 5,
    flex: 1,
    margin: 3,
    width: 'auto',
    fontSize: 17,
    fontFamily: 'lato',
  },
  inputRowTel: {
    padding: 5,
    flex: 2,
    margin: 3,
    width: 'auto',
    fontSize: 17,
    fontFamily: 'lato',
  },
  inputContainer: {
    alignItems: 'center',
    height: height(10),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#2d1650',
  },
  inputContainerFreeSize: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#2d1650',
  },
  loginBody: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#3a3f51',
    justifyContent: 'center',
  },
  textos: {
    fontSize: 18,
    color: '#786fb0',
    fontFamily: 'lato',
    marginBottom: 10,
  },
  textoBotao: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'lato',
    padding: 10,
  },
  botaoLogin: {
    backgroundColor: '#37c4f0',
    width: width(35),
    borderRadius: 5,
    marginVertical: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  botao: {
    backgroundColor: '#27c24c',
    width: width(35),
    borderRadius: 5,
    marginVertical: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  inputsWraps: {
    width: width(80),
    padding: 10,
    backgroundColor: '#f6f8f9',
    borderRadius: 10,
    justifyContent: 'space-evenly',
  },
  inputsTop: {
    padding: 10,
    textAlign: 'center',
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  inputs: {
    padding: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  erroLogin: {
    color: 'red',
    alignSelf: 'center',
  },
  listaContatos: {
    backgroundColor:'#fff', 
    marginHorizontal:30,
    borderBottomWidth:1, 
    borderBottomColor:'#504887', 
    paddingVertical:10
  },
  radioInactive:{
    backgroundColor:'#3a3f50', 
    padding:10, 
    borderRadius:5, 
    width:width(28), 
    alignItems:'center',
  },
  filterActive:{
    backgroundColor:'#504887', 
    padding:10,
    borderRadius:5, 
    width:width(28), 
    alignItems:'center'
  },
  viewFormulario: {
    padding: 5,
    backgroundColor: '#edf1f2',
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  dropdown: {
    flex: 1,
    marginHorizontal: 10,
  },
  listaContatosWrap: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
  },
  formularioWrap: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    justifyContent: 'center',
  },
  nomeContato: {
    fontFamily: 'lato',
    fontSize: 22,
    color: '#000',
    padding: 8,
  },
  nomeSub: {
    fontFamily: 'lato',
    fontSize: 15,
    color: '#000',
    padding: 8,
    paddingLeft: 10,
  },
  modalTitle: {
    fontFamily: 'lato',
    fontSize: 15,

    paddingLeft: 5,
  },
  modalWrap: {
    
      justifyContent: 'center',
      alignItems: 'center',
      height: height(100),
      backgroundColor: 'rgba(0,0,0,0.5)',
    
  },
  modalContent: {
    
      backgroundColor: '#fff',
      maxHeight: height(50),
      width: width(75),
      padding: 10,
      borderRadius:10, 
      elevation:5
    
  },
}));
