import React, {Component} from 'react'
import {View, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
import { editUser } from '../actions/AppActions'
import {height, width} from 'react-native-dimension'
import { Ionicons } from '@expo/vector-icons';

import CadastroClientes from './CadastroClientes'
import CadastroEmpresa from './CadastroEmpresa'
import estilos from '../components/estilos';

export class SeleCadastro extends Component{
    render(){
        
        //console.log('Sele Cadastro - this.props.editThsUser - ', this.props.editThisUser)
        
        if(this.props.editThisUser.TypeId === 2){
            return (
                <View style={{flex:1}}>
                    <View style={{height:height(10), width:width(100), backgroundColor:'#786fb1', elevation:5, justifyContent:'center', alignItems:'flex-start'}}>
                        <TouchableOpacity 
                            style={{marginLeft:20, paddingHorizontal:6, paddingVertical:3, borderRadius:5, alignItems:'center', justifyContent:'center', backgroundColor:'#786fb1', elevation:3}}
                            onPress={()=>{
                                this.props.navigation.navigate('DrawerToggle')
                            }}
                            >
                            <Ionicons name='md-menu' size={32}  color='#fff'/>
                        </TouchableOpacity>
                        
                    </View>
                        <CadastroClientes/>
                </View>
            )
        }
        
        else if(this.props.editThisUser.TypeId === 1){
            return (
                <View style={{flex:1}}>
                    <View style={{height:height(10), width:width(100), backgroundColor:'#786fb1', elevation:5, justifyContent:'center', alignItems:'flex-start'}}>
                        <TouchableOpacity 
                            style={{marginLeft:20, paddingHorizontal:6, paddingVertical:3, borderRadius:5, alignItems:'center', justifyContent:'center', backgroundColor:'#786fb1', elevation:3}}
                            onPress={()=>{
                                this.props.navigation.navigate('DrawerToggle')
                                //console.log(this.props.navigation);
                            }}
                            >
                            <Ionicons name='md-menu' size={32}  color='#fff'/>
                        </TouchableOpacity>
                        
                    </View>
                        <CadastroEmpresa/>
                </View>
            )
        }
        
        else {
            return(
                <View style={{flex:1}}>
                    <View style={{height:height(10), width:width(100), backgroundColor:'#786fb1', elevation:5, justifyContent:'center', alignItems:'flex-start'}}>
                        <TouchableOpacity 
                            style={{marginLeft:20, paddingHorizontal:6, paddingVertical:3, borderRadius:5, alignItems:'center', justifyContent:'center', backgroundColor:'#786fb1', elevation:3}}
                            onPress={()=>{
                                this.props.navigation.navigate('DrawerToggle')
                                //console.log(this.props.navigation);
                            }}
                            >
                            <Ionicons name='md-menu' size={32}  color='#fff'/>
                        </TouchableOpacity>
                        
                    </View>
                    <View style={{justifyContent:'center', flex:1}}>


                <Text style={{padding:10, fontFamily:'lato', fontSize:19, textAlign:'center'}}>Selecione o tipo de cliente que deseja cadastrar</Text>
                
                <TouchableOpacity style={estilos.botao} 
                onPress={()=>{
                    //console.log(this.props.navigation)
                    this.props.editUser({
                        'TypeId': 2
                    })
                }}>
                    <Text style={estilos.textoBotao}>Pessoa</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                style={estilos.botao}
                onPress={()=>{
                    this.props.editUser({
                        'TypeId': 1
                    })
                }}>
                    <Text style={estilos.textoBotao}>Empresa</Text>
                </TouchableOpacity>
                </View>
                
                </View>
            )
        }    
        
    }
}

const mapStateToProps= state =>{
    
    let editThisUser = state.AppReducer.editThisUser;

    return{
        editThisUser
    }
}

export default connect(mapStateToProps, { editUser })(SeleCadastro)