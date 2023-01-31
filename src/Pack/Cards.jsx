/* eslint-disable react/prop-types */
import React from 'react'
import { useState } from 'react'
import StaticPair from './Pair/StaticPair'
import EditingPair from './Pair/EditingPair'
import { hslToHex } from '@/lib/utilities'

import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Modal from 'react-bootstrap/Modal'

import { motion } from "framer-motion"

// RECOIL
import { useRecoilState, useRecoilValue } from "recoil"
import { packAtom, cardAtom } from '@/atoms/pack/viewer'
import { editorAtom } from '@/atoms/pack/editor'

function Cards(props) {
    const editor = useRecoilValue(editorAtom)
    const [pack, setPack] = useRecoilState(packAtom)
    const [_, setCards] = useRecoilState(cardAtom)

    setCards(props.cards)

    const [editing, setEditing] = useState(false)

    // New Category modal
    const [show, setShow] = useState(false)
    const [newCategory, setNewCategory] = useState('')
    const [newColor, setNewColor] = useState(['', ''])

    function deletePair() {
        setPack((oldPack) => {
            oldPack.content.splice(props.index, 1)
        })
    }

    function submitNewCategory() {
        setPack((oldPack) => { return {
            ...oldPack,
            categories: [
                ...oldPack.categories,
                newColor
            ]
        }})
        setShow(false)
    }

    function setCardCategory(category) {
        setPack((pack) => {
            pack.content[props.index]['category'] = category
            return pack
        })
    }

    function generateNewColor() {
        let randomHue = Math.floor(Math.random() * 360)
        setNewColor([
            hslToHex(randomHue, 100, 97),
            hslToHex(randomHue, 100, 99)
        ])
    }

    if (editing && editor.editor) {
        return (
            <>
                <EditingPair editing={editing} setEditing={setEditing} />
            </>
        )
    } else {
        return (
            <motion.div key={props.index} animate={{ x: 0 }} initial={{ x: 100 }} exit={{ x: -100, opacity: 0 }} className="p-3" style={{backgroundImage: `linear-gradient(to right, ${pack.categories[props.cards.category][0]},${pack.categories[props.cards.category][1]})`}}>
                {editor.editor ? (
                    <DropdownButton
                        title={props.cards.category}
                        size="sm"
                        className="ms-2"
                        variant="outline-dark rounded-5"
                    >
                        {Object.keys(pack.categories).map((category) => (
                            <Dropdown.Item onClick={() => setCardCategory(category)} key={category}>{category}</Dropdown.Item>
                        ))}
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <Dropdown.Item className="text-center" onClick={() => {generateNewColor(); setShow(true)}}>
                            New
                        </Dropdown.Item>
                    </DropdownButton>
                ) : (
                    <div className="badge bg-primary ms-2">{props.cards.category}</div>
                )}
                <StaticPair />
                {editor ? (
                    <div className="d-flex justify-content-between">
                        <Button
                            className="text-muted text-decoration-none"
                            variant="link"
                            size="sm"
                            onClick={() => setEditing(!editing)}
                        >
                            Edit
                        </Button>
                        {props.index > 0 && (
                            <Button
                                className="text-muted text-decoration-none"
                                variant="link"
                                size="sm"
                                onClick={() => deletePair()}
                            >
                                Remove
                            </Button>
                        )}
                    </div>
                ) : null}
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Categories</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="form-control"
                        />
                        <div className="mt-3 d-flex justify-content-between">
                            <input type="color" className="form-control form-control-color" value={newColor[0]} />
                            <Button variant="dark" onClick={generateNewColor}>Randomize</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={submitNewCategory}>
                            Add New Category
                        </Button>
                    </Modal.Footer>
                </Modal>
            </motion.div>
        )
    }
}

export default Cards
