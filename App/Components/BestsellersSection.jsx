import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalApis from '../Utils/GlobalApis';
import MenuListItem from './MenuListItem';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../assets/Colors';

const screenWidth = Dimensions.get('window').width;

const BestsellersSection = () => {

    const navigation = useNavigation();
    const [bestsellers, setBestsellers] = useState([])

    useEffect(() => {
        const fetchBestsellers = async() => {
            try{
                const items = await GlobalApis.getRandomMenuLists();


                if (Array.isArray(items) && items.length > 0) {
                    const itemCount = Math.min(items.length, 5);
                    const randomItems = [];
                    const selectedIndices = new Set();
          
                    while (selectedIndices.size < itemCount) {
                      const randomIndex = Math.floor(Math.random() * items.length);
                      if (!selectedIndices.has(randomIndex)) {
                        selectedIndices.add(randomIndex);
                        randomItems.push(items[randomIndex]);
                      }
                    }
          
                    setBestsellers(randomItems);
                  } else {
                    console.error('No items found');
                  }
                } catch (error) {
                console.log("Error fetching banners", error)
            }
        }
        fetchBestsellers();
    },[])

    const handleItemPress = (item) => {
        navigation.navigate('ItemScreen', {item})
    }

  return (
    <View>
      <FlatList
        data={bestsellers}
        horizontal={true}
        contentContainerStyle={styles.contentContainer}
        renderItem={({item}) => (
            <MenuListItem item={item} handleItemPress={handleItemPress} styles={styles}/>
          )}
      />
    </View>
  )
}

export default BestsellersSection

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 10,
    },
})