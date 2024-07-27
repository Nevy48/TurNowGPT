import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { firestore } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore'; // Importa las funciones necesarias

const TurnosScreen = () => {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const turnosSnapshot = await getDocs(collection(firestore, 'turnos'));
        const turnosList = turnosSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTurnos(turnosList);
      } catch (error) {
        console.error("Error al obtener los turnos: ", error);
      }
    };

    fetchTurnos();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={turnos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Apellido: {item.apellido}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Fecha: {item.fecha}</Text>
            <Text>Número de contacto: {item.numeroTel}</Text>
            <Text>Señado: {item.señado ? 'Sí' : 'No'}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TurnosScreen;
