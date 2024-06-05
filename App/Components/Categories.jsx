import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApis from '../Utils/GlobalApis';
import Colors from '../../assets/Colors';

const screenWidth = Dimensions.get('window').width;

const Categories = () => {

    const [ categories, setCategories ] = useState([]);

    useEffect(() => {
        const fetchCategories = async() => {
            try{
                const { categories } = await GlobalApis.getCategories();
                setCategories(categories);
            } catch (error) {
                console.log("Error fetching categories", error)
            }
        }
        fetchCategories();
    },[])

    const getBgColor = (name) => {
        switch (name) {
            case 'dog' :
                return Colors.LIGHT_YELLOW;
            case 'cat' :
                    return Colors.LIGHT_GREEN;
            case 'birds' :
                return Colors.LIGHT_PINK;
            case 'rodents' :
                return Colors.LIGHT_BLUE;
        }
    }

  return (
    <View>
      <FlatList
        data={categories}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        renderItem={({item}) => (
            <TouchableOpacity style={[styles.item, { width: screenWidth * 0.4, backgroundColor: getBgColor(item.name) }]}>
                <Image  style={styles.image} source={{uri: item?.image?.url}}/>
                <Text style={styles.title}>{item?.name}</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'row',
        gap: 10
    },
    item: {
        flexDirection: 'row',
        backgroundColor: 'pink',
        borderRadius: 10,
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100
    },
    title: {
        fontFamily: 'Outfit-Medium',
        color: Colors.BLACK,
        fontSize: 20
    }
})