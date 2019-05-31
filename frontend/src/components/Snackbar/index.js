import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import CloseIcon from '@material-ui/icons/Close'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'

import styles from './styles'

import { SnackbarVariations } from '../../utils/enums'

const variantIcon = {
  [SnackbarVariations.SUCCESS]: CheckCircleIcon,
  [SnackbarVariations.WARNING]: WarningIcon,
  [SnackbarVariations.ERROR]: ErrorIcon,
  [SnackbarVariations.INFO]: InfoIcon,
};

class SnackbarCustom extends Component {

  closeSnackbar = () => {
    const { closeSnackbar } = this.props
    closeSnackbar()
  }

  clearSnackbar = () => {
    const { clearSnackbar } = this.props
    clearSnackbar()
  }

  /**
   * Handle functions
   */

   handleClose = e => {
     this.closeSnackbar()
   }

   handleExited = e => {
     this.clearSnackbar()
   }

   handleUndo = e => {}

  render() {
    const { classes, open, variant, message, onUndo } = this.props,
          Icon = variantIcon[variant]

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        autoHideDuration={4000}
        onClose={this.handleClose}
        onExited={this.handleExited}
        ContentProps={{ 'aria-describedby': 'message-id' }}
      >
        <SnackbarContent
          className={classes[variant]}
          aria-describedby='client-snackbar'
          message={
            <span
              className={classes.message}
              id='client-snackbar'
            >
              {
                variant &&
                <Icon className={classes.iconVariant} fontSize='small'/>
              }
              {message}
            </span>
          }
          action={[
            onUndo && <Button
              key='undo'
              aria-label='Undo'
              color='secondary'
              size='small'
              onClick={this.handleUndo}
            >
              UNDO
            </Button>,
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              onClick={this.handleClose}
            >
              <CloseIcon fontSize='small'/>
            </IconButton>,
          ]}
        />
      </Snackbar>
    )
  }
}

export default withStyles(styles)(connect()(SnackbarCustom))
