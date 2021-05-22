import React, {useState, useEffect} from 'react'
import {Text,View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker'
import axios from 'axios'

const Formulario = ({moneda, criptomoneda, setMoneda, setCriptomoneda, setConsultarAPI}) => {
 
    const [resultCripto, setResultCripto] = useState([]);

    const obtenerMoneda = moneda =>{
        setMoneda(moneda)
    }

    const obtenerCripto = cripto => {
        setCriptomoneda(cripto)
    }

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const result = await axios.get(url);
            setResultCripto(result.data.Data)
        }
        consultarAPI();
    }, [])

    const cotizarPrecio = () => {
        if(moneda.trim() === '' || criptomoneda.trim() === ''){
            mostrarAlerta()
            return;
        }
        //change state consultarAPI
        setConsultarAPI(true)
        console.log('cotizando');
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Seleccione las monedas',
            [
                {text: 'OK'}
            ]
        )
    }

    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={moneda => obtenerMoneda(moneda)}
                itemStyle={{height: 120}}
            >
                <Picker.Item label="- Seleccione -" value=""/>
                <Picker.Item label="Dolar EEUU" value="USD"/>
                <Picker.Item label="Pesos Argentinos" value="ARG"/>
                <Picker.Item label="EURO" value="EUR"/>
                <Picker.Item label="Pesos Mexicanos" value="MXN"/>
                <Picker.Item label="Libra Esterlina" value="GBP"/>
            </Picker>
            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
                selectedValue={criptomoneda}
                onValueChange={criptomoneda => obtenerCripto(criptomoneda)}
                itemStyle={{height: 120}}
            >
                <Picker.Item label="- Seleccione -" value=""/>
                {resultCripto.map(cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name}/>
                ))}
            </Picker>
            <TouchableHighlight
                style={styles.btnCotizar}
                onPress={() => cotizarPrecio()}
            >
                <Text style={styles.textoCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles= StyleSheet.create({
    label: {
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20
    },
    btnCotizar : {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20,
    },
    textoCotizar: {
        color: '#FFF',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})

export default Formulario