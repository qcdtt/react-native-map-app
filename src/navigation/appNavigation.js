import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import Map from '../screens/Map/Map';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      {
        <Stack.Navigator
        initialRouteName='Home'
          screenOptions={{
            headerStyle: {
                backgroundColor: '#1253bc',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                padding: 10,
              },
          }}>
          <Stack.Screen name="Home" component={Home} options={{ title: 'Map App' }}/>
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
};

export default AppStack;
