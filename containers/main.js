import React from 'react'
import Header from './header'

import { View, Text, ListView } from 'react-native'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-native'

import Row from '../components/row'

const Main = props => {
  return (
    <View>
      <Header />
      <ListView
        enableEmptySections
        dataSource={props.dataSource}
        renderRow={({ id, ...video }) => {
          return <Row key={id} id={id} {...video} />
        }}
      />
    </View>
  )
}

const connector = connect(state => state)

export default connector(Main)
