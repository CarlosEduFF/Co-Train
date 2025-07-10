import { StyleSheet } from "react-native";
import { colors } from "~/constants/colors";

export default StyleSheet.create({
  card: {
   width: '45%', // 2 colunas
  aspectRatio: 1, // quadrado
  backgroundColor: '#fff',
  borderRadius: 16,
  paddingVertical: 16,
  paddingHorizontal: 8,
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: 8,
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
    maxWidth: 100,
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