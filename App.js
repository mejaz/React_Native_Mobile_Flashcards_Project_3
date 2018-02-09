import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, StatusBar, ScrollView } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import DeckHome from './components/DeckHome'
import AddCard from './components/AddCard'
import CardQuestion from './components/CardQuestion'
import CardAnswer from './components/CardAnswer'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStore } from 'redux'
import { Constants } from 'expo'
import  { FontAwesome }  from '@expo/vector-icons'
import { teal } from './utils/colors'
import { setLocalNotification } from './utils/helper'

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: "DECKS",
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: "NEW DECK",
    }
  }
}, {
  navigationOptions: {
    header: null,
  }
})


const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckHome: {
    screen: DeckHome,
  },
  AddCard: {
    screen: AddCard,
  },
  CardQuestion: {
    screen: CardQuestion,
  },
  CardAnswer: {
    screen: CardAnswer
  }
})

function FcStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

export default class App extends Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <ScrollView contentContainerStyle={styles.container}>
          <FcStatusBar backgroundColor={teal} barStyle="light-content"/>
          <MainNavigator />
        </ScrollView>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
