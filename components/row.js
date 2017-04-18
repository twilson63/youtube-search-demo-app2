import React from 'react'
import { View, Image, Text } from 'react-native'
import { wrap } from 'react-native-style-tachyons'
import { Link } from 'react-router-native'

const Row = props => {
  return (
    <Link to={'/' + props.id}>
      <View cls='flx-i pv3 ph2'>
        <Image
          source={{ uri: props.thumbnails.high.url }}
          cls='rm-stretch h5'
        />
        <Text cls='mt1'>{props.title}</Text>
      </View>
    </Link>
  )
}

export default wrap(Row)
