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
        marginTop:30,
        
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
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        
        paddingVertical: 13,   // Aumenta a altura do botão
        paddingHorizontal: 0, // Espaçamento nas laterais, dentro do botão
        
        borderRadius: 50,      // Borda bem arredondada
        borderWidth: 1.5,      // Largura da borda
        borderColor: colors.Vermelho, // Cor da borda
        
        marginBottom: 16,      // Espaçamento entre os botões
        // Sombra suave para dar o efeito de "elevação"
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        minWidth:"48%",
        maxWidth: "48%",


    },
    row: {
        justifyContent: 'space-between', // Cria um espaço igual entre os cards
        alignItems: 'center',
        alignContent: 'center',
    },

    // --- ESTILO DO TÍTULO DO CARD ATUALIZADO ---
    cardTitulo: {
        color: colors.Vermelho,
        fontWeight: 'bold',
        fontSize: 12,
        textTransform: 'uppercase', // Deixa o texto em maiúsculas
        textAlign: "center"
    },

     containerCard:{
        alignItems:'center',
        alignContent:'center',
        maxWidth: '100%',
        height: '100%',


  
     },
      lastCard: {
        width: '100%', // Sobrescreve a largura para ocupar a linha inteira
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
