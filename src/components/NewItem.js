import React from 'react';
import './App.css';
import Navigation from './Navigation';
import AuthService from './AuthService';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const CssMultiLineTextField = withStyles({
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
    }
  },
})(TextField);

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
    }
  },
})(TextValidator, FormControl);

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
      borderColor: '#659c35'
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: '#659c35'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    borderColor: '#659c35'
  },
  input: {
    width: '100%',
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
  }
}));

export default function Register() {

  let history = useHistory();
  let classes = useStyles();
  let authService = new AuthService()

  const [name, setItemname] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [overdueCharge, setOverdueCharge] = useState(null);
  const [deposit, setDeposit] = useState('');
  const [open, setOpen] = React.useState(false);
  const inputLabel = React.useRef(category);
  const [labelWidth, setLabelWidth] = useState(0);


  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleCategory = event => {
    console.log(event.target.value);
    setCategory(event.target.value);
  };

  const filterNonNumber = (event) => {
    const {value} = event.target;

    if(value=="") {
      handleOverdueCharge(null);
    }

    const floatValue = parseFloat(value);
    if (floatValue) {
      handleOverdueCharge(floatValue);
    }

    return null;
  }


  const handleItemName = event => {
    setItemname(event.target.value);
  };

  const handleDescription = event => {
    setDescription(event.target.value);
  };

  const handleOverdueCharge = value => {
    setOverdueCharge(value);
  };

  const handleDeposit = event => {
    setDeposit(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target)
    let payload = new FormData(event.target)

    authService.newItem(payload)
      .then(res => history.replace('/categories'))
      .catch(error => handleClickOpen())
  };

    return (
      <div className="App">
        <Navigation />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <h1 style={{ color:'#45721D' }}>Add a new item</h1>
            <ValidatorForm className={classes.form} noValidate onSubmit={handleSubmit}>
              <CssTextField
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={name}
                validators={['required']}
                errorMessages={['Item name is required']}
                autoFocus
                onChange={handleItemName}
              />
              <FormControl variant="outlined" className={classes.form}>
              <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">Category</InputLabel>
              <Select
                id="category"
                name="category"
                value={category}
                onChange={handleCategory}
                labelWidth={labelWidth}
              >
              <MenuItem value='books'>Book</MenuItem>
              <MenuItem value='clothes'>Clothes</MenuItem>
              <MenuItem value='toys'>Toy</MenuItem>
              <MenuItem value='games'>Games</MenuItem>
              <MenuItem value='music'>Music</MenuItem>
              <MenuItem value='equipment'>Garden/Building equipment</MenuItem>
              </Select>
              </FormControl>
              <CssMultiLineTextField
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                multiline
                rowsMax="3"
                rows="3"
                type="text"
                id="description"
                label="Description"
                name="description"
                value={description}
                onChange={handleDescription}
              />
              <CssTextField
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="number"
                step="0.01"
                min="0"
                id="overdue_charge"
                label="Overdue charge per day"
                name="overdue_charge"
                value={overdueCharge}
                onChange={filterNonNumber}
              />
              <CssTextField
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Deposit"
                type="number"
                step="0.01"
                min="0"
                id="deposit"
                name="deposit"
                value={deposit}
                onChange={handleDeposit}
              />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >Submit

            </Button>
            </ValidatorForm>
          </div>
          </Container>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{"Incorrect information in some field"}</DialogTitle>
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
