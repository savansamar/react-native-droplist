import {StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';
import React from 'react'
import ProductItem from './ProductItem';
import {useQuery} from '@tanstack/react-query';

const callProducApi = async(limit=10,skip=10)=>{
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  const data = await res.json();
  console.log("call",res)
  return data.products;
}


const Products = () => {

    const [product,setProduct] = React.useState([])

    const { isLoading,error,data:products } = useQuery({queryKey:['products'],queryFn:callProducApi,staleTime:10})


    const renderItem = React.useCallback(({item,index}:any)=>{
      return(
        <ProductItem item={item} />
      )
    },[])


  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text>{JSON.stringify(error)}</Text>
        {
          isLoading ? 
          <View style={styles.loaderView}><Text>Loading...</Text></View>
          :
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item: any) => item?.id.toString()}
            contentContainerStyle={styles.contentContainerStyle}
            // CellRendererComponent={}}
          />
        }
      </View>
    </SafeAreaView>
  );
}

export default Products

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  loaderView:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
});