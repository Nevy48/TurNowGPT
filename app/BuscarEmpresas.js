// BuscarEmpresas.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Pressable } from 'react-native';
import { firestore } from '../firebaseConfig'; // Asegúrate de ajustar la ruta según tu configuración
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Link } from 'expo-router';

export default function BuscarEmpresas({ navigation }) {
  const [queryText, setQueryText] = useState('');
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore, 'Empresas'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const empresasData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEmpresas(empresasData);
    });

    return () => unsubscribe();
  }, []);

  const filtrarEmpresas = () => {
    return empresas.filter(empresa => empresa.nombre.toLowerCase().includes(queryText.toLowerCase()));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar empresa"
        value={queryText}
        onChangeText={setQueryText}
      />
      <FlatList
        data={filtrarEmpresas()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.nombre}</Text>
            <Link href={`/AgregarHorario?empresaId=${item.id}`} asChild>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Agregar Horarios</Text>
              </Pressable>
            </Link>
            <Link href={`/VerHorarios?empresaId=${item.id}`} asChild>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Ver Horarios</Text>
              </Pressable>
            </Link>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
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
  itemContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: '80%',
  },
  itemText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});
