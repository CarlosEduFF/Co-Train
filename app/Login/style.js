import { StyleSheet, Platform } from 'react-native';
import {colors} from '../../constants/colors'

export default StyleSheet.create({
  container:{
    flex: 1,
    padding:20,
    backgroundColor:colors.background,
    },

  buttonLeft:{
    marginTop:'10%',
    height:50,
    width:50,
    background: colors.Vermelho,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',

    },
    containerLogo:{
        justifyContent:'certer',
        alignItems:'center'
    },
    
  logo:{

        width: 200,
        height: 100,
        marginBottom: 20,
    },
   textContainer:{
    marginVertical:20,
   },
   headingText:{
    fontSize:16,
    
   }

});