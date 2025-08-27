import { StyleSheet , Dimensions, PixelRatio } from "react-native";
import {colors} from '~/constants/colors'

const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size; 

export default StyleSheet.create({
    scrollContainer:{
        flexGrow:1,
        backgroundColor: '#fff',
    },
         header: {
             backgroundColor: '#fff',
             padding: scale(20),
           },
           bunttonLeftContainer:{
           flexDirection:'row',
           alignItems:'center',
           marginTop: scale(20),
           },
           buttonLeft:{
                height: scale(40),
                width: scale(40),
                backgroundColor: colors.vermEscuro,
                borderRadius: scale(20),
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: scale(20),
                 },
           headerButton:{
               alignItems: 'center',
               paddingBottom: scale(10),
               marginBottom: scale(10),
               borderColor: colors.vermEscuro,
         
           },
           TituloSecao: {
                fontSize: scale(26),
                fontWeight: 'bold',
                color: colors.Vermelho,
           },
           headerBackground: {
             width: '100%',
             height: 50,
             
           },
           perfilImage: {
               width: scale(150),
               height: scale(150),
               borderRadius: scale(75),
               borderWidth: scale(5),
               borderColor: '#000',
               marginBottom: scale(10),
           },

           name: {
             fontSize: scale(24),
             fontWeight: 'bold',
             color: colors.vermEscuro,
           },
            email: {
              fontSize:  scale(16),
              color: '#666',
            },

                

                     tabcontainer: {
                       flexDirection: 'row',
                       justifyContent: 'center',
                       backgroundColor: '#ccc',
                       borderRadius:25,
                       marginStart: 65,
                       marginEnd:   65,
                       padding:     3,
                     },
                     tabButton:{
                      paddingVertical: scale(13),
                      paddingHorizontal: scale(30),
                      borderRadius: scale(15),
                      backgroundColor: 'transparent',
                     },
                     tabButtonActive:{
                      backgroundColor: colors.vermEscuro,
                      borderRadius: scale(22)
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
                           padding: scale(10),
                           justifyContent: 'center',
                           alignItems: 'center',
                           borderRadius: scale(10),
                           backgroundColor: colors.vermEscuro,
                           marginTop: scale(10),
                         },
                         buttonText:{
                           color:colors.white,
                           fontSize: scale(16),
                           fontWeight:'bold'
                         },

                      optionsContainer: {
                         marginTop: scale(30),
                       },
                       optionCard: {
                         flexDirection: 'row',
                         alignItems: 'center',
                         justifyContent: 'space-between',
                         padding: scale(15),
                         backgroundColor: '#fff',
                         borderRadius: scale(12),
                         marginBottom: scale(12),
                         shadowColor: '#000',
                         shadowOffset: { width: 0, height: 2 },
                         shadowOpacity: 0.1,
                         shadowRadius: 3.84,
                         elevation: 2,
                         marginTop: scale(18),
                       },
                       optionText: {
                          fontSize: scale(16),
                          fontWeight: '500',
                          marginLeft: scale(10),
                          flex: 1,
                       },


                                      container: {
                                         paddingHorizontal: scale(20),
                                         marginTop: scale(2),
                                         paddingVertical: scale(45)
                                      },
                                     
                                      infocaixa: {
                                        backgroundColor: '#fff',
                                        padding: scale(15),
                                        borderRadius: scale(10),
                                        marginBottom: scale(20),
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 3.84,
                                        elevation: 2,
                                        marginTop: scale(8),
                                      },
                                      infoText: {
                                        fontSize: scale(16),
                                        marginBottom: scale(5),
                                      },

                       

})