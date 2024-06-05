import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../../assets/Colors';

const Search = ({ onSearch }) => {
  return (
    <View style={styles.searchBarContainer}>
        <FontAwesome name="search" style={styles.searchIcon} />
        <TextInput 
            style={styles.textInput} 
            placeholder='Search Product or Brand'
            placeholderTextColor={Colors.GRAY}
            onChangeText={onSearch}
        />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    searchBarContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: 10,
        paddingLeft: 10,
    },
    textInput: {
        paddingHorizontal: 10,
        fontSize: 16,
        flex: 1,
        color: Colors.GRAY,
        fontFamily: 'Outfit',
        height: 50
    },
    searchIcon: {
        color: Colors.BLACK,
        fontSize: 24,
    }
})