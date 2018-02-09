import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

class AppHead extends Component {
	render() {
		return (
			<View >
				<Text style={styles.container}>Mobile Flashcards</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		color: '#eee',
		backgroundColor: '#bbb',
		fontSize: 20,
	}
})


export default AppHead