import { StyleSheet, Text, TouchableOpacity, View,Dimensions } from 'react-native'
import React from 'react'
import Animated, {
    interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';


import AnimatedText from '../componenet/Text/AnimatedText';
import { createAnimatedComponent } from 'react-native-reanimated/lib/typescript/createAnimatedComponent';
import { Polygon, Svg } from 'react-native-svg';

const { width } = Dimensions.get('window')

const Touch = Animated.createAnimatedComponent(TouchableOpacity)

const LOOP_WIDTH = 161


const MemorizedItem = ({
    item,index,activeScale

}:any) => {

    const scale = useSharedValue(1);
    const animatedStyles = useAnimatedStyle(() => ({
      transform: [{scaleX: scale.value}],
    }));
    const x = useAnimatedStyle(() => ({
      transform: [{translateX: interpolate(scale.value, [0, 1], [-(LOOP_WIDTH/2),0])}],
    }));

     const xRight = useAnimatedStyle(() => ({
       transform: [
         {
           translateX: interpolate(
             scale.value,
             [0, 1],
             [LOOP_WIDTH/2,1],
           ),
         },
       ],
     }));

   const fluctuateDelay = (index:number)=>{
    return 0
  }
  const start = ()=>{
      scale.value =
        scale.value === 0
          ? withDelay(5, withTiming(1, {duration: 500}))
          : withDelay(5, withTiming(0, {duration: 500}));
    }
    
    return (
      <Animated.View key={String(index)} style={[styles.row]}>
        <Animated.View style={[{zIndex: 9999}, xRight]}>
          {/* <Touch
            style={[styles.button]}
            onPress={() => start()}
          /> */}
          <TouchableOpacity onPress={start} >
            <Svg
              width={30}
              height={30}
              viewBox="0 0 24 24"
              fill={'grey'}>
              <Polygon points="5 3 19 12 5 21 5 3" />
            </Svg>
          </TouchableOpacity>
        </Animated.View>
        <View style={[styles.section]}>
          <Animated.View
            style={[
              {
                flexDirection: 'row',
                // width: LOOP_WIDTH,
                // width:"60%",
                // width:161,
                zIndex: 0,
                flex: 0.7,
              },
              animatedStyles,
            ]}>
            {Array(20)
              .fill(0)
              .map((ele: any, index: number) => {
                return (
                  <AnimatedText
                    key={String(index)}
                    delay={fluctuateDelay(index)}
                    value={Number(Math.random().toFixed(1))}
                  />
                );
              })}
          </Animated.View>
          <Animated.Text style={[{marginHorizontal: 5}, x]}>
            00:11
          </Animated.Text>
        </View>
      </Animated.View>
    );
}

export default React.memo(MemorizedItem)

const styles = StyleSheet.create({
  row: {
    height:"100%",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
},
section:{
    flexDirection: 'row',
    zIndex: 99,
    justifyContent:"center",
    alignItems:"center"
},
  button:{
    height:"100%",
    width:10,
    borderRadius:30,
    borderWidth:1,
    zIndex:9999,
    marginHorizontal:5
  }
});