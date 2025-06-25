import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

export default StyleSheet.create({
   container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    marginTop: 0,
  },

  formContainer: {
    width: '100%',
    gap: 12,
    marginTop: 20,
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
    flexWrap: 'wrap',
    height: 50,
    padding: 4
  },

   exerciseRow: {
    marginBottom: 10,
    position: 'relative',
    padding: 10,
    borderRadius: 8,
  },
  removeIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  buttonRemover: {
  },
  buttonDisabled: {
    backgroundColor: '#ccc', // Cor para botao desabilitado
    opacity: 0.6,
     borderWidth: 2,
    borderColor: '#ccc',
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
    
  },
  buttonAdicionar: {
    backgroundColor: colors.white,
    borderRadius: 30,
    width: '100%',
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
    marginBottom: 80
  },

  buttonText: {
    fontSize: 16,
    color: colors.vermEscuro,
    fontWeight: 'bold',
  },
});