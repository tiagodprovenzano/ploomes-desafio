import React, {Component} from 'react'
import {Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
import estilos from '../components/estilos.js'
import {width, height} from 'react-native-dimension'
import { Ionicons } from '@expo/vector-icons';
import {emailValidation} from '../components/library'

import { mudaEmail, mudaSenha, mudaUserKey, mudaPhoneTypes } from '../actions/AppActions'

export class Login extends Component{
    state={
        mensagemEmail:""
    }

    login(data){
        data = JSON.stringify(data);
         
        fetch('https://api2-dev.ploomes.com/Self/Login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: data,
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(typeof responseJson.value === 'string'){
                
              }else if(typeof responseJson.value === 'object'){
                this.props.mudaUserKey(responseJson.value[0].UserKey)
              }

        })
        .catch((error) => {
        })
    }
          

    _renderError(){
        if(this.state.mensagemEmail.length > 0){
            return(
                <Text style={estilos.erroLogin}>{this.state.mensagemEmail}</Text>
            )
        }
    }
    
    render(){
       
        var obj = {Email:this.props.email, Password:this.props.senha}
        
        return(
            <View style={estilos.loginBody}>


            <View style={estilos.inputsWraps}>

                <View style={{alignItems:'center'}}>
                    
                    <Image style={{width:width(80)}} resizeMode='contain' source={require('../logos/logoLogin.png')} />
                </View>
            
                    <TextInput value={this.props.email} onChangeText={(text) => this.props.mudaEmail(text)} underlineColorAndroid='#fff' style={estilos.inputsTop} placeholder='E-mail'/>
                    {this._renderError()}
                    <TextInput value={this.props.senha} secureTextEntry={true} onChangeText={(text)=>this.props.mudaSenha(text)} underlineColorAndroid='#fff' style={estilos.inputs} placeholder='Senha'/>
                <TouchableOpacity 
                    onPress={ () => {
                        let validation = emailValidation(obj.Email)
                        if(!validation.tipo){
                            this.setState({mensagemEmail:validation.mensagem})
                        }else{
                            this.setState({mensagemEmail:''})
                            this.login(obj)
                        }
                    }} 
                    style={estilos.botaoLogin}>

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
    let userKey = state.AppReducer.userKey
    return{
        email,
        senha,
        userKey,
    }
}

export default connect(mapStateToProps, {mudaEmail, mudaSenha, mudaUserKey})(Login)