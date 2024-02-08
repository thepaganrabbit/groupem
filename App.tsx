/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomePage from './pages/Home';
import GrouPage from './pages/GroupPage';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Gourp Em">
        <Stack.Screen name="Group Em" component={HomePage} />
        <Stack.Screen name="group" component={GrouPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
