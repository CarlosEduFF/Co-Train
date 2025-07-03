import { StyleSheet } from "react-native";
import { colors } from "~/constants/colors";

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
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