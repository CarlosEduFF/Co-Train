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
    width: '45%',
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
      paddingHorizontal: 12,
    gap: 12,
    paddingBottom: 60,
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
