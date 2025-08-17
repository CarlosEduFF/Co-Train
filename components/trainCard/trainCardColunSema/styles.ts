import { Platform, StyleSheet } from "react-native";
import { colors } from "~/constants/colors";

const PRIMARY_COLOR = '#A14545';
const TEXT_COLOR = '#333';
const FONT_FAMILY = Platform.OS === 'ios' ? 'Avenir' : 'Roboto';

export default StyleSheet.create({
  card: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#fff',
  borderRadius: 16,
  padding: 12,
  marginVertical: 8,
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
},

  selectedBorder: {
    borderWidth: 2,
    borderColor: colors.vermEscuro,
  },

containerCard: {
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1, 
},

  containerCardEdit: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerImage: {
  flexDirection: 'column',
  alignItems: 'center',
},

  editContent: {
    marginTop: 16,
    width: '100%',
  },
  imageTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  MuscImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.vermEscuro,
    marginBottom: 8,
  },

  cardTitulo: {
    color: colors.Vermelho,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 80,
  },

  deleteButton: {
  backgroundColor: '#FEE',
  borderRadius: 40,
  padding: 8,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 2,
  width: 80,
  height: 80,
  marginLeft: '45%', 
},
  
 

  
});