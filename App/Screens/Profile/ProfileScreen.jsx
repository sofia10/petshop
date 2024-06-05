import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import Colors from '../../../assets/Colors';
import { useClerk, useUser } from '@clerk/clerk-expo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const ProfileScreen = () => {

  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View style={styles.container}>
      <View style={styles.headingBlock}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.row}>
          <Image style={styles.image} source={{uri: user.imageUrl}}/>
          <View>
            <Text style={styles.name}>{user.fullName}</Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.infoRow} onPress={signOut}>
          <Text style={styles.signout}>Sign Out</Text>
          <View style={styles.icon}>
            <MaterialIcons name="logout" size={24} color="red" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PEACH,
  },
  headingBlock: {
    height: '40%',
    backgroundColor: Colors.PEACH,
    paddingHorizontal: 20,
    paddingTop: 90
  },
  title: {
    fontSize: 28,
    fontFamily: 'Outfit-Bold',
    color: Colors.WHITE
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: '50%',
    marginRight: 20
  },
  content: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 20,
    paddingTop: 50,
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'flex-end'
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20
  },
  name: {
    fontSize: 24,
    color: Colors.WHITE,
    fontFamily: 'Outfit-Medium',
    marginBottom: 10
  },
  signout: {
    fontFamily: 'Outfit-Medium',
    fontSize: 20,
    marginRight: 20,
    color: 'red'
  },
  icon: {
    width: 30,
  }
})