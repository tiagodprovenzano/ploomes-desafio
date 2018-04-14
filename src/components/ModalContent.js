import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity,TextInput, Modal} from 'react-native'
import {width, height} from 'react-native-dimension'
import estilos from './estilos'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';

export class ModalLocked extends Component{

  
  componentWillMount(){
  if (this.props.index != undefined) {

    this.setState({
      [this.props.index]:this.props.titulo
    })

  } else {

    this.setState({
      titulo:this.props.titulo
    })
    }
  }

    _chooseTitle(){
      if (this.props.index != undefined) {
        return this.state[this.props.index]
      } else {
        return this.state.titulo
      }
    }

    _addTextInput(){
      if(this.props.editavel){
        return(
          <TouchableOpacity
          onPress={() => {
            
          }}
          style={estilos.botao}>
          <Text style={estilos.textoBotao}>Novo</Text>
        </TouchableOpacity>
        )
      }
    }

    render(){


      if(this.props.activePhoneModal != this.props.index){
         
        //console.log('activePhoneModal - ',this.props.activePhoneModal);
        //console.log('index - ',this.props.index);
        
        return (
          <TouchableOpacity  onPress={()=> {
            this.props.activePhoneModalManager(this.props.index)
            this.props.manager(this.props.visible)
          }}>
            <Text style={{fontFamily:'lato', fontSize:17, paddingHorizontal:7,}}>{this._chooseTitle()}</Text>
          </TouchableOpacity>
        )
      }

      return(
          <View style={{flex:1}}>
          <Modal
              style={estilos.dropdown}
              animationType="fade"
              transparent={true}
              visible={this.props.visible}
              onRequestClose={() => this.props.manager(this.props.visible)}>
            
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: height(100),
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}>
              <View style={{ backgroundColor: '#fff', width: width(75), padding: 10 }}>
              
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
                      <TouchableOpacity onPress={() =>{
                        if (this.props.index != undefined) {
                          this.setState({
                            [this.props.index]:item.Name
                          })
                          this.props.manager(this.props.visible)
                        } else {
                          
                          this.setState({
                            titulo:item.Name
                          })
                          this.props.manager(this.props.visible)
                        }
                      }
                    }>
                        <Text style={{ fontSize: 25 }}>{item.Name}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  />
                  {this._addTextInput()}
              </View>
            </View>

          </Modal>
          <TouchableOpacity  onPress={()=> {
            this.props.manager(this.props.visible)
          }}>
            <Text style={{fontFamily:'lato', fontSize:17, paddingHorizontal:7,}}>{this._chooseTitle()}</Text>
          </TouchableOpacity>
          </View>  
        )
    }
    
}

const mapStatetoProps = state =>{
  return{

  }
}

export default connect(mapStatetoProps, {})(ModalLocked)