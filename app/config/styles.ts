import { StyleSheet } from "react-native";
import {colors} from '~/constants/colors'

export default StyleSheet.create({
    scrollContainer:{
        flexGrow:1,
        backgroundColor: '#fff',
    },
         header: {
             backgroundColor: '#fff',
             padding: '5%',
           },
           bunttonLeftContainer:{
           flexDirection:'row',
           alignItems:'center',
           marginTop:20,
           },
           buttonLeft:{
                  height:40,
                  width:40,
                  backgroundColor:colors.vermEscuro,
                  borderRadius:20,
                  justifyContent:'center',
                  alignItems:'center',
                  marginRight:20
                 },
           headerButton:{
               alignItems:'center',
               paddingBottom: 10,
               marginBottom: 10,
                borderColor: colors.vermEscuro,
         
           },
           TituloSecao: {
               fontSize: 26,
               fontWeight: 'bold',
               color: colors.Vermelho,
           },
           headerBackground: {
             width: '100%',
             height: 50,
             
           },
           perfilImage: {
             width: 150,
             height: 150,
             borderRadius: 75,
             borderWidth: 5,
             borderColor: '#000',
             marginBottom: 10,
           },

           name: {
             fontSize: 24,
             fontWeight: 'bold',
             color: colors.vermEscuro,
           },
            email: {
              fontSize: 16,
              color: '#666',
            },

                

                     tabcontainer: {
                      flexDirection: 'row',
                      justifyContent: 'center',
                      backgroundColor: '#ccc',
                      borderRadius: 25,
                      marginStart:90,
                      marginEnd:90,
                      padding:3
                     },
                     tabButton:{
                      paddingVertical:13,
                      paddingHorizontal: 30,
                      borderRadius: 15,
                      backgroundColor: 'transparent',
                     },
                     tabButtonActive:{
                      backgroundColor: colors.vermEscuro,
                      borderRadius:22
                     },
                     tabText:{
                       color: '#8d8d8dff',
                       fontWeight: '600',
                     },
                     tabTextActive:{
                       color: 'white',
                     },
             

                      optionsContent:{
                         flexDirection: 'row',
                         alignItems: 'center',
                         
                      },
                      button:{
                           padding:10,
                           justifyContent:'center',
                           alignItems:'center',
                           borderRadius:10,
                           backgroundColor:colors.vermEscuro,
                           marginTop:10
                         },
                         buttonText:{
                           color:colors.white,
                           fontSize:16,
                           fontWeight:'bold'
                         },

                      optionsContainer: {
                         marginTop: 30
                       },
                       optionCard: {
                         flexDirection: 'row',
                         alignItems: 'center',
                         justifyContent: 'space-between',
                         padding: 15,
                         backgroundColor: '#fff',
                         borderRadius: 12,
                         marginBottom: 12,
                         shadowColor: '#000',
                         shadowOffset: { width: 0, height: 2 },
                         shadowOpacity: 0.1,
                         shadowRadius: 3.84,
                         elevation: 2,
                         marginTop: 18
                       },
                       optionText: {
                         fontSize: 16,
                         fontWeight: '500',
                         marginLeft: 10,
                         flex: 1
                       },


                                      container: {
                                        paddingHorizontal: 20,
                                        marginTop:18
                                      },
                                     
                                      infocaixa: {
                                        backgroundColor: '#fff',
                                        padding: 15,
                                        borderRadius: 10,
                                        marginBottom: 20,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 3.84,
                                        elevation: 2,
                                        marginTop:8
                                      },
                                      infoText: {
                                        fontSize: 16,
                                        marginBottom: 5,
                                      },

                       

})