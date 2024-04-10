import { Alert, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import Animated, { Easing, clamp, useAnimatedReaction, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureStateChangeEvent, PanGestureHandlerEventPayload, TapGestureHandlerEventPayload } from 'react-native-gesture-handler';

interface CardProps {
  index: number;
  card: {
    id: string;
    uri: HTMLImageElement;
  };
  scrollY: any;
  activeCardIndex:any
}
const Card = (Props:CardProps) => {
    const [cardHeight,setCardHeight] = React.useState<number>(0)
    const translateY = useSharedValue(0)
    const previusTranslateY = useSharedValue(0);

  const {height: screenHeight} = useWindowDimensions();



   useAnimatedReaction(
     () => {
       return Props.scrollY.value;
     },
     (current, previous) => {
       translateY.value = clamp(-current, -Props.index * cardHeight, 0);
     },
   );

  useAnimatedReaction(
    () => Props.activeCardIndex.value,
    (current, pervious) => {
      
      if (current === pervious) {
        return;
      }
      if (Props.activeCardIndex.value === null) {
        translateY.value = withTiming(
          -Props.index * cardHeight * 0.9 + screenHeight * 0.7,
          {
            easing: Easing.out(Easing.quad),
            duration: 500,
          },
        );
        // No card selected, move to list view
        // translateY.value = withTiming(
        //   clamp(-Props.scrollY.value, -Props.index * cardHeight, 0),
        //   {
        //     easing: Easing.out(Easing.quad),
        //     duration: 500,
        //   },
        // );
      } else if (Props.activeCardIndex.value === Props.index) {
        // This card becomes active
        translateY.value = withTiming(-Props.index * cardHeight, {
          easing: Easing.out(Easing.quad),
          duration: 500,
        });
      } else {
        console.log('else');
        // Another card is active, move to the bottom
        translateY.value = withTiming(
          -Props.index * cardHeight * 0.9 + screenHeight * 0.7,
          {
            easing: Easing.out(Easing.quad),
            duration: 500,
          },
        );
      }
    },
  );



 const onEnd = (event: GestureStateChangeEvent<TapGestureHandlerEventPayload>) => {
  
  // if(previusTranslateY.value === Props.index){
  //   Props.activeCardIndex.value = previusTranslateY.value
  // }
  // previusTranslateY.value = Props.index;
  if(Props.activeCardIndex.value === Props.index){
    Props.activeCardIndex.value = null
  }else{
    Props.activeCardIndex.value = Props.index;
  }

  // if (Props.activeCardIndex.value === null) {
  //   Props.activeCardIndex.value = Props.index;
  // } else {
  //   Props.activeCardIndex.value = null;
  // }
 };

  const gesture = Gesture.Tap().onEnd(onEnd);


  return (
    <GestureDetector gesture={gesture}>
      <Animated.Image
        key={Props?.card?.id}
        onLayout={event => setCardHeight(event.nativeEvent.layout.height + 10)}
        source={Props?.card?.uri}
        style={[
          styles.imageStyle,
          {
            transform: [
              {
                translateY: translateY,
              },
            ],
          },
        ]}
      />
    </GestureDetector>
  );
}

export default Card

const styles = StyleSheet.create({
  imageStyle: {
    height: undefined,
    width: '100%',
    aspectRatio: 7 / 4,
    marginVertical: 10,
  },
});