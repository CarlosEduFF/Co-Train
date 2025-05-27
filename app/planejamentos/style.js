import { StyleSheet, Platform } from 'react-native';
import {colors} from '../../constants/colors'

export default StyleSheet.create({
    container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:colors.white,
    },
    logo:{
        width: 200,
        height: 100,
        marginBottom: 20,
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.Vermelho,
        marginBottom: 10,
    },
    subtitle:{
        fontSize: 18,
        color: colors.black,
        marginBottom: 20,
        marginHorizontal: 20,
        flexWrap: 'wrap',
        textAlign: 'justify',
    },
    button:{
        backgroundColor: colors.white,
        borderRadius: 5,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colors.Vermelho,
    },
    centerContent: {
        height: '40%',
        width: '90%',  
        borderRadius:20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.Vermelho,
    },
    rigthcontent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    leftcontent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    bottomContent: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        position:'absolute',
        marginTop:'40%'
        
    },
    buttonBottom: {
        backgroundColor: colors.white,
        borderRadius: 5,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colors.Vermelho,
    },
    dayText: {
        fontSize: 16,
        color: colors.Vermelho,
        textAlign: 'center',
    },
});