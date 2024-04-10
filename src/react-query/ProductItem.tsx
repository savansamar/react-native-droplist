import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface ProductItemProps{
  item:any
}

const ProductItem = (Props: ProductItemProps) => {
  return (
    <View key={Props.item?.id} style={styles.container}>
      <Text>ProductItem</Text>
    </View>
  );
};

export default React.memo(ProductItem)

const styles = StyleSheet.create({
  container:{
    borderWidth:1,
    width:"100%",
    height:50,
    marginVertical:10
  }
});