import React from 'react';
import AppLoading from 'expo-app-loading'
import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular, Roboto_500Medium
  });

  if(!fontsLoaded)
    return <AppLoading />

  return (
    <Routes />
  );
}