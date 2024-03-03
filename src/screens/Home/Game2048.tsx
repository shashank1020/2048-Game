import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import Colors from '../../styles/Colors.ts';
import { delay, doLog, getBoxColor, pickRandomNumber } from "./helper.ts";
import useSwipe from '../../hooks/useSwipe.ts';

const BOX_NUMBERS = [2,4,8,16,32,64,128,256,512,1024,2048];

interface IGame2048 {
  score: number;
  onScoreChange: (score: number) => void;
}

const {width, height} = Dimensions.get('window');

const SQUARE_WIDTH = width * 0.9;
const BOX_MARGIN = 5;
const BOX_WIDTH = (SQUARE_WIDTH - BOX_MARGIN * 9) / 4;

function Game2048({}: IGame2048) {
  const [squares, setSquares] = useState(Array(16).fill(0));
  const [maxNumber, setMaxNumber] = useState(2);

  function generateNumber() {
    console.log('setSquares - generateNumber');
    let random = Math.floor(Math.random() * squares.length);
    let didUpdate = false;
    setSquares(prevState => {
      if (prevState[random] === 0) {
        prevState[random] = pickRandomNumber(maxNumber);
        didUpdate = true;
        return [...prevState];
      }
      return prevState;
    });
    if (didUpdate) {
      checkLose();
    }
  }

  function checkWin() {
    if (squares.includes(2048)) {
      Alert.alert('Congratulations!! Refresh the page to play again.');
    }
  }
  function checkLose() {
    let numZeros = 0;
    for (let i = 0; i < 16; i++) {
      if (squares[i] === 0) {
        numZeros++;
      }
    }
    if (numZeros === 0) {
      Alert.alert('Game Over!! Refresh the page to play again.');
    }
  }

  async function moveDown() {
    console.log('setSquares - moveDown');
    //get column
    setSquares(prevState => {
      for (let i = 0; i < 4; i++) {
        let totalOne = parseInt(prevState[i]);
        let totalTwo = parseInt(prevState[i + 4]);
        let totalThree = parseInt(prevState[i + 4 * 2]);
        let totalFour = parseInt(prevState[i + 4 * 3]);
        let column = [totalOne, totalTwo, totalThree, totalFour];

        let filteredColumn = column.filter(x => x !== 0);
        let missing = 4 - filteredColumn.length;
        let zeros = Array(missing).fill(0);
        let newColumn = zeros.concat(filteredColumn);

        prevState[i] = newColumn[0];
        prevState[i + 4] = newColumn[1];
        prevState[i + 4 * 2] = newColumn[2];
        prevState[i + 4 * 3] = newColumn[3];
      }

      return [...prevState];
    });
  }

  async function moveUp() {
    console.log('setSquares - moveUp');
    //get column
    setSquares(prevState => {
      for (let i = 0; i < 4; i++) {
        let totalOne = parseInt(prevState[i]);
        let totalTwo = parseInt(prevState[i + 4]);
        let totalThree = parseInt(prevState[i + 4 * 2]);
        let totalFour = parseInt(prevState[i + 4 * 3]);
        let column = [totalOne, totalTwo, totalThree, totalFour];

        let filteredColumn = column.filter(x => x !== 0);
        let missing = 4 - filteredColumn.length;
        let zeros = Array(missing).fill(0);
        let newColumn = filteredColumn.concat(zeros);

        prevState[i] = newColumn[0];
        prevState[i + 4] = newColumn[1];
        prevState[i + 4 * 2] = newColumn[2];
        prevState[i + 4 * 3] = newColumn[3];
      }
      return [...prevState];
    });
  }

  //swipe left
  async function moveLeft() {
    console.log('setSquares - moveLeft');
    setSquares(prevState => {
      for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
          //first column
          let totalOne = parseInt(prevState[i]);
          let totalTwo = parseInt(prevState[i + 1]);
          let totalThree = parseInt(prevState[i + 2]);
          let totalFour = parseInt(prevState[i + 3]);
          let row = [totalOne, totalTwo, totalThree, totalFour];

          let filteredRow = row.filter(x => x !== 0);
          let missing = 4 - filteredRow.length;
          let zeros = Array(missing).fill(0);
          let newRow = filteredRow.concat(zeros);

          //insert new row into the squares
          prevState[i] = newRow[0];
          prevState[i + 1] = newRow[1];
          prevState[i + 2] = newRow[2];
          prevState[i + 3] = newRow[3];
        }
      }
      return [...prevState];
    });
  }

  //swipe right
  async function moveRight() {
    console.log('setSquares - moveRight');
    setSquares(prevState => {
      for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
          let totalOne = parseInt(prevState[i]);
          let totalTwo = parseInt(prevState[i + 1]);
          let totalThree = parseInt(prevState[i + 2]);
          let totalFour = parseInt(prevState[i + 3]);
          let row = [totalOne, totalTwo, totalThree, totalFour];

          //console.log(row)

          let filteredRow = row.filter(x => x !== 0);
          //console.log(filteredRow)
          let missing = 4 - filteredRow.length;
          let zeros = Array(missing).fill(0);
          //console.log(zeros)
          let newRow = zeros.concat(filteredRow);
          //console.log(newRow)
          //insert new row into the squares
          prevState[i] = newRow[0];
          prevState[i + 1] = newRow[1];
          prevState[i + 2] = newRow[2];
          prevState[i + 3] = newRow[3];
        }
      }
      return [...prevState];
    });
  }

  async function sumRow() {
    console.log('setSquares - sumRow');
    let _max = 0;
    setSquares(prevState => {
      for (let i = 0; i < 15; i++) {
        //end before index 15 because is has no "right neighbour"
        if (prevState[i] === prevState[i + 1]) {
          let combineNum = parseInt(prevState[i]) + parseInt(prevState[i + 1]);
          if (maxNumber < combineNum) {
            _max = combineNum;
          }
          prevState[i] = combineNum;
          prevState[i + 1] = 0;
        }
      }
      return [...prevState];
    });
    if (_max > maxNumber) {
      setMaxNumber(_max);
    }
  }

  async function sumColumn() {
    console.log('setSquares - sumColumn');
    let _max = 0;
    setSquares(prevState => {
      for (let i = 0; i < 12; i++) {
        //end before index 12 because is has no "below neighbour"
        if (prevState[i] === prevState[i + 4]) {
          let combineNum = parseInt(prevState[i]) + parseInt(prevState[i + 4]);
          if (maxNumber < combineNum) {
            _max = combineNum;
          }
          prevState[i] = combineNum;
          prevState[i + 4] = 0;

          // onScoreChange(score + combineNum);
        }
      }
      return [...prevState];
    });
    if (_max > maxNumber) {
      setMaxNumber(_max);
    }
    checkWin();
  }

  function reset() {
    setSquares(Array(16).fill(0));
    generateNumber();
    generateNumber();
  }

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {onTouchStart, onTouchEnd} = useSwipe({
    rangeOffset: 6,
    onSwipeDown: async () => {
      console.log('onSwipeDown');
      await moveDown();
      // await delay();
      await sumColumn();
      // await delay();
      await moveDown();
      // await delay();
      generateNumber();
    },
    onSwipeLeft: async () => {
      console.log('onSwipeLeft');
      // await delay();
      await moveLeft();
      // await delay();
      await sumRow();
      // await delay();
      await moveLeft();
      generateNumber();
    },
    onSwipeRight: async () => {
      console.log('onSwipeRight');
      await moveRight();
      // await delay();
      await sumRow();
      // await delay();
      await moveRight();
      generateNumber();
    },
    onSwipeUp: async () => {
      console.log('onSwipeUp');
      // await delay();
      await moveUp();
      // await delay();
      await sumColumn();
      // await delay();
      await moveUp();
      generateNumber();
    },
  });

  useEffect(() => {
    doLog(squares);
  }, [squares]);
  return (
    <View style={styles.HomeContainer}>
      <FlatList
        data={squares}
        renderItem={({item}) => {
          if (item > 0) {
            return <SquareBox value={item} />;
          }
          return <View style={styles.SquareBoxWrapper} />;
        }}
        numColumns={4}
        scrollEnabled={false}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      />
    </View>
  );
}
const SquareBox = ({value}: {value: number}) => {
  const colorAnimation = useRef(new Animated.Value(0)).current;

  const color = useMemo(() => {
    if (value > 0) {
      return getBoxColor(value);
    }
    return Colors.empty;
  }, [value]);

  useEffect(() => {
    Animated.timing(colorAnimation, {
      toValue: 1,
      duration: 500, // Adjust duration as needed
      easing: Easing.in(Easing.ease), // Apply ease-in easing function
      useNativeDriver: false, // Make sure to set this to false for backgroundColor animation
    }).start();
  }, [colorAnimation, value]);

  const interpolatedColor = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.empty, color],
    extrapolate: 'clamp',
  });

  const boxNumber = useMemo(() => {
    if (value > 0) {
      return value;
    }
    return '';
  }, [value]);

  return (
    <Animated.View
      style={[styles.SquareBoxWrapper, {backgroundColor: interpolatedColor}]}>
      <Text style={styles.SquareBoxText}>{boxNumber}</Text>
    </Animated.View>
  );
};

export default Game2048;

const styles = StyleSheet.create({
  HomeContainer: {
    width: SQUARE_WIDTH,
    maxHeight: SQUARE_WIDTH + BOX_MARGIN,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.empty,
  },
  SquareBoxText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
