import React from 'react';

import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

class ViewSection extends React.Component {
  render() {
    return <View style={styles.sectionContainer}>{this.props.children}</View>;
  }
}

export default ViewSection;
