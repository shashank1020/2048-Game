import Colors from '../../styles/Colors.ts';
import {Dimensions} from "react-native";

const {width, height} = Dimensions.get('window');

export const SQUARE_WIDTH = width * 0.9;
export const BOX_MARGIN = 5;
export const BOX_WIDTH = (SQUARE_WIDTH - BOX_MARGIN * 9) / 4;

export const getBoxColor = (value: number): string => {
    const _Color = Colors as { [color: string]: string };
    return _Color[value] ?? Colors.primaryDark;
};

export const delay = async (time?: number) => {
    await new Promise<void>(resolve => {
        setTimeout(() => {
            resolve();
        }, time ?? 100);
    });
};

export const doLog = (arr: number[]) => {
    console.log('------------------');
    console.log('[', arr[0], arr[1], arr[2], arr[3], ']');
    console.log('[', arr[4], arr[5], arr[6], arr[7], ']');
    console.log('[', arr[8], arr[9], arr[10], arr[11], ']');
    console.log('[', arr[12], arr[13], arr[14], arr[15], ']');
    console.log('------------------');
};

const BOX_NUMBERS = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];

export type Level_difficulty = 'hard' | 'medium' | 'easy'

export function pickRandomNumber(maxNumber: number, level: Level_difficulty) {
    let numbers = BOX_NUMBERS.filter(num => maxNumber >= num);
    if (numbers.length > 1) {
        numbers.pop();
    }
    if (numbers.length > 1) {
        numbers.pop();
    }
    if (numbers.length > 1) {
        numbers.pop();
    }
    if (numbers.length > 1 && level !== 'easy') {
        numbers.pop();
    }
    if (numbers.length > 1 && level !== 'easy' && level !== "medium") {
        numbers.pop();
    }

    console.log('pickRandomNumber --- from', numbers, 'maxNumber', maxNumber);
    const randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers[randomIndex];
}
