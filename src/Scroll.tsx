import { ReactElement } from 'react'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

import { Page } from 'src/Page'

const WORDS = [`What's`, 'up', 'folks!', '🐰']

export const Scroll = (): ReactElement => {
  const offsetX = useSharedValue(0)

  const onScroll = useAnimatedScrollHandler((e) => {
    offsetX.value = e.contentOffset.x
  })

  return (
    <Animated.ScrollView
      horizontal={true}
      pagingEnabled={true}
      onScroll={onScroll}
      scrollEventThrottle={16}
    >
      {WORDS.map((title, i) => (
        <Page index={i} title={title} offsetX={offsetX} />
      ))}
    </Animated.ScrollView>
  )
}
