import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({navTitle}) => {

    const nav = ({
        // backgroundColor: 'rgb(241, 241, 241)',
        padding: '2rem'
    })

    const unorderedList = ({
        display: 'flex',
        listStyleType: 'none',
        justifyContent: 'center',
        // alignItems: 'spaceBetween'
    })

    const listItem = ({
        padding: '1rem 0.5rem'
    })
    return (
        <nav className="main__nav" style={nav}>
            <ul style={unorderedList}>
                <li style={listItem}>
                    <Link className="menu__items"  to="/">Home</Link>
                </li>
                <li style={listItem}>
                    <Link className="menu__items" to="/users">Users</Link>
                </li>
                <li style={listItem}>
                    <Link className="menu__items" to="/albums">Albums</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar