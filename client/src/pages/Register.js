import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {useForm } from '../util/hooks'

function Register (props) {

    const [errors, setErrors] = useState('')

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        password: '',
        email: '',
        confirmPassword: ''
    })
    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(_, result){
            console.log(result);
            props.history.push('/')
        },
        onError(err){

            console.log(err.graphQLErrors[0].extensions.errors)
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    })

    function registerUser(){
        addUser();
    }

    return (
        <div className = 'form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading? 'loading': ''}>
                <h1>Register</h1>
                <Form.Input 
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Input 
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={onChange}
                />
                <Form.Input 
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={onChange}
                />
                <Form.Input 
                    label="ConfirmPassword"
                    placeholder="ConfirmPassword..."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className='ui error message'>
                    <ul className='list'>
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            email username
        }
    }

`

export default Register;