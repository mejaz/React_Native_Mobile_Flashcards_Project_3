import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import AddCard from './AddCard'
import CardQuestion from './CardQuestion'
import { connect } from 'react-redux'

class DeckHome extends Component {

	static navigationOptions = ({navigation}) => ({
		// updating the title of the deck
		title: navigation.state.params["deckObj"].title
	})

	state = {
		deckObj: {}
	}

	componentDidMount() {
		this.setState({
			deckObj: this.props.allDecks[this.props.navigation.state.params["deckObj"].title]
		})
	}

	render() {
		console.log("params", this.props.navigation.state.params["deckObj"].title)
		const { deckObj } = this.state
		return (
			<View style={styles.container}>
				{ Object.keys(deckObj).length != 0
						? <View>
								<View style={styles.title}>
									<Text style={{fontSize: 50, textAlign:'center'}}>{deckObj.title}</Text>
									<Text style={{fontSize: 30, textAlign:'center'}}>{deckObj.questions.length} cards</Text>
								</View>
								<View style={styles.btnSec}>
									<TouchableOpacity 
										style={[styles.btnBorder]} 
										onPress={() => this.props.navigation.navigate('AddCard', {deckObj})}>
										<Text style={styles.btnText}>Add Card</Text>
									</TouchableOpacity>
									<TouchableOpacity 
										style={[styles.btnBorder, {backgroundColor: 'black'}]}
									>
										<Text 
											style={[styles.btnText, {color: 'white'}]} 
											onPress={() => this.props.navigation.navigate('CardQuestion', {deckObj, index: 0})}
										>
											Start Quiz
										</Text>
									</TouchableOpacity>
								</View>
							</View>
					: <Text>No Deck info</Text>
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		flex: 1,
		justifyContent: 'center',
	},
	btnSec: {
		flex: 1,
		justifyContent: 'center'
	},
	btnBorder: {
		borderWidth: 1,
		borderRadius: 10,
	},
	btnText: {
		fontSize: 30,
		paddingRight: 50,
		paddingLeft: 50,
	},
})

function mapStateToProps(mfcStore) {
	const {allDecks} = mfcStore 
	return {allDecks}
}

export default connect(mapStateToProps,)(DeckHome)