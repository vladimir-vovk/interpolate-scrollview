import { ReactElement } from 'react'
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle
} from 'react-native-reanimated'

const SQUARE_SIZE = 280

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 56,
    fontWeight: '800',
    color: 'white',
    textTransform: 'uppercase'
  }
})

type Props = {
  title: string
  index: number
  offsetX: SharedValue<number>
}

export const Page = ({ index, title, offsetX }: Props): ReactElement => {
  const { width, height } = useWindowDimensions()

  const inputRange = [width * (index - 1), width * index, width * (index + 1)]

  const aTextStyle = useAnimatedStyle(() => {
    const y = interpolate(
      offsetX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP
    )

    const opacity = interpolate(offsetX.value, inputRange, [-2, 1, -2], Extrapolate.CLAMP)

    return {
      opacity,
      transform: [{ translateY: y }]
    }
  })

  const aStyle = useAnimatedStyle(() => {
    const scale = interpolate(offsetX.value, inputRange, [0, 1, 0], Extrapolate.CLAMP)

    const borderRadius = interpolate(
      offsetX.value,
      inputRange,
      [0, SQUARE_SIZE / 2.7, 0],
      Extrapolate.CLAMP
    )

    const rotate = interpolate(offsetX.value, inputRange, [-Math.PI, 0, Math.PI], Extrapolate.CLAMP)

    return {
      transform: [{ scale }, { rotate: `${rotate}rad` }],
      borderRadius
    }
  })

  return (
    <View style={[styles.container, { width, backgroundColor: `rgba(0, 0, 255, 0.${index + 2})` }]}>
      <Animated.View style={[styles.square, aStyle]}>
        <Animated.View style={[{ position: 'absolute' }, aTextStyle]}>
          <Text style={styles.text}>{title}</Text>
        </Animated.View>
      </Animated.View>
    </View>
  )
}
