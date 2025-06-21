import { StyleSheet, Platform } from 'react-native';
import {colors} from '../../constants/colors'

export default StyleSheet.create({
    container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:colors.background,
    },
    logo:{
        width: 200,
        height: 100,
        marginBottom: 20,
    },
    formContainer:{
     width:'100%',
   },

});