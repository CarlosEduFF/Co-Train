import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

export default StyleSheet.create({
 container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
  },

  
  trainCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    alignItems: "center",
    borderColor:colors.Vermelho,
    borderWidth:2,
    marginTop:20
  },

 


  trainMuscle: {
    fontSize: 45,
    fontWeight: "bold",
    color: colors.Vermelho,
    marginBottom: 4,
  },

  
  trainTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.vermEscuro,
    marginBottom: 12,
  },

 
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 6,
  },

  infoText: {
    fontSize: 14,
    color: "#555",
  },

 
  onlineTag: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    gap: 4,
    backgroundColor: "#e8f5e9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  onlineText: {
    fontSize: 20,
    fontWeight: "600",
    color: "green",
  },


  exerciseCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 14,
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    width: "100%",
  },


  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 6,
  },
  exerciseTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: colors.vermEscuro,
  },


  label: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.vermEscuro,
  },
  optionalLabel: {
    fontSize: 18,
    color: "#777",
  },
  valueText: {
    fontSize: 18,
    color: "#333",
  },
});