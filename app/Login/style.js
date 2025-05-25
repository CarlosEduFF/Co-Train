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
        justifyContent:'certer',
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
    alignItems:'flex-start',
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
    alignItems:'center',
    flexDirection:'row',
    marginTop:30,
    
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
    top: Platform.OS === 'ios'?-70 : 0,
    marginLeft:'60%'
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

    googleButtonContaine:{
      flexDirection:'row',
      borderWidth:2,
      borderRadius:15,
      borderColor:colors.vermEscuro,
      alignItems:'center',
      justifyContent:'center',
       width:'100%',
       marginTop:30,
       padding:5
    },

    googleImage:{
      height:35,
      width:35,
    },

    TextGoogle:{
     fontSize:16,
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