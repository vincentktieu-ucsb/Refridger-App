import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, FlatList} from 'react-native';
let list = ['', 'Apple', 'Orange', 'Pears', 'Bananas', 'Rice', 'Chicken', 'Watermelon', 'Pho', 'Chow Mein', 'Beef', ''];
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
    alert('You tapped the button!')
  }
  
  render() {
    return (
      <View style={{
        flex: 1,
      }}>
        <View style={{
          height: 100, 
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
          <View style={{marginLeft: 30, marginTop: 0,}}>
            <FlatList
              data={[
                {key: ' '},
                {key: 'Apples'},
                {key: 'Oranges'},
                {key: 'Pears'},
                {key: 'Bananas'},
                {key: 'Rice'},
                {key: 'Chicken'},
                {key: 'Watermelon'},
                {key: 'Pho'},
                {key: 'Chow Mein'},
                {key: 'Beef'},
                {key: ' '},
                {key: ' '},
                {key: ' '},
                {key: ' '},
                {key: ' '},
                {key: ' '},
                {key: ' '},
                {key: ' '},

              ]}
              renderItem= {({item}) => <Text style={styles.listItemWhite
          }>{item.key}</Text>}
            />
          </View>
        </View>
      </View>
      
    );
  }
};
