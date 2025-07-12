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
   title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.vermEscuro,
    textAlign: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.vermEscuro,
    paddingBottom: 10,
    marginTop:20
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

  removeIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  mealCard: {
  backgroundColor: '#FFF',
  padding: 16,
  marginVertical: 10,
  borderRadius: 10,
  elevation: 2,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
},

foodItemRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#F5F5F5',
  padding: 8,
  marginVertical: 4,
  borderRadius: 5,
},

deleteButton: {
  borderWidth: 1,
  borderColor: 'red',
  borderRadius: 10,
  padding: 10,
  marginTop: 8,
  alignItems: 'center',
},

deleteButtonText: {
  color: 'red',
  fontWeight: 'bold',
},

saveButton: {
  borderWidth: 1,
  borderColor: '#A14545',
  borderRadius: 10,
  padding: 10,
  marginTop: 12,
  alignItems: 'center',
},

saveButtonText: {
  color: '#A14545',
  fontWeight: 'bold',
},

  
});