import { StyleSheet, Platform } from 'react-native';
import {colors} from '../../constants/colors'
import { Colors } from 'react-native/Libraries/NewAppScreen';

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
    text:{
        color:colors.white
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
});