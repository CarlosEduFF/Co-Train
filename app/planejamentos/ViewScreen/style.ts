import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

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

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
          backgroundColor: colors.white,
    borderRadius: 30,
    width: '45%',

    borderWidth: 2,
    borderColor: colors.Vermelho,
    paddingVertical: 2,
    gap: 6,
    },
     adicionarButton: {

      margin:10,
        fontSize: 16,
        textAlign: 'center',
    color: colors.vermEscuro,
    paddingHorizontal: 10,
        

    },
  
    listContainer: {
    gap: 16,
  },
  

  
});
