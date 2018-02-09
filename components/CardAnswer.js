import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

class CardAnswer extends Component {
	render() {
		console.log('ca props',this.props)
		const index = this.props.navigation.state.params["index"] - 1
		const deckObj = this.props.navigation.state.params["deckObj"]
		
		return (
			<View style={styles.container}>
				<Text style={{fontSize: 30}}>{deckObj.questions[index].answer}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: 'center',
		justifyContent: 'center',
		alignSelf: 'center'
	}
})

export default CardAnswer