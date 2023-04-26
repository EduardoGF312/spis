import React, { useEffect, useState } from 'react'
import { ToastAndroid, Alert, StyleSheet, Text, View, ScrollView, TouchableOpacity, Button, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Registro = ({ registro, onEliminar }) => {
    const [textoEnlace, setTextoEnlace] = useState("Ver detalles");
    const [mostrarDetalles, setMostrarDetalles] = useState(false);
    const navigation = useNavigation();

    const toggleDetalles = () => {
        setMostrarDetalles(!mostrarDetalles);
        setTextoEnlace(mostrarDetalles ? "Ver detalles" : "Ocultar detalles");
    };

    const showConfirmation = () => {
        Alert.alert(
            'Eliminar registro',
            '¿Estás seguro de que deseas eliminar este registro?',
            [
                {
                    text:'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Eliminar',
                    onPress: () => {
                        onEliminar(registro._id);
                        Toast.show({
                            type: 'success',
                            text1: 'Registro eliminado con éxito',
                        });
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.paciente}>
            <View style={styles.infoYBotones}>
                <View style={styles.datos}>
                    <Text style={styles.nombre}>{registro.nombre} {registro.apellido}</Text>
                    <Text style={styles.edad}>Fecha: {registro.fecha}</Text>
                </View>
            </View>
            {mostrarDetalles && (
                <View>
                    <View style={styles.detalles}>
                        <Text style={styles.info}>Oximetría: {registro.oximetria}</Text>
                        <Text style={styles.info}>Frecuencia: {registro.frecuencia}</Text>
                        <Text style={styles.info}>Temperatura: {registro.temperatura}</Text>
                        <Text style={styles.info}>Observaciones: {registro.observaciones}</Text>
                    </View>
                </View>
            )}
            <View style={styles.verMasContainer}>
                <TouchableOpacity onPress={toggleDetalles}>
                    <Text style={styles.verMas}>{textoEnlace}</Text>
                </TouchableOpacity>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={showConfirmation}>
                        <Icon name='trash' size={20} color='black' />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}

const VerRegistro = () => {
    const [listaRegistros, setListaRegistros] = useState([]);
    const [searchActive, setSearchActive] = useState(false);
    const [searchText, setSearchText] = useState('');

    const toggleSearch = () => {
        setSearchActive(!searchActive);
        if (searchActive) {
            setSearchText('');
        }
    }

    const filteredRegistros = listaRegistros.filter((registro) =>
        registro.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
        registro.apellido.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        async function getRegistros() {
            try {
                const registrosVal = await axios.get("https://integradora.fly.dev/registros");
                setListaRegistros(registrosVal.data);
            } catch (error) {
                console.error(error)
            }
        }

        getRegistros();

        const interval = setInterval(getRegistros, 1000);

        return () => clearInterval(interval);

    }, []);

    const verDetalles = id => {
        const nuevaLista = listaRegistros.map(registro => {
            if (registro._id === id) {
                return { ...registro, mostrarDetalles: !registro.mostrarDetalles };
            } else {
                return registro;
            }
        });
        setListaRegistros(nuevaLista);
    };

    async function handleEliminar(id) {
        try {
            await axios.delete(`https://integradora.fly.dev/registros/eliminar/${id}`)
            const nuevaLista = listaRegistros.filter(registro => registro._id !== id);
            setListaRegistros(nuevaLista);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.titleAndIcon}>
                    <Text style={[styles.title, { color: '#22c55e', paddingEnd: 10 }]}>Historial de registros</Text>
                    <Icon name='search' size={30} color="#22c55e" onPress={toggleSearch} style={{ flexDirection: 'row', justifyContent: 'space-between', width: 55, marginTop: 20, paddingStart: 10 }} />
                </View>
                {searchActive && (
                    <TextInput
                        style={{
                            backgroundColor: "#E5E5E5",
                            height: 58,
                            fontSize: 16,
                            borderRadius: 10,
                            padding: 12,
                            paddingStart: 20,
                            width: '90%',
                            marginBottom: 10,
                            marginTop: 10
                        }}
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholder="Buscar registro por nombre o apellidos"
                    />
                )}
                {filteredRegistros.map(registro => (
                    <Registro
                        key={registro._id}
                        registro={registro}
                        onVerDetalles={verDetalles}
                        onEliminar={handleEliminar.bind(this, registro._id)}
                    />
                ))}
            </View>
        </ScrollView>
    );
};


export default VerRegistro;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 55
    },
    title: {
        fontSize: 29,
        fontWeight: 'bold',
        alignSelf: "flex-start",
        paddingBottom: 5,
        marginTop: 10,
        marginLeft: 10,
    },
    paciente: {
        backgroundColor: '#f2f2f2',
        width: '90%',
        minHeight: 100,
        marginVertical: 10,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderColor: "#22c55e",
        borderEndWidth: 8,
    },
    infoYBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 20,
        marginTop: 13
    },
    verMas: {
        color: 'green',
        fontSize: 18,
        marginTop: 10
    },
    nombre: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5
    },
    verMasContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 0,
    },
    titleAndIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -2,
    },
    edad: {
        fontSize: 18,
        color: 'gray',
    },
    detalles: {
        marginTop: 5,
    },
    info: {
        fontSize: 18,
    }
});