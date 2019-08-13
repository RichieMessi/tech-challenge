import React, { Fragment } from 'react'

import DataItem from './DataItem'
import SwitchUserMenu from './SwitchUserMenu'


const DataList = ({ photos, usersForSelectOption, handleUserSelectOption, users, albums }) => {
    const renderDataList = () => {

        if (users) {
            return (
                <Fragment>
                    <div className="wrapper__dashboard">
                    <h1 style={{marginBottom: "1rem", fontWeight: "100"}}>Users</h1>
                            <div className="wrapper__select-menu">
                                <SwitchUserMenu users={usersForSelectOption} handleUserSelectOption={handleUserSelectOption} />
                            </div>
                    {
                        users && users.map(el => {
                return (
                        <Fragment key={el.id}>
                            <div className="data-list__container">
                                <ul>
                                <div className="wrapper__data-list">
                                    { <DataItem name={el.name} username={el.username}  /> }
                                </div>
                                </ul>
                            </div>
                        </Fragment>
                        )})
                    }
                    </div>
                </Fragment>
                        )

        }

        if (albums) {
            return (
                <Fragment>
                <div className="wrapper__dashboard">
                    <h1 style={{fontWeight: "100"}}>Albums</h1>
                    {
                    albums.map(el => {
                        return (
                            <Fragment key={el.id}>
                                <div className="data-list__container">
                                    <ul>
                                    <div className="wrapper__data-list">
                                        { <DataItem albumId={el.id} title={el.title} /> }
                                    </div>
                                    </ul>
                                </div>
                            </Fragment>
                        )})
                    }
                    </div>
                </Fragment>
            )
        }
    }
    
    return (
        <div>
            { renderDataList() }
        </div>
    )
}


export default DataList