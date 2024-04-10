import { Image, LayoutChangeEvent, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { Gesture, GestureDetector ,GestureStateChangeEvent,GestureUpdateEvent, PanGestureChangeEventPayload, PanGestureHandlerEventPayload } from 'react-native-gesture-handler'
import Animated, {cancelAnimation, clamp, useSharedValue, withClamp, withDecay} from 'react-native-reanimated';
import Card from './Card';

const CARD_HEIGHT = 100
const CARD_WIDTH = ""
const MARGIN = 70


const cards = [
  {uri: require('../../asstes/cards/Card1.png'), id: '123'},
  {uri: require('../../asstes/cards/Card2.png'), id: '234'},
  {uri: require('../../asstes/cards/Card3.png'), id: '345'},
  {uri: require('../../asstes/cards/Card4.png'), id: '534'},
  {uri: require('../../asstes/cards/Card5.png'), id: '734'},
  {uri: require('../../asstes/cards/Card6.png'), id: '834'},
  {uri: require('../../asstes/cards/Card7.png'), id: '034'},
  {uri: require('../../asstes/cards/Card8.png'), id: '244'},
  {uri: require('../../asstes/cards/Card9.png'), id: '934'}
];

const CardsList = React.memo(() => {

const [heightOfList,setHeightOfList] = React.useState<number>(0);
const scrollY = useSharedValue(0);
const activeCardIndex = useSharedValue(null);

const {height:screenHeight} = useWindowDimensions()
const maxScrollValue = heightOfList - screenHeight + MARGIN;
let count  = 0

const onBegin = (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
    cancelAnimation(scrollY)
};
  const onStart = () => {
    console.log("onStart")
  };
  const onChange = (event: GestureUpdateEvent<PanGestureHandlerEventPayload & PanGestureChangeEventPayload>,) => {
    scrollY.value = clamp(
      scrollY.value - event.changeY,
      0,
     maxScrollValue
    );
  };
  const onEnd = (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>,success:boolean) => {
    //velocity represent the speed of scroll
    scrollY.value = withClamp(
      {min: 0, max: maxScrollValue},
      withDecay({velocity: -event.velocityY}),
    );
  };

  const pan = Gesture.Pan()
    .onStart(onStart)
    .onChange(onChange)
    .onEnd(onEnd)
    .onBegin(onBegin);

  const onLayout =(event: LayoutChangeEvent) => {
    setHeightOfList(event.nativeEvent.layout.height );
  }

  return (
    <GestureDetector gesture={pan}>
      <View style={{padding: 10}} onLayout={onLayout}>
        {cards.map((card: any, index: number) => (
          <Card
            key={card?.id}
            index={index}
            card={card}
            scrollY={scrollY}
            activeCardIndex={activeCardIndex}
          />
        ))}
      </View>
    </GestureDetector>
  );
});

export default CardsList

const styles = StyleSheet.create({
  imageStyle: {
    height: undefined,
    width: '100%',
    aspectRatio: 7 / 4,
    marginVertical: 10,
  },
  contentContainerStyle:{
    flexGrow:1
  }
});