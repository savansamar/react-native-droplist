import React from 'react';
import {
  FlatList,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import {LinearGradient} from 'react-native-linear-gradient';
import {faker} from '@faker-js/faker';

const {width, height} = Dimensions.get('window');
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

var limit = 20

faker.seed(10)

export default () => {
  const [measures, setMeasures] = React.useState({height});
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [data, setData] = React.useState<any[]>([]);


  const get = async (limits = 10, skips = 10) => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=${limits}&skip=${skips}`,
    );
    const ress = await res.json();
    let user = ress.products.map((item:any)=>{return {key: (item?.title+String(Math.random())).trim(), text: item?.title, mine: item.id % 2};})
    console.log("uuseeee",user[0])
    setData([...data,...user])
    // setMeasures({height:measures.height + height})
  };

  React.useEffect(()=>{
    get(20,20)
  },[])

  
  return (
    <>
      {data.length !== 0 ? (
        <View style={{flex: 1}}>
          <AnimatedLinearGradient
            style={{
              position: 'absolute',
              height,
              width,
              zIndex: -100,
              // transform: [
              //   {
              //     translateY: scrollY,
              //   },
              // ],
            }}
            colors={['#FD84AA', '#A38CF9', '#09E0FF']}
          />
          <Animated.FlatList
            data={data}
            bounces={false}
            keyExtractor={item => item.key}
            style={{zIndex: 100}}
            onEndReached={()=>{
              limit = limit + 10
              get(limit,limit)
            }}
            contentContainerStyle={{
              flexGrow: 1,
              backgroundColor: 'transparent',
            }}
            removeClippedSubviews={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: true},
            )}
            renderItem={({item}) => {
              return (
                <View style={{width: '100%'}}>
                  {item.mine ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexGrow: 1,
                          backgroundColor: 'white',
                          alignSelf: 'stretch',
                        }}
                      />
                      <View
                        style={{
                          backgroundColor: 'transparent',
                          alignSelf: 'stretch',
                          padding: 30,
                        }}>
                        <Text style={{color: item.mine ? 'white' : '#111927'}}>
                          {item.text}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          alignSelf: 'stretch',
                          padding: 30,
                        }}>
                        <View style={{flex:1,backgroundColor:"grey",paddingVertical:40}}>
                          <Text
                            style={{color: item.mine ? 'white' : '#111927'}}>
                            {item.text}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexGrow: 1,
                          backgroundColor: 'white',
                          alignSelf: 'stretch',
                        }}
                      />
                    </View>
                  )}
                </View>
              );
            }}
          />
        </View>
      ) : (
        // <Animated.ScrollView
        //   style={{backgroundColor: 'transparent'}}
        //   onMomentumScrollEnd={()=>{
        //     console.log('onMomentumScrollEnd');
        //     limit = limit +10
        //     get(limit,limit)
        //   }}
        //   onScroll={Animated.event(
        //     [{nativeEvent: {contentOffset: {y: scrollY}}}],
        //     {
        //       useNativeDriver: true,
        //     },
        //   )}>
        //   <StatusBar hidden={true} />
        //   <MaskedView
        //     maskElement={
        //       <View
        //         onLayout={ev => {
        //           console.log(ev.nativeEvent.layout);
        //           setMeasures(ev.nativeEvent.layout);
        //         }}
        //         style={{backgroundColor: 'transparent'}}>
        //         {data.map(item => (
        //           <View
        //             key={item.key}
        //             style={[
        //               styles.messageItem,
        //               {
        //                 backgroundColor: 'red', // Important to apply the gradient effect as a mask
        //                 alignSelf: item.mine ? 'flex-end' : 'flex-start',
        //               },
        //             ]}>
        //             <Text style={{opacity: 0}}>{item.text}</Text>
        //           </View>
        //         ))}
        //       </View>
        //     }>
        //     <View style={{height: measures.height}}>
        //       <FlatList
        //         scrollEnabled={false}
        //         data={data}
        //         keyExtractor={item => item.key}
        //         style={[StyleSheet.absoluteFillObject, {zIndex: 1}]}
        //         removeClippedSubviews={false}
        //         onEndReached={() => console.log('d')}
        //         onMomentumScrollEnd={() => console.log('ed')}
        //         renderItem={({item}) => {
        //           return (
        //             <View
        //               style={[
        //                 styles.messageItem,
        //                 {
        //                   // borderWidth:1,
        //                   zIndex: item.mine ? -1 : 1, // only display the other messages above the gradient mask, we want to avoid gradient being applied to the other message other than mine.
        //                   backgroundColor: item.mine
        //                     ? 'transparent'
        //                     : '#E4E7EB', // remove the background for my messages because we're using the gradient mask
        //                   alignSelf: item.mine ? 'flex-end' : 'flex-start',
        //                 },
        //               ]}>
        //               <Text style={{color: item.mine ? 'white' : '#111927'}}>
        //                 {item.text}
        //               </Text>
        //             </View>
        //           );
        //         }}
        //       />
        //       <AnimatedLinearGradient
        //         style={{
        //           height,
        //           transform: [
        //             {
        //               translateY: scrollY,
        //             },
        //           ],
        //         }}
        //         colors={['#FD84AA', '#A38CF9', '#09E0FF']}
        //       />
        //     </View>
        //   </MaskedView>
        // </Animated.ScrollView>
        <Text>sss</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  messageItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    margin: 12,
    marginBottom: 8,
    borderRadius: 12,
    maxWidth: width * 0.65,
  },
});
