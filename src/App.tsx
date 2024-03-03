/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Game2048 from './screens/Home/Game2048.tsx';

function App() {


  return (
    <SafeAreaView style={styles.AppContainer}>
      <Game2048 />
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  AppContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
