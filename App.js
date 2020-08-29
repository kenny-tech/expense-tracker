import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './app/screens/Home';
import IncomeScreen from './app/screens/Income';
import ExpenseScreen from './app/screens/Expense';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4169e1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen}/>
        <Stack.Screen options={{ title: "Add Income" }} name="Income" component={IncomeScreen}/>
        <Stack.Screen options={{ title: "Add Expense" }} name="Expense" component={ExpenseScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;
