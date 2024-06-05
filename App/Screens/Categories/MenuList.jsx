import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Search from '../../Components/Search';
import { useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../../../assets/Colors';
import GlobalApis from '../../Utils/GlobalApis';
import MenuListItem from '../../Components/MenuListItem';

const screenWidth = Dimensions.get('window').width;

const MenuList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { subCategory } = route.params;
  const [ menuLists, setMenuLists ] = useState([]);
  const [ numColumns, setNumColumns ] = useState(2)

  useEffect(() => {
    fetchMenuLists(subCategory);
  }, [subCategory])

  const fetchMenuLists = async(subCategory) => {
    try{
        const { menuLists } = await GlobalApis.getMenuLists({subCategory: subCategory.name});
        setMenuLists(menuLists);
    } catch (error) {
        console.log("Error fetching categories", error)
    }
  }

  const handleItemPress = (item) => {
    navigation.navigate('ItemScreen', {item})
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.back}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{subCategory.name}</Text>
        </View>
        <FlatList
          data={menuLists}
          numColumns={numColumns}
          contentContainerStyle={styles.contentSubContainer}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({item}) => (
            <MenuListItem item={item} handleItemPress={handleItemPress}/>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default MenuList

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },  
  container: {
    paddingHorizontal: 20,
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 15
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 0
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    textAlign: 'center',
  },
  contentSubContainer: {
    paddingVertical: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  }
})