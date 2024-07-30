import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import app from '../firebaseConfig';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Link, useRouter } from 'expo-router';

const auth = getAuth(app);

export default function SignUp({ props }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const signup = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Account created!');
        Alert.alert('Registro', 'Cuenta creada con éxito!');
        router.push('/Home'); // Asegúrate de que 'Home' es la ruta correcta
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error', 'La cuenta ya existe o hay un problema con el registro.');
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.iniciarSesion}>Registrate</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.cajaInput}>
          <TextInput placeholder="Email" placeholderTextColor={"black"} style={{ fontSize: 16 }} onChangeText={(text) => setEmail(text)} />
        </View>
        <View style={styles.cajaInput}>
          <TextInput placeholder="Contraseña" placeholderTextColor={"black"} style={{ fontSize: 16, paddingTop: 35 }} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
        </View>
      </View>
      <View style={styles.optionContainer}>
        <Link asChild href="/LogIn">
          <Pressable><Text style={styles.buttonText}>¿Ya tienes una cuenta? Inicia sesión</Text></Pressable>
        </Link>
      </View>
      <View>
        <Pressable style={styles.botonContainer} onPress={signup}><Text style={{ color: "#ffff", fontWeight: "bold" }}>Registrarme</Text></Pressable>
      </View>
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
  iniciarSesion: {
    color: 'black',
    fontSize: 32,
    top: -150,
    left: -45,
    fontWeight: "bold"
  },
  inputContainer: {
    top: -75,
    left: -45,
  },
  cajaInput: {
    borderBottomWidth: 2,
    width: 200,
    marginBottom: 5,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250, // Ajusta este valor según sea necesario
  },
  buttonText: {
    color: "#4285F4",
    fontSize: 10,
    top: -55,
    left: -20
  },
  botonContainer: {
    backgroundColor: "#121135",
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: { height: 3 },
    shadowOpacity: "0.3",
  }
});
