import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const RegistroPacientes = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [genero, setGenero] = useState('');
  const [edad, setEdad] = useState('');
  const [carrera, setCarrera] = useState('');
  const [cuatri, setCuatri] = useState('');
  const [grupo, setGrupo] = useState('');
  const [padecimiento, setPadecimiento] = useState('');
  const [medicamento, setMedicamento] = useState('');
  const [observacion, setObservacion] = useState('');
  const navigation = useNavigation();

  const sendFormData = async () => {
    if (!nombre || !apellido || !genero || !edad || !carrera || !cuatri || !grupo || !padecimiento || !medicamento || !observacion) {
      Toast.show({
        type: 'error',
        text1: 'Campos incompletos',
        text2: 'Por favor, completa todos los campos del formulario',
      });
      return;
    }

    const formData = {
      nombre: nombre,
      apellido: apellido,
      genero: genero,
      edad: edad,
      carrera: carrera,
      cuatrimestre: cuatri,
      grupo: grupo,
      padecimiento: padecimiento,
      medicamento: medicamento,
      observaciones: observacion
    }

    try {
      const response = await axios.post('https://integradora.fly.dev/pacientes', formData)
      Toast.show({
        type: 'success',
        text1: 'Paciente agregado',
      });
      setNombre('');
      setApellido('');
      setGenero('');
      setEdad('');
      setCarrera('');
      setCuatri('');
      setGrupo('');
      setPadecimiento('');
      setMedicamento('');
      setObservacion('');
      navigation.navigate('VerPaciente');
    } catch (error) {
      console.error(error)
      Toast.show({
        type: 'error',
        text1: 'Error al guardar al paciente',
      });
    }
  }

  const handleSubmit = () => {
    sendFormData();
  }

  return (
    <ScrollView style={[styles.container]}>
      <Text style={[styles.title, { color: '#22c55e' }]}>Nuevo Paciente</Text>

      <View style={[styles.form]}>
        <Text style={styles.subTitle}>Información general</Text>
        <Text style={[styles.label]}>Nombre(s): </Text>
        <TextInput
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre"
          style={styles.input}
        />
        <Text style={[styles.label]}>Apellido(s): </Text>
        <TextInput
          value={apellido}
          onChangeText={setApellido}
          placeholder="Apellidos"
          style={styles.input}
        />
        <Text style={[styles.label]}>Género:</Text>
        <Picker
          selectedValue={genero}
          onValueChange={(itemValue) => setGenero(itemValue)}
          style={styles.input}
        >
          <Picker.Item label='Seleccionar género' value={null} />
          <Picker.Item label='Masculino' value="Masculino" />
          <Picker.Item label='Femenino' value="Femenino" />
          <Picker.Item label='Otro' value="Otro" />
        </Picker>
        <Text style={[styles.label]}>Edad:</Text>
        <TextInput
          value={edad}
          onChangeText={setEdad}
          placeholder="Edad"
          keyboardType="number-pad"
          style={styles.input}
        />
      </View>

      <View style={[styles.form]}>
        <Text style={styles.subTitle}>Información curricular</Text>
        <Text style={[styles.label]}>Carrera: </Text>
        <Picker
          selectedValue={carrera}
          onValueChange={(itemValue) => setCarrera(itemValue)}
          style={styles.input}
        >
          <Picker.Item label='Selecciona una carrera' value={null} />
          <Picker.Item label='TSU en Desarrollo de Negocios Área Mercadotecnia' value="TSU en Desarrollo de Negocios Área Mercadotecnia" />
          <Picker.Item label='TSU en Diseño Digital Área Animación' value="TSU en Diseño Digital Área Animación" />
          <Picker.Item label='TSU en Energías Renovables Área Calidad y Ahorro De Energía' value="TSU en Energías Renovables Área Calidad y Ahorro De Energía" />
          <Picker.Item label='TSU en Lengua Inglesa' value="TSU en Lengua Inglesa" />
          <Picker.Item label='TSU en Mantenimiento Área Industrial' value="TSU en Mantenimiento Área Industrial" />
          <Picker.Item label='TSU en Mecatrónica Área Sistemas de Manufactura Flexible' value="TSU en Mecatrónica Área Sistemas de Manufactura Flexible" />
          <Picker.Item label='TSU en Operaciones Comerciales Internacionales Área Clasificación Arancelaria y Despacho Aduanero' value="TSU en Operaciones Comerciales Internacionales Área Clasificación Arancelaria y Despacho Aduanero" />
          <Picker.Item label='TSU en Procesos Industriales Área Manufactura' value="TSU en Procesos Industriales Área Manufactura" />
          <Picker.Item label='TSU en Tecnologias de la Información' value="TSU en Tecnologias de la Información" />
          <Picker.Item label='Ingeniería en desarrollo y gestión de software' value="Ingeniería en desarrollo y gestión de software" />
          <Picker.Item label='Ingeniería en energías renovables' value="Ingeniería en energías renovables" />
          <Picker.Item label='Ingeniería en logística internacional' value="Ingeniería en logística internacional" />
          <Picker.Item label='Ingeniería en mantenimiento industrial' value="Ingeniería en mantenimiento industrial" />
          <Picker.Item label='Ingeniería en mecatrónica' value="Ingeniería en mecatrónica" />
          <Picker.Item label='Licenciatura en gestión institucional, educativa y curricular' value="Licenciatura en gestión institucional, educativa y curricular" />
          <Picker.Item label='Licenciatura en innovación de negocios y mercadotecnia' value="Licenciatura en innovación de negocios y mercadotecnia" />
        </Picker>
        <Text style={[styles.label]}>Cuatrimestre: </Text>
        <TextInput
          value={cuatri}
          onChangeText={setCuatri}
          placeholder="Cuatrimestre"
          keyboardType="number-pad"
          style={styles.input}
        />
        <Text style={[styles.label]}>Grupo: </Text>
        <Picker
          selectedValue={grupo}
          onValueChange={(itemValue) => setGrupo(itemValue)}
          style={styles.input}
        >
          <Picker.Item label='Selecciona un grupo' value={null} />
          <Picker.Item label='A' value="A" />
          <Picker.Item label='B' value="B" />
        </Picker>
      </View>

      <View style={[styles.form, {marginBottom: 35}]}>
        <Text style={styles.subTitle}>Historia médica</Text>
        <Text style={[styles.label]}>Padecimiento:</Text>
        <TextInput
          value={padecimiento}
          onChangeText={setPadecimiento}
          placeholder="Padecimiento"
          style={styles.input}
        />
        <Text style={[styles.label]}>Medicamento:</Text>
        <TextInput
          value={medicamento}
          onChangeText={setMedicamento}
          placeholder="Medicamento"
          style={styles.input}
        />
        <Text style={[styles.label]}>Observaciones:</Text>
        <TextInput
          value={observacion}
          onChangeText={setObservacion}
          placeholder="Observaciones"
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Subir</Text>
      </TouchableOpacity>


    </ScrollView>
  )
}

export default RegistroPacientes

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
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
  form: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    marginBottom: 5,
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