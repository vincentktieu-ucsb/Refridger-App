import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TouchableHighlight,} from 'react-native';

const styles = StyleSheet.create({
  bigBlue: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'Futura-MediumItalic'
  },
});

export default class FlexDirectionBasics extends Component {
  _onPressButton() {
    alert('You tapped the button!')
  }
  
  render() {
    return (
      <View style={{
        flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'flex-start',
        // alignItems: 'stretch',
      }}>
        <View style={{height: 100, backgroundColor: 'powderblue', marginBottom: 3}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 5, paddingLeft:10, paddingRight:10}}>
            <TouchableHighlight style={styles.bigBlue} onPress={this._onPressButton}>
              <Text style={styles.bigBlue}>+</Text>
            </TouchableHighlight>
            <Text style={styles.bigBlue}>refridger</Text>
            <TouchableHighlight style={styles.bigBlue} onPress={this._onPressButton}>
              <Text style={styles.bigBlue}>---</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={{flex: 1, backgroundColor: 'skyblue'}} />
      </View>
      
    );
  }
};
