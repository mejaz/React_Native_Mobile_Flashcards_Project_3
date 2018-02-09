import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { addCard } from '../utils/api'
import { addCardAction } from '../actions'
import { connect } from 'react-redux'

class AddCard extends Component {
	static navigationOptions = ({navigation}) => ({
		title: "Add Card"
	})

	state = {
		question: "",
		answer: "",
	}

	submitCard = () => {

		if((this.state.question).trim() === "" || (this.state.answer).trim() === "") {
			alert("Question or an Answer cannot be empty!")
			return
		}

		const { deckObj } = this.props.navigation.state.params
		const newCard = {
			question: this.state.question.trim(),
			answer: this.state.answer.trim(),
		}

		deckObj.questions.push(newCard)

		addCard({ key: deckObj.title, deck: deckObj })
		this.props.dispatch(addCardAction({key: deckObj.title, deck: deckObj}))
		this.props.navigation.goBack()
	}

	render() {
		console.log("in add card")
		return(
			<KeyboardAvoidingView style={styles.container}>
				<TextInput 
					style={[styles.txtInp, {marginTop: 20}]} 
					placeholder="Type Your Question here..."
					onChangeText={(q) => this.setState({question: q})}
				></TextInput>
				<TextInput 
					style={styles.txtInp} 
					placeholder="Type Your Answer here..."
					onChangeText={(a) => this.setState({answer: a})}
				></TextInput>
				<TouchableOpacity 
					style={styles.btn}
					onPress={() => this.submitCard()}
				>
					<Text style={styles.btnTxt}>Submit</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start'
	},
	txtInp: {
		fontSize: 30,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
	},
	btn: {
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: 'black',
		marginRight: 5,
		marginLeft: 5,
	},
	btnTxt: {
		fontSize: 30,
		paddingRight: 20,
		paddingLeft: 20,
		marginRight: 5,
		marginLeft: 5,
		color: 'white',
		textAlign: 'center'
	}

})

function mapStateToProps(allDecks) {
	return {allDecks}
}

export default connect(mapStateToProps)(AddCard)