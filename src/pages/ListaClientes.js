import React, {Component} from 'react'
import {View, Text, FlatList, TouchableOpacity, Modal, Alert} from 'react-native'
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
import { useAPI, deleteUser } from '../components/library';

export class ListaClientes extends Component{

    state={
        deleteWarningVisible : false, 
        filterActive:'Todos', 
        editModalActive:false, 
        activeUser:{}
    }

    componentWillMount(){
        this.getData()
        
       // this.props.mudaDadosContatos(contatos)
        
    }

    render(){
        //console.log('renderizou lista');
        let data = this.filterData()
        data = this.sortData(data)
        this.props.editUser({})

        return(
       
    <View style={{flex:1}}>
                <View style={{height:height(10), width:width(100), backgroundColor:'#504887', elevation:5, justifyContent:'center', alignItems:'flex-start'}}>
                    <TouchableOpacity 
                        style={{marginLeft:20, paddingHorizontal:6, paddingVertical:3, borderRadius:5, alignItems:'center', justifyContent:'center', backgroundColor:'#504887', elevation:3}}
                        onPress={()=>{
                            this.props.navigation.navigate('DrawerToggle')
                            //console.log(this.props.navigation);
                        }}
                    >
                        <Ionicons name='md-menu' size={32}  color='#fff'/>
                    </TouchableOpacity>
                </View>
       <View style={estilos.listaContatosWrap}>

        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around', padding:5}}>
            <TouchableOpacity 
                onPress={()=>{
                    this.setState({
                        filterActive:'Todos'
                    })
                }}
                style={this.selectFilterStyle('Todos')}>
                <Text style={{color:'#edf2f2'}}>Todos</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                onPress={()=>{
                    this.setState({
                        filterActive:'Pessoas'
                    })
                }}
                style={this.selectFilterStyle('Pessoas')}>
                <Text style={{color:'#edf2f2'}}>Pessoas</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                onPress={()=>{
                    this.setState({
                        filterActive:'Empresas'
                    })
                }}
                style={this.selectFilterStyle('Empresas')}>
                <Text style={{color:'#edf2f2'}}>Empresas</Text>
            </TouchableOpacity>
        </View>

                 <FlatList
                    data={Object.keys(data)}
                    renderItem={({item})=>{
                        
                        return(
                            <View>
                            {this.findletter(data, parseInt(item))}
                            <View style={estilos.listaContatos}>
                                <TouchableOpacity
                                onPress={()=>{
                                    this.setState({
                                        editModalActive: !this.state.editModalActive,
                                        activeUser: data[item]
                                    })
                                }}
                                >
                                    <View>
                                        <Text style={{fontSize:17, fontWeight:'bold', color:'#504887'}}>{data[item].Name}</Text>
                                        <Text style={{color:'#504887',fontSize:15, fontWeight:'100'}}>{data[item].Email}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{justifyContent:'space-between',  alignItems:'flex-end', flex:1}}>
                            </View>
                            </View>
                            </View>
                        )
                    }}
                /> 
             </View>
             <TouchableOpacity 
             onPress={()=>{
                 this.props.navigation.navigate('Cadastros')
             }}
             style={{position:'absolute', bottom:0, right:0, margin:20, backgroundColor:'#27c24c', borderRadius:50, padding:15, elevation:10}}
            >
                <Ionicons name='md-person-add' size={40} color='#fff'/>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.editModalActive}
                onRequestClose={() => this.setState({
                editModalActive:!this.state.editModalActive
            })}>>
                <View style={{width:width(100), height:height(100), position:'absolute', top:0, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'center', alignItems:'center'}}>
                    <View style={{width:width(75), height:height(75), backgroundColor:'#fff', borderRadius:10, padding:15 }}>
                        <TouchableOpacity
                            onPress={()=>{
                                this.setState({
                                    editModalActive: !this.state.editModalActive
                                })
                            }} 
                            style={{alignSelf:'flex-end'}}>
                            <Text style={{ fontSize:25, margin:10}}>X</Text>
                        </TouchableOpacity>
                        
                        <Text style={{ fontSize:10, marginTop:10}}>Nome</Text>
                        <Text style={{ fontSize:15, }}>{this.state.activeUser.Name}</Text>
                        <Text style={{ fontSize:10, marginTop:10}}>Tipo</Text>
                        <Text style={{ fontSize:15, }}>{this.translateTypeId(this.state.activeUser.TypeId)}</Text>
                        <Text style={{ fontSize:10, marginTop:10}}>Email</Text>
                        <Text style={{ fontSize:15, }}>{this.state.activeUser.Email}</Text>
                        
                        <View style={{flex:1, justifyContent:'center'}}>
                            <TouchableOpacity 
                                style={{
                                    backgroundColor: '#27c24c',
                                    width: width(50),
                                    borderRadius: 5,
                                    marginTop:5,
                                    marginVertical: 5,
                                    alignItems: 'center',
                                    alignSelf: 'center',}}
                                onPress={()=>{
                                    this.props.editUser(this.state.activeUser)
                                    this.props.resetForm(true)
                                    this.props.navigation.navigate('Cadastros')
                                }}
                                >
                                    
                                    

                                <Text style={estilos.textoBotao}>Editar Cliente</Text>
                            
                            </TouchableOpacity>
                    
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#bf0000',
                                    width: width(50),
                                    borderRadius: 5,
                                    marginVertical: 5,
                                    alignItems: 'center',
                                    alignSelf: 'center',}}
                                onPress={()=>{
                                      
                                    this.setState({
                                        editModalActive:!this.state.editModalActive, 
                                        deleteUserId: this.state.activeUser.Id
                                    })    

                                    Alert.alert(
                                        'Atenção',
                                        'Esta ação não pode ser desfeita! \n Gostaria de excluir o contato?',
                                        [
                                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                          {text: 'OK', onPress: () => {
                                              //console.log('OK Pressed')
                                              //console.log(this.state.deleteUserId);
                                              deleteUser(this.state.deleteUserId, this.props.userKey)
                                              this.updateData()
                                              
                                            }},
                                        ],
                                        { cancelable: true }
                                      ) 
                                    }}
                                >
                                <Text style={estilos.textoBotao}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                   
                    </View>
                </View>
            </Modal>
            <Modal
                style={estilos.dropdown}
                animationType="fade"
                transparent={true}
                visible={this.state.deleteWarningVisible}
                onRequestClose={() => this.setState({
                    deleteWarningVisible:!this.state.deleteWarningVisible
                })}>        
                <View style={estilos.modalWrap}>
                    <View style={ { 
                        backgroundColor: '#fff',
                        height: height(50),
                        width: width(75),
                        padding: 10,
                        borderRadius:10, 
                        elevation:5,
                        justifyContent:'space-around', 
                                    
                                    }}>    
                        
                        <Text style={{fontSize:17, fontWeight:'bold'}}>Deletar Usuário</Text>
                        
                        <Text style={{padding:10, fontSize:15}}>{'Tem certeza que deseja deletar este usuário?\nEsta ação não pode ser desfeita.'}</Text>
                        
                        <View style={{flexDirection:'row', flex:1, alignItems:'center', alignSelf:'center'}}>
                            <TouchableOpacity 
                                style={{ 
                                    backgroundColor: '#dbb413',
                                    width: width(30),
                                    borderRadius: 5,
                                    marginVertical: 5,
                                    alignItems: 'center',
                                    alignSelf: 'center',}}
                                onPress={() => this.setState({
                                    deleteWarningVisible:!this.state.deleteWarningVisible
                                })}
                            >
                                <Text style={estilos.textoBotao}>Cancelar</Text>
                            </TouchableOpacity>
                        
                            <TouchableOpacity
                                style={{ 
                                    backgroundColor: '#db4f13',
                                    width: width(30),
                                    borderRadius: 5,
                                    marginVertical: 5,
                                    alignItems: 'center',
                                    alignSelf: 'center',}}
                                onPress={()=>{
                                    //console.log(this.state.deleteUserId);
                                    deleteUser(this.state.deleteUserId, this.props.userKey)
                                    
                                    this.updateData()
                                    
                                    
                                }}
                                >
                                <Text style={estilos.textoBotao}>Deletar</Text>
                            </TouchableOpacity>
                        
                        </View>
                
                    </View>
                </View>
            </Modal>                
        </View>
            
        )
    }

    translateTypeId(id){
        if(id === 1){
            return 'Empresa'
        }else{
            return 'Pessoa'
        }
    }
    
    async updateData(){
        var dados = await useAPI(this.props.userKey, 'Contacts', 'GET');
        this.props.mudaDadosContatos(dados);
    }
    async getData(){
        
        let APIs = [
            {api:'Contacts?&$expand=Phones,Company,Role,Department,LineOfBusiness,Origin', redux: this.props.mudaDadosContatos},
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

    findletter(data, item){
        if(item === 0 || data[item].Name[0] != data[item - 1].Name[0]){
            return<Text style={{fontWeight:'bold', fontSize:17, margin:10, color:'#3a3f50'}}>{data[item].Name[0].toUpperCase()}</Text>
        }

    }

    filterData(){
        
        let temp = []
        if(this.state.filterActive === 'Pessoas'){
            //console.log('escolhemos pessoas');
            
            this.props.contatos.map((item)=>{
                if(item.TypeId === 2){
                    ////console.log(item.TypeId);
                    temp.push(item)
                    //console.log(temp);
                    
                }
            })
            return temp
        }
        if(this.state.filterActive === 'Empresas'){
            //console.log('escolhemos empresas');
            
            this.props.contatos.map((item)=>{
                if(item.TypeId === 1){
                    ////console.log(item.TypeId);
                    temp.push(item)
                    //console.log(temp);
                    
                }
            })
            return temp
        }

        return this.props.contatos
    }
    
    selectFilterStyle(filter){
        if(this.state.filterActive === filter){
            return estilos.filterActive
        }else{
            return estilos.radioInactive
        }
    }

    sortData(data){
        data.sort(function(a, b) {
            var nameA = a.Name.toUpperCase();
            var nameB = b.Name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
            });
            return data
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