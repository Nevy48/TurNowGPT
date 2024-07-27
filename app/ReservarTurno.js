import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { firestore } from '../firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useRouter, useRoute } from 'expo-router';

export default function ReservarTurno() {
  const [horarios, setHorarios] = useState([]);
  const route = useRoute();
  const { empresaId } = route.params; // Obtener el ID de la empresa desde los parámetros de navegación
  const router = useRouter();

  useEffect(() => {
    const fetchHorarios = async () => {
      const horariosSnapshot = await getDocs(collection(firestore, `empresas/${empresaId}/horariosDisponibles`));
      const horariosList = horariosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHorarios(horariosList);
    };

    fetchHorarios();
  }, [empresaId]);

  const handleReservarTurno = async (horario) => {
    try {
      await addDoc(collection(firestore, 'turnos'), {
        empresaId,
        ...horario,
        reservado: true,
      });
      Alert.alert('Éxito', 'Turno reservado con éxito');
      router.push('/MyTurns');
    } catch (error) {
      Alert.alert('Error', 'No se pudo reservar el turno');
      console.error('Error al reservar el turno:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={horarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{`Día: ${item.dia}`}</Text>
            <Text>{`Hora de Inicio: ${item.horaInicio}`}</Text>
            <Text>{`Hora de Fin: ${item.horaFin}`}</Text>
            <Button title="Reservar" onPress={() => handleReservarTurno(item)} />
          </View>
        )}
      />
    </View>
  );
}

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
