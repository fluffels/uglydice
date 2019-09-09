import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import DiceCalculator from './DiceCalculator';

const App = () => {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <DiceCalculator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});

export default App;
