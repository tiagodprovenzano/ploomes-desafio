import React from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './src/reducers/index.js'
import Navegador from './src/components/Navegador.js'
import Login from './src/pages/Login'

import {Font} from 'expo'


export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      'lato': require('./assets/fonts/Lato-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }
  componentWillMount(){
    StatusBar.setHidden(true)
    
  }
  
  render() {
      
      if (this.state.fontLoaded === true){
        return(
          
        <Provider store= {createStore (reducers, {}, applyMiddleware(ReduxThunk)) }>
          <Login/>
        </Provider>
        )
      }else{
        return null
      }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
