import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import IndexScreen from './src/screens/IndexScreen';
import GradeScreen from './src/screens/GradeScreen';
import SavingScreen from './src/screens/SavingScreen';
import PaymentScreen from './src/screens/PaymentScreen';

const navigator = createStackNavigator({
    Index: IndexScreen,
    Grade: GradeScreen,
    Saving: SavingScreen,
    Payment: PaymentScreen
});

const App = createAppContainer(navigator);

export default () => {
    return <App />;
};
