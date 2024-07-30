import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { firestore, auth } from '../firebaseConfig';

export default function CrearEmpresa() {
  const [empresa, setEmpresa] = useState({
    nombre: '',
    descripcion: '',
  });

  const router = useRouter();
  const user = auth.currentUser;

  const handleCrearEmpresa = async () => {
    if (!user) {
      Alert.alert('Error', 'Debes estar autenticado para crear una empresa');
      return;
    }

    if (empresa.nombre && empresa.descripcion) {
      try {
        const userUid = user.uid;
        const docRef = await addDoc(collection(firestore, `users/${userUid}/empresas`), empresa);
        Alert.alert('Éxito', 'Empresa creada con éxito');
        router.push({
          pathname: '/AgregarHorario',
          params: { userId: userUid, empresaId: docRef.id }
        });
      } catch (error) {
        Alert.alert('Error', 'No se pudo crear la empresa');
        console.error('Error al crear la empresa:', error);
      }
    } else {
      Alert.alert('Advertencia', 'Por favor, complete todos los campos');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nombre de la Empresa</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={empresa.nombre}
        onChangeText={(text) => setEmpresa({ ...empresa, nombre: text })}
      />
      <Text>Descripción</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={empresa.descripcion}
        onChangeText={(text) => setEmpresa({ ...empresa, descripcion: text })}
      />
      <Button title="Crear Empresa" onPress={handleCrearEmpresa} />
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
