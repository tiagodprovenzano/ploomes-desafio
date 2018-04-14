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
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { useAPI, mapData, formatPhone, objPhone } from '../components/library';
import { Ionicons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import { height, width } from 'react-native-dimension';
import  ModalLocked  from '../components/ModalContent'

import estilos from '../components/estilos';
import { mudaDadosContatos, mudaModalStates, mudaModalEmpresas, mudaModalDepatamentos, mudaModalCargos, mudaActivePhoneModal } from '../actions/AppActions';



export class CadastroClientes extends Component {
  state = {
    collapsed: true,
    iconName: 'md-arrow-dropdown-circle',
    quantTelefones: [1],
    Name: '',
    Email: '',
    obj: {},
    TypeId: 2,
    NomesEmpresas:[], 
    menuTipoTelefone:false
  };




  async postData() {
    var obj = { Name: this.state.Name, Email: this.state.Email };

    await useAPI(this.props.userKey, 'Contacts', 'POST', obj);

    var dados = await useAPI(this.props.userKey, 'Contacts', 'GET');
    this.props.mudaDadosContatos(dados);

    this.setState({
      Name: '',
      Email: '',
    });
  }

  telefones(ultimo, index) {
    return (
      <View style={estilos.inputContainer}>
        <Ionicons name="ios-call" size={25} color="#2d1650" />

        <TextInput
          style={estilos.inputRowTel}
          keyboardType="phone-pad"
          placeholderTextColor="#786fb0"
          underlineColorAndroid="#fff"
          placeholder="Telefones"
          value={this.state[index]}
          onChangeText={text => {
            if(text.length < 16){
              try {
                this.setState({ [index]: formatPhone(text) });
                this.props.telefones[index].phone = formatPhone(text);
              } catch (error) {
                this.setState({ [index]: formatPhone(text) });
                this.props.telefones[index] = {
                  phone: formatPhone(text),
                  type: 'Outros',
                };
              }

            }
            else{
              null
            }

          }}
        />
        
        <ModalLocked 
          data={this.props.phoneTypes} 
          titulo='Tipos' visible={this.props.modalStates} 
          manager={this.props.mudaModalStates}
          index={index}
          activePhoneModal={this.props.activePhoneModal}
          activePhoneModalManager={this.props.mudaActivePhoneModal}
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
            temp[temp.length] = temp.length + 1;

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

  render() {
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
                this.state.obj['Name'] = text;
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
                this.state.obj['Email'] = text;
              }}
            />
          </View>

          <View style={estilos.inputContainer}>
            <Ionicons name="ios-briefcase" size={25} color="#2d1650" />
            
            <ModalLocked editavel={true} data={this.props.empresas} titulo='Empresa' visible={this.props.modalEmpresas} manager={this.props.mudaModalEmpresas}/>
            <ModalLocked editavel={true} data={this.props.listRoles} titulo='Cargos' visible={this.props.modalCargos} manager={this.props.mudaModalCargos}/>
            
          </View>
          {this.state.quantTelefones.map(item => {
            let ultimo = item === this.state.quantTelefones.length;
            return this.telefones(ultimo, item - 1);
          })}

          <View style={estilos.inputContainer}>
            <Ionicons name="ios-clipboard" size={25} color="#2d1650" />
            
            <ModalLocked editavel={true} data={this.props.departamentos} titulo='Departamentos' visible={this.props.modalDepartamentos} manager={this.props.mudaModalDepatamentos}/>


          </View>

          <Collapsible collapsed={this.state.collapsed}>

            <View style={estilos.inputContainer}>
              <Ionicons name="md-card" size={25} color="#2d1650" />
              <TextInput
                style={estilos.inputRow}
                placeholderTextColor="#786fb0"
                underlineColorAndroid="#fff"
                placeholder="CPF"
                onChangeText={text => {
                  text = text.replace(
                    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
                    '\$1.\$2.\$3\/\$4\-\$5'
                  );
                }}
              />
            </View>
            <View style={estilos.inputContainer}>
              <Ionicons name="ios-people" size={25} color="#2d1650" />
              <TextInput
                style={estilos.inputRow}
                placeholderTextColor="#786fb0"
                underlineColorAndroid="#fff"
                placeholder="Responsavel"
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
            
            this.state.obj['Phones'] = objPhone(this.props.phoneTypes, this.props.telefones);
            this.state.obj['TypeId'] = this.state.TypeId
          }}
          style={estilos.botao}>
          <Text style={estilos.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  let userKey = state.AppReducer.userKey;
  let phoneTypes = state.AppReducer.phoneTypes;
  let listRoles = state.AppReducer.listRoles;
  let telefones = state.AppReducer.telefones;
  let empresas = state.AppReducer.empresas
  let departamentos = state.AppReducer.departamentos
  let modalStates = state.AppReducer.modalStates
  let modalEmpresas = state.AppReducer.modalEmpresas
  let modalCargos = state.AppReducer.modalCargos
  let modalDepartamentos = state.AppReducer.modalDepartamentos
  let activePhoneModal = state.AppReducer.activePhoneModal

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
    activePhoneModal
  };
};

export default connect(mapStateToProps, {
  mudaDadosContatos,
  mudaModalStates,
  mudaModalEmpresas, 
  mudaModalCargos, 
  mudaModalDepatamentos,
  mudaActivePhoneModal
  
})(CadastroClientes);