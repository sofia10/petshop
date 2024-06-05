import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading';
import Search  from '../../Components/Search'
import Colors from '../../../assets/Colors';
import GlobalApis from '../../Utils/GlobalApis';
import { useNavigation } from '@react-navigation/native';

const colorOptions = [
  { backgroundColor: Colors.LIGHT_YELLOW, borderColor: Colors.YELLOW },
  { backgroundColor: Colors.LIGHT_GREEN, borderColor: Colors.GREEN },
  { backgroundColor: Colors.LIGHT_PINK, borderColor: Colors.PINK },
  { backgroundColor: Colors.LIGHT_BLUE, borderColor: Colors.BLUE },
  { backgroundColor: Colors.LIGHT_PURPLE, borderColor: Colors.PURPLE },
];

const screenWidth = Dimensions.get('window').width;

const CategoriesScreen = () => {

  const navigation = useNavigation();

  const [ categories, setCategories ] = useState([]);
  const [ subCategories, setSubCategories ] = useState([]);
  const [ activeCategory, setActiveCategory ] = useState(null);

  useEffect(() => {
    fetchCategories();
  },[])

  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(categories[0].name);
      fetchSubCategories(categories[0].name);
    }
  },[categories])

  const fetchCategories = async() => {
    try{
        const { categories } = await GlobalApis.getCategories();
        setCategories(categories);
    } catch (error) {
        console.log("Error fetching categories", error)
    }
  }
  const fetchSubCategories = async(category) => {
    try{
        const { subCategories } = await GlobalApis.getSubCategories({category});
        setSubCategories(subCategories);
    } catch (error) {
        console.log("Error fetching categories", error)
    }
  }

  handleCategoryPress = (category) => {
    setActiveCategory(category);
    fetchSubCategories(category);
  }

  const getBgColor = () => {
    const randomIndex = Math.floor(Math.random() * colorOptions.length);
    return colorOptions[randomIndex];
  };

  return (
    <SafeAreaView style={styles.container}>
      <Heading title="Explore Categories" isCentered={true} />
      <View  style={styles.wrapper}>
        <Search/>
        <View style={styles.categories}>
          <FlatList
            data={categories}
            contentContainerStyle={styles.contentContainer}
            renderItem={({item}) => (
              <TouchableOpacity 
                style={[styles.category, item.name === activeCategory && styles.activeCategory]} 
                onPress={() => handleCategoryPress(item.name)}>
                <Text style={styles.title}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View>
          <FlatList
            data={subCategories}
            numColumns={2}
            contentContainerStyle={styles.contentSubContainer}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('MenuList', {subCategory: item})}
                style={[styles.subCategoryItem, getBgColor()]}>
                <Image style={styles.image} source={{ uri: item.image.url }} />
                <Text style={styles.subCategoryName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    paddingLeft: 40,
    flex: 1,
    display: 'flex'
  },
  wrapper: {
    paddingHorizontal: 20
  },
  categories: {
    flexDirection: 'row',
    marginVertical: 20
  },
  contentContainer: {
    flexDirection: 'row',
    gap: 8
  },
  category: {
    borderWidth: 1,
    borderColor: Colors.BORDER_GRAY,
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 20
  },
  activeCategory: {
    borderColor: Colors.PEACH,
    backgroundColor: Colors.PEACH_LIGHT
  },
  title: {
    fontSize: 16,
    fontFamily: 'Outfit-Medium'
  },
  contentSubContainer: {
    gap: 20
  },  
  subCategoryItem: {
    borderWidth: 1,
    borderRadius: 10,
    paddingBottom: 20,
    width: '45%',
    display: 'flex',
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 160,
    height: 130,
    resizeMode: 'contain'
  },
  subCategoryName: {
    fontSize: 18,
    fontFamily: 'Outfit-Medium',
    textAlign: 'center',
    marginTop: 10
  }
})