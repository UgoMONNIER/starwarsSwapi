
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
import styled, { css } from 'styled-components'
import ClearIcon from '@mui/icons-material/Clear';
import Thumb from './Thumb.js';


// import ClearIcon from '@mui/icons-material/Clear';
const StyledButton = styled(Button)`
  position: relative;
  top : 30px;
  margin-bottom : auto;
  & > * {
    color: #9bdc28;
  }
`
const InputStyled = styled.input`
    & > button {
      border-style: none;
      background: #9bdc28;

    }
`

const StyledDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
position: relative;
left: 60px;
margin : auto;
font-size : 20px;
`

const DialogStyled = styled(Dialog)`
  backdrop-filter : blur(5px);
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
display: grid;
grid-template-columns: repeat(1, 1fr);
grid-gap: 5px;
grid-auto-rows: minmax(100px, auto);
margin-left : auto;
margin-right : auto;
width: 500px;

& > * {
  color: #9bdc28;
  height: 30px;
  width: 300px;
  margin: 10px;
}
& > .form__field  {
  font-family: inherit;
  border-style: dotted !important;
  width: 90%;
  border: 1px;
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
  const [fieldValue, setFieldValue] = useState(null);
  const [thumb, setThumb] = useState(null);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {

  }, [allCharacters, character, open, thumb])

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
            {character['picture'] === undefined
              ?
              <img alt={"personnage" + character.name} src={"https://thumbs.dreamstime.com/b/chiffre-de-cire-principal-yoda-104524677.jpg"}></img>
              :
              <img src={character['thumb'] }
                alt={"personnage" + character.name}/>}
          </div>
          <StyledButton
            sx={[
              {
                bgcolor: 'none',
                color: '#9bdc28',
                borderRadius: 2,
                borderColor: '#9bdc28',
                p: 1,
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
          <DialogStyled open={open} onClose={handleClose}
            fullWidth
            maxWidth="md"

          >
            <DialogTitle>Edit</DialogTitle>
            <DialogContent
            >
            </DialogContent>
            <Formik
              initialValues={{
                name: '',
                mass: '',
                height: '',
                gender: '',
                file: null,
              }}
              onSubmit={async (values) => {
                character['picture'] = fieldValue
                character['thumb'] = thumb
                setFieldValue(null)
                console.log(character['picture'])
                character['name'] = values.name === '' ? character.name : values.name;
                character['mass'] = values.mass === '' ? character.mass : values.mass;
                character['height'] = values.height === '' ? character.height : values.height;
                character['gender'] = values.gender === '' ? character.gender : values.gender;
                setOpen(false);
              }}

            >
              <FormStyled>
                <Field id="name" name="name" placeholder="Name" className="form__field" />
                <Field id="mass" name="mass" placeholder="Mass" className="form__field" />
                <Field id="height" name="height" placeholder="Height" className="form__field" />
                <StyledDiv id="my-radio-group"  >Gender
                  <div role="group" aria-labelledby="my-radio-group">
                    <label> <Field type="radio" name="gender" value="Male" /> Male </label>
                    <label> <Field type="radio" name="gender" value="Female" /> Female </label>
                    <label> <Field type="radio" name="gender" value="n/a" /> Robot </label>
                  </div>
                </StyledDiv>
                <StyledDiv>
                  <InputStyled id="file" name="file" type="file" onChange={(event) => {
                    setFieldValue(event.currentTarget.files[0]);
                  }} />
                  <Thumb file={fieldValue} setThumb = {setThumb}/>

                </StyledDiv>
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