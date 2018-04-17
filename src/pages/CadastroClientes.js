import React, { Component } from 'react';
import {
  
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  StatusBar, 
  FlatList,

} from 'react-native';

import { connect } from 'react-redux';
import { 
  
  useAPI, 
  mapData, 
  formatPhone, 
  objPhone,
  findItemName, 
  getTelefones, 
  patchUser

} from '../components/library';

import { Ionicons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import { height, width } from 'react-native-dimension';
import ModalLocked from '../components/ModalContent';
import { TextInputMask } from 'react-native-masked-text';

import estilos from '../components/estilos';
import {
  mudaDadosContatos,
  mudaModalStates,
  mudaModalEmpresas,
  mudaModalDepatamentos,
  mudaModalCargos,
  mudaActivePhoneModal,
  mudaDepatamentos,
  mudaEmpresas,
  mudaListRoles,
  mudaTeamMembers,
  mudaModalTeamMembers,
  resetForm,
  editUser, 
  resetObj
} from '../actions/AppActions';

export class CadastroClientes extends Component {
  state = {
    collapsed: true,
    iconName: 'md-arrow-dropdown-circle',
    quantTelefones: [0],
    Name: '',
    Email: '',
    obj: {},
    TypeId: 2,
    NomesEmpresas: [],
    menuTipoTelefone: false,
    nascimento: '',
    cpf: '',
    obs: '',
    telefones: [],
    addedConfirmation:false, 
    id:''
  };

  render() {
   // //console.log('this.props.editThisUser',this.props.editThisUser);

    if(this.props.shouldFormReset){

    
      

      this.props.resetForm(false)
      let cliente = this.props.editThisUser
      let Birthday=''
      try {
        Birthday = cliente.Birthday.split('T')[0].split('-')
        Birthday = Birthday[2] + Birthday[1] + Birthday[0]
      } catch (error) {}
      
      let dataTypesId = getTelefones(cliente.Phones, 'TypeId')
      let dataTypeNames = []
    
      
      
      for(i in dataTypesId){
        dataTypeNames.push(findItemName(this.props.phoneTypes, dataTypesId[i], null))
      }      

      //console.log('this.props.departamentos',this.props.departamentos);
      //console.log('cliente',cliente);
      

      this.setState({
      
        collapsed: true,
        Name: cliente.Name,
        Email: cliente.Email,
        TypeId: cliente.TypeId,
        nascimento: Birthday,
        cpf: cliente.Register,
        obs: cliente.Note,
        empresa: cliente.Company,
        cargo: cliente.Role,
        departamento: cliente.Department,
        responsavel: findItemName(this.props.teamMembers, cliente, 'OwnerId'),
        telefones: getTelefones(cliente.Phones, 'PhoneNumber'), 
        tiposTelefones: dataTypeNames,
        id: cliente.Id,
        
      })

      try {
        
      } catch (error) {
        
      }
    
      return null
    }else{
      
    }
    mapData(this.props.phoneTypes);
    return (
      
      <ScrollView>
        <View style={estilos.container}>
          
          <View style={estilos.inputContainer}>
          
            <Ionicons name="md-person" size={25} color="#2d1650" />
            
            <TextInput
              style={estilos.inputRow}
              placeholderTextColor="#786fb0"
              underlineColorAndroid="#fff"
              placeholder="Nome"
              value={this.state.Name}
              onChangeText={text => {
                this.setState({ Name: text });
                this.props.obj['Name'] = text;
              }}
            />
        
          </View>

          <View style={estilos.inputContainer}>
            <Ionicons name="ios-mail" size={25} color="#2d1650" />
            <TextInput
              style={estilos.inputRow}
              placeholderTextColor="#786fb0"
              underlineColorAndroid="#fff"
              placeholder="E-mail"
              value={this.state.Email}
              onChangeText={text => {
                this.setState({ Email: text });
                this.props.obj['Email'] = text;
              }}
            />
          </View>

          <View style={estilos.inputContainer}>
            <Ionicons name="ios-briefcase" size={25} color="#2d1650" />
            
            <ModalLocked
              editavel={true}
              value={this.state.empresa}
              data={this.props.empresas}
              titulo="Empresa"
              visible={this.props.modalEmpresas}
              manager={this.props.mudaModalEmpresas}
              redux={this.props.mudaEmpresas}
              api={'Contacts?$filter=TypeId+eq+1'}
              postTitle={'CompanyId'}
            />

            <ModalLocked
              editavel={true}
              value={this.state.cargo}
              data={this.props.listRoles}
              titulo="Cargo"
              visible={this.props.modalCargos}
              manager={this.props.mudaModalCargos}
              redux={this.props.mudaListRoles}
              api={'Roles'}
              postTitle={'RoleId'}
            />
            
            <ModalLocked
              editavel={true}
              value={this.state.departamento}
              data={this.props.departamentos}
              titulo="Departamento"
              visible={this.props.modalDepartamentos}
              manager={this.props.mudaModalDepatamentos}
              redux={this.props.mudaDepatamentos}
              api={'Departments'}
              postTitle={'DepartmentId'}
            />
            
          </View>
          {
          this.findPhoneIndex()    
          }

          <View style={estilos.inputContainer}>
            <Ionicons name="ios-clipboard" size={25} color="#2d1650" />
            
            <TextInputMask
              style={estilos.inputRow}
              placeholderTextColor="#786fb0"
              underlineColorAndroid="#fff"
              value={this.state.nascimento}
              placeholder="Data de Nasc (DD/MM/AAAA)"
              onChangeText={text => {
                this.setState({
                  nascimento: text,
                });
                text = text.split('/');

                if (text.length === 3) {
                  if (text[2].length === 4) {
                    let date = text[2] +'-'+ text[1] +'-'+text[0] +'T00:00:00-03:00';
                    this.props.obj['Birthday'] = date;
                  }
                }
              }}
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY HH:mm:ss',
              }}
            />

          </View>

          <Collapsible collapsed={this.state.collapsed}>

            <View style={estilos.inputContainer}>
              <Ionicons name="md-card" size={25} color="#2d1650" />
              <TextInputMask
                style={estilos.inputRow}
                placeholderTextColor="#786fb0"
                underlineColorAndroid="#fff"
                value={this.state.cpf}
                placeholder="CPF"
                type={'cpf'}
                onChangeText={text => {
                  this.setState({
                    cpf: text,
                  });
                  text = text.replace(/\D/g, '');
                  this.props.obj['Register'] = text;
                }}
              />
            </View>
            <View style={estilos.inputContainer}>
              <Ionicons name="ios-people" size={25} color="#2d1650" />

              <ModalLocked
                editavel={false}
                value={this.state.responsavel}
                data={this.props.teamMembers}
                titulo="Responsavel"
                visible={this.props.modalTeamMembers}
                manager={this.props.mudaModalTeamMembers}
                redux={this.props.mudaTeamMembers}
                api={'Users/GetContactOwners'}
                postTitle={'OwnerId'}
              />

            </View>
            <View style={estilos.inputContainerFreeSize}>
              <TextInput
                multiline={true}
                numberOfLines={5}
                style={estilos.input}
                placeholderTextColor="#786fb0"
                underlineColorAndroid="#fff"
                placeholder="Observação"
                value={this.state.obs}
                onChangeText={text => {
                  this.setState({
                    obs: text,
                  });
                  this.props.obj['Note'] = text;
                }}
              />
            </View>

          </Collapsible>
          <TouchableOpacity
            style={{ alignSelf: 'center', marginTop: 10 }}
            onPress={() => {
              if (this.state.collapsed === true) {
                this.setState({
                  collapsed: !this.state.collapsed,
                  iconName: 'md-arrow-dropup-circle',
                });
              } else {
                this.setState({
                  collapsed: !this.state.collapsed,
                  iconName: 'md-arrow-dropdown-circle',
                });
              }
            }}>
            <Ionicons name={this.state.iconName} size={25} color="#2d1650" />
          </TouchableOpacity>

        </View>

        <TouchableOpacity
          onPress={() => {
            let cliente = this.props.editThisUser

            //console.log(this.props.obj)
            
            this._sendData()
            
            this.props.resetForm(true);
            this.setState({
            
              collapsed: true,
              iconName: 'md-arrow-dropdown-circle',
              quantTelefones: [1],
              Name: '',
              Email: '',
              obj: {},
              TypeId: 2,
              NomesEmpresas: [],
              menuTipoTelefone: false,
              nascimento: '',
              cpf: '',
              obs: '',
              addedConfirmation:!this.state.addedConfirmation, 
              telefones:[]
            
            });
            
          }}
          style={estilos.botao}>
          <Text style={estilos.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>
        
        
        <Modal
          style={estilos.dropdown}
          animationType="fade"
          transparent={true}
          visible={this.state.addedConfirmation}
          onRequestClose={() => this.props.manager(this.props.visible)}>
        <View style={estilos.modalWrap}>
        <View style={estilos.modalContent}>
        <Text>Cliente cadastrado com sucesso</Text>
          <TouchableOpacity style={estilos.botao} onPress={()=>{
            //console.log(this.state)
            this.props.resetObj()
            this.setState({
              addedConfirmation: false,
            })
            this.props.editUser({})
            this.props.resetForm(false)
          
          }}>
            <Text style={estilos.textoBotao}>OK</Text>
          </TouchableOpacity>
        </View>
        </View>
        </Modal>  
      </ScrollView>
    );
  }

  _sendData(){
    if(this.props.obj != {}){
    
      if(this.state.id === ''){
        //então é um novo usuário
        this.props.obj['TypeId'] = this.state.TypeId;
           this.postData(this.props.obj, 'new')
        
      }else{
        // então é a atualização de um usuário 

        this.props.obj['Id'] = this.state.id
        this.postData(this.props.obj, 'patch')
                

      }
    }
  }

  async postData(obj, type) {

    if (type === 'new'){
      await useAPI(this.props.userKey, 'Contacts', 'POST', this.props.obj);
    }
    if(type === 'patch'){
      await patchUser(this.state.id, this.props.obj, this.props.userKey)
    }

    var dados = await useAPI(this.props.userKey, 'Contacts', 'GET');
    this.props.mudaDadosContatos(dados);

  }

  telefones(ultimo, index) {
   
    return (
      
      <View style={estilos.inputContainer}>
        <Ionicons name="ios-call" size={25} color="#2d1650" />

        <TextInputMask
          style={estilos.inputRowTel}
          type='cel-phone'
          keyboardType="phone-pad"
          placeholderTextColor="#786fb0"
          underlineColorAndroid="#fff"
          placeholder="Telefones"
          value={this.state.telefones[index]}
          onChangeText={text => {
            
            if (text.length < 16) {
            
              let tel = this.state.telefones
              tel[index] = text
  
              this.setState({
                  telefones : tel
              })

              try {
                this.props.obj['Phones'][index]['PhoneNumber'] = formatPhone( text );
              } 
              
              catch (error) {
                
                try {
                  this.props.obj['Phones'][index] = { ['PhoneNumber']: formatPhone(text), };
                } 
                
                catch (error) {
                  try { 
                    this.props.obj['Phones'] = [];
                    this.props.obj['Phones'][index] = { ['PhoneNumber']: formatPhone(text), };
                  } 
                  
                  catch (error) {}
                }
              }

              /* if (!this.state.telefones.includes(index)) {
                this.state.telefones.push(index);
              } */
            } 
            
            else {
              null;
            }
          }}
        />
        
        <ModalLocked 
          data={this.props.phoneTypes} 
          value={this.state.tiposTelefones}
          titulo="Tipos"
          visible={this.props.modalStates}
          manager={this.props.mudaModalStates}
          index= {index}
          activePhoneModal={this.props.activePhoneModal}
          activePhoneModalManager={this.props.mudaActivePhoneModal}
          postTitle={'TypeId'}
        />

        {this.renderUltimo(ultimo)}

      </View>
    );
  }

  renderUltimo(ultimo) {
    if (ultimo) {
      return (
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          onPress={() => {
            let temp = this.state.quantTelefones;
            temp[temp.length] = temp.length;

            this.setState({
              quantTelefones: temp,
            });
          }}>
          <Ionicons name="md-add" size={25} color="#2d1650" />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  findPhoneIndex(){
    if(this.state.telefones.length === 0 && this.state.quantTelefones.length === 1 ){

        return this.telefones(true,0)

    }else{
    
    return this.state.quantTelefones.map(item=>{
        let ultimo = item === (this.state.quantTelefones.length - 1)
        return this.telefones(ultimo, item)
    })
    
    }
}
}

const mapStateToProps = state => {
  let userKey = state.AppReducer.userKey;
  let phoneTypes = state.AppReducer.phoneTypes;
  let listRoles = state.AppReducer.listRoles;
  let telefones = state.AppReducer.telefones;
  let empresas = state.AppReducer.empresas;
  let departamentos = state.AppReducer.departamentos;
  let modalStates = state.AppReducer.modalStates;
  let modalEmpresas = state.AppReducer.modalEmpresas;
  let modalCargos = state.AppReducer.modalCargos;
  let modalDepartamentos = state.AppReducer.modalDepartamentos;
  let activePhoneModal = state.AppReducer.activePhoneModal;
  let obj = state.AppReducer.obj;
  let teamMembers = state.AppReducer.teamMembers;
  let modalTeamMembers = state.AppReducer.modalTeamMembers;
  let shouldFormReset = state.AppReducer.shouldFormReset;
  let editThisUser = state.AppReducer.editThisUser;

  return {
    userKey,
    phoneTypes,
    listRoles,
    telefones,
    empresas,
    departamentos,
    modalStates,
    modalEmpresas,
    modalDepartamentos, 
    modalCargos,
    activePhoneModal,
    obj,
    teamMembers,
    modalTeamMembers,
    shouldFormReset, 
    editThisUser
  };
};

export default connect(mapStateToProps, {
  mudaDadosContatos,
  mudaModalStates,
  mudaModalEmpresas, 
  mudaModalDepatamentos,
  mudaModalCargos, 
  mudaActivePhoneModal,
  mudaDepatamentos,
  mudaEmpresas,
  mudaListRoles,
  mudaTeamMembers,
  mudaModalTeamMembers,
  resetForm,
  editUser, 
  resetObj

})(CadastroClientes);
  
  
