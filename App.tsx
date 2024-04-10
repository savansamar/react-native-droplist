// import React from 'react'
// import {  FlatList, StyleSheet, View } from 'react-native'
// import MemorizedItem from './src/list/MemorizedItem';
// import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query'
// import Products from './src/react-query/Products';
// import Gradient from './src/list/Gradient';

// const queryClient = new QueryClient({
//   defaultOptions:{
//     queries:{
//       staleTime:10000
//     }
//   }
// })


// const ITEM_HEIGHT = 50 

// function App(){

//   const [data, setData] = React.useState(Array(20).fill(0));

//   const scaleActiveItemIndex = useSharedValue(1);

//   const renderItem = React.useCallback(function({item,index}:any){
//     return (
//       <Animated.View
//         style={[
//           {
//             height: ITEM_HEIGHT,
//             width: '100%',
//             borderWidth: 1,
//             marginVertical: 10,
//             transform: [{scale: scaleActiveItemIndex.value}],
//           },
//         ]}>
//         <MemorizedItem item={item} index={index} opacity={1} />
//       </Animated.View>
//     );
//   },[])


//   const handleScroll = useAnimatedScrollHandler({
//     onScroll:function(e){
//       console.log("y :",e.contentOffset.y)
//       if(e.contentOffset.y>40){
//         // scaleActiveItemIndex.value = 0
//       }
//       else{
//         // scaleActiveItemIndex.value = 0.5
//       }
//     } 
//   })

//   const getItemLayout = (data:any, index:number) => ({
//     length: ITEM_HEIGHT,
//     offset: ITEM_HEIGHT * index,
//     index,
//   });

//   const aniamtion = ()=>{
//     return(
//       <View style={styles.container}>
//       <Animated.FlatList
//         style={{width: '100%'}}
//         initialNumToRender={10}
//         maxToRenderPerBatch={10}
//         getItemLayout={getItemLayout}
//         data={data}
//         onScroll={handleScroll}
//         contentContainerStyle={{
//           flexGrow: 1,
//         }}
//         renderItem={renderItem}
//         keyExtractor={(_, index) => index.toString()}
//         onEndReached={() => setData([...data,Array(200).fill(1)])}
//       />
//     </View>
//     )
//   }

//   return (
//     <Gradient/>
//     // <View style={styles.container}>
//     //   <Animated.FlatList
//     //     style={{width: '100%'}}
//     //     initialNumToRender={10}
//     //     maxToRenderPerBatch={10}
//     //     getItemLayout={getItemLayout}
//     //     data={data}
//     //     onScroll={handleScroll}
//     //     contentContainerStyle={{
//     //       flexGrow: 1,
//     //     }}
//     //     renderItem={renderItem}
//     //     keyExtractor={(_, index) => index.toString()}
//     //     onEndReached={() => setData([...data, Array(200).fill(1)])}
//     //   />
//     // </View>
//   );

//   // return {
//   //   aniamtion()
//   // };
//   // <QueryClientProvider client={queryClient}>
//   //   <Products />
//   // </QueryClientProvider>
// }

// export default App

// const styles = StyleSheet.create({
//   container:{
//     flex:1,
//     justifyContent:"center",
//     alignItems:"center"
//   }
// });



import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardsList from './src/componenet/cards/CardsList'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const App = () => {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <SafeAreaView style={styles.container}>
        <CardsList />
        <StatusBar barStyle="default" />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff"
 } 
})
