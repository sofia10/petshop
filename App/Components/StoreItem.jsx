import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../assets/Colors';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const StoreItem = ({item}) => {
    const handlePress = () => {
        Linking.openURL(`tel:${item.phone}`);
    };

  return (
    <View style={styles.store}>
        <View style={styles.row}>
            <View style={styles.icon}>
                <Entypo name="location-pin" size={24} color={Colors.PEACH} />
            </View>
            <Text style={styles.name}>{item.location}</Text>
        </View>
        <TouchableOpacity  onPress={handlePress} style={styles.row} >
            <View style={styles.icon}>
                <Ionicons name="call" size={16} color={Colors.PEACH} />
            </View>
            <Text style={styles.name}>{item.phone}</Text>
        </TouchableOpacity>
        <View style={styles.row}>
            <View style={styles.icon}>
                <FontAwesome5 name="clock" size={18} color={Colors.PEACH} />
            </View>
            <Text style={styles.name}>{item.workingHours}</Text>
        </View>
    </View>
  )
}

export default StoreItem

const styles = StyleSheet.create({
    store: {
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 10
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
      },
      name: {
        fontFamily: 'Outfit-Bold',
        color: Colors.BLACK,
        fontSize: 14
      },
      icon: {
        width: 30,
        alignItems: 'center',
      }
})