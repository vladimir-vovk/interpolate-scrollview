import { ReactElement } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Scroll } from 'src/Scroll'

export default function App(): ReactElement {
  return (
    <SafeAreaProvider>
      <Scroll />
    </SafeAreaProvider>
  )
}
