import React from 'react';

import Expression from './Expression';
import {Button, Text, TextStyle, TouchableHighlight, View, ViewStyle} from 'react-native';
import {StyleSheet} from 'react-native';

const colours = {
  primary: '#6200EE',
  primaryVariant: '#3700B3',
  secondary: '#03DAC6',
  secondaryVariant: '#018786',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  error: '#b00020',
  onPrimary: '#FFFFFF',
  onSecondary: '#000000',
  onBackground: '#000000',
  onSurface: '#000000',
  onError: '#FFFFFF',
};

const baseButtonTextStyle: TextStyle = {
  color: colours.onBackground,
  fontSize: 20,
  textAlign: 'center',
};
const baseButtonStyle: ViewStyle = {
  borderColor: colours.onBackground,
  borderWidth: StyleSheet.hairlineWidth,
  justifyContent: 'center',
  flex: 1,
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.background,
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  button: {
    ...baseButtonStyle,
  },
  submitButton: {
    ...baseButtonStyle,
    backgroundColor: colours.primary,
  },
  operationButton: {
    ...baseButtonStyle,
  },
  buttonText: {
    ...baseButtonTextStyle,
  },
  submitButtonText: {
    ...baseButtonTextStyle,
    color: colours.onPrimary,
  },
  operationButtonText: {
    ...baseButtonTextStyle,
    color: colours.primary,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  outputRow: {
    flex: 3,
    flexDirection: 'row',
  },
});

interface ButtonProps {
  onPress: (token: number | string) => void;
  token: number | string;
}

interface CalculatorButtonProps extends ButtonProps {
  buttonStyle: ViewStyle;
  textStyle: TextStyle;
}

class CalculatorButton extends React.Component<CalculatorButtonProps, any> {
  render() {
    return (
      <TouchableHighlight
        style={this.props.buttonStyle}
        onPress={() => this.props.onPress(this.props.token)}>
        <Text style={this.props.textStyle}>{this.props.token.toString()}</Text>
      </TouchableHighlight>
    );
  }
}

class OperandCalculatorButton extends React.Component<ButtonProps, any> {
  render() {
    return (
      <CalculatorButton
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
        {...this.props}
      />
    );
  }
}

class SubmitCalculatorButton extends React.Component<ButtonProps, any> {
  render() {
    return (
      <CalculatorButton
        buttonStyle={styles.submitButton}
        textStyle={styles.submitButtonText}
        {...this.props}
      />
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
  private expression: Expression;

  constructor(props: any) {
    super(props);
    this.state = {
      output: '...',
    };
    this.expression = new Expression();
    this.onPress = this.onPress.bind(this);
  }

  onPress(token: number | string) {
    let output = this.state.output;
    if (token !== '=') {
      if (output === '...') {
        output = '';
      }
      output += token;
      this.expression.consumeToken(token);
    } else {
      output = this.expression.compute().toString();
    }
    this.setState({
      output: output,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.outputRow}>
          <OperandCalculatorButton onPress={this.onPress} token={this.state.output} />
        </View>
        <View style={styles.row}>
          <OperandCalculatorButton onPress={this.onPress} token={7} />
          <OperandCalculatorButton onPress={this.onPress} token={8} />
          <OperandCalculatorButton onPress={this.onPress} token={9} />
        </View>
        <View style={styles.row}>
          <OperandCalculatorButton onPress={this.onPress} token={4} />
          <OperandCalculatorButton onPress={this.onPress} token={5} />
          <OperandCalculatorButton onPress={this.onPress} token={6} />
        </View>
        <View style={styles.row}>
          <OperandCalculatorButton onPress={this.onPress} token={1} />
          <OperandCalculatorButton onPress={this.onPress} token={2} />
          <OperandCalculatorButton onPress={this.onPress} token={3} />
        </View>
        <View style={styles.row}>
          <OperandCalculatorButton onPress={this.onPress} token={0} />
          <OperandCalculatorButton onPress={this.onPress} token={'+'} />
          <OperandCalculatorButton onPress={this.onPress} token={'-'} />
        </View>
        <View style={styles.row}>
          <OperandCalculatorButton onPress={this.onPress} token={'AC'} />
          <OperandCalculatorButton onPress={this.onPress} token={'d'} />
          <SubmitCalculatorButton onPress={this.onPress} token={'='} />
        </View>
      </View>
    );
  }
}
