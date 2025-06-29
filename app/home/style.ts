import { StyleSheet, Platform } from 'react-native';
import {colors} from '../../constants/colors'

export default StyleSheet.create({
    
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 120
      
    },
    container:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:colors.white,
    paddingVertical: 8,
    paddingHorizontal: 10,
    paddingBottom: 50,
    top: 15
    },

    logo:{
        width: 200,
        height: 100,
        marginBottom: 20,
        marginTop:'15%'
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

    paineis:{
       
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: colors.Vermelho,
        borderRadius: 10,
        width: '70%',
        height: '18%',
        textAlign: 'center',
        padding:5,
    },
    titulos:{
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.Vermelho,
        marginBottom: 0,
        paddingBottom: 0,
        flexWrap: 'wrap',
        textAlign: 'center',
    },
    textos:{
        color:colors.black,
        flexWrap: 'wrap',
        alignItems: 'center',
        textAlign: 'center',
    },
Image:{
    height:60,
    width:60,
},
});