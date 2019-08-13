import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'

const Photos = ({ componentGenericStyle, photo, getPhotoParam, match: {params: {photoId}} }) => {

    const values = photo && Object.values(photo)

    const [ albumId, id, title, url, thumbnailUrl ] = values

    useEffect(() => {
        getPhotoParam(photoId)
    })

    const renderPhotoData = () => (
        <Fragment>
            <div style={componentGenericStyle}>
                <h1 style={{textAlign: "center", fontWeight: "100"}}>Photo Section</h1>
                <ul className="photo-list__container">
                    <li className="data-list__item">Album ID - { albumId }</li>
                    <li className="data-list__item">Title - { title }</li>
                    <li className="data-list__item">Full Size - 
                        <a href={url} target="_blank" className="data-list__item-link">
                            { url }
                        </a>
                    </li>
                    <li className="data-list__item">Thumbnail - 
                        <a href={thumbnailUrl} target="_blank"  className="data-list__item-link">
                            { thumbnailUrl }
                        </a>
                    </li>
                </ul>
            </div>
        </Fragment>
    )
    
    return (
        renderPhotoData()
    )
}

export default Photos 
