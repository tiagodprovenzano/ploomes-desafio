import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator, TabBarTop } from 'react-navigation';
import { height } from 'react-native-dimension'

import ListaClientes from "../pages/ListaClientes";
import CadastroClientes from "../pages/CadastroClientes";


export default TabNavigator({
  Home: { 
    screen: ListaClientes, 
    navigationOptions:{
      title:'Lista Clientes'
    } 
  },
  Settings: { 
    screen: CadastroClientes, 
    navigationOptions:{
      title:'Cadastro Clientes'
    } 
  },
},{ 
  tabBarOptions:{
        style:{
          backgroundColor:'#786fb0',

        },
        indicatorStyle:{backgroundColor:'#fff'}
  },
  tabBarPosition: 'top',
  tabBarComponent: TabBarTop
  }
);