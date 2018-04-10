import React from 'react';
import { StyleSheet } from 'react-native'
import {width, height} from 'react-native-dimension'



var contentBackground = '#f6f8f9' 
var headerColor = '#786fb0' 		

export default estilos = StyleSheet.create({
    loginBody:{
        flex:1,
        padding:10,
        alignItems:'center',
        backgroundColor: '#3a3f51', 
        justifyContent:'center'
    },
    textos:{
        fontSize:18,
        color:'#786fb0',
        fontFamily:'lato',
        marginBottom:10
    },
    textoBotao:{
        fontSize:20,
        color:'#fff',
        fontFamily:'lato',
        padding:10
    },
    botao:{
        backgroundColor:'#37c4f0',
        width:width(50),
        borderRadius:5,
        marginVertical:10,
        alignItems:'center',
        alignSelf:'center'
    },
    inputsWraps:{
        width:width(80),
        padding:10,
        backgroundColor: '#f6f8f9',
        borderRadius:5, 
        justifyContent:'space-evenly'
    },
    inputsTop:{
        padding:10,
        
        marginBottom:10,
        backgroundColor: '#f6f8f9' 
    },
    inputs:{
        padding:10,
        backgroundColor: '#f6f8f9' 
    },
})