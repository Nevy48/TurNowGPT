import 'setimmediate';
import { AsyncStorage, Pressable} from 'react-native';
import { View, Text, StyleSheet, Alert, Image, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { Icon } from "react-native-vector-icons/FontAwesome";
import { Calendar } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function Home({}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather name="menu" size={24} color="white" style={styles.iconLeft} />
        <Text style={styles.headerText}>TurNow</Text>
        <Ionicons name="notifications" size={24} color="white" style={styles.iconRight} />
      </View>
      <View>
        <Text style={styles.welcome}>Bienvenido, usuario!</Text>
      </View>
      <View style={styles.botonContainer}>
        <Link asChild href="/SacarTurno">
            <Pressable style={styles.sacarTurnoBoton}>
            <Text style={{color:"white"}}>Sacar Turno</Text>
            </Pressable>
        </Link>
        <Link asChild href="/VerTurnos">
            <Pressable style={styles.verTurnoBoton}>
                <Text>Ver Turnos</Text>
            </Pressable>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#182248",
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 50,
    textAlign: "center",
    flex: 1,
  },
  iconLeft: {
    position: "absolute",
    left: 20,
  },
  iconRight: {
    position: "absolute",
    right: 20,
  },
  welcome: {
    fontWeight: "bold",
    fontSize: 32,
    paddingTop: 40,
    paddingBottom: 40,
    textAlign: "center",
  },
  sacarTurnoBoton: {
    backgroundColor: "#07063A",
    width: 250,
    height: 50,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    marginBottom: 20,
  },
  verTurnoBoton: {
    backgroundColor: "#FFFF",
    width: 250,
    height: 50,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
  },
  botonContainer: {
    backgroundColor: "#a19ef0",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: "75%",
    alignSelf: "center",
    borderRadius: 15,
    shadowOffset: {height: 3},
    shadowOpacity: "0.3",
  }
});
