import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components'

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

const StyledInputContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const StyledInput = styled.input`
    width: 50%;
    height: 5vh;
    border-radius: 5px;
    border: none;
    margin: 5%;
    font-size: 1rem;
`

const StyledSelect = styled.select`
    width: 25%;
    height: 5vh;
    border-radius: 5px;
    border: none;
    margin: 3%;
    font-size: 1rem;
    &:hover {
        cursor: pointer;
    }
`

const StyledTerms = styled.label`
    font-size: 1rem;
`

const StyledError = styled.p`
    font-size: 1rem;
`

const StyledButton = styled.button`
    margin: 3% 0 5%;
    background-color: #417B5A;
    border-radius: 5px;
    border: none;
    width: 25%;
    height: 5vh;
    font-size: 1.5rem;
    &:not([disabled]):hover{
        background-color: #fb8362;
        color: white;
        cursor: pointer;
        transform: scale(1.1);
        box-shadow: 10px;
    }
`

const formSchema = yup.object().shape({
    name: yup.string().required('Name field is required'),
    email: yup.string().email('Please enter a valid email').required('Please enter a valid email'),
    password: yup.string().required('Password is required'),
    role: yup.string().required('Please select your role'),
    terms: yup.boolean().oneOf([true], 'Please agree to terms of use'),
})

const Form = props => {
    const [user, setUser] = useState(
        {
            name: '',
            email: '',
            password: '',
            role: '',
            terms: false
        }
    )

    const [errorState, setErrorState] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        terms: ''
    })

    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        formSchema.isValid(user).then(valid => setDisabled(!valid))
    }, [user])

    const formSubmit = event => {
        event.preventDefault();
        props.addUser(user)
        setUser(
            {
                name: '',
                email: '',
                password: '',
                role: '',
                terms: false
            }
        )
        axios.post('https://reqres.in/api/users', user)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    };

    const validate = (event) => {
        yup.reach(formSchema, event.target.name)
           .validate(event.target.value)
           .then( valid => {
            setErrorState({
                   ...errorState,
                   [event.target.name]: ''
               })
           })
           .catch( error => {
            setErrorState({
                   ...errorState,
                   [event.target.name]: error.errors[0]
               })
           })
    }

    const changeHandler = (event) => {
        event.persist();
        validate(event)
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setUser({ ...user, [event.target.name]: value});
    };

    return (
        <StyledForm onSubmit={formSubmit}>
            <label htmlFor='name'>Name:</label>
            <StyledInputContainer>
                <StyledInput 
                    id='name'
                    type='text'
                    name='name'
                    placeholder='Please Enter Your Full Name'
                    value={user.name}
                    onChange={changeHandler}
                />
                {errorState.name.length > 0 ? <StyledError>{errorState.name}</StyledError> : null}
            </StyledInputContainer>

            <label htmlFor='email'>Email:</label>
            <StyledInputContainer>
                <StyledInput 
                    id='email'
                    type='email'
                    name='email'
                    placeholder='Please Enter A Valid Email'
                    value={user.email}
                    onChange={changeHandler}
                />
                {errorState.email.length > 0 ? <StyledError>{errorState.email}</StyledError> : null}
            </StyledInputContainer>

            <label htmlFor='password'>Password:</label>
            <StyledInputContainer>
                <StyledInput 
                    id='password'
                    type='text'
                    name='password'
                    placeholder='Please Enter Your Password'
                    value={user.password}
                    onChange={changeHandler}
                />
                {errorState.password.length > 0 ? <StyledError>{errorState.password}</StyledError> : null}
            </StyledInputContainer>

            <label htmlFor='role'>Select Your Role: </label>
            <StyledSelect id='role' name='role' value={user.role} onChange={changeHandler}>
                <option value=''>--Please Choose An Option--</option>
                <option value='Frontend Developer'>Frontend Developer</option>
                <option value='Backend Developer'>Backend Developer</option>
                <option value='CSS Specialist'>CSS Specialist</option>
                <option value='React Specialist'>React Specialist</option>
                <option value='Project Lead'>Project Lead</option>
            </StyledSelect>
            {errorState.password.length > 0 ? <StyledError>{errorState.role}</StyledError> : null}

            <StyledTerms htmlFor='terms'>
                <input 
                    type='checkbox'
                    id='terms'
                    name='terms'
                    checked={user.terms}
                    onChange={changeHandler}
                />
                I have read the Terms & Conditions
                {errorState.terms === false ? <StyledError>{errorState.terms}</StyledError> : null}
            </StyledTerms>

            <StyledButton type='submit' disabled={disabled}>Submit</StyledButton>
        </StyledForm>
    )
}

export default Form;