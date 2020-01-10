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
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'Avenir',
    marginTop: 3,
    marginBottom: 3, 
    paddingLeft: 10, 
    paddingRight: 10,
  },

});

function displayController(bool) {
  if (bool) {
    return {};
  } else {
    return {
      height: 0, 
      borderWidth: 0, 
      marginBottom: 0, 
      borderTopWidth: 0
    };
  }
}

function addToList(list, text) {
  if (text == "") {
    return list;
  } else {
    list=list.concat({name: text});
    alert('item added');
    return list;
  }
}

function popList(list) {
  list.pop();
  alert('item deleted!')
  return list;
}

function cancelOrDone(string) {
  if (string == '') {
    return 'Cancel';
  }
  return 'Done';
}

// function sortByName(list) {
//   let temp;

//   if (list.length == 0) {
//     return list;
//   }

//   for (let i=list.length-1; i > 0; i--) {
//     for (let j=0; j < i; j++) {
//       if (list[j] > list[j+1]) {
//         temp = list[j];
//         list[j] = list[j+1];
//         list[j+1] = temp;
//       }
//     }
//   }
//   return list;
// }

export default class main extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      list: [
        {
          name: 'Apples', 
          infoVisible: false,
          dateAdded: 'Today',
          dateExpired: 'Tommorrow',
          owner: 'Me',
        },
        {
          name: 'Burgers', 
          infoVisible: false,
          dateAdded: 'Today',
          dateExpired: 'Tommorrow',
          owner: 'Me',
        },
        {
          name: 'Jumbalaya', 
          infoVisible: false,
          dateAdded: 'Today',
          dateExpired: 'Tommorrow',
          owner: 'Me',
        },
        {
          name: 'Ice Cream', 
          infoVisible: false,
          dateAdded: 'Today',
          dateExpired: 'Tommorrow',
          owner: 'Me',
        },
        {
          name: 'Rice', 
          infoVisible: false,
          dateAdded: 'Today',
          dateExpired: 'Tommorrow',
          owner: 'Me',
        },
        {
          name: 'Chicken', 
          infoVisible: false,
          dateAdded: 'Today',
          dateExpired: 'Tommorrow',
          owner: 'Me',
        },
        {
          name: 'Watermelon', 
          infoVisible: false,
          dateAdded: 'Today',
          dateExpired: 'Tommorrow',
          owner: 'Me',
        },
        {
          name: 'Pho', 
          infoVisible: false,
          dateAdded: 'Today',
          dateExpired: 'Tommorrow',
          owner: 'Me',
        },
        {
          name: 'Chow Mein', 
          infoVisible: false,
          dateAdded: 'Today',
          dateExpired: 'Tommorrow',
          owner: 'Me',
        },
        {
          name: 'Beef', 
          infoVisible: false,
          dateAdded: 'Today',
          dateExpired: 'Tommorrow',
          owner: 'Me',
        },
        {
          name: 'Corn', 
          infoVisible: false,
          dateAdded: 'Today',
          dateExpired: 'Tommorrow',
          owner: 'Me',
        },
      ],
      addBarVisible: false,
      addName: '',
    }
  }

  _onPressButtonPlus() {
    this.setState({
      addBarVisible: true,
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
      text: '',
      addBarVisible: false,
    })
  }
  
  _onPressButtonInfo(item) {
    this.setState(prevState => ({
      list: prevState.list.map(
        el => el.name == item.name? 
          { ...el, infoVisible: !item.infoVisible}: el
        )
    }))
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
            
            <TouchableWithoutFeedback onPress={() => this._onPressButtonPlus()}>
              <Text style={styles.titleFont}>+</Text> 
            </TouchableWithoutFeedback>

            <Text style={styles.titleFont}>refridger</Text>

            <TouchableWithoutFeedback onPress={() => this._onPressButtonMinus()}>
              <Text style={styles.titleFont}>---</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={[{
          height: 50,
          marginBottom: 3,
          backgroundColor: 'steelblue',
          justifyContent: 'center',
        },displayController(this.state.addBarVisible)]}>
        
          <View style={
            {flexDirection: 'row', 
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <View style={{flexDirection: 'column'}}>
            <TextInput
              style={styles.bodyFont}
              placeholder="Name...      "
              placeholderTextColor='white'
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            </View>
              <TouchableWithoutFeedback onPress={() => this._onPressButtonDone()}>
                <Text style={styles.bodyFont}>{cancelOrDone(this.state.text)}</Text>
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
                <View style={{
                  borderWidth: 1.8, 
                  borderRadius: 15, 
                  borderStyle: 'solid', 
                  borderColor: 'white', 
                  backgroundColor: 'skyblue', 
                  marginBottom: 10,
                }}>  
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between', 
                    alignItems : 'center',

                  }}>
                    <Text style={styles.bodyFont}>{item.name}</Text>
                    <TouchableWithoutFeedback style={styles.titleFont} onPress={() => this._onPressButtonInfo(item)}>
                      <Text style={[styles.bodyFont,{fontSize: 28, marginTop: 0, marginBottom: 0}]}>></Text>
                    </TouchableWithoutFeedback>
                  </View>

                  <View style={[{
                    borderTopWidth: 2,
                    borderTopColor: 'white',
                  }, displayController(item.infoVisible)]}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', }}><Text style={styles.bodyFont}>Date Added: </Text><Text style={styles.bodyFont}>{item.dateAdded}</Text></View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', }}><Text style={styles.bodyFont}>Date Expired: </Text><Text style={styles.bodyFont}>{item.dateExpired}</Text></View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', }}><Text style={styles.bodyFont}>Owner: </Text><Text style={styles.bodyFont}>{item.owner}</Text></View>  
                  </View>
                </View>
              }
            />
          </View>
        </View>
      </View>
      
    );
  }
};
