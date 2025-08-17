import { StyleSheet, Platform,Dimensions } from 'react-native';
import {colors} from '../../constants/colors'

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export default StyleSheet.create({
   
     container:{
     flex: 1,
     backgroundColor:colors.background,
     marginTop:30,
    },

     subContainer: {
        padding: '2%',
    },
     row: {
       justifyContent: 'space-evenly',
       paddingHorizontal: '2%',
    },
    
    
    addbutton:{
        backgroundColor: colors.white,
        borderRadius: 30,
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: colors.Vermelho,
        paddingVertical: 2,
        gap: 6,
    },
    TextadicionarButton: {
        margin:10,
        textAlign: 'center',
         fontSize: 16,
        color: colors.vermEscuro,
        paddingHorizontal: 10,
    },


   picker: {
        height: 50,
        width: '90%',
        borderColor: colors.Vermelho,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: colors.white,
    },
    
});