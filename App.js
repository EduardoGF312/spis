import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from 'react-native';
import axios from "axios";
import CircularProgress from 'react-native-circular-progress-indicator';

const App = () => {
  const [sensor, setSensor] = useState(0);
  const [bpm, setBPM] = useState(null);
  const [spo2, setSpO2] = useState(null);
  const [temp, setTemp] = useState(null);
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://blynk.cloud/external/api/get?token=ik86R45NKaQc25kh2ziw2-wjIjEX1gz8&v0&v1&v2&v3&v4');
        const sensorValue = response.data.v0;
        const bpmValue = response.data.v1;
        const spo2Value = response.data.v2;
        const contadorValue = response.data.v3;
        const tempValue = response.data.v4;
        setSensor(sensorValue);
        setBPM(bpmValue);
        setSpO2(spo2Value);
        setContador(contadorValue);
        setTemp(tempValue);
      } catch (error) {
        console.log(error);
      }
    };

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  //USANDO ESP32 COMO PUNTO DE ACCESO
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://192.168.0.15/');
  //       const { data } = response;
  //       setBPM(data.bpm);
  //       setSpO2(data.spo2);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const interval = setInterval(fetchData, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    // <View style={{ marginTop: 300 }}>
    //   {bpm && spo2 ? (
    //     <>
    //       <Text>Frecuencia cardiaca (BPM):</Text>
    //       <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, }}>
    //         <View style={{ backgroundColor: '#4CAF50', height: 10, width: `${bpm > 250 ? 100 : (bpm / 2.5)}%`, maxWidth: '100%', marginRight: 5 }}></View>
    //         <Text>{bpm.toFixed(1)} bpm</Text>
    //       </View>

    //       <Text>Oxigenación en la sangre (SPO2):</Text>
    //       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //         <View style={{ backgroundColor: '#2196f3', height: 10, width: `${spo2 > 100 ? 100 : spo2}%`, maxWidth: '100%', marginRight: 5 }}></View>
    //         <Text>{spo2.toFixed(1)} %</Text>
    //       </View>
    //     </>
    //   ) : (
    //     <Text>Cargando...</Text>
    //   )}
    // </View>

 
    <View style={styles.container}>
          <CircularProgress
            value={bpm}
            radius={100}
            maxValue={250}
            title={'BPM'}
            titleColor={'black'}
            titleStyle={{ fontWeight: 'bold' }}
            inActiveStrokeColor={'#24c48e'}
            inActiveStrokeOpacity={0.2}
            inActiveStrokeWidth={6}
            duration={1000}
          />
          <CircularProgress
            value={spo2}
            radius={100}
            maxValue={100}
            title={'SPO2'}
            titleColor={'black'}
            titleStyle={{ fontWeight: 'bold' }}
            inActiveStrokeColor={'#56d2fb'}
            inActiveStrokeOpacity={0.2}
            inActiveStrokeWidth={6}
            duration={1000}
          />
          <CircularProgress
            value={temp}
            radius={100}
            maxValue={100}
            title={'Temperatura'}
            titleColor={'black'}
            titleStyle={{ fontWeight: 'bold' }}
            inActiveStrokeColor={'#56d2fb'}
            inActiveStrokeOpacity={0.2}
            inActiveStrokeWidth={6}
            duration={1000}
          />
    </View >
  );
};

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',    
  },
});