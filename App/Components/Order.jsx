import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../assets/Colors';
import moment from 'moment';

const Order = ({item, qty}) => {

    const formattedDate = moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss');

  return (
    <View style={styles.orderRow}>
      <View style={styles.orderInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.row}>
            <Text style={styles.qty}>{qty} pcs</Text>
            <Text style={styles.price}>{item.price}</Text>
        </View>
      <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <View style={styles.imageBox}>
        <Image style={styles.image} source={{uri: item.image.url}}/>
      </View>
    </View>
  )
}

export default Order

const styles = StyleSheet.create({
    orderRow: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10
    },
    orderInfo: {
        width: '70%',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        width: '70%'
    },
    name: {
        fontFamily: 'Outfit-bold'
    },
    price: {
        color: Colors.PEACH,
        fontFamily: 'Outfit-bold'
    },
    qty: {
        fontFamily: 'Outfit',
        color: Colors.GRAY
    },
    date: {
        fontFamily: 'Outfit-Medium',
        marginTop: 10
    },
    imageBox: {
        width: '30%',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: 120,
        objectFit: 'contain'
    }
})