import { StyleSheet, Platform,Dimensions } from 'react-native';
import {colors} from '../../constants/colors'

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export default StyleSheet.create({
    scrollContainer:{
        flexGrow:1,
        backgroundColor: '#f0f0f0',
    },
    container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '10%',
    backgroundColor: colors.background,
    },
    containerHeader:{
        margin:"2%"
    },
    input: {
        height: 50,
        width: '90%',
        borderColor: colors.Vermelho,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '90%',
        borderColor: colors.Vermelho,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: colors.white,
    },
    button:{
        height: isTablet ? 70 : 50, 
        backgroundColor: colors.white,
        borderRadius: 8,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 13,
        borderWidth: 2,
        borderColor: colors.Vermelho,
    },
    centerContent: {
         width: '90%',
         flexDirection: isTablet ? 'column' : 'row',
         justifyContent: 'center',
         alignItems: 'center',
       
        
    },
    rigthcontent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: isTablet ? '100%' : '50%',
    },
    leftcontent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: isTablet ? '100%' : '50%',
    },
    bottomContent: {
        width: '100%',
         height:'75%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        position:'absolute',
        marginTop:'65%'
        
    },
    buttonBottom: {
        height: isTablet ? 70 :60,
        backgroundColor: colors.white,
        borderRadius: 5,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: colors.Vermelho,
        marginTop:isTablet ? 130: 40,
    },
    dayText: {
       fontSize: isTablet ? 18 : 16,
       color: colors.Vermelho,
       textAlign: 'center',
    },
});