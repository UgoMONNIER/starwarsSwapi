
import Axios from 'axios';
import { useEffect, useState } from "react";
import './Card.css';
import { Formik, Field, Form } from 'formik';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import styled, { css } from 'styled-components'
import { useFormik } from "formik";
import { Player } from '@lottiefiles/react-lottie-player';
import ClearIcon from '@mui/icons-material/Clear';

// import ClearIcon from '@mui/icons-material/Clear';
const StyledButton = styled(Button)`
  position: relative;
  top : 30px;
  margin-bottom : auto;
  & > * {
    color: #9bdc28;
  }

`
const DialogStyled = styled(Dialog)`
  backdrop-filter : blur(5px);
  backdrop-color : white;
  color: none;
  & > * {
    margin : auto;
    font-size : 20px;
  }
`


const ClearIconStyled = styled(ClearIcon)`
position: absolute;
top: 5px;
right: 10px;
z-index: 1000;
&:hover{
  cursor: pointer;
}
`


const FormStyled = styled(Form)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: space-around;
margin-left : auto;
margin-right : auto;
margin-top: 10px;
& > * {
  color: #9bdc28;
  height: 30px;
  width: 300px;
  margin: 10px;
}
& > .form__field  {
  font-family: inherit;
  border-style: dotted;
  width: 90%;
  border: 1;
  border-color: #9bdc28;
  border-top-color: #9bdc28;
  outline: 1;
  outline-color: #9bdc28;
  font-size: 1.3rem;

  padding: 7px 0;
  background: transparent;

  &::placeholder {
    color: #9bdc28;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;

  }
}
& > .form__field:focus {
  color: #9bdc28;
  padding-bottom: 6px;  
}
& > div:last-child {
  display: flex;
  justify-content: center;
}
`

function Card({ character, key, setAllCharacters, allCharacters }) {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    
  },[allCharacters])

  return (
    <div className="container">

      <div className="card">
      <ClearIconStyled onClick={() => {
        setAllCharacters(allCharacters.filter(el => el !== character))
      }} />
        <div className="imgBx">

        </div>
        <div className="contentBx">
          <h2>{character.name}</h2>
          <div className="mass">
            <h3>Mass :</h3>
            <span>{character.mass} kg</span>
          </div>
          <div className="height">
            <h3>Height :</h3>
            <span>{character.height} cm</span>
          </div>
          <div className="gender">
            <h3>Gender :</h3>
            <span>{character.gender === 'n/a' || character.gender === 'none' ? 'Robot' : character.gender}</span>
          </div>
          <div className="imgBx">
            <img alt={"personnage" + character.name} src={"https://picsum.photos/200/300"}></img>
          </div>
          <StyledButton
            sx={[
              {
                bgcolor: 'none',
                color: '#9bdc28',
                borderRadius: 2,
                borderColor: '#9bdc28',
                p: 1,
                minWidth: 100,
              },
              {
                '&:hover': {
                  color: 'black',
                  backgroundColor: '#9bdc28',
                  borderColor: '#9bdc28',
                },
              }
            ]}
            variant="outlined"
            onClick={handleClickOpen}>
            Edit
          </StyledButton>
          <DialogStyled open={open} onClose={handleClose}>
            <DialogTitle>Edit</DialogTitle>
            <DialogContent

            >
              <DialogContentText>
                {character.name} is a character with {character.eye_color} eyes borned in {character.birth_year}
              </DialogContentText>

            </DialogContent>
            <Formik
              initialValues={{
                name: '',
                mass:'',
                height: '',
                gender:'',
              }}
              onSubmit={async (values) => {

                character['name'] = values.name === '' ? character.name : values.name ;
                character['mass'] = values.mass === '' ? character.mass : values.mass;
                character['height'] = values.height === '' ?  character.height : values.height;
                character['gender'] = values.gender === '' ? character.gender : values.gender ;
                setOpen(false);
              }}
            >
              <FormStyled>
                <Field id="name" name="name" placeholder="Name" className="form__field" />
                <Field id="mass" name="mass" placeholder="Mass" className="form__field" />
                <Field id="height" name="height" placeholder="Height" className="form__field" />
                <div id="my-radio-group">Gender</div>
                <div role="group" aria-labelledby="my-radio-group">
                  <label> <Field type="radio" name="gender" value="Male" /> Male </label>
                  <label> <Field type="radio" name="gender" value="Female" /> Female </label>
                  <label> <Field type="radio" name="gender" value="n/a" /> Robot </label>
                </div>
                <DialogActions
                  sx={
                    {
                      marginRight: 'auto',
                      marginLeft: 'auto',
                    }
                  }
                >
                  <Button
                    sx={[
                      {
                        bgcolor: 'none',
                        border: 1,
                        color: '#9bdc28',
                        borderRadius: 2,
                        borderColor: '#9bdc28',
                        p: 1,
                        minWidth: 100,
                      },
                      {
                        '&:hover': {
                          color: 'white',
                          backgroundColor: '#9bdc28',
                          borderColor: '#9bdc28',
                        },
                      }
                    ]}
                    onClick={handleClose}>Cancel</Button>
                  <Button
                    sx={[
                      {
                        bgcolor: 'none',
                        color: '#9bdc28',
                        border: 1,
                        borderRadius: 2,
                        borderColor: '#9bdc28',
                        p: 1,
                        minWidth: 100,
                      },
                      {
                        '&:hover': {
                          color: 'white',
                          backgroundColor: '#9bdc28',
                          borderColor: '#9bdc28',
                        },
                      }
                    ]}
                    type='submit'
                  >edit</Button>
                </DialogActions>
              </FormStyled>
            </Formik>
          </DialogStyled>
        </div>
      </div >
    </div >
  );
}

export default Card;