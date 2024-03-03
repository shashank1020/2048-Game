import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import Colors from '../../styles/Colors.ts';

const {width, height} = Dimensions.get('window');

const SQUARE_WIDTH = width * 0.9;
const BOX_MARGIN = 5;
const BOX_WIDTH = (SQUARE_WIDTH - BOX_MARGIN * 9) / 4;

function Home() {
  return (
    <View style={styles.HomeContainer}>
      <View style={styles.HomeContainerRow}>
        <SquareBox />
        <SquareBox />
        <SquareBox />
        <SquareBox />
      </View>
    </View>
  );
}

const SquareBox = () => {
  return <View style={styles.SquareBoxWrapper} />;
};

export default Home;

const styles = StyleSheet.create({
  HomeContainer: {
    width: SQUARE_WIDTH,
    height: SQUARE_WIDTH,
    maxHeight: 500,
    alignSelf: 'center',
    backgroundColor: Colors.border,
    borderRadius: 10,
    padding: BOX_MARGIN,
  },
  HomeContainerRow: {
    flexDirection: 'row',
    flex: 1,
  },
  SquareBoxWrapper: {
    flex: 1,
    width: BOX_WIDTH,
    height: BOX_WIDTH,
    borderRadius: 10,
    margin: BOX_MARGIN,
    backgroundColor: Colors.empty,
  },
});
