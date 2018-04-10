import React, {Component} from 'react'
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import estilos from '../components/estilos.js'
import {width, height} from 'react-native-dimension'
import { Ionicons } from '@expo/vector-icons';

import { mudaEmail, mudaSenha } from '../actions/AppActions'

export class Login extends Component{
    login(data){
        data = JSON.stringify(data);
          
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          
          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let resposta = JSON.parse(this.responseText)['value']
              console.log( resposta[0].UserKey );
            }
          });
          
          xhr.open("POST", "https://api2-dev.ploomes.com/Self/Login");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Cache-Control", "no-cache");
          xhr.setRequestHeader("Postman-Token", "09164425-bfd3-46cb-a0b7-aea95db9a8b6");
          
          xhr.send(data);
    }
    
    render(){
        var obj = {Email:this.props.email, Password:this.props.senha}
        
        return(
            <View style={estilos.loginBody}>


            <View style={estilos.inputsWraps}>

                <View style={{alignItems:'center'}}>
                    
                    <Image style={{width:width(80)}} resizeMode='contain' source={require('../logos/logoLogin.png')} />
                </View>
            
                <Text style={estilos.textos}>
                    E-Mail
                </Text>
                    <TextInput onChangeText={(text) => this.props.mudaEmail(text)} underlineColorAndroid='#f6f8f9' style={estilos.inputsTop} placeholder='E-mail'/>
                <Text style={estilos.textos}>
                    Senha
                </Text>
                <TextInput secureTextEntry={true} onChangeText={(text)=>this.props.mudaSenha(text)} underlineColorAndroid='#f6f8f9' style={estilos.inputs} placeholder='Senha'/>
                <TouchableOpacity 
                    onPress={ () => this.login(obj)} 
                    style={estilos.botao}>

                    <Text  style={estilos.textoBotao}>Entrar</Text>
                
                </TouchableOpacity>

            </View>

            </View>
        )
    }
}

const mapStateToProps = state => {
    let email = state.AppReducer.email
    let senha = state.AppReducer.senha
    return{
        email,
        senha,
    }
}

export default connect(mapStateToProps, {mudaEmail, mudaSenha})(Login)