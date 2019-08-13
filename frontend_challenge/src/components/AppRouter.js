import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Dashboard from './Dashboard'
import Home from './Home'
import Navbar from './Navbar'
import Photos from './Photos'

const componentGenericStyle = ({
  paddingTop: '10rem'
})

const AppRouter = ({ photo, getPhotoParam, usersForSelectOption, handleUserSelectOption, checkParamFromRoute, users, albums }) => (
    <Router>
      <Navbar />
        <Route exact path="/" render={(props) => <Home componentGenericStyle={componentGenericStyle} {...props} />}  />
        <Route exact path="/users" render={(props) => <Dashboard handleUserSelectOption={handleUserSelectOption} componentGenericStyle={componentGenericStyle} usersForSelectOption={usersForSelectOption} users={users} checkParamFromRoute={checkParamFromRoute} {...props} />} />
        <Route exact path="/albums" render={(props) => <Dashboard handleUserSelectOption={handleUserSelectOption} componentGenericStyle={componentGenericStyle} albums={albums} checkParamFromRoute={checkParamFromRoute} {...props} />} />
        <Route exact path="/photos/:photoId" render={(props) => <Photos photo={photo} getPhotoParam={getPhotoParam} componentGenericStyle={componentGenericStyle} {...props} />} />
    </Router>
)

export default AppRouter