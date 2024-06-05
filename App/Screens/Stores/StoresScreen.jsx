import { SafeAreaView, StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import React, {useEffect, useState} from 'react';
import Heading from '../../Components/Heading';
import Search from '../../Components/Search';
import GlobalApis from '../../Utils/GlobalApis';
import StoreItem from '../../Components/StoreItem'


const StoresScreen = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStores, setFilteredStores] = useState(stores);

  useEffect(() => {
    setFilteredStores(
      stores.filter(store =>
        store.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.workingHours.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const [stores, setStores] = useState([])

  useEffect(() => {
    fetchStoresList();
  },[])

  const fetchStoresList = async() => {
    try{
      const stores = await GlobalApis.getStoresList();
      setStores(stores.storesLists);
    } catch (error) {
      console.log("Error fetching stores", error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Heading title={'Stores'} isCentered={true}/>
      <View style={styles.content}>
        <View style={{marginBottom: 10}}>
          <Search onSearch={handleSearch}/>
        </View>
        <FlatList
          data={filteredStores}
          style={styles.list}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item, index}) => (
            <StoreItem item={item}/>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default StoresScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingHorizontal: 10,
    flex: 1
  }
})