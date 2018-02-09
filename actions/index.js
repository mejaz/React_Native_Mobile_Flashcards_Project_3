export const ADD_DECK = "ADD_DECK"
export const ADD_CARD = "ADD_CARD"
export const UPDATE_SCORE = "UPDATE_SCORE"
export const RESET_SCORE = "RESET_SCORE"


export function addDeckAction({ key, deck }) {
	return {
		type: ADD_DECK,
		key,
		deck,
	}
}

export function addCardAction({key, deck}) {
	return {
		type: ADD_CARD,
		key,
		deck,
	}
}

export function updateScore({score}) {
	return {
		type: UPDATE_SCORE,
		score,
	}
}

export function resetScore() {
	return {
		type: RESET_SCORE,
	}
}