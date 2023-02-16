import React from 'react';
import {View, Text, StyleSheet, I18nManager} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import colors from '../../themes/colors';
import fonts from '../../themes/fonts';
import {fontScale, scale, sHeight, sWidth, vScale} from '../../themes/scale';

const isRequired = (inputValue, errorMessage) => errorMessage.length !== 0;

const highlightEmptyStyle = isRequired =>
  isRequired
    ? {borderColor: colors.red, borderWidth: 1, borderBottomWidth: 1}
    : {};

const TextInputFilled = ({
  disabled,
  label,
  placeholder,
  leftIcon,
  value,
  rightIcon,
  keyboardType,
  autoCompleteType,
  style,
  labelStyle,
  onChangeText,
  maxLength,
  errorMessage,
  inputStyle,
  inputContainerStyle,
  onBlur,
  secureTextEntry,
  multiline,
  numberOfLines,
  errorStyle,
  multeInputs,
  autoFocus,
}) => {
  const emptyValue = isRequired(value, errorMessage);
  const emptyValueStyle = highlightEmptyStyle(emptyValue);

  const informativeMessage = isRequired(value, errorMessage)
    ? ''
    : errorMessage;

  return (
    <View style={{width: scale(366), alignSelf: 'center'}}>
      <Text style={label && [styles.labelStyle, labelStyle]}>{label}</Text>
      <Input
        autoFocus={autoFocus}
        disabled={disabled}
        containerStyle={{
          marginBottom: multeInputs ? -sHeight * 0.004 : 0,
        }}
        inputContainerStyle={[
          inputContainerStyle,
          styles.inputContainerStyle,
          style,
          {paddingRight: emptyValue ? 0 : 10},
          emptyValueStyle,
        ]}
        inputStyle={[styles.InputStyle, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        rightIcon={rightIcon && !emptyValue && rightIcon}
        leftIcon={leftIcon && leftIcon}
        autoCompleteType={autoCompleteType}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        multiline={multiline}
        errorMessage={errorMessage}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        numberOfLines={numberOfLines}
        errorStyle={[errorStyle, styles.errorStyle]}
      />
    </View>
  );
};

TextInputFilled.defaultProps = {
  autoCompleteType: 'off',
  keyboardType: 'default',
  errorMessage: '',
  onChangeText: () => console.warn('onChangeText function props is required'),
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderRadius: vScale(10),
    width: scale(366),
    alignSelf: 'center',
    backgroundColor: colors.grey,
    borderBottomWidth: 0,
    height: vScale(56),
    paddingStart: 3,
  },
  labelStyle: {
    fontFamily: fonts.LIGHT,
    fontSize: fontScale(14),
    marginVertical: vScale(8),
    color: colors.black,
    textAlign: 'left',
  },
  InputStyle: {
    fontFamily: fonts.REGELAR,
    paddingHorizontal: sWidth * 0.02,
    borderRadius: sWidth * 0.018,
    paddingVertical: 0,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontSize: fontScale(13),
    borderColor: colors.white,
    fontWeight: '400',
  },
  errorStyle: {
    textAlign: 'left',
    fontSize: fontScale(12),
    fontFamily: fonts.LIGHT,
    marginTop: vScale(5),
    marginStart: -scale(5),
  },
});
export default TextInputFilled;
