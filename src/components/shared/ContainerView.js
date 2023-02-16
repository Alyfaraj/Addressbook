import React from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../../themes/colors';
import {sHeight, sWidth} from '../../themes/scale';

const ContainerView = ({style, children}) => {
  return (
    <KeyboardAwareScrollView
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={[styles.contanier, style]}>
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    backgroundColor: colors.background,
    width: sWidth,
    height: sHeight,
  },
});

export default ContainerView;
