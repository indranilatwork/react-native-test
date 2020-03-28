import 'react-native-gesture-handler';
import React, {Fragment} from 'react';
// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './pages/login/login';
import Home from './pages/home/home'
import {
  View,
  Text
} from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
      // <Login />
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>

      // <Home />
  );
};



export default App;
