import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export default StyleSheet.create({
   
    scrollContainer: {
        flexGrow: 1,
    },
    container:{
        flex: 1,
        backgroundColor:colors.background,
       
        
    },
    subContainer: {
        padding: '2%',
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

 

     card: {
        backgroundColor: colors.white,
        borderRadius: 5,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 2,
        borderColor: colors.Vermelho,
        paddingVertical: 12,
    },
    row: {
       justifyContent: 'space-evenly',
       paddingHorizontal: '2%',
    },

    // --- ESTILO DO TÍTULO DO CARD ATUALIZADO ---
    cardTitulo: {
       fontSize: 16,
       color: colors.Vermelho,
       textAlign: 'center',
       fontWeight: '500',
    },

     containerCard:{
        alignItems:'center',
        alignContent:'center',
        maxWidth: '100%',
        height: '100%',


  
     },
      lastCard: {
        width: '95%',
        alignSelf: 'center',
    },
     MuscImage:{
        width: 100,
        height: 100,
        borderRadius: 75,
        borderWidth: 1,
        borderColor: colors.vermEscuro,

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
