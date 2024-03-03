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
  const [score, setScore] = useState(0);
  function onScoreChange(value: number) {
    // console.log('setScore ----', value);
    setScore(value);
  }

  return (
    <SafeAreaView style={styles.AppContainer}>
      <Text style={styles.AppScoreText}>Score: {score}</Text>
      <Game2048 score={score} onScoreChange={onScoreChange} />
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  AppContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  AppScoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
  },
});
