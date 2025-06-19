import { StyleSheet, Platform } from 'react-native';
import {colors} from '../../constants/colors'

export default StyleSheet.create({
    container:{
    flex: 1,
    padding:20,
    backgroundColor:colors.background,
    },

   logoContainer: {
     alignItems: 'center',
     marginBottom: 20,
   },
logo:{
        width: 200,
        height: 100,
        marginBottom: 20,
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

    scrollContainer:{
      flexGrow: 1,
      justifyContent: 'flex-start',
      paddingBottom: 120
    },

    perfilImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: colors.vermEscuro,
    marginBottom: 10,
  },

    formContainer:{
     width:'100%',
   },
    
    label:{
      fontSize:16,
      color:colors.vermEscuro,
      fontWeight:'bold',
      marginBottom:8,
    },

  button:{
    backgroundColor:colors.vermEscuro,
    height:44,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:4,
    marginTop:10
  },
  buttonText:{
    color:colors.white,
    fontSize:16,
    fontWeight:'bold'
  }

});