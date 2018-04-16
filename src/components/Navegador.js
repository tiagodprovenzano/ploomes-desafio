import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';
import {
  DrawerNavigator,
  StackNavigator
} from 'react-navigation';
import {
  height
} from 'react-native-dimension'

import Listas from './drawerListas'
import SeleCadastro from '../pages/SeleCadastro'
import CadastroClientes from '../pages/CadastroClientes'
import ListaClientes from '../pages/ListaClientes'


export default StackNavigator({
  Listas:{
    screen: Listas, 
  },
  SeleCadastro:{
    screen:SeleCadastro, 
  },
  CadastroClientes:{
    screen:CadastroClientes, 
  },
},
  {
    headerMode:'none',
  }

);



 
