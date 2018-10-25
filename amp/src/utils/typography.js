import Typography from 'typography'
import typographyThemeKirkham from 'typography-theme-kirkham'

const typography = new Typography(typographyThemeKirkham)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
