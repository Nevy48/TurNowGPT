import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import CrearEmpresa from './CrearEmpresa';
import AgregarHorario from './AgregarHorario';
import SacarTurno from './SacarTurno';
import VerEmpresas from './VerEmpresas';
// Importa otras pantallas que quieras incluir en este stack

const Stack = createNativeStackNavigator();

export default function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CrearEmpresa" component={CrearEmpresa} />
      <Stack.Screen name="AgregarHorario" component={AgregarHorario} />
      <Stack.Screen name="SacarTurno" component={SacarTurno} />
      <Stack.Screen name="VerEmpresas" component={VerEmpresas} />
      {/* Añade más pantallas aquí */}
    </Stack.Navigator>
  );
}
