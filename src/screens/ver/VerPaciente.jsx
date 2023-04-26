import React, { useEffect, useState } from 'react'
import { ToastAndroid, StyleSheet, Text, View, ScrollView, TouchableOpacity, Button, TextInput, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Paciente = ({ paciente, onVerDetalles, onEditar, onEliminar }) => {
    const [textoEnlace, setTextoEnlace] = useState("Ver detalles");
    const [mostrarDetalles, setMostrarDetalles] = useState(false);
    const navigation = useNavigation();

    const toggleDetalles = () => {
        setMostrarDetalles(!mostrarDetalles);
        setTextoEnlace(mostrarDetalles ? "Ver detalles" : "Ocultar detalles");
    };

    const showConfirmation = () => {
        Alert.alert(
            'Eliminar paciente',
            '¿Estás seguro de que deseas eliminar este paciente?',
            [
                {
                    text:'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Eliminar',
                    onPress: () => {
                        onEliminar(paciente._id)
                        Toast.show({
                            type: 'success',
                            text1: 'Paciente eliminado con éxito',
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
                    <Text style={styles.nombre}>{paciente.nombre} {paciente.apellido} de {paciente.cuatrimestre}°{paciente.grupo}</Text>
                    <Text style={styles.edad}>{paciente.edad} años</Text>
                    <Text style={styles.edad}>{paciente.carrera}</Text>
                </View>
            </View>
            {mostrarDetalles && (
                <View>
                    <View style={styles.detalles}>
                        <Text style={styles.info}>Genero: {paciente.genero}</Text>
                        <Text style={styles.info}>Padecimiento: {paciente.padecimiento}</Text>
                        <Text style={styles.info}>Medicamento: {paciente.medicamento}</Text>
                        <Text style={styles.info}>Observaciones: {paciente.observaciones}</Text>
                    </View>
                </View>
            )}
            <View style={styles.verMasContainer}>
                <TouchableOpacity onPress={toggleDetalles}>
                    <Text style={styles.verMas}>{textoEnlace}</Text>
                </TouchableOpacity>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('ModificarPaciente', { pacienteActual: paciente })}>
                        <Icon name='pen' size={20} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={showConfirmation}>
                        <Icon name='trash' size={20} color='black' />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}

const VerPaciente = () => {
    const [listaPacientes, setListaPacientes] = useState([]);
    const [searchActive, setSearchActive] = useState(false);
    const [searchText, setSearchText] = useState('');

    const toggleSearch = () => {
        setSearchActive(!searchActive);
        if (searchActive) {
            setSearchText('');
        }
    }

    const filteredPacientes = listaPacientes.filter((paciente) =>
        paciente.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
        paciente.apellido.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        async function getPacientes() {
            try {
                const pacientesVal = await axios.get("https://integradora.fly.dev/pacientes");
                setListaPacientes(pacientesVal.data);
            } catch (error) {
                console.error(error)
            }
        }

        getPacientes();

        const interval = setInterval(getPacientes, 1000);

        return () => clearInterval(interval);

    }, []);



    const verDetalles = id => {
        const nuevaLista = listaPacientes.map(paciente => {
            if (paciente._id === id) {
                return { ...paciente, mostrarDetalles: !paciente.mostrarDetalles };
            } else {
                return paciente;
            }
        });
        setListaPacientes(nuevaLista);
    };

    async function handleEliminar(id) {
        try {
            await axios.delete(`https://integradora.fly.dev/pacientes/eliminar/${id}`);
            // Eliminar el paciente de la lista actual y actualizar el estado
            const nuevaLista = listaPacientes.filter(paciente => paciente._id !== id);
            setListaPacientes(nuevaLista);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.titleAndIcon}>
                    <Text style={[styles.title, { color: '#22c55e', paddingEnd: 10 }]}>Lista de pacientes</Text>
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
                        placeholder="Buscar paciente por nombre o apellidos"
                    />
                )}
                {filteredPacientes.map(paciente => (
                    <Paciente
                        key={paciente._id}
                        paciente={paciente}
                        onVerDetalles={verDetalles}
                        onEliminar={handleEliminar.bind(this, paciente._id)}
                    />
                ))}
            </View>
        </ScrollView>
    );
};


export default VerPaciente

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 55
    },
    title: {
        fontSize: 33,
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
        width: 55,
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