import { atom } from 'recoil'

/** Returns a boolean of whether the user can edit the pack or not */
export const editorAtom = atom({
    key: 'editorState',
    default: false,
})