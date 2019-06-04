import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import Snackbar from '../../components/Snackbar'

import gql from 'graphql-tag'

import { withStyles } from '@material-ui/core/styles'

import styles from './styles.js'

/* GRAPHQL */
const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email,
      token
    }
  }
`

class SignIn extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: ''
  }

  handleChange = (e, name) => {
    const data = {}
    data[name] = e.target.value
    this.setState(data)
  }

  submit = (e, login, email, password) => {
    e.preventDefault()
    login({
      variables: {
        email,
        password
      }
    })
  }

  render() {
    const { login, email, password } = this.state
    const { classes } = this.props
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Mutation
            mutation={LOGIN_MUTATION}
            update={(cache, { data: { login: { token } } }) => {

              localStorage.setItem('token', token)
              cache.writeData({ data: { token } })

              this.props.history.push('/dashboard')
            }}
          >
            {(login, { error, data }) => (
              <form className={classes.form} onSubmit={e => this.submit(e, login, email, password)} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={e => this.handleChange(e, 'email')}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => this.handleChange(e, 'password')}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      { 'Don\'t have an account? Sign Up' }
                    </Link>
                  </Grid>
                </Grid>
                { error && <Snackbar
                  open={true}
                  message={'email or password incorrect!'}
                  variant={'error'}
                  closeSnackbar={() => {}}
                  />
                }
              </form>
            )}
          </Mutation>
        </div>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'Built with love by the '}
            <Link color="inherit" href="https://www.clevertech.biz/">
              CleverTech
            </Link>
            {' team.'}
          </Typography>
        </Box>
      </Container>
    )
  }
}

export default withStyles(styles)(SignIn)
