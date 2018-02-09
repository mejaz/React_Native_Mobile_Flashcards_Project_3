import { AsyncStorage } from 'react-native'
import { MOBILE_FLASHCARD_STORAGE_KEY, checkDataInAsync } from './helper'

export function getDecks() {
	return AsyncStorage.getItem(MOBILE_FLASHCARD_STORAGE_KEY).then((data) => checkDataInAsync(data))
}

export function addDeck({ key, deck }) {
	return AsyncStorage.mergeItem(MOBILE_FLASHCARD_STORAGE_KEY, JSON.stringify({ [key]: deck }))
}

export function addCard({key, deck}) {
	return AsyncStorage.mergeItem(MOBILE_FLASHCARD_STORAGE_KEY, JSON.stringify({ [key]: deck }))
}