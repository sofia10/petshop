import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import Heading from '../../Components/Heading';
import GlobalApis from '../../Utils/GlobalApis';
import { useClerk, useUser } from '@clerk/clerk-expo';
import Order from '../../Components/Order';

const OrdersScreen = () => {
  const {user} = useUser();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    user && fetchUserOrders();
  }, [user])

  const fetchUserOrders = () => {
    setLoading(true);
    GlobalApis.getOrders(user.primaryEmailAddress.emailAddress).then(
      res => {
        setOrders(res.data.orders);
        setLoading(false);
      }
    )
  }
  return (
    <SafeAreaView>
      <Heading title="My Orders" isCentered={true}/>
      <View style={{paddingHorizontal: 20}}>
        <FlatList 
          data={orders}
          onRefresh={() => fetchUserOrders()}
          refreshing={loading}
          renderItem={({item, index}) => (
              <Order item={item.menuList} qty={item.qty}/>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default OrdersScreen

const styles = StyleSheet.create({})