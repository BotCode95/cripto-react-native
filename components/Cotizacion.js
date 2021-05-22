import React from 'react'
import {StyleSheet, Text,View} from 'react-native'

const Cotizacion = ({result}) =>{

    if(Object.keys(result).length === 0){
        return null;
    }
    return (
        <View style={styles.resultado}>
            <Text style={[styles.texto, styles.precio]}>
                <Text style={styles.span}>{result.PRICE}</Text>
            </Text>
            <Text style={styles.texto}>Precio más alto del día: {' '}
                <Text style={styles.span}>{result.HIGHDAY}</Text>
            </Text>
            <Text style={styles.texto}>Precio más bajo del día: {' '}
                <Text style={styles.span}>{result.LOWDAY}</Text>
            </Text>
            <Text style={styles.texto}>Variación últimas 24 horas: {' '}
                <Text style={styles.span}>{result.CHANGEPCT24HOUR} %</Text>
            </Text>
            <Text style={styles.texto}>Última Actualización: {' '}
                <Text style={styles.span}>{result.LASTUPDATE}</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    resultado: {
        backgroundColor: '#5E49E2',
        padding:20
    },
    texto: {
        color: '#FFF',
        fontSize: 18,
        marginBottom: 10
    },
    precio:{
        fontSize: 36
    },
    span :{
        fontWeight: 'bold'
    }
})

export default Cotizacion;