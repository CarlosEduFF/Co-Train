import { StyleSheet, Platform } from 'react-native';
import {colors} from '../../constants/colors'

export default StyleSheet.create({
    scrollContainer:{
        flexGrow:1,
        backgroundColor: '#f0f0f0',
    },
    container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop:'10%',
   
    backgroundColor:colors.background,
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
        height:'15%',
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
        height: '45%',
        width: '90%',  
        borderRadius:20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
       
        
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
         height:'75%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        position:'absolute',
        marginTop:'65%'
        
    },
    buttonBottom: {
        height: 50, // ✅ Aqui está o que estava faltando!
        backgroundColor: colors.white,
        borderRadius: 5,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: colors.Vermelho,
        marginTop: 40,
    },
    dayText: {
        fontSize: 16,
        color: colors.Vermelho,
        textAlign: 'center',
    },
});