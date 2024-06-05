import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Categories from '../../Components/Categories';
import MenuList from '../Categories/MenuList';
import CategoriesScreen from '../Categories/CategoriesScreen';
import ItemScreen from '../Categories/ItemScreen';
import HomeScreen from '../Home/HomeScreen';

const Stack = createStackNavigator();

const CategoriesNavigation = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='CategoriesScreen' component={CategoriesScreen}/>
      <Stack.Screen name='MenuList' component={MenuList}/>
      <Stack.Screen name='ItemScreen' component={ItemScreen}/>
    </Stack.Navigator>
  )
}

export default CategoriesNavigation