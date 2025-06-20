import { StyleSheet, Platform } from 'react-native';
import {colors} from '../../constants/colors'

export default StyleSheet.create({
  container:{
    flex: 1,
    padding:20,
    backgroundColor:colors.white,
    },

  buttonLeft:{
    marginTop:'10%',
    height:40,
    width:40,
    backgroundColor:colors.vermEscuro,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    },
    containerLogo:{
        justifyContent:'center',
        alignItems:'center',
    },
    
   logo:{
     width: 200,
     height: 100,
     marginBottom: 20,
     },

   textContainer:{
    borderBottomWidth:1,
    borderColor: colors.Vermelho,
    borderRadius:5,
   },

   headingText:{
    fontSize:35,
    fontWeight:'bold',
    marginTop:5
   },
  
   formContainer:{
     width:'100%',
   },

   inputContainer:{
    borderWidth:1,
    borderColor: colors.Vermelho,
    borderRadius:15,
    paddingHorizontal:20,
    paddingVertical:5,
    alignItems:'center',
    flexDirection:'row',
    marginTop:35,
   },

    animation:{
     height:30,
     width:65,
     borderRadius:15,
     backgroundColor: colors.white,
     position: 'absolute',
     top: -20, 
     fontSize: 16, 
     color: '#3D0000',
    },

    labelText:{ 
     color: '#3D0000',
     textAlign: 'center',
    },
   
    button:{
      backgroundColor: colors.vermEscuro,
      borderRadius: 15,
      paddingVertical: 5,
      marginTop: '10%',
      alignItems: 'center',
      width: '100%',
      height: '8%',
      borderWidth: 1,
      borderColor: colors.vermEscuro,
    },

    icon:{
    position: 'absolute',
    right: 20,
    marginTop:5
    },
    
    buttonText:{
      color:colors.white,
      fontSize: 20,
      fontWeight: 'bold',
      marginTop:'2%'    
    },

      passwordText:{
        display:'flex',
        color: colors.Vermelho,
        fontSize: 16,
        marginTop: 10,
        marginLeft: 10,
      },

      animationConfirmarSenha:{
        height:30,
        width:150,
        borderRadius:15,
        backgroundColor: colors.white,
        position: 'absolute',
        top: -20, 
        fontSize: 16, 
        color: '#3D0000',
      },

    footerText:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      marginVertical:30,
    },

    footerAccont:{
     color:colors.black,
     fontSize:16,
    },
    footerCreate:{
       color:colors.vermEscuro,
       fontSize:16,
       fontWeight:'bold'
    }
});