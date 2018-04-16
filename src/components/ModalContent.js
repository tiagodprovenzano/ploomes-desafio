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

  _chooseTitle() {
    if(this.props.value != undefined && this.props.value.lenght > 0){
     
//    console.log('chooseTitle() - if - index - ', this.props.index, 'this.props.value - ', this.props.value)
      return this.props.value
    }else{
      
//    console.log('chooseTitle() - else - index - ', this.props.index)

      if (this.props.index != undefined) {
        
        return this.state[this.props.index];
      } else {
        return this.state.titulo;
      }

    }
    
    
  }

  async _postData() {
    await useAPI(this.props.userKey, this.props.api, 'POST', this.state.obj);
    let dados = await useAPI(this.props.userKey, this.props.api, 'GET');
    this.props.redux(dados);
  }

  _addTextInput() {
    if (this.props.editavel) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                collapsed: !this.state.collapsed,
              });
            }}
            style={estilos.botao}>
            <Text style={estilos.textoBotao}>Novo</Text>
          </TouchableOpacity>

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
                }}>
                <Text>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </Collapsible>
        </View>
      );
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
      //console.log('activePhoneModal - ',this.props.activePhoneModal);
      //console.log('index - ',this.props.index);

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

              <FlatList
                data={this.props.data}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
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
                            titulo: item.Name,
                          });
                          this.props.manager(this.props.visible);
                        }
                      }}>
                      <Text style={{ fontSize: 25 }}>{item.Name}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
              {this._addTextInput()}
            </View>
          </View>

        </Modal>
        <TouchableOpacity
          onPress={() => {
            this.props.manager(this.props.visible);
          }}>
          <Text style={estilos.modalTitle}>{this._chooseTitle()}</Text>
        </TouchableOpacity>
      </View>
    );
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
