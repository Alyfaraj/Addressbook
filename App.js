import {LogBox, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Nanigation from './src/navigation';
const App = () => {
  if (__DEV__) {
    LogBox.ignoreAllLogs(true);
  }
  return (
    <View style={styles.container}>
      <Nanigation />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
