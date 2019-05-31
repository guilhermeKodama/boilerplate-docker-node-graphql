import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import blue from '@material-ui/core/colors/blue'

import { SnackbarVariations } from '../../utils/enums'

const styles = theme => ({
  [SnackbarVariations.SUCCESS]: {
    backgroundColor: green[600],
  },
  [SnackbarVariations.ERROR]: {
    backgroundColor: theme.palette.error.dark,
  },
  [SnackbarVariations.INFO]: {
    backgroundColor: theme.palette.primary.dark,
  },
  [SnackbarVariations.WARNING]: {
    backgroundColor: amber[700],
  },
  [SnackbarVariations.REFRESH]: {
    backgroundColor: blue[700],
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    color: 'white',
    backgroundColor: 'rgba(25, 118, 210, .05)',
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, .05)',
    },
  },
})

export default styles
