import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, GridColumn, Header, Icon, Label, Message, Segment } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../Common/Form/TextInput';
import { RootStoreContext } from '../../stores/rootStore';
import { IUserFormValues } from '../../models/users';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const navigate = useNavigate();
  
  const validate = combineValidators({
    email: isRequired("Email"),
    password: isRequired("Password"),
  });
  const rootStore = useContext(RootStoreContext)
  const { login } = rootStore.userStore
  
  const handleSubmitForm = async(values: IUserFormValues) =>{
    
    //let user =
    await login(values)
    .then((user) =>
    {      
       if(user.token !=null)
         navigate("/")
    })
    .catch((error) => ({[FORM_ERROR]: error}))

    //return user;
  }

  return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <GridColumn style={{maxWidth: 450}}>
          <Header as="h1" icon color='violet' textAlign='center'>
            <Icon name='code branch' color='violet' />
            Login to NetChat
          </Header>

        <FinalForm
          onSubmit={handleSubmitForm}
          validate= {validate}
          render=
          {({ handleSubmit, submitting, form, submitError }) => 
          (
            <Form size='large' onSubmit={handleSubmit}>
                <Segment stacked>

                  <Field 
                    name='email'        
                    placeholder="Email Address"            
                    component={TextInput}
                    icon="mail icon"
                    //validate ={(value) => (value? undefined: 'Required')}
                  />

                  <Field 
                    name='password'
                    placeholder= "Password"
                    type='password'
                    icon="lock icon"
                    component={TextInput}
                    //validate ={(value) => (value? undefined: 'Required')}
                  />
                  <Button color='violet' fluid size="large" disabled={submitting}>
                    Subtmit
                  </Button>
                  {submitError && (<Label color='red' basic content={submitError.message} />)}
                  {/* <pre style={{textAlign: "left"}}>{JSON.stringify(form.getState(), undefined, 2)}</pre> */}
                </Segment>
            </Form>
          )}
        />

          <Message>
            Don't have an account? <Link to="/register">Register</Link>
          </Message>
        </GridColumn>
      </Grid>
  );
};

export default Login;