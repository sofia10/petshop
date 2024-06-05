import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Home/HomeScreen';
import StoresScreen from '../Stores/StoresScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import OrdersScreen from '../Orders/OrdersScreen'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import Colors from '../../../assets/Colors';
import CategoriesScreen from '../Categories/CategoriesScreen';
import CategoriesNavigation from './CategoriesNavigation';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
    screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PEACH,
        tabBarInactiveTintColor: Colors.BLACK
    }}>
        <Tab.Screen name="Home" component={HomeScreen}
            options={{
                tabBarLabel:({color}) => (
                    <Text style={[styles.menuText, {color: color}]}>Home</Text>
                ),
                tabBarIcon:({color, size})=>(
                    <FontAwesome name="home" size={size} color={color} />
                )
            }}
        />
        <Tab.Screen name="Categories" component={CategoriesNavigation}
            options={{
                tabBarLabel:({color}) => (
                    <Text style={[styles.menuText, {color: color}]}>Categories</Text>
                ),
                tabBarIcon:({color, size})=>(
                    <Entypo name="list" size={size} color={color} />
                )
            }}
        />
        <Tab.Screen name="Stores" component={StoresScreen}
            options={{
                tabBarLabel:({color}) => (
                    <Text style={[styles.menuText, {color: color}]}>Stores</Text>
                ),
                tabBarIcon:({color, size})=>(
                    <Entypo name="location-pin" size={size} color={color} />
                )
            }}
        />
        <Tab.Screen name="Orders" component={OrdersScreen}
            options={{
                tabBarLabel:({color}) => (
                    <Text style={[styles.menuText, {color: color}]}>Orders</Text>
                ),
                tabBarIcon:({color, size})=>(
                    <FontAwesome name="bookmark" size={size} color={color} />
                )
            }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen}
            options={{
                tabBarLabel:({color}) => (
                    <Text style={[styles.menuText, {color: color}]}>Profile</Text>
                ),
                tabBarIcon:({color, size})=>(
                    <FontAwesome name="user-circle" size={size} color={color} />
                )
            }}
        />
    </Tab.Navigator>
  )
}

export default TabNavigation

const styles = StyleSheet.create({
    menuText: {
        fontFamily: 'Outfit-Medium',
        fontSize: 12, 
        marginTop: -7,
    }
})