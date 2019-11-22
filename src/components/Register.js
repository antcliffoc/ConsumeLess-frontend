import React from 'react';
import './App.css';
import AuthService from './AuthService';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#659c35',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#659c35'
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#659c35'
      }
    },
  },
})(TextValidator);

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    color: '#659c35',
    borderBottomColor: '#659c35',
    borderColor: '#659c35'
  },
  submit: {
    '&:hover': {
      backgroundColor: '#45721D'
    },
    backgroundColor: '#659c35',
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {


    let history = useHistory();
    let classes = useStyles();
    let authService = new AuthService()

    const [username, setUsername] = useState('');
    const [postcode, setPostCode] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmpassword, setPasswordConfirmation] = useState('');

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    }
    const handlePostCode = event => {
      setPostCode(event.target.value);
    };

    const handleUserNameInput = event => {
      setUsername(event.target.value);
    };

    const handlePasswordInput = event => {
      setPassword(event.target.value);
    };

    const handleEmailInput = event => {
      setEmail(event.target.value);
    };

    const handlePasswordConfirm = event => {
      setPasswordConfirmation(event.target.value);
    };

    useEffect(() => {
      ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        if (value !== password) {
            return false;
        }
        return () => {
          ValidatorForm.removeValidationRule('isPasswordMatch');
        }
      })
    });

    const handleSubmit = (event) => {
      event.preventDefault();

      let payload = new FormData(event.target)

      authService.register(payload)
        .then(res => history.replace('/categories'))
        .catch(error => handleClickOpen())
    };

    return (
      <div className="App">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <img src={require('../logo-with-name.svg')} />
            <ValidatorForm className={classes.form} noValidate onSubmit={handleSubmit}>
              <CssTextField
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                value={username}
                validators={['required']}
                errorMessages={['Username is required']}
                autoFocus
                onChange={handleUserNameInput}
              />
              <CssTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                label="email"
                type="email"
                id="email"
                value={email}
                validators={['required','isEmail']}
                errorMessages={['Email is required','Invalid email']}
                onChange={handleEmailInput}
              />
              <CssTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="password"
                type="password"
                id="password"
                value={password}
                validators={['required']}
                errorMessages={['Password is required']}
                onChange={handlePasswordInput}
              />
              <CssTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmpassword"
                label="confirm password"
                type="password"
                id="confirmpassword"
                value={confirmpassword}
                validators={['isPasswordMatch', 'required']}
                errorMessages={['Password mismatch','Confirmation is required']}
                onChange={handlePasswordConfirm}
              />
              <CssTextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="postcode"
                label="postcode"
                name="postcode"
                value={postcode}
                autoFocus
                onChange={handlePostCode}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
            </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </ValidatorForm>
          </div>
        </Container>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Incorrect username or password"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              All the fields is required. Please double-check and try again.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
