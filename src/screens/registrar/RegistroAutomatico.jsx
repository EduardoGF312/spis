import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const RegistroAutomatico = () => {
  const [fecha, setFecha] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [bpm, setBPM] = useState(null);
  const [spo, setSpO] = useState(null);
  const [temp, setTemp] = useState(null)
  const [observacion, setObservacion] = useState('');
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {

    async function getAlumnos() {
      const pacientesVal = await axios.get("https://integradora.fly.dev/pacientes");
      // setPacientes(pacientesVal.data);
      setAlumnos(pacientesVal.data)
    }

    const fetchData = async () => {
      try {
        const response = await axios.get('http://blynk.cloud/external/api/get?token=ik86R45NKaQc25kh2ziw2-wjIjEX1gz8&v1&v2&v3&v4');
        const bpmValue = response.data.v1;
        const spo2Value = response.data.v2;
        // const contadorValue = response.data.v3;
        const tempValue = response.data.v4
        setBPM(bpmValue);
        setSpO(spo2Value);
        // setContador(contadorValue);
        setTemp(tempValue);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDataAndGetAlumnos = async () => {
      await fetchData();
      await getAlumnos();
    }

    const interval = setInterval(fetchDataAndGetAlumnos, 1000);
    return () => clearInterval(interval);
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setFecha(date.toISOString().slice(0, 10));
    hideDatePicker();
  };

  const sendFormData = async () => {
    const alumnoSeleccionado = alumnos.find((alumno) => alumno._id === selectedAlumno);

    // Si no se encuentra el alumno, muestra un mensaje de error y retorna
    if (!alumnoSeleccionado) {
      Toast.show({
        type: 'error',
        text1: 'Por favor, selecciona a un alumno',
      })
      return;
    }

    if (!fecha) {
      Toast.show({
        type: 'error',
        text1: 'Campos incompletos',
        text2: 'Por favor, completa todos los campos del formulario',
      });
      return;
    }

    const formData = {
      fecha: fecha,
      nombre: alumnoSeleccionado.nombre,
      apellido: alumnoSeleccionado.apellido,
      oximetria: spo,
      frecuencia: bpm,
      temperatura: temp,
      observaciones: observacion
    }

    try {
      const response = await axios.post('https://integradora.fly.dev/registros', formData)
      Toast.show({
        type: 'success',
        text1: 'Registro guardado con éxito',
      });
      setFecha('');
      setAlumnos([]);
      setObservacion('');
      navigation.navigate('VerRegistro');
    } catch (error) {
      console.error(error)
      Toast.show({
        type: 'error',
        text1: 'Error al guardar el registro',
      });
    }
  }

  const handleSubmit = () => {
    sendFormData();
  }

  return (
    <ScrollView style={[styles.container]}>
      <Text style={[styles.title, { color: '#22c55e' }]}>Registro Automático</Text>

      <View style={styles.part1}>
        <Text style={styles.label}>Fecha:</Text>

        <TouchableOpacity activeOpacity={0.8} onPress={showDatePicker}>
          <Icon name="calendar" size={20} color="gray" style={{ position: 'absolute', right: 15, top: 18, zIndex: 1 }} />
          <TextInput
            value={fecha}
            placeholder="Selecciona una fecha"
            onChangeText={(text) => setFecha(text)}
            style={styles.input}
            editable={false}
          />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <Text style={styles.label}>Alumno:</Text>
        <Picker
          selectedValue={selectedAlumno}
          onValueChange={(itemValue) => setSelectedAlumno(itemValue)}
          style={styles.input}
        >
          <Picker.Item label='Selecciona un alumno' value={null} />
          {alumnos.map((alumno) => (
            <Picker.Item
              key={alumno._id}
              label={`${alumno.nombre} ${alumno.apellido}`}
              value={alumno._id}
            />
          ))}
        </Picker>

        <Text style={styles.label}>Oximetria:</Text>
        <Text style={styles.input}>{spo}</Text>
        
        <Text style={styles.label}>Frecuencia cardiaca:</Text>
        <Text style={styles.input}>{bpm}</Text>

        <Text style={styles.label}>Temperatura:</Text>
        <Text style={styles.input}>{temp}</Text>

        <Text style={styles.label}>Observaciones:</Text>
        <TextInput
          value={observacion}
          onChangeText={setObservacion}
          placeholder="Observaciones"
          style={styles.input}
          multiline={true}
          numberOfLines={4}
        />

      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Crear</Text>
      </TouchableOpacity>


    </ScrollView>
  )
}

export default RegistroAutomatico

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    alignSelf: "flex-start",
    paddingBottom: 15,
    marginTop: 40,
    marginLeft: 10,
  },
  subTitle: {
    fontSize: 25,
    color: 'gray',
    marginBottom: 10,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  label: {
    fontSize: 16,
    marginBottom: 10
  },
  part1: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    paddingStart: 10
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#22c55e',
    height: 50,
    width: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: -15
  },
})