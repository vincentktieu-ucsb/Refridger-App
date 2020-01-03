import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, FlatList} from 'react-native';

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

function removeLast(list) {
  list.pop();
  return list;
}

function sortByName(list) {
  let temp;

  if (list.length == 0) {
    return list;
  }

  for (let i=list.length-1; i > 0; i--) {
    for (let j=0; j < i; j++) {
      if (list[j] > list[j+1]) {
        temp = list[j];
        list[j] = list[j+1];
        list[j+1] = temp;
      }
    }
  }
  return list;
}

export default class FlexDirectionBasics extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      listIndex:9, 
      list: ['Apple', 'Orange', 'Pears', 'Bananas', 'Rice', 'Chicken', 'Watermelon', 'Pho', 'Chow Mein', 'Beef', 'Corn'],
    }
  }

  _onPressButtonPlus() {
    this.setState({
      list: this.state.list.concat('Corn')
    })
  }

  _onPressButtonMinus() {
    this.setState({
      list: removeLast(this.state.list)
    })
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
        } onPress={this._onPressButtonPlus.bind(this)}>
              <Text style={styles.titleWhite
          }>+</Text> 
            </TouchableWithoutFeedback>

            <Text style={styles.titleWhite
        }>refridger</Text>

            <TouchableWithoutFeedback style={styles.titleWhite
        } onPress={this._onPressButtonMinus.bind(this)}>
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
              data = {this.state.list}
              renderItem={({item}) => <Text style={styles.listItemWhite}>{item}</Text>}
            />
          </View>
        </View>
      </View>
      
    );
  }
};
