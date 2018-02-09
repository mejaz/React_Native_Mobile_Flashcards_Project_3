import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { addDeck } from '../utils/api'
import { addDeckAction } from '../actions'
import { connect } from 'react-redux'

class NewDeck extends Component {
	state = {
		deckName: "",
	}

	submitNewDeck = () => {

		if ((this.state.deckName).trim() === "") {
			alert("Deck name cannot be empty!!")
			return
		}

		deckObj = 
		  {	
		    title: this.state.deckName.trim(),
		    questions: []
		  }

		addDeck({key: this.state.deckName, deck: deckObj})
		this.props.dispatch(addDeckAction({key: this.state.deckName, deck: deckObj}))
		this.props.navigation.goBack()
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<Text style={styles.heading}>What is the title of your new deck?</Text>
				<TextInput style={styles.txtInp} onChangeText={(deckName) => this.setState({deckName})} value={this.state.text} placeholder="Type here..."></TextInput>
				<TouchableOpacity style={styles.submitBtn} onPress={()=> this.submitNewDeck()}>
					<Text style={styles.submitText}>Submit</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',

	},
	heading: {
		justifyContent: 'center',
		alignSelf: 'center',
		fontSize: 30,
	},
	txtInp: {
		marginTop: 50,
		height: 50,
		width: 350,
		padding: 5,
		fontSize: 30,
		borderColor: 'gray',
		borderRadius: 5,
		borderWidth: 1,
		alignSelf: 'center'
	},
	submitBtn: {
		marginTop: 20,
		borderRadius: 10,
		borderWidth: 1,
		width: 300,
		backgroundColor: 'black',

	},
	submitText: {
		fontSize: 20,
		paddingTop: 10,
		paddingBottom: 10,
		color: 'white',
		alignSelf: 'center'
	}
})

function mapStateToProps(allDecks) {
	return {allDecks}
}

export default connect(mapStateToProps,)(NewDeck)