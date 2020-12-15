import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../../App.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Store Name
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

type RegisterProps = {
  // firstName?: string;
  // lastName?: string;
  // email?: string;
  // password?: string;
  updateToken: any;
  // setFirstName (firstName: string): void;
  // setLastName (lastName: string): void;
  // setPassword (password: string): void;
  // setEmail (email: string): void;
}

export default class Register extends React.Component<RegisterProps> {
  private firstName: string = '';
  private lastName: string = '';
  private email: string = '';
  private password: string = '';

  constructor (props: RegisterProps) {
    super(props);
    this.state = {
      updateToken: this.props.updateToken
    }
  }

  getFirstName = () => {
    console.log(this.firstName);
    return this.firstName;
  }

  setFirstName = (firstName: string) => {
    this.firstName = firstName;
    console.log(this.firstName);
  }

  getLastName = () => {
    console.log(this.lastName);
    return this.lastName;
  }

  setLastName = (lastName: string) => {
    this.lastName = lastName;
    console.log(this.lastName);
  }

  getEmail = () => {
    console.log(this.email);
    return this.email;
  }

  setEmail = (email: string) => {
    this.email = email;
    console.log(this.email);
  }

  getPassword = () => {
    console.log(this.password);
    return this.password;
  }

  setPassword = (password: string) => {
    this.password = password;
    console.log(this.password);
  }
  
  handleSubmit = (e: any) => {
    e.preventDefault();
    const url = 'http://localhost:8080/user/register';
    const body = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(r => r.json())
      .then(rObj => this.props.updateToken(rObj.sessionToken))
  }

  render() {
    return (
      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar" style={{backgroundColor:'#f50057'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          </Typography>
          <form onSubmit={this.handleSubmit} className="formRegister" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange = {e => this.setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange = {e => this.setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange = {e => this.setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange = {e => this.setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{marginTop:"1.1em", marginBottom:'0.8em'}}
              className="submitRegister"
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/user/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}