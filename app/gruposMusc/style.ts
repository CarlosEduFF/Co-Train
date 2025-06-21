import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export default StyleSheet.create({
   
    scrollContainer: {
        flexGrow: 1,
    },
    container:{
        flex: 1,
        padding:20,
        backgroundColor:colors.background,
        marginTop:30
    },
    button:{
        marginTop:15,
        backgroundColor: colors.vermEscuro,
        borderRadius: 15,
        width: '43%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 3,
        borderColor: colors.Vermelho,
    },
     adicionarButton: {
        margin:10,
        fontSize: 16,
        color: colors.white,
        textAlign: 'center',
    },
  
     listContainer: {
        gap: 16,
    },

     card: {
        alignContent:'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin:'5%'
    },

     containerCard:{
        alignItems:'center'
     },
     MuscImage:{
        width: 85,
        height: 85,
        borderRadius: 75,
        borderWidth: 5,
        borderColor: colors.vermEscuro,

     },
     cardTitulo: {
       color: colors.Vermelho,
       fontWeight: 'bold',
       fontSize: 23,
       marginBottom: 4,
       marginLeft:10
     },

     cardDescricao: {
       fontSize: 18,
       color: '#444',
       marginBottom: 2,
     },

     cardRepeticoes: {
       fontSize: 15,
       color: '#666',
     },
});
