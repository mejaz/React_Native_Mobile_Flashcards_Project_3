import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import DeckHome from './DeckHome'
import { addDeckAction } from '../actions'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'

class Decks extends Component {

  componentDidMount() {

    getDecks().then((data) => {
      const parsedData = JSON.parse(data)
      for (var i in parsedData) {
        if (parsedData.hasOwnProperty(i)) {
          this.props.dispatch(addDeckAction({ key: i, deck: parsedData[i] }))
        }
      }

    })
  }

  render() {
    const { allDecksArr } = this.props

    return (
      <ScrollView style={styles.container}>
        { 
          typeof allDecksArr !== "undefined" || allDecksArr.length > 0
            ? Object.keys(allDecksArr).map((c) => (
                <TouchableOpacity key={c} style={ styles.deck }
                  onPress={() => {this.props.navigation.navigate('DeckHome', { deckObj: allDecksArr[c]})}}
                >
                  <Text style={styles.title} key={ allDecksArr[c].title }>{ allDecksArr[c].title }</Text>
                  <Text style={styles.count} key={ c }>{ allDecksArr[c].questions.length } card(s)</Text>
                </TouchableOpacity>
              ))
            : <Text style={styles.title}>No deck to display</Text>
         }
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
  },
  deck: {
    padding: 30,
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderStyle: 'solid', 
    borderColor: 'black',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  count: {
    fontSize: 15,
    justifyContent: 'center',
    textAlign: 'center',

  }
});

function mapStateToProps(mfcStore) {
  const { allDecks } = mfcStore
  const allDecksArr = []
  for (var i in allDecks) {
    if (allDecks.hasOwnProperty(i)) {
      allDecksArr.push(allDecks[i])
    }
  }
  return { allDecksArr: allDecksArr }
}

export default connect(mapStateToProps)(Decks)


