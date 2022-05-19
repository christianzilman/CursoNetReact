import { FORM_ERROR } from 'final-form';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { combineValidators, isRequired, matchesField } from 'revalidate';
import { Button, Form, Grid, GridColumn, Header, Icon, Message, Segment } from 'semantic-ui-react';
import { IUserFormValues } from '../../models/users';
import { RootStoreContext } from '../../stores/rootStore';
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../Common/Form/TextInput';
import ErrorMessage from '../Common/Form/ErrorMessage';

export const Register = () => {


    const navigate = useNavigate();
  
    const validate = combineValidators({
        username: isRequired("username"),
        email: isRequired("Email"),
        password: isRequired("Password"),
        passwordConfirmation: matchesField(
            'password',
            'password Confirmation'
          )({
            message: 'Password do not match'
          }),      
    });
    
    const rootStore = useContext(RootStoreContext)
    const { register } = rootStore.userStore
    
    const handleSubmitForm = async(values: IUserFormValues) =>{
       
        await register(values)
        .then((user) =>
        {      
            navigate("/")
        })
        .catch((error) => ({[FORM_ERROR]: error}))
    }

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
        <GridColumn style={{maxWidth: 450}}>
            <Header as="h1" color='orange' textAlign='center'>
                <Icon name="puzzle piece" color='orange' />
                Register for NetChat
            </Header>

        <FinalForm
          onSubmit={handleSubmitForm}
          validate={validate}
          render={({ handleSubmit,
            submitError,
            invalid,
            dirtyFieldsSinceLastSubmit,
            pristine }) => (


                <Form size="large" onSubmit={handleSubmit} error>
                    <Segment stacked>
                        <Field
                        name="username"
                        placeholder="Username"
                        type="text"
                        icon="user icon"
                        component={TextInput}
                        />
                        <Field
                        name="email"
                        placeholder="Email Address"
                        type="text"
                        icon="mail icon"
                        component={TextInput}
                        />

                        <Field
                        name="password"
                        placeholder="Password"
                        type="password"
                        icon="lock icon"
                        component={TextInput}
                        />

                        <Field
                        name="passwordConfirmation"
                        placeholder="Password Confirmation"
                        type="password"
                        icon="lock icon"
                        component={TextInput}
                        />
                        {submitError && (
                        <ErrorMessage
                            error={submitError}
                            
                        />)}

                        <Button
                        color="orange"
                        fluid
                        size="large"
                        disabled={(invalid && !dirtyFieldsSinceLastSubmit) || pristine}>
                        Submit
                    </Button>
                    </Segment>
                </Form>      


                        )}/>

            
            <Message>
                Already a user? <Link to="/Login">Login</Link>
            </Message>
        </GridColumn>
    </Grid>  
  );
};


export default Register;