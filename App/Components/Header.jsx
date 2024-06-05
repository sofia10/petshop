import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import Colors from '../../assets/Colors';
import Search from './Search';

const Header = () => {
  return (
    <View style={styles.headerRow}>
        <Image source={require('../../assets/images/logo.jpeg')} style={styles.image}/>
        <View style={styles.search}>
          <Search/>
        </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    headerRow: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        gap: 20
    },
    image: {
        width: 50,
        height: 50
    },
    search: {
      flex: 1,
      display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: 10,
        paddingLeft: 10,
    }
})