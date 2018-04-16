import React, {Component} from 'react'
import SeleCadastro from "../pages/SeleCadastro";
import {
    StackNavigator
  } from 'react-navigation';
  
export default class Cadastros extends Component{
    render(){
      return(
        <StackCadastros/>
      )
    }
  }
  
const StackCadastros = StackNavigator({

Cadastros: {
    screen: SeleCadastro,
}

})