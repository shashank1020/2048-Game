/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Game2048 from './screens/Home/Game2048.tsx';
import {Level_difficulty} from "./screens/Home/helper.ts";
import Colors from "./styles/Colors.ts";
import {SHADOW_STYLE} from "./styles/styles.ts";

function App() {
    const [level_difficulty, setLevel_difficulty] = useState<Level_difficulty>('easy');

    const onPressChangeDifficulty = (level_difficulty: Level_difficulty) => {
        setLevel_difficulty(level_difficulty)
    }

    return (
        <SafeAreaView style={styles.AppContainer}>
            <View style={styles.AppBtnRow}>
                <TouchableOpacity onPress={() => onPressChangeDifficulty('easy')}
                                  style={[styles.AppBtnWrapper, styles.BtnEasy]}>
                    <Text style={styles.AppBtnText}>Easy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPressChangeDifficulty('medium')}
                                  style={[styles.AppBtnWrapper, styles.BtnMedium]}>
                    <Text style={styles.AppBtnText}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPressChangeDifficulty('hard')}
                                  style={[styles.AppBtnWrapper, styles.BtnHard]}>
                    <Text style={styles.AppBtnText}>Hard</Text>
                </TouchableOpacity>
            </View>
            <Game2048 level_difficulty={level_difficulty}/>
        </SafeAreaView>
    );
}

export default App;

const styles = StyleSheet.create({
    AppContainer: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative'
    },
    AppBtnRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'absolute',
        top: 100,
        width: '100%',
    },
    AppBtnWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 60,
        padding: 10,
        borderRadius: 10,
        minWidth: 100,
        ...SHADOW_STYLE,
    },
    BtnEasy: {
        backgroundColor: Colors.primaryLight
    },
    BtnMedium: {
        backgroundColor: Colors["16"]
    },
    BtnHard: {
        backgroundColor: Colors["64"]
    },
    AppBtnText: {
        fontSize: 20,
        fontWeight: '500'
    }
});
