interface IUseSwipe {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeUp: () => void;
  onSwipeDown: () => void;
  rangeOffset?: number;
}

import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  rangeOffset = 4,
}: IUseSwipe) {
  let firstTouchX = 0;
  let firstTouchY = 0;

  // set user touch start position
  function onTouchStart(e: any) {
    firstTouchX = e.nativeEvent.pageX;
    firstTouchY = e.nativeEvent.pageY;
  }

  // when touch ends check for swipe directions
  function onTouchEnd(e: any) {
    // get touch position and screen size
    const positionX = e.nativeEvent.pageX;
    const positionY = e.nativeEvent.pageY;
    const range = windowWidth / rangeOffset;

    // calculate horizontal and vertical distances
    const dx = positionX - firstTouchX;
    const dy = positionY - firstTouchY;

    // check horizontal swipe
    if (Math.abs(dx) > Math.abs(dy)) {
      // check swipe right
      if (dx > range) {
        onSwipeRight && onSwipeRight();
      }
      // check swipe left
      else if (dx < -range) {
        onSwipeLeft && onSwipeLeft();
      }
    } else {
      // check vertical swipe
      // check swipe down
      if (dy > range) {
        onSwipeDown && onSwipeDown();
      }
      // check swipe up
      else if (dy < -range) {
        onSwipeUp && onSwipeUp();
      }
    }
  }

  return {onTouchStart, onTouchEnd};
}

export default useSwipe;
