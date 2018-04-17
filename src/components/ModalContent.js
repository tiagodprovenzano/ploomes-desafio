import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { width, height } from 'react-native-dimension';
import estilos from './estilos';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import { useAPI } from './library';


export class ModalLocked extends Component {
  state = {
    collapsed: true,
    novo: '',
  };

  componentWillMount() {
    if (this.props.index != undefined) {
      this.setState({
        [this.props.index]: this.props.titulo,
      });
    } else {
      this.setState({
        titulo: this.props.titulo,
      });
    }
  }



  render() {
   
    if (this.props.shouldFormReset) {
      if (this.props.index != undefined) {
        if (this.state[this.props.index] != this.props.titulo) {
          this.setState({
            [this.props.index]: this.props.titulo,
          });
        }
      } else {
        if (this.state.titulo != this.props.titulo) {
          this.setState({
            titulo: this.props.titulo,
          });
        }
      }
    } else {
    }

    if (this.props.activePhoneModal != this.props.index) {

      return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              this.props.activePhoneModalManager(this.props.index);
              this.props.manager(this.props.visible);
            }}>
            <Text
              style={{
                fontFamily: 'lato',
                fontSize: 17,
                paddingHorizontal: 7,
              }}>
              {this._chooseTitle()}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    //console.log('estou aqui');
    
    return (
      <View style={{ flex: 1 }}>
        <Modal
          style={estilos.dropdown}
          animationType="fade"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={() => this.props.manager(this.props.visible)}>

          <View
            style={estilos.modalWrap}>
            <View
              style={ estilos.modalContent }>

              <TouchableOpacity
                onPress={() => this.props.manager(this.props.visible)}>
                <Ionicons
                  name="md-close"
                  size={25}
                  style={{ alignSelf: 'flex-end', marginRight: 10 }}
                />
              </TouchableOpacity>
                  <Collapsible collapsed={!this.state.collapsed}>
                 <FlatList
                      style={{maxHeight:height(30)}}
                      data={this.props.data}
                      renderItem={({ item }) => {
                        return (
                          <TouchableOpacity
                            style={{marginVertical:3}}
                            onPress={() => {
                              if (this.props.index != undefined) {
                                try {
                                  this.props.obj['Phones'][this.props.index][
                                    this.props.postTitle
                                  ] =
                                    item.Id;
                                } catch (error) {
                                  try {
                                    this.props.obj['Phones'][this.props.index] = {
                                      [this.props.postTitle]: item.Id,
                                    };
                                  } catch (error) {
                                    try {
                                      this.props.obj['Phones'] = [];
                                      this.props.obj['Phones'][this.props.index] = {
                                        [this.props.postTitle]: item.Id,
                                      };
                                    } catch (error) {
                                    }
                                  }
                                }

                                this.setState({
                                  [this.props.index]: item.Name,
                                });
                                this.props.manager(this.props.visible);
                              } else {
                                this.props.obj[this.props.postTitle] = item.Id;
                                this.setState({
                                  novo: item.Name,
                                });
                                this.props.value = item.Name
                                this.props.manager(this.props.visible);
                              }
                            }}>
                            <Text style={{ fontSize: 25, fontFamily:'lato' }}>{item.Name}</Text>
                          </TouchableOpacity>
                        );
                      }}
                    />                                                    
                  </Collapsible>
              {this._addTextInput()}
            </View>
          </View>

        </Modal>
        <TouchableOpacity
          style={{borderRightWidth:1, }}
          onPress={() => {
            this.props.manager(this.props.visible);
          }}>
          <Text style={estilos.modalTitle}>{this._chooseTitle()}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  
  _chooseTitle() {
    //console.log(this.props.value,  this.props.value != undefined)
    if(this.state.novo != ''){
      return this.state.novo
    }
    
    if(this.props.value != null){
     
    //console.log('chooseTitle() - if - index - ', this.props.index, 'this.props.value - ', this.props.value)
      return this.props.value.Name
    }else{


      
    //console.log('chooseTitle() - else - index - ', this.props.index)

      if (this.props.index != undefined) {
        
        return this.state[this.props.index];
      } else {
        return this.state.titulo;
      }

    }
    
    
  }

  async _postData() {

    console.log(this.props.userKey, this.props.api, 'POST', this.state.obj)
    await useAPI(this.props.userKey, this.props.api, 'POST', this.state.obj);
    let dados = await useAPI(this.props.userKey, this.props.api, 'GET');
    this.props.redux(dados);
  }

  _addTextInput() {
    //console.log('this.props.titulo - editavel - ', this.props.editavel);
    
    if (this.props.editavel) {
      //console.log('vou retornar isso')
      return (

        <View>
          <Collapsible collapsed={this.state.collapsed}>
            <View>
              <View style={estilos.inputContainer}>
                <TextInput
                  style={estilos.inputRow}
                  placeholderTextColor="#786fb0"
                  underlineColorAndroid="#fff"
                  placeholder={this.props.titulo}
                  value={this.state.novo}
                  onChangeText={text => {
                    this.setState({
                      novo: text,
                    });
                  }}
                />
              </View>
             
            </View>
          </Collapsible>
          
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                collapsed: !this.state.collapsed,
              });
            }}
            style={{
              backgroundColor: this.setButtonBackgroundColor(),
              width: width(35),
              borderRadius: 5,
              marginVertical: 20,
              alignItems: 'center',
              alignSelf: 'center',}}>
            <Text style={estilos.textoBotao}>{this.setButtonTitle()}</Text>
          </TouchableOpacity>
         
         
          <Collapsible collapsed={this.state.collapsed}>
         
          <TouchableOpacity
            onPress={() => {
              if (this.state.novo != '') {
                this.state.obj = { Name: this.state.novo };
                this._postData();
                this.setState({
                  novo: '',
                  collapsed: !this.state.collapsed,
                });
              }
            }}
            style={estilos.botao}>
            <Text style={estilos.textoBotao}>Adicionar</Text>
          </TouchableOpacity>
         
          </Collapsible>
          </View>
        </View>
      );
    }
  }

  setButtonTitle(){
    if(this.state.collapsed){
      return 'Novo'
    }else{
      return 'Ver Lista'
    }
  }
  setButtonBackgroundColor(){
    if(this.state.collapsed){
      return '#27c24c'
    }else{
      return '#FFD700'
    }
  }

}

const mapStatetoProps = state => {
  let userKey = state.AppReducer.userKey;
  let obj = state.AppReducer.obj;
  let shouldFormReset = state.AppReducer.shouldFormReset;
  return {
    userKey,
    obj,
    shouldFormReset,
  };
};

export default connect(mapStatetoProps, {})(ModalLocked);
