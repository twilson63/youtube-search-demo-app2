import React from 'react'

import { View, Text, TextInput } from 'react-native'
import { wrap } from 'react-native-style-tachyons'
import { connect } from 'react-redux'

const getVideos = (dispatch, getState) => {
  const value = getState().value
  console.log(`https://youtube-search-api.now.sh/?q=JavaScript%20${encodeURI(value)}`)
  return fetch(
    `https://youtube-search-api.now.sh/?q=JavaScript%20${encodeURI(value)}`,
    {
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0OTIzOTIyNTQsImV4cCI6MTUyMzkyODI1NCwiYXVkIjoieW91dHViZS1hcGkubm93LnNoIiwic3ViIjoiZ3Vlc3QifQ.FSMS3Bx3Adsx65IJc_svUO6wuc2oYW_8wN4TwBcBOT8'
      }
    }
  )
    .then(res => res.json())
    .then(results => {
      dispatch({ type: 'SET_VIDEOS', payload: results })
    })
}

const Header = props => {
  return (
    <View cls='flx-row aic jcc h3 pv3 bg-red'>
      <TextInput
        cls='flx-i ph3 bg-white red ba b--red br2 mh3'
        value={props.value}
        onChangeText={
          value => props.dispatch({ type: 'SET_TEXT', payload: value })
        }
        placeholder='JS YouTube Search'
        onSubmitEditing={() => props.dispatch(getVideos)}
      />
    </View>
  )
}

const connector = connect(state => state)
export default connector(wrap(Header))
