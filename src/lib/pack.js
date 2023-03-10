import { db } from './firebase'
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore'

import { db as localDb } from './localstore'

const fetcher = (id, user) => {
	if (user == 'me') {
		return localDb.packs.get(id)
	}
	return getDoc(doc(db, 'packs', user, 'packs', id)).then((r) => r.data())
}

async function getMyPacks(user) {
	let packs = []
	const userPacks = await getDocs(collection(db, 'packs', user, 'packs'))
	userPacks.forEach((doc) => {
		packs.push(doc.data())
	})

	return packs
}

async function getUsersPacks(user) {
	let packs = []
	const userPacks = await getDocs(
		query(collection(db, 'packs', user, 'packs'), where('published', '==', true))
	)
	userPacks.forEach((doc) => {
		console.log(doc.data())
	})

	return packs
}

async function getPacks() {
	let packs = []
	const userPacks = await getDocs(
		query(collection(db, 'packs', user, 'packs'), where('published', '==', true))
	)
	userPacks.forEach((doc) => {
		packs.push(doc.data())
	})

	return packs
}

export { fetcher, getMyPacks, getUsersPacks, getPacks }
