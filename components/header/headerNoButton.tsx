import { View, Text, Image, TextInput, Button, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '../../constants/colors'

interface InputProps {
    title: string;
    text: string;
}

export function Header({ title, text }: InputProps) {

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/Icons/Logo.png')}
                    style={styles.logo}
                    resizeMode="cover" />
            </View>

            <Text style={styles.titulos}>
                {title}
            </Text>

            <Text style={styles.textos}>
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
    },

    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 180,
        height: 90,
        marginBottom: 20,
    },

    buttonLeft: {
        height: 40,
        width: 40,
        backgroundColor: colors.vermEscuro,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    titulos: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.Vermelho,

    },
    textos: {
        color: colors.vermEscuro,
        fontSize: 20,
        fontWeight: 'bold',
    },
})