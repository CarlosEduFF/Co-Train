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
    card: {
      backgroundColor: '#FFF',


      marginBottom: 15,
      flexDirection: 'row',    
      justifyContent: 'space-between', 
      alignItems: 'center',  

      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      marginTop:10,
    borderRadius: 12,
    padding: 13,
    elevation: 4,
    borderLeftWidth: 3,
    borderLeftColor: colors.Vermelho,
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
  cardContent: {
    flex: 1, // Faz com que o conteúdo do card ocupe o espaço disponível
  },
  deleteButton: {
    padding: 10,       // Aumenta a área de toque
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,     // Espaçamento entre o texto e o ícone
  },

  cardTitulo: {
    color: colors.Vermelho,
    fontWeight: 'bold',
    fontSize: 23,
    marginBottom: 4,
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
