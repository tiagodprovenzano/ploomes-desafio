import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import { connect } from 'react-redux'
import { useAPI, mapData, formatPhone } from "../components/library";
import { Ionicons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import { Dropdown } from 'react-native-material-dropdown';
import { height, width } from 'react-native-dimension'

import estilos from "../components/estilos";
import { mudaDadosContatos, mudaValueTelefone } from "../actions/AppActions";

export class CadastroClientes extends Component{
    
    state = {
        collapsed: true,
        iconName:'md-arrow-dropdown-circle',
        quantTelefones:[1],
        Name:'',
        Email:'', 
    };
 
    async postData(){
        
        var obj = {Name:this.state.Name, Email:this.state.Email}
        
        await useAPI(this.props.userKey, 'Contacts', 'POST', obj)
        
        var dados = await useAPI(this.props.userKey, 'Contacts', 'GET')
        this.props.mudaDadosContatos(dados)


        this.setState({
            Name:'',
            Email:'', 
            
        })

    }

    
 
    telefones(ultimo, index){

      return(
          <View style={estilos.inputContainer}>
              <Ionicons name="ios-call" size={25} color='#2d1650'/>
              
               <TextInput
                  style={estilos.inputRowTel}
                  keyboardType='phone-pad'
                  placeholderTextColor='#786fb0'
                  underlineColorAndroid="#fff"
                  placeholder="Telefones"
                  value={this.state[index]}
                  onChangeText={(text) => {
                  try {

                    this.setState({[index]:formatPhone(text)})
                    this.props.telefones[index].phone = formatPhone(text)

                  } catch (error) {

                    this.setState({[index]:formatPhone(text)})
                    this.props.telefones[index] = {phone: formatPhone(text), type:''}

                  }
                }}

                  /> 
              <Dropdown 
                label='Tipo'
                value='Tipo'
                containerStyle={estilos.dropdown}
                data={mapData(this.props.phoneTypes)}
                onChangeText={(item)=>{
                  try {
                    this.props.telefones[index].type = item
                  } catch (error) {
                    this.props.telefones[index] = {phone: '', type: item}
                  }
                }}
              />
              {this.renderUltimo(ultimo)}
              
            </View>
        )
    }
    
    
    renderUltimo(ultimo){
      if(ultimo){
            return(
                <TouchableOpacity 
                  style={{marginHorizontal:10}}
                  onPress={()=> {

                  let temp = this.state.quantTelefones
                    temp[temp.length] = temp.length + 1
                    
                    this.setState({
                      quantTelefones: temp
                    }) 
                  }} 
                >
                  <Ionicons name='md-add' size={25} color='#2d1650'/>
                </TouchableOpacity>
          )
      } else {
          return null                      
      }
    }
    
    
    
    render() {
      mapData(this.props.phoneTypes)
      console.log(this.props.telefones)
      return (
          <ScrollView>
          <View style={estilos.container} >
            <View style={estilos.inputContainer}>
              <Ionicons name="md-person" size={25} color='#2d1650'/>
              <TextInput
                style={estilos.inputRow}
                placeholderTextColor='#786fb0'
                underlineColorAndroid="#fff"
                placeholder="Nome"
                value={this.state.Name}
                onChangeText={(text)=>{
                  this.setState({Name:text})
                }}
              />
            </View>
      
            <View style={estilos.inputContainer}>
              <Ionicons name="ios-mail" size={25} color='#2d1650'/>
              <TextInput
                style={estilos.inputRow}
                placeholderTextColor='#786fb0'
                underlineColorAndroid="#fff"
                placeholder="E-mail"
                value={this.state.Email}
                onChangeText={text=>{
                  this.setState({Email:text})
                }}
              />
            </View>
    
            <View style={estilos.inputContainer}>
              <Ionicons name="ios-briefcase" size={25} color='#2d1650'/>
              <TextInput
                style={estilos.inputRowTel}
                placeholderTextColor='#786fb0'
                underlineColorAndroid="#fff"
                placeholder="Empresa"
              />
              
              <Dropdown 
                label='Cargo'
                value='Cargo'
                overlayStyle={{}}
                containerStyle={estilos.dropdown}
                data={mapData(this.props.listRoles)}
              />
            </View>
            {
               
               
               this.state.quantTelefones.map((item)=>{
                let ultimo = item === this.state.quantTelefones.length
                return this.telefones(ultimo, item-1)
              })

            }
            
            <View style={estilos.inputContainer}>
              <Ionicons name="ios-clipboard" size={25} color='#2d1650'/>
              <TextInput
                style={estilos.inputRow}
                placeholderTextColor='#786fb0'
                underlineColorAndroid="#fff"
                placeholder="Departamento"
              />
            </View>
            
            <Collapsible collapsed={this.state.collapsed}>
              
            <View style={estilos.inputContainer}>
              <Ionicons name="md-card" size={25} color='#2d1650'/>
              <TextInput
                style={estilos.inputRow}
                placeholderTextColor='#786fb0'
                underlineColorAndroid="#fff"
                placeholder="CPF"
                onChangeText={(text)=>{
                text = text.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5")
                console.log(text)}
                }
              />
            </View> 
            <View style={estilos.inputContainer}>
              <Ionicons name="ios-people" size={25} color='#2d1650'/>
              <TextInput
                style={estilos.inputRow}
                placeholderTextColor='#786fb0'
                underlineColorAndroid="#fff"
                placeholder="Responsavel"
              />
            </View>  
            <View style={estilos.inputContainerFreeSize}>
              <TextInput
                multiline={true}
                numberOfLines={5}
                style={estilos.input}
                placeholderTextColor='#786fb0'
                underlineColorAndroid="#fff"
                placeholder="Observação"
              />
            </View>  
             
              
            </Collapsible>
            <TouchableOpacity
              style={{ alignSelf: 'center', marginTop: 10 }}
              onPress={() => {
                if(this.state.collapsed === true){
                this.setState({
                  collapsed: !this.state.collapsed,
                  iconName:'md-arrow-dropup-circle'
    
                })
                }else{
                this.setState({
                  collapsed: !this.state.collapsed,
                  iconName:'md-arrow-dropdown-circle'
                })
                  
                }
                }
              }>
             <Ionicons name={this.state.iconName} size={25} color='#2d1650'/>
            </TouchableOpacity>

            
          </View >
          <TouchableOpacity 
            onPress={()=>{
              console.log(this.props.telefones);
              console.log(this.state.Name);
              console.log(this.state.Email);
              
            }}
            style={estilos.botao}
            >
              <Text style={estilos.textoBotao}>Cadastrar</Text>
          </TouchableOpacity>
          </ScrollView>
          
        );
      }
    }
    
    



const mapStateToProps = state =>{
    let userKey = state.AppReducer.userKey
    let phoneTypes = state.AppReducer.phoneTypes
    let listRoles = state.AppReducer.listRoles
    let telefones = state.AppReducer.telefones
    let valueTelefone = state.AppReducer.valueTelefone    
    
    return{
        userKey, 
        phoneTypes,
        listRoles,
        telefones, 
        valueTelefone
    }
}

export default connect(mapStateToProps, {mudaDadosContatos, mudaValueTelefone})(CadastroClientes)