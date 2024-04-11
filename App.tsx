
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
