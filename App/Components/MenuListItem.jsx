import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Colors from '../../assets/Colors';

const screenWidth = Dimensions.get('window').width;

const MenuListItem = ({item, handleItemPress}) => {
  return (
    <TouchableOpacity style={styles.itemBox}
        onPress={() => handleItemPress(item)}
    >
        <Image style={styles.image} source={{uri: item.image.url}}/>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">{item.name}</Text>
        <View style={styles.row}>
        <Text style={styles.weight}> {item.weight} </Text>
        <Text style={styles.price}> {item.price} </Text>
        </View>
        <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>ADD</Text>
        </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default MenuListItem

const styles = StyleSheet.create({
  itemBox: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    marginBottom: 10,
    width: (screenWidth - 50) / 2,
    padding: 10,
    paddingHorizontal: 8,
  },
  image: {
    width: 100,
    height: 140,
    alignSelf: 'center',
    marginBottom: 10,
    resizeMode: 'contain'
  },
  name: {
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  weight: {
    fontSize: 14,
    fontFamily: 'Outfit',
  },
  price: {
    fontSize: 14,
    fontFamily: 'Outfit-Bold',
  },
  btn: {
    backgroundColor: Colors.PEACH,
    borderWidth: 2,
    borderColor: Colors.PEACH,
    padding: 10,
    marginTop: 15,
    borderRadius: 20,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Outfit-Medium',
    color: Colors.WHITE
  }
})