import React, { Component } from 'react'

import styles from './styles.js'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

class NotFoundView extends Component {
  componentDidMount() {
    document.title = 'Not Found - Caqui'
  }

  handleBack = e => {
    const { history } = this.props
    history.goBack()
  }

  render() {
    const { classes } = this.props
    return (
      <main className={classes.root}>
        <div className={classes.center}>
          <div className={classes.root}>
            <Typography
              className={classes.title}
              variant='h3'
              paragraph
            >
              Not Found! <span role='img' aria-label='rosto confuso'>&#x1F615;</span>
            </Typography>
          </div>
          <Button className={classes.button} onClick={this.handleBack}>Voltar</Button>
        </div>
      </main>
    )
  }
}

export default withStyles(styles)(NotFoundView)
