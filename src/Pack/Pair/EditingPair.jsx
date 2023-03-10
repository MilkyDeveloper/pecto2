import React from 'react'
import { useState } from 'react'
import { CardsContext } from '@/lib/context'

import Button from 'react-bootstrap/Button'

import { usePack } from '@/stores/pack'
import { shallow } from 'zustand/shallow'

import Form from 'react-bootstrap/Form'

function EditingPair(props) {
	const cards = React.useContext(CardsContext)
	const [setCard] = usePack(
		(state) => [
			// Data
			state.setCard,
		],
		shallow
	)
	const [term, setTerm] = useState(cards.term)
	const [definition, setDefinition] = useState(cards.definition)

	async function exitEditingMode() {
		// When the user clicks "Done" and the component will be switched to the static version,
		// we commit our changes
		console.log(cards.id, { term: term, definition: definition })
		setCard(cards.id, { term: term, definition: definition })

		// Self-destruct
		// No other code below here
		props.setEditing(false)
	}

	return (
		// <div>
		//     <form>
		//         <label>
		//             Term
		//             <input
		//                 type="text"
		//                 value={term}
		//                 onChange={(e) => setTerm(e.target.value)}
		//             />
		//         </label>

		//         <label>
		//             Definition
		//             <input
		//                 type="text"
		//                 value={definition}
		//                 onChange={(e) => setDefinition(e.target.value)}
		//             />
		//         </label>
		//     </form>
		//     <button onClick={exitEditingMode}>
		//         Done
		//     </button>
		// </div>

		<Form>
			<div className="container overflow-hidden text-center">
				<div className="row">
					<div className="col p-2">
						<div className="p-2 py-4 shadow-sm bg-light rounded-3">
							<Form.Control
								className="text-center"
								type="text"
								value={term}
								onChange={(e) => setTerm(e.target.value)}
							/>
						</div>
					</div>
					<div className="col p-2">
						<div className="p-2 py-4 shadow-sm bg-light rounded-3">
							<Form.Control
								className="text-center"
								type="text"
								value={definition}
								onChange={(e) => setDefinition(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</div>

			<Button variant="success" size="sm" onClick={exitEditingMode}>
				Done
			</Button>
		</Form>
	)
}

export default EditingPair
