import {Dimensions, StatusBar, Platform} from 'react-native';
import Animated from 'react-native-reanimated';
const {multiply, divide} = Animated;

const isAndroid = Platform.OS === 'android';
const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const is_X_Ratio =
  (screenWidth / screenHeight).toFixed(2) == (414 / 896).toFixed(2) &&
  !isAndroid;
const guidelineBaseWidth = 414;

const sWidth = screenWidth;

const sHeight = isAndroid
  ? screenHeight - StatusBar.currentHeight
  : screenHeight;

/**
 * Horizontal Size Scale
 */
const scale = size => (sWidth / guidelineBaseWidth) * size;

/**
 * Vertical Size Scale
 * @param {number} size
 */
// const vScale = (size: number) => (screenHeight / guidelineBaseHeight) * size;
const vScale = size => (sWidth / guidelineBaseWidth) * size;
const animationVScale = size =>
  multiply(divide(sWidth, guidelineBaseWidth), size);

/**
 * Font Size Scale
 * @param {number} size
 * @param {number} [factor]
 */
const fontScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export {sHeight, sWidth, scale, vScale, fontScale, animationVScale, is_X_Ratio};
