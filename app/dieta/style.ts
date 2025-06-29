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
     adicionarButton: {
        margin:10,
        textAlign: 'center',
         fontSize: 16,
        color: colors.vermEscuro,
        paddingHorizontal: 10,
    },
  
     listContainer: {
        alignItems: 'center',
        paddingHorizontal: 10,
        gap: 16,
    },

     card: {
        alignContent:'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin:'5%',
        height: '100%',
    },

     containerCard:{
        alignItems:'center',
        alignContent:'center',
        maxWidth: '100%',
        height: '100%',


  
     },
     MuscImage:{
        width: 100,
        height: 100,
        borderRadius: 75,
        borderWidth: 1,
        borderColor: colors.vermEscuro,

     },
     cardTitulo: {
       color: colors.Vermelho,
       fontWeight: 'bold',
       fontSize: 15,
       marginBottom: 4,
       maxWidth: 90, 
       textAlign: "center",
  
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
