import React from 'react';
import { AuthProvider } from './context/AuthProvider'; // Ajusta la ruta según sea necesario
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot, Stack } from 'expo-router';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <Stack />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}