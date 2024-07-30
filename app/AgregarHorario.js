import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { firestore } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function AgregarHorario() {
  const { userId, empresaId } = useLocalSearchParams(); // Obtén los parámetros de la navegación
  const [horario, setHorario] = useState({
    dia: '',
    horaInicio: '',
    horaFin: '',
  });

  const handleAgregarHorario = async () => {
    if (horario.dia && horario.horaInicio && horario.horaFin) {
      try {
        await addDoc(collection(firestore, `users/${userId}/empresas/${empresaId}/horariosDisponibles`), horario);
        Alert.alert('Éxito', 'Horario agregado con éxito');
      } catch (error) {
        Alert.alert('Error', 'No se pudo agregar el horario');
        console.error('Error al agregar el horario:', error);
      }
    } else {
      Alert.alert('Advertencia', 'Por favor, complete todos los campos');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Día</Text>
      <TextInput
        style={styles.input}
        placeholder="Día"
        value={horario.dia}
        onChangeText={(text) => setHorario({ ...horario, dia: text })}
      />
      <Text>Hora de Inicio</Text>
      <TextInput
        style={styles.input}
        placeholder="Hora de Inicio"
        value={horario.horaInicio}
        onChangeText={(text) => setHorario({ ...horario, horaInicio: text })}
      />
      <Text>Hora de Fin</Text>
      <TextInput
        style={styles.input}
        placeholder="Hora de Fin"
        value={horario.horaFin}
        onChangeText={(text) => setHorario({ ...horario, horaFin: text })}
      />
      <Button title="Agregar Horario" onPress={handleAgregarHorario} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
