import React, { useState } from 'react'

const Form = props => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        terms: false
    })

    const changeHandler = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    return (
        <form>
            <label htmlFor='name'>Name:</label>
            <input 
                id='name'
                type='text'
                name='name'
                placeholder='Please Enter Your Full Name'
                value={user.name}
                onChange={changeHandler}
            />

            <label htmlFor='email'>Email:</label>
            <input 
                id='email'
                type='email'
                name='email'
                placeholder='Please Enter A Valid Email'
                value={user.email}
                onChange={changeHandler}
            />

            <label htmlFor='password'>Password:</label>
            <input 
                id='password'
                type='text'
                name='password'
                placeholder='Please Enter Your Password'
                value={user.password}
                onChange={changeHandler}
            />

            <input 
                id='terms'
                type='checkbox'
                name='terms'
                checked={user.terms}
                onChange={changeHandler}
            />
            <label htmlFor='terms'>Terms & Conditions</label>
        </form>
    )
}

export default Form;