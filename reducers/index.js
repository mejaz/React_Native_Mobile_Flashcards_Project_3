import { ADD_DECK, ADD_CARD, UPDATE_SCORE, RESET_SCORE } from '../actions'

function mfcStore(state={score: 0}, action) {

	switch (action.type) {
		case ADD_DECK:
			return {
				...state,
				allDecks: {
					...state.allDecks,
					[action.key]: action.deck
				}
			}

		case ADD_CARD:
			return {
				...state,
				allDecks: {
					...state.allDecks,
					[action.key]: action.deck
				}
			}
		
		case UPDATE_SCORE:
			return {
				...state,
				score: state.score + action.score
			}

		case RESET_SCORE:
			return {
				...state,
				score: 0,
			}

		default:
			return state
	}
}

export default mfcStore