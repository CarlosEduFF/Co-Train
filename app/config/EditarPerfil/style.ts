import { StyleSheet, Platform } from 'react-native';
import { colors } from '~/constants/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },

  buttonLeft: {
    marginTop: '10%',
    height: 40,
    width: 40,
    backgroundColor: colors.vermEscuro,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 120
  },

  perfilImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: colors.vermEscuro,
    marginBottom: 10,
  },

  formContainer: {
    width: '100%',
  },

  label: {
    fontSize: 16,
    color: colors.vermEscuro,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  button: {
    backgroundColor: colors.vermEscuro,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 60
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3D0000',
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center',
  },

  editButtonText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  radioButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  radioButtonSelected: {
    backgroundColor: colors.vermEscuro, // azul forte
    borderColor: colors.vermEscuro,
    
  },

  radioText: {
    fontWeight: 'bold',
  },

radioTextSelected: {
  color: '#fff',
},

radioTextUnselected: {
  color: colors.vermEscuro,
},
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },

  picker: {
    height: 50,
    backgroundColor: '#fff',
    color: '#000',
  }

});