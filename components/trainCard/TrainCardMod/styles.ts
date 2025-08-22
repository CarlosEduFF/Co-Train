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
    elevation: 3, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  containerImage: {
    flexDirection: 'column',
    alignItems: 'center',
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

  selectedBorder: {
    borderWidth: 2,
    borderColor: colors.vermEscuro,
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

  editContent: {
    marginTop: 16,
    width: '70%',
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginBottom: 16,
    fontFamily: FONT_FAMILY,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: PRIMARY_COLOR,
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: PRIMARY_COLOR,
  },
  checkboxLabel: {
    fontSize: 14,
    color: TEXT_COLOR,
    fontFamily: FONT_FAMILY,
  },
  // Container que envolve os botões
  actionButtonsContainer: {
    flexDirection: 'row',      // deixa os botões lado a lado
    justifyContent: 'space-between', // espaça uniformemente
    marginTop: 12,
    paddingHorizontal: 16,     // dá espaço nas laterais do card
  },

  // Botão comum (pode ser usado tanto para delete quanto edit)
  actionButton: {
    backgroundColor: '#FEE',   // pode trocar para #EEF ou outra cor no edit
    borderRadius: 40,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    width: 80,
    height: 80,
  }

});