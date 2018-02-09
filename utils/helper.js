import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const MOBILE_FLASHCARD_STORAGE_KEY = 'MobileFlashcardsFinal:decks'
export const NOTIFICATION_KEY = 'MobileFlashcards:notification'


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


export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
	return {
		title: "It's time to study",
		body: "👋 Go through some cards and let the learning continue!",
		ios: {
			sound: true,
		},

		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true,
		}
	}
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(9)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}










