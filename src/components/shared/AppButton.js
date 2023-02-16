import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {fontScale, scale, vScale} from '../../themes/scale';
import colors from '../../themes/colors';
import fonts from '../../themes/fonts';

const AppButton = ({
  title,
  onPress,
  containerStyle,
  titleStyle,
  loading,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={loading || disabled}
      {...{onPress}}
      activeOpacity={0.9}
      style={[styles.container, {opacity: disabled ? 0.6 : 1}, containerStyle]}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    width: scale(366),
    height: vScale(56),
    backgroundColor: colors.mainColor,
    borderRadius: vScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: vScale(16),
    alignSelf: 'center',
  },
  title: {
    fontFamily: fonts.BOLD,
    color: colors.white,
    fontSize: fontScale(16),
  },
});
