import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import DiceCalculator from './DiceCalculator';

export default class UglyDice extends React.Component<any, any> {
  render() {
    return (
      <SafeAreaView style={styles.rootContainer}>
        <DiceCalculator />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
