import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Decks from './Decks'
import DeckHome from './DeckHome'
import CardAnswer from './CardAnswer'
import { connect } from 'react-redux'
import { updateScore, resetScore } from '../actions'
import { setLocalNotification, clearLocalNotification } from '../utils/helper'

class CardQuestion extends Component {

	checkAnswer = (result) => {
		const deckObj = this.props.navigation.state.params["deckObj"]
		const index = this.props.navigation.state.params["index"]

		if(result === 0) {
			this.props.dispatch(updateScore({score: 1}))
			this.props.navigation.navigate('CardQuestion', {deckObj, index: index + 1})
		} else {
			this.props.dispatch(updateScore({score: -1}))
			this.props.navigation.navigate('CardQuestion', {deckObj, index: index + 1})
		}
	}

	goHome = () => {
		const deckObj = this.props.navigation.state.params["deckObj"]

		this.props.dispatch(resetScore())
		this.props.navigation.navigate("DeckHome", { deckObj })
	}

	restart = () => {

		const deckObj = this.props.navigation.state.params["deckObj"]

		this.props.dispatch(updateScore({score: 1}))
		this.props.navigation.navigate('CardQuestion', {deckObj, index: 0})
	}

	resetNotif =() => {
		clearLocalNotification().then(
			setLocalNotification
		)
	}

	render() {
		const index = this.props.navigation.state.params["index"]
		const deckObj = this.props.navigation.state.params["deckObj"]
		const questions = deckObj.questions

		return (

			questions.length !== index
				?	<View style={styles.container} >
						<View>
							<Text style={{alignSelf: 'flex-end', paddingBottom: 50}}>{index + 1}/{questions.length}</Text>
							<Text style={{fontSize: 30}}>{deckObj.questions[index].question}</Text>
							<TouchableOpacity onPress={() => this.props.navigation.navigate('CardAnswer', {deckObj, index: index + 1})}>
								<Text style={styles.ans}>Answer</Text>
							</TouchableOpacity>
						</View>

						<View>
							<TouchableOpacity style={[styles.btn, {backgroundColor: 'green'}]} >
								<Text style={styles.btnText} onPress={() => this.checkAnswer(0)}>Correct</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.btn, {backgroundColor: 'red'}]}>
								<Text style={styles.btnText} onPress={() => this.checkAnswer(1)}>Incorrect</Text>
							</TouchableOpacity>
						</View>
					</View>
				: <View style={styles.container}>
						{this.resetNotif()}
						<Text style={{fontSize: 30}}>Thanks!! Cards Over.</Text>
						<Text>Your score is: {this.props.score}</Text>
						<View>
							<TouchableOpacity style={styles.btn} onPress={() => this.goHome()} >
								<Text style={[styles.btnText, {color: 'black'}]}>Back to Deck</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.btn} onPress={() => this.restart()} >
								<Text style={[styles.btnText, {color: 'black'}]}>Restart Quiz</Text>
							</TouchableOpacity>
						</View>
					</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	ans: {
		fontSize: 30,
		textAlign: 'center',
		color: 'red',
	},
	btn: {
		borderWidth: 1,
		borderRadius: 10,
	},
	btnText: {
		fontSize: 30,
		paddingRight: 30,
		paddingLeft: 30,
		color: 'white'
	}
})

function mapStateToProps(mfcStore) {
	const {score} = mfcStore
	return { score: score }
}

export default connect(mapStateToProps)(CardQuestion)