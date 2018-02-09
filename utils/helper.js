import { AsyncStorage } from 'react-native'
export const MOBILE_FLASHCARD_STORAGE_KEY = 'MobileFlashcardsFinal:decks'

export function setDummyData() {
	const initData = 
		{
		  React: {
		    title: 'React',
		    questions: [
		      {
		        question: 'What is React?',
		        answer: 'A library for managing user interfaces'
		      },
		      {
		        question: 'Where do you make Ajax requests in React?',
		        answer: 'The componentDidMount lifecycle event'
		      }
		    ]
		  },
		  JavaScript: {
		    title: 'JavaScript',
		    questions: [
		      {
		        question: 'What is a closure?',
		        answer: 'The combination of a function and the lexical environment within which that function was declared.'
		      }
		    ]
		  },
		  Redux: {
		    title: 'Redux',
		    questions: [
		      {
		        question: 'What is a closure?',
		        answer: 'The combination of a function and the lexical environment within which that function was declared.'
		      }
		    ]
		  }		  
		}

	AsyncStorage.setItem(MOBILE_FLASHCARD_STORAGE_KEY, JSON.stringify(initData))
	return JSON.stringify(initData)

}

export function checkDataInAsync(data) {
	return data === null
		? setDummyData()
		: data
}



