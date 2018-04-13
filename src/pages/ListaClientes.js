import React, {Component} from 'react'
import {View, Text, FlatList} from 'react-native'
import { connect } from 'react-redux'

import { mudaDadosContatos, mudaListRoles, mudaPhoneTypes } from '../actions/AppActions';
import estilos from '../components/estilos';
import { useAPI } from '../components/library';

export class ListaClientes extends Component{
    componentWillMount(){
        this.getData()
        
       // this.props.mudaDadosContatos(contatos)
        
    }

     async getData(){
        
        let APIs = [
            {api:'Contacts', redux: this.props.mudaDadosContatos},
            {api:'Roles', redux: this.props.mudaListRoles},
            
        ]
    
        for(i in Object.keys(APIs)){
            let API = APIs[i]
                var dados = await useAPI(this.props.userKey, API.api, 'GET')
                API.redux(dados)
            i++
        }

       
       

    } 
    
    render(){
        return(
             <View style={estilos.listaContatosWrap}>
                 <FlatList
                    data={this.props.contatos}
                    renderItem={({item})=>{
                        
                        return(
                            <View style={estilos.listaContatos}>
                                <Text style={estilos.nomeContato}>{item.Name}</Text>
                                <Text style={estilos.nomeSub}>Telefone:{}</Text>
                                <Text style={estilos.nomeSub}>E-mail:{' '} {item.Email}</Text>
                            </View>
                        )
                    }}
                /> 
             </View>
            
        )
    }
}

const mapStateToProps = state =>{
    let userKey = state.AppReducer.userKey
    let contatos = state.AppReducer.contatos
    let listRoles = state.AppReducer.listRoles
   
    return{
        userKey,
        contatos,
        listRoles, 
    }
}

export default connect(mapStateToProps, {mudaDadosContatos, mudaListRoles, mudaPhoneTypes})(ListaClientes)