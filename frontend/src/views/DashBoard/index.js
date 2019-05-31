import React, { Component } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Deposits from './Deposits'
import Orders from './Orders'
import Chart from '../../components/Chart'

import styles from './styles.js'
import { withStyles } from '@material-ui/core/styles'

class DashBoard extends Component {
  render() {
    const { classes } = this.props
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    return (
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

DashBoard.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(DashBoard)
