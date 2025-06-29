import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

const FONT_FAMILY = Platform.OS === 'ios' ? 'Avenir' : 'Roboto';
const PRIMARY_COLOR = '#A14545';
const TEXT_COLOR = '#333';

export default StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor:colors.background,
  },
  contentContainer: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    fontFamily: FONT_FAMILY,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: TEXT_COLOR,
    fontFamily: FONT_FAMILY,
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    fontFamily: FONT_FAMILY,
    marginBottom: 6,
    fontWeight: '600',
    marginTop: 10
  },
  input: {
    backgroundColor:colors.background,
    borderWidth: 1.5,
    borderColor: PRIMARY_COLOR,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: TEXT_COLOR,
    marginBottom: 20,
    fontFamily: FONT_FAMILY,
  },
  foodInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addedFoodItem: {
    backgroundColor: '#F3E9E9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addedFoodText: {
    color: PRIMARY_COLOR,
    fontFamily: FONT_FAMILY,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: PRIMARY_COLOR,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 24,
    alignSelf: 'center',
    width: '100%'
  },
  addButtonText: {
    color: PRIMARY_COLOR,
    fontSize: 16,
    fontFamily: FONT_FAMILY,
    fontWeight: 'bold',
    marginRight: 8,
  },
  plusIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIconText: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 18,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
  sectionTitle: {
    fontSize: 16,
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
  saveButton: {
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 32,
       marginBottom: 60
  },
  saveButtonText: {
    color: PRIMARY_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    letterSpacing: 1,
 
  },
});