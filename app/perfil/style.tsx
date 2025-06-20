import { StyleSheet } from "react-native";
import {colors} from '../../constants/colors'

export default StyleSheet.create({
    scrollContainer:{
        flexGrow:1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        backgroundColor: '#fff',
      },
      headerButton:{
          alignItems:'center',
          paddingBottom: 10,
          marginBottom: 10,
      },
      headerBackground: {
        width: '100%',
        height: 150,
        marginBottom: -75,
      },
      buttonLeft:{
        
        marginLeft:20,
        marginTop:50,
        height:40,
        width:40,
        backgroundColor:colors.vermEscuro,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
    },
      perfilImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 5,
        borderColor: '#000',
        marginBottom: 10,
      },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  container: {
    paddingHorizontal: 20,
  },
  TituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  infocaixa: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
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
})