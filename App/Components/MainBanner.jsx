import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApis from '../Utils/GlobalApis';

const screenWidth = Dimensions.get('window').width;

const MainBanner = () => {

    const [mainBanners, setMainBanners] = useState([])

    useEffect(() => {
        const fetchMainBanners = async() => {
            try{
                const { mainBanners } = await GlobalApis.getMainBanners();
                setMainBanners(mainBanners);
            } catch (error) {
                console.log("Error fetching banners", error)
            }
        }
        fetchMainBanners();
    },[])
  return (
    <View style={{}}>
      <FlatList
        data={mainBanners}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        renderItem={({item}) => (
          <View style={[styles.item, { width: screenWidth * 0.65 }]}>
            <Image
              source={{ uri: item?.image?.url }}
              style={[styles.image, { width: '100%', height: 120 }]}
            />
          </View>
        )}
      />
    </View>
  )
}

export default MainBanner

const styles = StyleSheet.create({
  contentContainer: {
    gap: 10
  },
  item: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 10, 
  },
})