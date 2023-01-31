import { atom } from 'recoil'

/** Returns the whole pack object */
export const packAtom = atom({
    key: 'packState',
    default: {},
})

/** Returns the cards object - a part of the list that is pack.content */
export const cardAtom = atom({
    key: 'cardState',
    default: {},
})