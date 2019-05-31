import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'

import ManageTable from '../../components/ManageTable'

import styles from './styles.js'
import { withStyles } from '@material-ui/core/styles'

const GET_USERS = gql`
  {
    users {
      email
      role
      createdAt
    }
  }
`

class Users extends Component {
  state = {
    columns: [
      { title: 'Email', field: 'email' },
      { title: 'Role', field: 'role' },
      { title: 'Created At', field: 'createdAt', type: 'date' },
    ]
  }

  render() {
    const { columns } = this.state
    const { classes } = this.props
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    return (
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <Query query={GET_USERS}>
              {({ loading, error, data }) => {
                if (loading) return (<CircularProgress className={classes.progress} />)
                // if (error) return `Error! ${error.message}`;

                return (<ManageTable columns={columns} data={data.users} />)
              }}
            </Query>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

Users.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(Users)
