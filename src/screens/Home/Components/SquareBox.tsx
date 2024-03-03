import React, {useEffect, useMemo, useRef} from "react";
import {Animated, Easing, StyleSheet, Text} from "react-native";
import {BOX_MARGIN, BOX_WIDTH, getBoxColor} from "../helper.ts";
import Colors from "../../../styles/Colors.ts";
import {SHADOW_STYLE} from "../../../styles/styles.ts";

const SquareBox = ({value}: { value: number }) => {
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

export default SquareBox;

const styles = StyleSheet.create({
    SquareBoxWrapper: {
        flex: 1,
        width: BOX_WIDTH,
        height: BOX_WIDTH,
        borderRadius: 10,
        margin: BOX_MARGIN,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.empty,
        ...SHADOW_STYLE,
    },
    SquareBoxText: {
        fontSize: 16,
        fontWeight: '600',
    },
})
