import React, { useState } from 'react';
import { Link, useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import appFirebase from '../credenciales';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

const auth = getAuth(appFirebase)

export default function LogIn(props) {
  //creo la variable de estado
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const router = useRouter();

  const logueo = async() =>{
    if (!email || !password) {
        Alert.alert('Error', 'Por favor, complete todos los campos.');
        console.log("complete los campos")
        return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password)
      Alert.alert('Iniciando sesion', 'Accediendo...')
      console.log("LogIn exitoso")
      router.push('/Home');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'El usuario o la contraseña son incorrectos.')
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.iniciarSesion}>Iniciar sesión</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.cajaInput}>
          <TextInput placeholder="Email" placeholderTextColor={"black"} style={{fontSize: 16}} onChangeText={(text) => setEmail(text)} />
        </View>

        <View style={styles.cajaInput}>
          <TextInput placeholder="Contraseña" placeholderTextColor={"black"} style={{fontSize: 16, paddingTop: 35}} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
        </View>
      </View>
      
      <View style={styles.optionContainer}>
        <Pressable><Text style={styles.buttonText}>¿Olvidaste tu contraseña?</Text></Pressable>
        <Pressable><Text style={styles.buttonText}>Crear una cuenta</Text></Pressable>
      </View>
      <View >
        <Pressable style={styles.botonContainer} onPress={logueo}><Text style={{color: "#ffff", fontWeight: "bold"}}>Iniciar sesión</Text></Pressable>
      </View>
      <Link href="/">
            Volver
      </Link>
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
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center"
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
    shadowOffset: {height: 3},
    shadowOpacity: "0.3",
  }
});
