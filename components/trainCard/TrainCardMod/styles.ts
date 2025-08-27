import { Platform, StyleSheet,Dimensions } from "react-native";
import { colors } from "~/constants/colors";

const PRIMARY_COLOR = '#A14545';
const TEXT_COLOR = '#333';
const FONT_FAMILY = Platform.OS === 'ios' ? 'Avenir' : 'Roboto';

const { width } = Dimensions.get("window");
const scale = (size: number) => Math.min((width / 375) * size, size * 1.3);

export default StyleSheet.create({
  card: {
    width: width * 0.42, 
    maxWidth: scale(180), 
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.Vermelho,
    borderRadius: scale(20),
    paddingTop: scale(60),
    paddingBottom: scale(16),
    alignItems: 'center',
    marginHorizontal: '2.5%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    marginTop: scale(80),
     },
        containerImage: {
         position: 'absolute',
         top: -55,
         alignItems: 'center',
         justifyContent: 'center',
         width: scale(100),
         height: scale(100),
         borderRadius: 50,
         borderWidth: 2,
         backgroundColor: '#fff',
         overflow: 'hidden',
         borderColor: colors.Vermelho,
         elevation: 6,
        },
        MuscImage: {
           width: '100%',
           height: '100%',
           borderRadius: 50,
           
        },
        cardTitulo: {
           fontWeight: 'bold',
           fontSize: scale(16),
           textAlign: 'center',
           maxWidth: scale(100),
        },

                MuscImagEdit:{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  borderWidth: 2,
                  borderColor: colors.Vermelho,
                  marginBottom: 8,
                },
                cardEditContainer:{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                borderRadius: 16,
                padding: 12,
                marginVertical: 8,
                elevation: 3, // sombra Android
                shadowColor: '#000', // sombra iOS
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                },
                
                containerImageEdit:{

                },
                   editContent: {
                      marginTop: 16,
                      width: '70%',
                    },
 
                    sectionTitle: {
                      fontSize: 19,
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

                           actionButtonsContainer: {
                              flexDirection: 'row',      
                              justifyContent: 'space-between', 
                              marginTop: 12,
                              paddingHorizontal: 16,     
                            },
                            actionButton: {
                              backgroundColor: '#FEE',   
                              marginHorizontal:10,
                              padding: 8,
                              justifyContent: 'center',
                              alignItems: 'center',
                              elevation: 2,
                              width: 55,
                              height: 55,
                              borderRadius:10,
                            },

  
  
  
  
  
                 deleteButton: {
                    backgroundColor: '#FEE',
                    borderRadius: 40,
                    padding: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 2,
                    width: 50,
                    height:50,
                    marginLeft: '45%',
                  },

  selectedBorder: {
    borderWidth: 2,
    borderColor: colors.vermEscuro,
  },


  

  

  
  
  
  // Container que envolve os botões
  

});