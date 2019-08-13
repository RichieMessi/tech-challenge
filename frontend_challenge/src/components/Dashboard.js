import React, { useEffect } from 'react'

import DataList from './DataList'

const Dashboard = ({ photos, usersForSelectOption, handleUserSelectOption, componentGenericStyle, users, albums, checkParamFromRoute, match: { url } }) => {
    // console.warn(photos)
    
    const removeSlashAndCaptalize = input => (
        input = [...input]
        .filter(el => el !== "/")
        .map((el, key) => key === 0 ? el.toUpperCase() : el)
        .join('')
    )
    
    useEffect(() => {
        const param = removeSlashAndCaptalize(url)
        checkParamFromRoute(param)
    })
    
    return (
        <div style={componentGenericStyle}>
           <DataList photos={photos} users={users} usersForSelectOption={usersForSelectOption} albums={albums} handleUserSelectOption={handleUserSelectOption} /> 
        </div>
    )
}


export default Dashboard