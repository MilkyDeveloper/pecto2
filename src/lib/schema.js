const BasePack = () => {
	return {
		name: '',
		class: '',
		author: 'me',
		superficialAuthor: 'Me (Locally Saved)',
		date: new Date(Date.now()).toLocaleString().split(',')[0],
		uid: null, // Must be defined when imported to Firestore
		uuid: '',
		published: false,
		categories: {'Default': ['transparent', 'transparent']},
		content: [
			{
				term: '',
				definition: '',
				category: 'Default'
			},
		],
	}
}

export { BasePack }