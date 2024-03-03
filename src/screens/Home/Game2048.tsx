import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import Colors from '../../styles/Colors.ts';
import {BOX_MARGIN, BOX_WIDTH, doLog, Level_difficulty, pickRandomNumber, SQUARE_WIDTH} from "./helper.ts";
import useSwipe from '../../hooks/useSwipe.ts';
import SquareBox from "./Components/SquareBox.tsx";
import {SHADOW_STYLE} from "../../styles/styles.ts";

interface IGame2048 {
    level_difficulty: Level_difficulty
}

function Game2048({level_difficulty}: IGame2048) {
    const [squares, setSquares] = useState(Array(16).fill(0));
    const [maxNumber, setMaxNumber] = useState(2);
    const [score, setScore] = useState(0);

    function onScoreChange(value: number) {
        setScore(prevState => prevState + value);
    }

    function generateNumber() {
        console.log('setSquares - generateNumber');
        let random = Math.floor(Math.random() * squares.length);
        let didUpdate = false;
        setSquares(prevState => {
            if (prevState[random] === 0) {
                prevState[random] = pickRandomNumber(maxNumber, level_difficulty);
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
        let _max = maxNumber;
        setSquares(prevState => {
            for (let i = 0; i < 15; i++) {
                //end before index 15 because is has no "right neighbour"
                if (prevState[i] === prevState[i + 1]) {
                    let combineNum = parseInt(prevState[i]) + parseInt(prevState[i + 1]);
                    if (_max < combineNum) {
                        _max = combineNum;
                    }
                    onScoreChange(combineNum);
                    prevState[i] = combineNum;
                    prevState[i + 1] = 0;
                }
            }
            return [...prevState];
        });
        setMaxNumber(_max);
    }

    async function sumColumn() {
        console.log('setSquares - sumColumn');
        let _max = maxNumber;
        setSquares(prevState => {
            for (let i = 0; i < 12; i++) {
                //end before index 12 because is has no "below neighbour"
                if (prevState[i] === prevState[i + 4]) {
                    let combineNum = parseInt(prevState[i]) + parseInt(prevState[i + 4]);
                    // console.log('combineNum', combineNum, maxNumber, maxNumber < combineNum)
                    if (_max < combineNum) {
                        _max = combineNum;
                    }
                    prevState[i] = combineNum;
                    prevState[i + 4] = 0;

                    onScoreChange(combineNum);
                }
            }
            return [...prevState];
        });
        // if (_max > maxNumber) {
        setMaxNumber(_max);
        // }
        checkWin();
    }

    async function reset() {
        setScore(0);
        setMaxNumber(2);
        setSquares(Array(16).fill(0));
        generateNumber();
        generateNumber();
    }

    useEffect(() => {
        console.log('max number--', maxNumber)
    }, [maxNumber]);
    useEffect(() => {
        reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [level_difficulty]);

    const {onTouchStart, onTouchEnd} = useSwipe({
        rangeOffset: 6,
        onSwipeDown: async () => {
            console.log('onSwipeDown');
            await moveDown();
            await sumColumn();
            await moveDown();
            generateNumber();
        },
        onSwipeLeft: async () => {
            console.log('onSwipeLeft');
            await moveLeft();
            await sumRow();
            await moveLeft();
            generateNumber();
        },
        onSwipeRight: async () => {
            console.log('onSwipeRight');
            await moveRight();
            await sumRow();
            await moveRight();
            generateNumber();
        },
        onSwipeUp: async () => {
            console.log('onSwipeUp');
            await moveUp();
            await sumColumn();
            await moveUp();
            generateNumber();
        },
    });

    useEffect(() => {
        doLog(squares);
    }, [squares]);
    return (
        <>
            <View style={styles.GameHeaderWrapper}>
                <Text style={styles.GameScoreText}>Score: {score}</Text>
                <TouchableOpacity style={styles.GameResetIconWrapper} onPress={reset}>
                    <Image source={require('../../assets/refresh_icon.png')} style={styles.GameResetIcon}/>
                </TouchableOpacity>
            </View>
            <View style={styles.GameContainer}>
                <FlatList
                    data={squares}
                    renderItem={({item}) => {
                        if (item > 0) {
                            return <SquareBox value={item}/>;
                        }
                        return <View style={styles.SquareBoxWrapper}/>;
                    }}
                    numColumns={4}
                    scrollEnabled={false}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                />
            </View>
        </>

    );
}

export default Game2048;

const styles = StyleSheet.create({
    GameContainer: {
        width: SQUARE_WIDTH,
        maxHeight: SQUARE_WIDTH + BOX_MARGIN,
        alignSelf: 'center',
        backgroundColor: Colors.border,
        borderRadius: 10,
        padding: BOX_MARGIN,
        ...SHADOW_STYLE,
    },
    GameHeaderWrapper: {
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    GameResetIconWrapper: {
        width: 30,
        height: 30,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 50,
        backgroundColor: 'white',
        ...SHADOW_STYLE
    },
    GameResetIcon: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        tintColor: 'black',
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
    GameScoreText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 10,
        ...SHADOW_STYLE
    },

});
