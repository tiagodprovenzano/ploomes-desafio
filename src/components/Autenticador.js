import React, {Component} from 'react'
import {Text} from 'react-native'
import {connect} from 'react-redux'

import Login from '../pages/Login'
import Navegador from './Navegador'


export class Autenticador extends Component{
    render(){
        if(this.props.userKey === ''){
            return(
                <Login/>
            )
        }else{
            return(
                <Navegador/>
            )
        }
        
    }
}

const mapStateToProps = state =>{
    let userKey = state.AppReducer.userKey
    return{
        userKey
    }
}

export default connect(mapStateToProps, {})(Autenticador)