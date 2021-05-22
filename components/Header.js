import React from 'react'
import {Text, StyleSheet, Platform} from 'react-native'

const Header = () => (
    <Text style={styles.encabezado}>Criptomonedas</Text>
)

const styles = StyleSheet.create({
    encabezado: {
        paddingTop: Platform.OS === 'ios' ? 50 : 40,
        backgroundColor: '#5E493E',
        paddingBottom: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
        color: '#FFF',
        marginBottom: 10
    }
})

export default Header;