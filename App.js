import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator} from 'react-native';
import Header from './components/Header'
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import axios from 'axios'

export default function App() {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [consultarAPI, setConsultarAPI] = useState(false);
  const [result, setResult] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cotizarCripto = async () =>{
      if(consultarAPI) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const result = await axios.get(url);
        setCargando(true)

        setTimeout(() => {
          setResult(result.data.DISPLAY[criptomoneda][moneda])
          console.log(result.data.DISPLAY[criptomoneda][moneda])
          setConsultarAPI(false)
          setCargando(false)
        },3000);
      }
    }
    cotizarCripto();
    
  }, [consultarAPI])


  const componente = cargando ? <ActivityIndicator size="large" color="#5E49E2"/> : <Cotizacion  result={result}/>
  return (
    <ScrollView>
      <Header/>
      <Image 
        style={styles.imagen}
        source={ require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.container}>
        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
          setConsultarAPI ={setConsultarAPI}
        />
      </View>
      <View style={{marginTop: 40}}>
        {componente}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '2.5%'
  },
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  }
});
