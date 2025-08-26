import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
    marginTop: 0,
  },
  buttonDisabled: {
    backgroundColor: '#ccc', // Cor para botao desabilitado
    opacity: 0.6,
    borderWidth: 2,
    borderColor: '#ccc',
  },exerciseRow: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor:  '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    position: 'relative', // para o ícone de remover ficar posicionado relativo a essa view
  },
  formContainer: {
    width: '100%',
    gap: 12,
    marginTop: 20,
  }, removeIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: 12,
  },

  label: {
    fontSize: 16,
    color: colors.vermEscuro,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  optionalLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },

  button: {
    backgroundColor: colors.white,
    borderRadius: 30,
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.Vermelho,
    paddingVertical: 8,
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  inputHalf: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },


  adicionarButton: {
    fontSize: 16,
    color: colors.vermEscuro,
    paddingHorizontal: 10,
    marginTop:20

  },
  buttonAdicionar: {
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
    paddingVertical: 8,
    gap: 6,
  },

  buttonSave: {
    backgroundColor: colors.white,
    borderRadius: 30,
    height: 40,
    width: '100%',
    borderWidth: 2,
    borderColor: colors.Vermelho,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
    color: colors.vermEscuro,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3D0000',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    alignSelf: 'center',
     marginTop:20
  },
  addText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  itemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedBorder: {
    borderColor: '#3D0000',
    borderWidth: 2,
  },
  itemText: {
    fontWeight: 'bold',
    marginBottom: 4,
  },

});