import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../assets/Colors'

const Heading = ({title, showSeeAll=false, isCentered=false}) => {
  return (
    <View style={[styles.headingRow,  isCentered && { justifyContent: 'center' }]}>
      <Text style={styles.title}>{title}</Text>
      {showSeeAll && 
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      }
    </View>
  )
}

export default Heading

const styles = StyleSheet.create({
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Outfit-Medium',
    color: Colors.BLACK
  },
  seeAll: {
    fontSize: 14,
    fontFamily: 'Outfit',
    color: Colors.PEACH
  }
})