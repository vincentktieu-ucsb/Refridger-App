import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, FlatList} from 'react-native';
let list = ['Apple', 'Orange', 'Pears', 'Bananas', 'Rice', 'Chicken', 'Watermelon', 'Pho', 'Chow Mein', 'Beef'];
let listIndex = 9;

function addListElement (item) {
  listIndex++;
  list[listIndex] = item;
}

const styles = StyleSheet.create({

  titleWhite: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'Futura-MediumItalic',
    marginBottom: 5, 
    paddingLeft:10, 
    paddingRight:10,
  },

  listItemWhite: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Avenir',
    marginBottom: 3, 
    paddingLeft:10, 
    paddingRight:10,
  },
});

export default class FlexDirectionBasics extends Component {
  _onPressButton() {
    alert('You added Corn!'+listIndex);
    addListElement('Corn');
  }
  
  render() {
    return (
      <View style={{
        flex: 1,
      }}>
        <View style={{
          height: 85, 
          backgroundColor: 'powderblue',
          marginBottom: 3,
        }}>
          <View style={{
            flex: 1, 
            flexDirection: 'row',
            justifyContent: 'space-between', 
            alignItems: 'flex-end',
          }}>
            
            <TouchableWithoutFeedback style={styles.titleWhite
        } onPress={this._onPressButton}>
              <Text style={styles.titleWhite
          }>+</Text> 
            </TouchableWithoutFeedback>

            <Text style={styles.titleWhite
        }>refridger</Text>

            <TouchableWithoutFeedback style={styles.titleWhite
        } onPress={this._onPressButton}>
              <Text style={styles.titleWhite
          }>---</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={{
          flex: 1, 
          backgroundColor: 'skyblue',
        }}>
          <View style={{marginLeft: 30, marginTop: 20,}}>
            <FlatList
              data = {list}
              renderItem={({item}) => <Text style={styles.listItemWhite}>{item}</Text>}
            />
          </View>
        </View>
      </View>
      
    );
  }
};
