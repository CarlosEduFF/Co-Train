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
    paddingVertical: 15,
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
});