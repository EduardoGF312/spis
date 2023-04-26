import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, useColorScheme, Image } from "react-native";
import axios from "axios";
import Card from "../components/Card";


const HomeScreen = () => {
    const [mensaje, setMensaje] = useState("");
    const [pacientes, setPacientes] = useState("");
    const [registros, setRegistros] = useState("");

    useEffect(() => {
        const getCurrentHour = () => {
          const now = new Date();
          const hour = now.getHours();
          return hour;
        };
    
        const updateImageSrc = () => {
          const hour = getCurrentHour();
    
          if (hour >= 0 && hour < 7) {
            setMensaje("Buenas noches!"); // Mensaje para la imagen de la noche
          } else if (hour >= 7 && hour < 12) {
            setMensaje("Buenos dias!"); // Mensaje para la imagen de la noche
          } else if (hour >= 12 && hour < 20) {
            setMensaje("Buenas tardes!"); // Mensaje para la imagen de la noche
          } else {
            setMensaje("Buenas noches!"); // Mensaje para la imagen de la noche
          }
        };
    
    
        const fetchData = async () => {
          try {
            const response = await axios.get('https://pruebasint323.fly.dev/pacientes');
            const response2 = await axios.get('https://pruebasint323.fly.dev/registros');
            const pacientesNumber = response.data.length;
            const registrosNumber = response2.data.length;
            setPacientes(pacientesNumber);
            setRegistros(registrosNumber);
          } catch (error) {
            console.log(error);
          }
        };
    
        updateImageSrc();
    
        // Configuramos el intervalo para llamar a fetchData() cada 1000 ms (1 segundo)
        const interval = setInterval(fetchData, 1000);
    
        // Limpiamos el intervalo al desmontar el componente
        return () => clearInterval(interval);
      }, []);

    return (
        <View style={[styles.container]}>
            <Text style={[styles.title, { color: '#22c55e' }]}>{mensaje}</Text>
            <Card title="Número de pacientes" number={pacientes} iconName="people-circle"/>
            <Card title="Número de registros" number={registros} iconName="today"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 33,
        fontWeight: 'bold',
        alignSelf: "flex-start",
        paddingBottom: 60,
        marginTop: 45,
        marginLeft: 10,
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 35,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
        paddingStart: 50
    },
    backImage: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
    },
    whiteSheet: {
        width: '100%',
        height: '75%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: '#22c55e',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
});

export default HomeScreen;