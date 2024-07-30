import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { firestore, auth } from '../firebaseConfig';

export default function VerEmpresas() {
  const [empresas, setEmpresas] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchEmpresas = async () => {
      if (!user) {
        console.error('Usuario no autenticado');
        return;
      }

      try {
        const userUid = user.uid;
        const querySnapshot = await getDocs(collection(firestore, `users/${userUid}/empresas`));
        const empresasList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEmpresas(empresasList);
      } catch (error) {
        console.error('Error al obtener las empresas:', error);
      }
    };

    fetchEmpresas();
  }, [user]);

  return (
    <View style={styles.container}>
      <FlatList
        data={empresas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Descripción: {item.descripcion}</Text>
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
