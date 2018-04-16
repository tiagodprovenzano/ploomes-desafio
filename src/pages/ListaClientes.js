import React, {Component} from 'react'
import {View, Text, FlatList, TouchableOpacity,} from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { height, width } from 'react-native-dimension'
import { 

    mudaDadosContatos, 
    mudaListRoles, 
    mudaPhoneTypes, 
    mudaEmpresas, 
    mudaDepatamentos, 
    mudaTeamMembers, 
    resetForm, 
    editUser,
    mudaLineOfBusiness, 
    mudaOrigin 

} from '../actions/AppActions';
import estilos from '../components/estilos';
import { useAPI } from '../components/library';

export class ListaClientes extends Component{
    componentWillMount(){
        this.getData()
        
       // this.props.mudaDadosContatos(contatos)
        
    }

     async getData(){
        
        let APIs = [
            {api:'Contacts?&$expand=Phones', redux: this.props.mudaDadosContatos},
            {api:'Roles', redux: this.props.mudaListRoles},
            {api:'Departments', redux: this.props.mudaDepatamentos},
            {api:'Contacts?$filter=TypeId+eq+1', redux: this.props.mudaEmpresas},
            {api:'Users/GetContactOwners', redux: this.props.mudaTeamMembers},
            {api:'Contacts@LinesOfBusiness', redux: this.props.mudaLineOfBusiness},
            {api:'Contacts@Origins', redux: this.props.mudaOrigin},
            
        ]
    
        for(i in Object.keys(APIs)){
            let API = APIs[i]
                var dados = await useAPI(this.props.userKey, API.api, 'GET')
                API.redux(dados)
            i++
        }

       
       

    } 
    
    render(){
        console.log('renderizou lista');
        
        this.props.editUser({})

        return(
       
    <View style={{flex:1}}>
                <View style={{height:height(10), width:width(100), backgroundColor:'#786fb1', elevation:5, justifyContent:'center', alignItems:'flex-start'}}>
                    <TouchableOpacity 
                        style={{marginLeft:20, paddingHorizontal:6, paddingVertical:3, borderRadius:5, alignItems:'center', justifyContent:'center', backgroundColor:'#786fb1', elevation:3}}
                        onPress={()=>{
                            this.props.navigation.navigate('DrawerToggle')
                            console.log(this.props.navigation);
                        }}
                    >
                        <Ionicons name='md-menu' size={32}  color='#fff'/>
                    </TouchableOpacity>
                </View>
       <View style={estilos.listaContatosWrap}>
                 <FlatList
                    data={this.props.contatos}
                    renderItem={({item})=>{
                        
                        return(
                                                        
                            <View style={estilos.listaContatos}>
                            
                                <View >
                                    <Text style={estilos.nomeContato}>{item.Name}</Text>
                                    <Text style={estilos.nomeSub}>E-mail:{' '} {item.Email}</Text>
                                </View>
                            
                                <TouchableOpacity onPress={()=>{
                                    this.props.resetForm(true)
                                    this.props.editUser(item)
                                    console.log(this.props.navigation)
                                    this.props.navigation.navigate('Cadastros')
                                }}>
                                    <Ionicons name='ios-create-outline' size={32}/>
                                </TouchableOpacity>
                                
                            </View>
                        )
                    }}
                /> 
             </View>
             <TouchableOpacity 
             onPress={()=>{
             }}
             style={{position:'absolute', bottom:0, right:0, margin:20, backgroundColor:'#27c24c', borderRadius:50, padding:15, elevation:10}}
            >
                <Ionicons name='md-person-add' size={40} color='#fff'/>
            </TouchableOpacity>
                            
             </View>
            
        )
    }
}

const mapStateToProps = state =>{
    let userKey = state.AppReducer.userKey
    let contatos = state.AppReducer.contatos
    let listRoles = state.AppReducer.listRoles
    let obj = state.AppReducer.obj
    
   
    return{
        userKey,
        contatos,
        listRoles,
        obj        
    }
}

export default connect(mapStateToProps, {
    
    mudaDadosContatos, 
    mudaListRoles, 
    mudaPhoneTypes, 
    mudaEmpresas, 
    mudaDepatamentos, 
    mudaTeamMembers,
    resetForm, 
    editUser,
    mudaLineOfBusiness, 
    mudaOrigin

})(ListaClientes)