import { extendTheme } from '@chakra-ui/react'
import { config } from './foundations/config'
import { radii } from './foundations/radii'
import { styles } from './foundations/styles'

const customTheme = extendTheme({
  radii,
  config,
  styles,
})

export default customTheme