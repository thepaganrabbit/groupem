/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TopBar from './components/StatusBar/StatusBar';
import HomePage from './pages/Home';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
   return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Gourp Em">
        <Stack.Screen name="Group Em" component={HomePage} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
