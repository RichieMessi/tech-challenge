import React, { useState, useEffect } from 'react';
import './App.css';

import AppRouter from './components/AppRouter'

const App = () => {
  const [users, setUsers] = useState([])
  const [usersForSelectOption, setUsersForSelectOption] = useState([])
  const [albums, setAlbums] = useState([])
  const [photo, setPhoto] = useState([])

  const [selectOptions, setSelectOptions] = useState({ Users: 'Users', Albums: 'Albums', Photos: 'photos' })
  const chooseCurrentOption = Object.keys(selectOptions)
  const [queryParam, setQueryParam] = useState(chooseCurrentOption[0])
  const [queryString, setQueryString] = useState(`https://jsonplaceholder.typicode.com/`)

  const fetchAndSlice = (queryString, param) => fetch(queryString + param).then(data => data.json()).then(data => data.slice(0, 10))
  const fetchImage = (queryString, param) => fetch(`${queryString}photos/${param}`).then(data => data.json().then(photo => setPhoto(photo)))

  const initiateFetchRequest = (queryString, param) => {


    const initState = data => {
      setUsers(data)
      setUsersForSelectOption(data)
    }

    if (param === 'Users') {
      return fetchAndSlice(queryString, param).then(users => initState(users))
    } 

    if (param === 'Albums') {
      return fetchAndSlice(queryString, param).then(albums => setAlbums(albums))
    } 

    if (!isNaN(param)) {
      return fetchImage(queryString, param)
    }

    return null
  }

  const checkQueryParam = (queryString, param) => {

    if (param === 'Users') {
      return initiateFetchRequest(queryString, chooseCurrentOption[0])
    }

    if (param === 'Albums') {
      return initiateFetchRequest(queryString, chooseCurrentOption[1])
    }

    if(!isNaN(param)) {
      return initiateFetchRequest(queryString, param)
    }

          return null
  }

  const checkParamFromRoute = param => setQueryParam(param)

  const handleUserSelectOption = option => {
    if(option === 'All Users') {
      return setUsers(usersForSelectOption)
    } else {
      return usersForSelectOption.filter(user => user.name === option).map(data => setUsers([data]))
    }
  }

  const getPhotoParam = param => setQueryParam(param)

  

  useEffect(() => {
    checkQueryParam(queryString, queryParam)
    handleUserSelectOption()
    }, [queryParam])

  return (
    <div className="">
      <AppRouter photo={photo} getPhotoParam={getPhotoParam} users={users} albums={albums} checkParamFromRoute={checkParamFromRoute} handleUserSelectOption={handleUserSelectOption} usersForSelectOption={usersForSelectOption} />
    </div>
  );
}

export default App;
