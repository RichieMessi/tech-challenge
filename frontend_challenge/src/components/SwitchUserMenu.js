import React, { Fragment } from 'react'

const SwitchUserMenu = ({ handleUserSelectOption, users }) => {

    const handleChange = e => handleUserSelectOption(e.target.value)

    const initializeForm = () => (
        <Fragment>
            <div className="menu__wrapper">
                <div className="menu__title">
                    <label htmlFor="">Select User</label>
                </div>
                <div className="menu__item">
                <select  name="selectMode" defaultValue="Select User"  onChange={handleChange}>
                    <option  value="Select User"  disabled hidden>Choose here</option>
                    <option value="All Users">All Users</option>
                {
                    users 
                    && 
                    users.map(el=> (
                        <option name={el.name} value={el.name} key={el.id}>{el.name}</option>
                    ))
                }
            </select>
                </div>
            </div>
        </Fragment>
    )
    return (
        <div>
            {

        initializeForm()
            }
  
        </div>
    )
}

export default SwitchUserMenu