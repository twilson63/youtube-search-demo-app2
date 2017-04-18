import React from 'react'

import { View, Text, Image, TouchableOpacity } from 'react-native'
import { find, propEq, pathOr } from 'ramda'
import { connect } from 'react-redux'
import { wrap } from 'react-native-style-tachyons'
import { Link } from 'react-router-native'
import { WebBrowser } from 'expo'

const getVideo = id => (dispatch, getState) => {
  return fetch(`https://youtube-search-api.now.sh/?q=${id}`, {
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0OTIzOTIyNTQsImV4cCI6MTUyMzkyODI1NCwiYXVkIjoieW91dHViZS1hcGkubm93LnNoIiwic3ViIjoiZ3Vlc3QifQ.FSMS3Bx3Adsx65IJc_svUO6wuc2oYW_8wN4TwBcBOT8'
    }
  })
    .then(res => res.json())
    .then(results => {
      dispatch({ type: 'SET_VIDEO', payload: results[0] })
    })
}

class Show extends React.Component {
  componentDidMount () {
    const id = this.props.match.params.id

    this.props.dispatch(getVideo(id))
  }
  _handlePressButtonAsync = () => {
    WebBrowser.openBrowserAsync(this.props.video.link)
  }
  render () {
    const { props } = this
    return (
      <View cls='flx-i'>
        <View cls='flx-i'>
          <Text>{props.video.id}</Text>
          <Text>{props.video.title}</Text>
          <Image
            cls='rm-stretch h5'
            source={{
              uri: pathOr('', [ 'video', 'thumbnails', 'high', 'url' ], props)
            }}
          />
        </View>
        <View cls='flx-i h2 bg-lightblue jcc aic'>
          <TouchableOpacity onPress={this._handlePressButtonAsync}>
            <Text cls='ba pv2 ph3 bg-white blue mb4 w5 tc'>Play Video</Text>
          </TouchableOpacity>
          <Link to='/'>
            <Text cls='ba pv2 ph3 bg-white blue w5 tc'>Back to Search</Text>
          </Link>
        </View>
      </View>
    )
  }
}

const connector = connect(state => state)

export default connector(wrap(Show))
