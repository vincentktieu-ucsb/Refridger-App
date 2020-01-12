import React, { Component } from 'react'; // Import ReactJS
import { StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, FlatList, Keyboard, DatePickerIOS } from 'react-native'; // import from ReactNative, which is different from ReactJS
import Firebase from 'firebase'; // Requires $ yarn add firebase

const styles = StyleSheet.create({
  // Fonts
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
  // Overloads the height of a "view" tag's height to 0 
  if (bool) {
    return {};
  } else {
    return {
      height: 0, 
      width: 0,
      borderWidth: 0, 
      marginBottom: 0, 
      borderTopWidth: 0,
    };
  }
}

var config = {
  apiKey: "AIzaSyAY1ilFFwcj_jiBtjUxWbGPXV0GtUzCBho",
  authDomain: "refridger-de716.firebaseapp.com",
  databaseURL: "https://refridger-de716.firebaseio.com",
  projectId: "refridger-de716",
  storageBucket: "refridger-de716.appspot.com",
  messagingSenderId: "924699544943",
  appId: "1:924699544943:web:9154d2f8b03d228a83ec9a",
  measurementId: "G-JDM1CX0BLL"
};


if (!Firebase.apps.length) {
  Firebase.initializeApp(config);
}

let app = Firebase.app();
const db = app.database();

let addItem = (addName, addDateAdded, addDateExpired, addOwner) => {
  db.ref('/list').push({
    infoVisible: false,
    name: addName, 
    dateAdded: addDateAdded,
    dateExpired: addDateExpired,
    itemOwner: addOwner, 
  });
};

function returnFirebaseList() {
  let listRef = db.ref('list');
  var list = [];
  var item;
  listRef.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        item = childSnapshot.val()
        list.push(item);
      });
  });
  return list;
}

function addToList(list, addName, addDateAdded, addDateExpired, addItemOwner) {
  // Adds item
  if (addName == '') {
    return list;
  }
  addItem(addName, addDateAdded, addDateExpired, addItemOwner);
  return list;
}

function deleteFromList(list, item) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] == item) {
      list.splice(i,1);
      return list;
    }
  }
}

function cancelOrDone(string) {
  // Returns 'Done' if string isn't empty
  if (string == '') {
    return 'Cancel';
  }
  return 'Done';
}

// var d = new Date();
// console.log(d.getTime());

export default class main extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      list: returnFirebaseList(),
      addBarVisible: false,
      addName: '',
      addDateAdded: '',
      addDateExpired: '',
      addItemOwner: '',
      deleteVisible: false,
    }
  }

  _onPressButtonPlus() {
    // Controls up or down add item view
    this.setState({
      addBarVisible: !this.state.addBarVisible,
      addName: '',
      addDateAdded: '',
      addDateExpired: '',
      addItemOwner: '',
      list: returnFirebaseList(),
    });
  }

  _onPressButtonMinus() {
    this.setState(prevState => ({
      deleteVisible: !(this.state.deleteVisible),
    }))
  }

  _onPressButtonDone() {
    // Controls up or down add item view. Also adds items
    this.setState({
      list: addToList(this.state.list, this.state.addName, this.state.addDateAdded, this.state.addDateExpired, this.state.addItemOwner),
      addBarVisible: false,
      addName: '',
      addDateAdded: '',
      addDateExpired: '',
      addItemOwner: '',
    });
  }
  
  _onPressButtonInfo(item) {
    // Controls info view for each item
    this.setState(prevState => ({
      list: prevState.list.map(
        el => el.name == item.name? 
          { ...el, infoVisible: !item.infoVisible}: el
        )
    }))
  }

  _onPressButtonDelete(item) {
    this.setState({
      list: deleteFromList(this.state.list, item)
    });
    let listRef = db.ref('list');
    listRef.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.val().key === item.key) {
          (db.ref('list/' + childSnapshot.key)).remove();
        }
      })
    })
  }

  render() {
    return (
      <View style={{
        // Main List View
        flex: 1,
      }}>
        <View style={{
          // Title Section
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
            
            <TouchableWithoutFeedback onPress={() => this._onPressButtonPlus()} onPressIn={Keyboard.dismiss}>
              <Text style={styles.titleFont}>+</Text> 
            </TouchableWithoutFeedback>

            <Text style={styles.titleFont}>refridger</Text>

            <TouchableWithoutFeedback onPress={() => this._onPressButtonMinus()}>
              <Text style={styles.titleFont}>---</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={[{
          // Add item View Section
          marginBottom: 3,
          backgroundColor: 'steelblue',
          justifyContent: 'center',
        },displayController(this.state.addBarVisible)]}>
        
          <View style={{
            flexDirection: 'row', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10,
          }}>
            <View style={{flexDirection: 'column'}}>
            <TextInput
              style={styles.bodyFont}
              placeholder="New Item Name...      "
              placeholderTextColor='white'
              onChangeText={(addName) => this.setState({addName})}
              value={this.state.addName}
              onSubmitEditing={Keyboard.dismiss}
            />
            <TextInput
              style={styles.bodyFont}
              placeholder="Date Added... (Optional)      "
              placeholderTextColor='white'
              onChangeText={(addDateAdded) => this.setState({addDateAdded})}
              value={this.state.addDateAdded}
              onSubmitEditing={Keyboard.dismiss}
            />
            <TextInput
              style={styles.bodyFont}
              placeholder="Date Expired... (Optional)      "
              placeholderTextColor='white'
              onChangeText={(addDateExpired) => this.setState({addDateExpired})}
              value={this.state.addDateExpired}
              onSubmitEditing={Keyboard.dismiss}
            />
            <TextInput
              style={styles.bodyFont}
              placeholder="Item Owner... (Optional)      "
              placeholderTextColor='white'
              onChangeText={(addItemOwner) => this.setState({addItemOwner})}
              value={this.state.addItemOwner}
              onSubmitEditing={Keyboard.dismiss}
            />
            
            </View>
              <TouchableWithoutFeedback onPress={() => this._onPressButtonDone()} onPressIn={Keyboard.dismiss}>
                <Text style={styles.bodyFont}>{cancelOrDone(this.state.addName)}</Text>
              </TouchableWithoutFeedback>
          </View>

        </View>

        <View style={{
          // List Section
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
                  <View style={[styles.bodyFont, {flexDirection: 'row', alignItems: 'center', fontSize: 28, marginTop: 0, marginBottom: 0}]}>
                    <View style={[{alignItems: 'center',}, displayController(this.state.deleteVisible)]}>
                      <TouchableWithoutFeedback onPress={() => this._onPressButtonDelete(item)}>
                        <Text style = {[styles.titleFont,{fontSize: 22, marginTop: 0, marginBottom: 0, color: 'steelblue'}]}>X</Text>
                      </TouchableWithoutFeedback>
                    </View>
                    <View style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between', 
                      alignItems : 'center',
                    }}>
                      <Text style={styles.bodyFont}>{item.name}</Text>
                      <TouchableWithoutFeedback style={styles.titleFont} onPress={() => this._onPressButtonInfo(item)}>
                        <Text style={[styles.titleFont,{fontSize: 28, marginTop: 0, marginBottom: 0}]}>></Text>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>

                  <View style={[{
                    borderTopWidth: 2,
                    borderTopColor: 'white',
                  }, displayController(item.infoVisible)]}>
                    <View style={[{flexDirection: 'row', justifyContent: 'space-between', }, displayController(item.dateAdded != '')]}><Text style={styles.bodyFont}>Date Added: </Text><Text style={styles.bodyFont}>{item.dateAdded}</Text></View>
                    <View style={[{flexDirection: 'row', justifyContent: 'space-between', }, displayController(item.dateExpired != '')]}><Text style={styles.bodyFont}>Date Expired: </Text><Text style={styles.bodyFont}>{item.dateExpired}</Text></View>
                    <View style={[{flexDirection: 'row', justifyContent: 'space-between', }, displayController(item.itemOwner != '')]}><Text style={styles.bodyFont}>Item Owner: </Text><Text style={styles.bodyFont}>{item.itemOwner}</Text></View>
                    <View style={[{flexDirection: 'row', justifyContent: 'space-between', }, displayController(item.dateAdded == '' && item.dateExpired == '' && item.itemOwner == '')]}><Text style={styles.bodyFont}>No Additional Info Available :(</Text><Text style={styles.bodyFont}>{item.itemOwner}</Text></View>  
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
