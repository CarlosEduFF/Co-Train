import { StyleSheet,Dimensions } from "react-native";
import { colors } from "~/constants/colors";

const { width } = Dimensions.get('window');

// Escala responsiva baseada na largura de 375 (iPhone 11 como referência)
const scale = width / 375;
const scaleSize = (size: number) => Math.round(size * scale);


export default StyleSheet.create({
  card: {
   width: width < 400 ? '100%' : '45%', // em telas pequenas ocupa 100%
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: scaleSize(16),
    paddingVertical: scaleSize(16),
    paddingHorizontal: scaleSize(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: scaleSize(8),
    elevation: 4,
  },

  selectedBorder: {
    borderWidth: 2,
    borderColor: colors.vermEscuro,
  },

  containerCard: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  MuscImage: {
    width: scaleSize(80),
    height: scaleSize(80),
    borderRadius: scaleSize(40),
    borderWidth: 2,
    borderColor: colors.vermEscuro,
    marginBottom: scaleSize(8),
  },

  cardTitulo: {
    color: colors.Vermelho,
    fontWeight: 'bold',
    fontSize: scaleSize(16),
    textAlign: 'center',
    maxWidth: scaleSize(100),
  },

  deleteButton: {
    backgroundColor: '#FEE',
    borderRadius: 24,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
});