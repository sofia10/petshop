import { SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../assets/Colors';
import { useUser } from '@clerk/clerk-expo';
import GlobalApis from '../../Utils/GlobalApis';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const ItemScreen = ({route}) => {

  const { user } = useUser();
  
  const navigation = useNavigation();
  const {item} = route.params;
  const [ seeDetails, setSeeDetails ] = useState(false);
  const [ seeComposition, setSeeComposition ] = useState(false);
  const [ qty, setQty ] = useState(1);
  
  const handleDecreaseQty = () =>{
    if(qty > 1){
      setQty(qty-1)
    }
  }
  const handleIncreaseQty = () => {
    setQty(qty + 1)
  }
  const handleQtyChange = (text) => {
    if(text === ''){
      setQty('');
      return;
    }
    const numericValue = parseInt(text);
    if (!isNaN(numericValue)) {
      setQty(numericValue);
    }
  }

  const createNewOrder = () => {
    const data = {
      userName: user.fullName,
      userEmail: user.primaryEmailAddress.emailAddress,
      id: item.id,
      qty: qty
    }

    GlobalApis.createOrder(data).then(
      res => {
          Toast.show({
              type: 'success',
              text1: 'Order Created Successfully',
              position: 'bottom',
              visibilityTime: 3000,
          })
          // ToastAndroid.show('Order Created Successfully', ToastAndroid.LONG)
      }
    ).catch(
        err => {
            console.error("Error creating order:", err);
            Toast.show({
                type: 'error',
                text1: 'Failed to Create Order',
                position: 'bottom',
                visibilityTime: 3000,
            });
        }
    );
  }

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.back}
                onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <Image source={{uri: item.image.url}} style={styles.image}/>
            <View style={styles.row}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
            <Text style={styles.weight}>{item.weight}</Text>
            <View style={styles.quantity}>
              <TouchableOpacity 
                onPress={() => handleDecreaseQty()}>
                <Text style={styles.quantityBtnText}>-</Text>
              </TouchableOpacity>
              <TextInput 
                style={styles.input} 
                value={String(qty)}
                onChangeText={handleQtyChange}
                keyboardType='numeric'
              />
              <TouchableOpacity 
                onPress={() => handleIncreaseQty()}>
                <Text style={styles.quantityBtnText}>+</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity 
                onPress={() => setSeeDetails(!seeDetails)}
                style={styles.infoRow}>
                <Text style={styles.infoTitle}>Product Detail</Text>
                <Ionicons 
                  style={seeDetails ? styles.iconRotated : styles.icon}
                  name="chevron-forward-outline" size={24} color="black" />
              </TouchableOpacity>
              {seeDetails && 
                <Text style={styles.infoDesc}>{item.detail}</Text>
              }
            </View>
            <View>
              <TouchableOpacity 
                onPress={() => setSeeComposition(!seeComposition)}
                style={styles.infoRow}>
                <Text style={styles.infoTitle}>Composition</Text>
                <Ionicons 
                  style={seeComposition ? styles.iconRotated : styles.icon}
                  name="chevron-forward-outline" size={24} color="black" />
              </TouchableOpacity>
              {seeComposition && 
                <Text style={styles.infoDesc}>{item.composition}</Text>
              }
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.add} onPress={() => createNewOrder()}>
            <Text style={styles.addText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
        <Toast/>
      </SafeAreaView>
  )
}

export default ItemScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: Colors.WHITE,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  scrollView: {
    height: '90%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 10,
    paddingTop: 40,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
  },
  image: {
    width: 280,
    height: 280,
    objectFit: 'cover',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  },
  name: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    textAlign: 'left',
    width: 240
  },
  price: {
    fontFamily: 'Outfit-Bold',
    fontSize: 22
  },
  weight: {
    color: Colors.GRAY,
    fontFamily: 'Outfit',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    paddingVertical: 15
  },
  iconRotated: {
    transform: [{rotate: '-90deg'}]
  },
  infoTitle: {
    fontFamily: 'Outfit-Medium',
    fontSize: 16
  },
  infoDesc: {
    marginTop: 10,
    fontFamily: 'Outfit',
    lineHeight: 20,
    fontSize: 14
  },
  add: {
    backgroundColor: Colors.PEACH,
    borderWidth: 2,
    borderColor: Colors.PEACH,
    padding: 15,
    marginTop: 15,
    borderRadius: 20,
    width: '100%',
    alignSelf: 'center'
  },
  addText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: Colors.WHITE
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 8,
    width: 34,
    height: 34,
    marginHorizontal: 10,
    fontSize: 18,
    textAlign: 'center'
  },
  
  quantityBtnText: {
    fontSize: 30,
    color: Colors.BLACK
  }
})