import React,  { Fragment } from 'react'
import { Link } from 'react-router-dom'

const DataItem = ({ name, username, title, albumId }) => {

    const renderUsers = (name, username) => (
        <Fragment>
            <li className="data-list__item">Name: {name}</li>
            <li className="data-list__item">Username: {username}</li>
        </Fragment>
    )

    const renderAlbums = (albumId, title) => (
        <Fragment>
            <li className="data-list__item">ID: {albumId}</li>
            <li className="data-list__item">Title: {title}</li>
            <li className="data-list__item-photo">
                <Link className="data-list__photo-link" to={`/photos/${albumId}`} >View Image</Link>
            </li>
        </Fragment>
    )

    const checkPropsBeforeDisplay = () => {

        if (name && username) {
            return renderUsers(name, username)
        }

        if (title && albumId) {
            return renderAlbums(albumId, title)
        }

        return <li>Loading....</li>
    }

    return (
        checkPropsBeforeDisplay()
    )
}


export default DataItem