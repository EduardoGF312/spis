import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const RegistroManual = () => {
  const route = useRoute();
  const pacienteActual = route.params.pacienteActual;
  const [nombre, setNombre] = useState(pacienteActual.nombre);
  const [apellido, setApellido] = useState(pacienteActual.apellido);
  const [genero, setGenero] = useState(pacienteActual.genero);
  const [edad, setEdad] = useState(pacienteActual.edad ? pacienteActual.edad.toString() : '');
  const [cuatri, setCuatri] = useState(pacienteActual.cuatrimestre ? pacienteActual.cuatrimestre.toString() : '');
  const [carrera, setCarrera] = useState(pacienteActual.carrera);
  const [grupo, setGrupo] = useState(pacienteActual.grupo);
  const [padecimiento, setPadecimiento] = useState(pacienteActual.padecimiento);
  const [medicamento, setMedicamento] = useState(pacienteActual.medicamento);
  const [observacion, setObservacion] = useState(pacienteActual.observaciones);
  const navigation = useNavigation();

  useEffect(() => {
    if (pacienteActual.edad) {
      setEdad(pacienteActual.edad.toString());
    }
    if (pacienteActual.cuatrimestre) {
      setCuatri(pacienteActual.cuatrimestre.toString());
    }
  }, [pacienteActual.edad, pacienteActual.cuatrimestre])

  const handleGoBack = () => {
    navigation.navigate('VerPaciente');
  }

  const sendFormData = async () => {
    const formData = {
      nombre: nombre,
      apellido: apellido,
      genero: genero,
      edad: parseInt(edad, 10),
      carrera: carrera,
      cuatrimestre: parseInt(cuatri, 10),
      grupo: grupo,
      padecimiento: padecimiento,
      medicamento: medicamento,
      observaciones: observacion
    }

    try {
      const response = await axios.patch(`https://integradora.fly.dev/pacientes/modificar/${pacienteActual._id}`, formData)
      Toast.show({
        type: 'success',
        text1: 'Paciente modificado con éxito',
      });
      navigation.navigate('VerPaciente');
    } catch (error) {
      console.error(error)
      Toast.show({
        type: 'error',
        text1: 'Error al modificar al paciente',
      });
    }
  }

  const handleSubmit = () => {
    sendFormData();
  }

  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.titleAndIcon}>
        <Icon name='arrow-left' size={30} color='#22c55e' onPress={handleGoBack} style={{ flexDirection: 'row', justifyContent: 'space-between', width: 55, marginTop: 48, paddingStart: 12 }} />
        <Text style={[styles.title, { color: '#22c55e', paddingEnd: 100 }]}>Editar Paciente</Text>
      </View>

      <View style={styles.part1}>

        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={(text) => setNombre(text)}
        />

        <Text style={styles.label}>Apellido:</Text>
        <TextInput
          style={styles.input}
          value={apellido}
          onChangeText={(text) => setApellido(text)}
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
          keyboardType="number-pad"
          style={styles.input}
        />

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
          keyboardType="number-pad"
          style={styles.input}
        />

        <Text style={styles.label}>Grupo:</Text>
        <TextInput
          style={styles.input}
          value={grupo}
          onChangeText={(text) => setGrupo(text)}
        />

        <Text style={styles.label}>Padecimiento:</Text>
        <TextInput
          style={styles.input}
          value={padecimiento}
          onChangeText={(text) => setPadecimiento(text)}
        />

        <Text style={styles.label}>Medicamento:</Text>
        <TextInput
          style={styles.input}
          value={medicamento}
          onChangeText={(text) => setMedicamento(text)}
        />

        <Text style={styles.label}>Observaciones:</Text>
        <TextInput
          value={observacion}
          onChangeText={(text) => setObservacion(text)}
          style={styles.input}
          multiline={true}
          numberOfLines={4}
        />

      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Actualizar</Text>
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
  titleAndIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -2,
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