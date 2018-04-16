import React, {Component} from 'react'
import ListaClientes from "../pages/ListaClientes";
import SeleCadastro from '../pages/SeleCadastro'
import {
    DrawerNavigator
  } from 'react-navigation';
import Ionicons from '@expo/vector-icons/Ionicons';

export default class Listas extends Component{
    render(){
      return(
        <StackListas />
      )
    }
  }
  
const StackListas = DrawerNavigator({

ListaClientes: {
    screen: ListaClientes,
    navigationOptions:{
      
      drawerLabel:'Clientes',
      drawerIcon:({tintColor})=>(
        <Ionicons name='md-people' size={25} color={tintColor}/>
      )
    }
    
}, 

Cadastros: {
    screen: SeleCadastro,
    navigationOptions:{
      
      drawerLabel:'Adicionar Cliente',
      drawerIcon:({tintColor})=>(
        <Ionicons name='md-person-add' size={25} color={tintColor}/>
      )
    }

  }, 
},{
  drawerBackgroundColor:'#3a3f50', 
  contentOptions:{
    activeTintColor:'#9da3b8',
    activeBackgroundColor:'#272a36',
    inactiveTintColor:'#9da3b8' 
  }
}

)