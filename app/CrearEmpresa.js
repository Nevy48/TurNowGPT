// CrearEmpresa.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { firestore } from '../firebaseConfig'; // Asegúrate de ajustar la ruta según tu configuración
import { collection, addDoc } from 'firebase/firestore';

export default function CrearEmpresa() {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  const crearEmpresa = async () => {
    if (nombre && ubicacion) {
      try {
        await addDoc(collection(firestore, 'Empresas'), {
          nombre,
          ubicacion,
          horarios: [], // Inicialmente vacío
          otrosDetalles: '',
        });
        Alert.alert('Éxito', 'Empresa creada con éxito');
        setNombre('');
        setUbicacion('');
      } catch (error) {
        Alert.alert('Error', 'No se pudo crear la empresa');
        console.error('Error al crear la empresa:', error);
      }
    } else {
      Alert.alert('Advertencia', 'Por favor, completa todos los campos');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la empresa"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Ubicación"
        value={ubicacion}
        onChangeText={setUbicacion}
      />
      <Button title="Crear Empresa" onPress={crearEmpresa} />
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
