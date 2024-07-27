// AgregarHorario.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { firestore } from '../firebaseConfig'; // Asegúrate de ajustar la ruta según tu configuración
import { doc, updateDoc } from 'firebase/firestore';

export default function AgregarHorario({ route }) {
  const { empresaId } = route.params; // Asegúrate de pasar el ID de la empresa como parámetro
  const [hora, setHora] = useState('');
  const [fecha, setFecha] = useState('');

  const agregarHorario = async () => {
    if (hora && fecha) {
      try {
        const empresaRef = doc(firestore, 'Empresas', empresaId);
        await updateDoc(empresaRef, {
          horarios: firestore.FieldValue.arrayUnion({ hora, fecha })
        });
        Alert.alert('Éxito', 'Horario agregado con éxito');
        setHora('');
        setFecha('');
      } catch (error) {
        Alert.alert('Error', 'No se pudo agregar el horario');
        console.error('Error al agregar horario:', error);
      }
    } else {
      Alert.alert('Advertencia', 'Por favor, completa todos los campos');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Hora"
        value={hora}
        onChangeText={setHora}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha"
        value={fecha}
        onChangeText={setFecha}
      />
      <Button title="Agregar Horario" onPress={agregarHorario} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});
