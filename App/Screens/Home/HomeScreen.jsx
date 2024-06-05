import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import Colors from '../../../assets/Colors';
import Header from '../../Components/Header';
import MainBanner from '../../Components/MainBanner';
import Heading from '../../Components/Heading';
import Categories from '../../Components/Categories';
import BestsellersSection from '../../Components/BestsellersSection';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <ScrollView style={styles.content}>
        <MainBanner/>
        <View style={styles.homeScreenSections}>
          <Heading title={'Browse pet types'} showSeeAll={true}/>
          <Categories/>
          <Heading title={'Trending Now'} showSeeAll={true}/>
          <BestsellersSection/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
  },
  content: {
    paddingHorizontal: 20
  },
  homeScreenSections: {
    paddingBottom: 20
  }
})