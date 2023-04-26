import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const RegistroManual = () => {
  const [fecha, setFecha] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [oximetria, setOximetria] = useState('');
  const [frecuencia, setFrecuencia] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [observacion, setObservacion] = useState('');
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getAlumnos()

    const interval = setInterval(getAlumnos, 1000);
    return () => clearInterval(interval);
  }, [])

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


  async function getAlumnos() {
    const pacientesVal = await axios.get("https://integradora.fly.dev/pacientes");
    setAlumnos(pacientesVal.data)
  }

  const sendFormData = async () => {
    const alumnoSeleccionado = alumnos.find((alumno) => alumno._id === selectedAlumno);

    // Si no se encuentra el alumno, muestra un mensaje de error y retorna
    if (!alumnoSeleccionado) {
      Toast.show({
        type: 'error',
        text1: 'Selecciona a un alumno',
      })
      return
    }

    if (!fecha || !oximetria || !frecuencia || !temperatura) {
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
      oximetria: oximetria,
      frecuencia: frecuencia,
      temperatura: temperatura,
      observaciones: observacion
    }

    try {
      const response = await axios.post('https://integradora.fly.dev/registros', formData)
      Toast.show({
        type: 'success',
        text1: 'Registro guardado con éxito',
      });
      setFecha('');
      setOximetria('');
      setFrecuencia('');
      setTemperatura('');
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
      <Text style={[styles.title, { color: '#22c55e' }]}>Registro manual</Text>

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
        <TextInput
          value={oximetria}
          onChangeText={setOximetria}
          placeholder="95"
          keyboardType="number-pad"
          style={styles.input}
        />

        <Text style={styles.label}>Frecuencia cardiaca:</Text>
        <TextInput
          value={frecuencia}
          onChangeText={setFrecuencia}
          placeholder="100"
          keyboardType="number-pad"
          style={styles.input}
        />

        <Text style={styles.label}>Temperatura:</Text>
        <TextInput
          value={temperatura}
          onChangeText={setTemperatura}
          placeholder="34"
          keyboardType="number-pad"
          style={styles.input}
        />

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

export default RegistroManual

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