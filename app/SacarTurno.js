import 'setimmediate';
import { View, Text, StyleSheet, Alert, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { firestore } from '../firebaseConfig'; // Asegúrate de ajustar la ruta según la ubicación de tu archivo firebaseConfig.js
import { collection, addDoc } from 'firebase/firestore'; // Importa las funciones necesarias de Firestore
import { Link } from 'expo-router';

export default function SacarTurno() {
  const [selectedDate, setSelectedDate] = useState('');
  const [userInfo, setUserInfo] = useState({
    email: '',
    nombre: '',
    apellido: '',
    numeroTel: '',
    señado: false,
  });

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleSaveTurno = async () => {
    if (selectedDate && userInfo.email) {
      try {
        await addDoc(collection(firestore, 'turnos'), {
          ...userInfo,
          fecha: selectedDate,
        });
        Alert.alert('Éxito', 'Turno guardado con éxito');
        console.log('Turno guardado con éxito:', {
          ...userInfo,
          fecha: selectedDate,
        });
      } catch (error) {
        Alert.alert('Error', 'No se pudo guardar el turno');
        console.error('Error al guardar el turno:', error);
      }
    } else {
      Alert.alert('Advertencia', 'Por favor, selecciona una fecha y completa los datos del usuario');
    }
  };

  return (
    <View style={styles.container}>
      <Calendar onDayPress={handleDayPress} />
      <Text>Fecha seleccionada: {selectedDate}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userInfo.email}
        onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={userInfo.nombre}
        onChangeText={(text) => setUserInfo({ ...userInfo, nombre: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={userInfo.apellido}
        onChangeText={(text) => setUserInfo({ ...userInfo, apellido: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={userInfo.numeroTel}
        onChangeText={(text) => setUserInfo({ ...userInfo, numeroTel: text })}
      />
      <Pressable title="Guardar Turno" onPress={handleSaveTurno} style={styles.botones}>
        <Text style={{ color: "white" }}>Guardar Turno</Text>
      </Pressable>
      <Link asChild href="/VerTurnos">
      <Pressable title="Ver turnos" style={styles.botones}>
        <Text style={{ color: "white" }}>Ver Turnos</Text>
      </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  botones: {
    backgroundColor: "blue",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
