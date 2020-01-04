import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, FlatList} from 'react-native';

const styles = StyleSheet.create({

  titleFont: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'Futura-MediumItalic',
    marginTop: 5,
    marginBottom: 5, 
    paddingLeft:10, 
    paddingRight:10,
  },

  bodyFont: {
    color: 'white',
    fontSize: 26,
    fontFamily: 'Avenir',
    marginBottom: 3, 
    paddingLeft: 10, 
    paddingRight: 10,
  },

});

function addToList(list, text) {
  if (text == "") {
    return list;
  } else {
    list=list.concat(text);
    return list;
  }
}
function popList(list) {
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

export default class main extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      list: ['Apple', 'Orange', 'Pears', 'Bananas', 'Rice', 'Chicken', 'Watermelon', 'Pho', 'Chow Mein', 'Beef', 'Corn'],
      text: '',
      barHeight: 0,
      barMargin: 0,
    }
  }

  _onPressButtonPlus() {
    this.setState({
      barHeight: 50,
      barMargin: 3,
    })
  }

  _onPressButtonMinus() {
    this.setState({
      list: popList(this.state.list),
    })
  }

  _onPressButtonDone() {
    this.setState({
      list: addToList(this.state.list, this.state.text),
      barHeight: 0,
      barMargin: 0,
      text: '',
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
            
            <TouchableWithoutFeedback onPress={this._onPressButtonPlus.bind(this)}>
              <Text style={styles.titleFont}>+</Text> 
            </TouchableWithoutFeedback>

            <Text style={styles.titleFont}>refridger</Text>

            <TouchableWithoutFeedback onPress={this._onPressButtonMinus.bind(this)}>
              <Text style={styles.titleFont}>---</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={{
          height: this.state.barHeight,
          marginBottom: this.state.barMargin,
          backgroundColor: 'steelblue',
          justifyContent: 'center',
        }}>
        
          <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
            <TextInput
              style={styles.bodyFont}
              placeholder="Tap to type item...      "
              placeholderTextColor='white'
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />

              <TouchableWithoutFeedback onPress={this._onPressButtonDone.bind(this)}>
                <Text style={styles.bodyFont}>Done</Text>
              </TouchableWithoutFeedback>

          </View>

        </View>

        <View style={{
          flex: 1, 
          backgroundColor: 'skyblue',
        }}>
          <View style={{ 
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,
            flex: 1,
          }}>
            <FlatList
              data = {this.state.list}
              renderItem={({item}) =>  
                // <TouchableWithoutFeedback><Text>Tests</Text>></TouchableWithoutFeedback>>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', borderWidth: 3, borderRadius: 15, borderStyle: 'solid', borderColor: 'white', backgroundColor: 'babyblue', marginBottom: 8}}>
                  <Text style={styles.bodyFont}>{item}</Text>
                  <TouchableWithoutFeedback style={styles.titleFont} onPress={this._onPressButtonDone.bind(this)}>
                    <Text style={styles.bodyFont}>></Text>
                  </TouchableWithoutFeedback>
                </View>
                
              }
            />
          </View>
        </View>
      </View>
      
    );
  }
};
