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
  KeyboardAvoidingView

} from 'react-native';

import { connect } from 'react-redux';
import { 
  
  useAPI, 
  mapData, 
  formatPhone, 
  objPhone,
  findItemName, 
  getTelefones, 
  zipCodeApi, 
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
  resetObj, 
  mudaLineOfBusiness, 
  mudaOrigin

} from '../actions/AppActions';

export class CadastroClientes extends Component {
  state = {
    collapsed: true,
    iconName: 'md-arrow-dropdown-circle',
    quantTelefones: [0],
    Name: '',
    Email: '',
    obj: {},
    TypeId: 1,
    NomesEmpresas: [],
    origin: '',
    cep: '',
    cnpj: '',
    obs: '',
    telefones: [''],
    addedConfirmation:false,
    rua:'',
    complemento:'',
    bairro:'',
    cidade:'',
    estado:'',
    LegalName:'',
    segmento:'', 
    id:''

  };

  async postData(obj, type) {
    
    console.log('obj ---- ', obj, 'type ------ ', type);
    
    if (type === 'new'){
      await useAPI(this.props.userKey, 'Contacts', 'POST', this.props.obj);
    }
    if(type === 'patch'){
      await patchUser(this.state.id, this.props.obj, this.props.userKey)
    }

    var dados = await useAPI(this.props.userKey, 'Contacts', 'GET');
    this.props.mudaDadosContatos(dados);

  }

  render() {
   // console.log('this.props.editThisUser',this.props.editThisUser);
    
    

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
    
    //  console.log( 'cliente.Phones - ', cliente.Phones );
    //  console.log( 'dataTypesId - ', dataTypesId );
      
      for(i in dataTypesId){
        dataTypeNames.push(findItemName(this.props.phoneTypes, dataTypesId[i], null))
      }      

      if(cliente.CityId != undefined && cliente.CityId != null ){
        this._getCidade(cliente.CityId, null)
      }
      

      this.setState({
      
        collapsed: true,
        Name: cliente.Name,
        id:cliente.Id,
        LegalName: cliente.LegalName,
        Email: cliente.Email,
        TypeId: cliente.TypeId,
        cep: cliente.ZipCode,
        cnpj: cliente.Register,
        obs: cliente.Note,
        segmento: cliente.LineOfBusiness,
        origin: cliente.Origin,
        departamento: findItemName(this.props.departamentos, cliente, 'DepartmentId'),
        responsavel: findItemName(this.props.teamMembers, cliente, 'OwnerId'),
        telefones: getTelefones(cliente.Phones, 'PhoneNumber'), 
        tiposTelefones: dataTypeNames,
        rua: cliente.StreetAddress, 
        complemento: cliente.StreetAddressLine2, 
        bairro: cliente.Neighborhood, 
        

      })
    
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
          
            <Ionicons name="md-person" size={25} color="#2d1650" />
            
            <TextInput
              style={estilos.inputRow}
              placeholderTextColor="#786fb0"
              underlineColorAndroid="#fff"
              placeholder="Razão Social"
              value={this.state.LegalName}
              onChangeText={text => {
                this.setState({ LegalName: text });
                this.props.obj['LegalName'] = text;
              }}
              />
        
          </View>
          
          <View style={estilos.inputContainer}>
              <Ionicons name="md-card" size={25} color="#2d1650" />
              <TextInputMask
                style={estilos.inputRow}
                placeholderTextColor="#786fb0"
                underlineColorAndroid="#fff"
                value={this.state.cnpj}
                placeholder="CNPJ"
                type={'cnpj'}
                onChangeText={text => {
                  this.setState({
                    cnpj: text,
                  });
                  text = text.replace(/\D/g, '');
                  this.props.obj['Register'] = text;
                }}
                />
            </View>

        <View style={estilos.inputContainer}>
            <Ionicons name="ios-briefcase" size={25} color="#2d1650" />
            
            <ModalLocked
              value={this.state.segmento}
              editavel={true}
              data={this.props.lineOfBusiness}
              titulo="Segmento"
              visible={this.props.modalEmpresas}
              manager={this.props.mudaModalEmpresas}
              redux={this.props.mudaLineOfBusiness}
              api={'Contacts@LinesOfBusiness'}
              postTitle={'LineOfBusinessId'}
              />

            <ModalLocked
              editavel={true}
              value={this.state.origin}
              data={this.props.origin}
              titulo="Origem"
              visible={this.props.modalCargos}
              manager={this.props.mudaModalCargos}
              redux={this.props.mudaOrigin}
              api={'Contacts@Origins'}
              postTitle={'OriginId'}
              />
            
          {/*   <ModalLocked
              editavel={true}
              value={this.state.departamento}
              data={this.props.departamentos}
              titulo="Departamentos"
              visible={this.props.modalDepartamentos}
              manager={this.props.mudaModalDepatamentos}
              redux={this.props.mudaDepatamentos}
              api={'Departments'}
              postTitle={'DepartmentId'}
            /> */}
            
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

          
          {
          this.findPhoneIndex()    
        }


          <Collapsible collapsed={this.state.collapsed}>

            <View style={estilos.inputContainer}>
                <Ionicons name="md-search" size={25} color="#2d1650" />
                
                <TextInputMask
                    type={'zip-code'}
                    style={estilos.inputRow}
                    placeholderTextColor="#786fb0"
                    underlineColorAndroid="#fff"
                    value={this.state.cep}
                    placeholder="CEP"
                    onChangeText={text => {
                      
                      this.setState({
                        cep: text
                      });
                      text = text.replace(/\D/g, '');
                      this.props.obj['ZipCode'] = text;
                      
                    }}
                    />

            <TouchableOpacity 
                style={{padding:5, backgroundColor:'#27c24c', borderRadius:5}}    
                onPress={()=>{
                  try {
                    let cep = this.state.cep
                    cep = cep.replace(/\D/g, '')
                    this.getAddress(cep)
                  } catch (error) {
                    try {
                      let cep = this.props.obj['ZipCode']
                      cep = cep.replace(/\D/g, '')
                      this.getAddress(cep)
                    } catch (error) {
                      
                    }
                    
                  }
                }}>
                    <Text style={{color:'#fff'}}>Buscar CEP</Text>
                </TouchableOpacity>

            </View>
            
            <View style={estilos.inputContainer}>
              <TextInput
                style={estilos.inputRow}
                placeholderTextColor="#786fb0"
                underlineColorAndroid="#fff"
                placeholder="Rua"
                value={this.state.rua}
                onChangeText={text => {
                  this.setState({ rua: text });
                  this.props.obj['StreetAddress'] = text; 
                }}
                />
            </View>

            <View style={estilos.inputContainer}>
              <TextInput
                style={estilos.inputRow}
                placeholderTextColor="#786fb0"
                underlineColorAndroid="#fff"
                placeholder="Complemento"
                value={this.state.complemento}
                onChangeText={text => {
                  this.setState({ complemento: text });
                  this.props.obj['StreetAddressLine2'] = text; 
                }}
                />
              <TextInput
                style={estilos.inputRow}
                placeholderTextColor="#786fb0"
                underlineColorAndroid="#fff"
                placeholder="Bairro"
                value={this.state.bairro}
                onChangeText={text => {
                  this.setState({ bairro: text });
                  this.props.obj['Neighborhood'] = text; 
                }}
                />
            </View>

            <View style={estilos.inputContainer}>
              <TextInput
                style={estilos.inputRow}
                placeholderTextColor="#786fb0"
                underlineColorAndroid="#fff"
                placeholder="Cidade"
                value={this.state.cidade}
                onChangeText={text => {
                  this.setState({ cidade: text });
                }}
                />
              <TextInput
                style={estilos.inputRow}
                placeholderTextColor="#786fb0"
                underlineColorAndroid="#fff"
                placeholder="UF"
                value={this.state.estado}
                onChangeText={text => {
                  this.setState({ estado: text });
                }}
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
            if(this.state.cidade != '' && this.props.obj['CityId'] === undefined){
              let dados = this._getCidade(null, this.state.cidade)
              
              this.props.obj['CityId'] = dados[0].Id
            }
            
            console.log(this.props.obj)
            this._sendData()
            this.props.resetForm(true);
            this.setState({
              
              collapsed: true,
              iconName: 'md-arrow-dropdown-circle',
              quantTelefones: [0],
              Name: '',
              Email: '',
              obj: {},
              TypeId: 1,
              NomesEmpresas: [],
              origin: '',
              cep: '',
              cnpj: '',
              obs: '',
              telefones: [''],
              addedConfirmation:false,
              rua:'',
              complemento:'',
              bairro:'',
              cidade:'',
              estado:'',
              LegalName:'',
              segmento:'', 
              id:''
              
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
            //  console.log(this.state)
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
    console.log('enviando dados ------ ' , this.props.obj )
    if(this.props.obj != {}){
      console.log('obj != {} ok' )
      console.log('this.state.id -------- ', this.state.id )
      
      if(this.state.id === ''){
        //então é um novo usuário
        this.props.obj['TypeId'] = this.state.TypeId;
        this.postData(this.props.obj, 'new')
        
      }else{
        // então é a atualização de um usuário 
        console.log('entrando aqui?')
        this.props.obj['Id'] = this.state.id
        console.log(this.props.obj['Id']);
        
        this.postData(this.props.obj, 'patch')
        
        
      }
    }
  }
  
  
  
  
  /*  async tpostData(obj) {
    await useAPI(this.props.userKey, 'Contacts', 'POST', obj);

    var dados = await useAPI(this.props.userKey, 'Contacts', 'GET');
    this.props.mudaDadosContatos(dados);

    
  } */

    async getAddress(cep){
        let endereco = await zipCodeApi(cep)
     //   console.log(endereco);
        let api = "Cities?$top=20&$expand=Country,State&$filter=Name+eq+'" + endereco.localidade + "'" 
        
        let infoEnderecoApi = await useAPI(this.props.userKey, api, 'GET', null)
        console.log(infoEnderecoApi);
        
        
        this.setState({
          rua:endereco.logradouro,
          bairro:endereco.bairro,
          cidade:infoEnderecoApi[0].Name,
          estado:infoEnderecoApi[0].State.Name,
        })
        
        
        this.props.obj['StreetAddress'] = endereco.logradouro
        this.props.obj['Neighborhood'] = endereco.bairro
        this.props.obj['CityId'] = infoEnderecoApi[0].Id
        this.props.obj['CityId'] = infoEnderecoApi[0].Id
        
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
            console.log(this.state)  
            let temp = this.state.quantTelefones;
            temp[temp.length] = temp.length;
            
            
            this.setState({
                quantTelefones: temp,
            });
            console.log(this.state)  
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

  async _getCidade(id, name){
    
    if(id != null){
      console.log('entrou aqui');
      
      var api = "Cities?$top=20&$expand=Country,State&$filter=Id+eq+" + id + "" 
    }
    else if(name != null){
      var api = "Cities?$top=20&$expand=Country,State&$filter=Name+eq+'" + name + "'" 
    }

    console.log('id - ', id);
    
    let infoEnderecoApi = await useAPI(this.props.userKey, api, 'GET', null)
    console.log('infoEnderecoApi', infoEnderecoApi);
   
    if(id!=null){
      console.log('estou aqui de novo');
      this.setState({
        cidade: infoEnderecoApi[0].Name, 
        estado: infoEnderecoApi[0].State.Name
      })
    }else{
      
      this.props.obj['CityId'] = infoEnderecoApi[0].Id
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
  let lineOfBusiness = state.AppReducer.lineOfBusiness;
  let origin = state.AppReducer.origin;

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
    editThisUser, 
    lineOfBusiness,
    origin 
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
  resetObj, 
  mudaLineOfBusiness,
  mudaOrigin

})(CadastroClientes);
  
  
