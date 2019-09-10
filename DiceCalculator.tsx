import React from 'react';

import {Text, TouchableHighlight, View} from 'react-native';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  button: {
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});

interface CalculatorButtonProps {
  onPress: (token: number | string) => void;
  token: number | string;
}

class CalculatorButton extends React.Component<CalculatorButtonProps, any> {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={() => this.props.onPress(this.props.token)}>
        <Text style={styles.buttonText}>{this.props.token.toString()}</Text>
      </TouchableHighlight>
    );
  }
}

interface DiceCalculatorState {
  output: string;
}

interface DiceCalculatorProps {}

export default class DiceCalculator extends React.Component<
  DiceCalculatorProps,
  DiceCalculatorState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      output: '...',
    };
    this.onPress = this.onPress.bind(this);
  }

  onPress(token: number | string) {
    let output = this.state.output;
    if (token !== 'Roll') {
      if (output === '...') {
        output = '';
      }
      output += token;
    } else {
      output = '...';
    }
    this.setState({
      output: output,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <CalculatorButton onPress={this.onPress} token={this.state.output} />
        </View>
        <View style={styles.row}>
          <CalculatorButton onPress={this.onPress} token={7} />
          <CalculatorButton onPress={this.onPress} token={8} />
          <CalculatorButton onPress={this.onPress} token={9} />
        </View>
        <View style={styles.row}>
          <CalculatorButton onPress={this.onPress} token={4} />
          <CalculatorButton onPress={this.onPress} token={5} />
          <CalculatorButton onPress={this.onPress} token={6} />
        </View>
        <View style={styles.row}>
          <CalculatorButton onPress={this.onPress} token={1} />
          <CalculatorButton onPress={this.onPress} token={2} />
          <CalculatorButton onPress={this.onPress} token={3} />
        </View>
        <View style={styles.row}>
          <CalculatorButton onPress={this.onPress} token={0} />
          <CalculatorButton onPress={this.onPress} token={'+'} />
          <CalculatorButton onPress={this.onPress} token={'-'} />
        </View>
        <View style={styles.row}>
          <CalculatorButton onPress={this.onPress} token={'Roll'} />
          <CalculatorButton onPress={this.onPress} token={'d'} />
        </View>
      </View>
    );
  }
}
