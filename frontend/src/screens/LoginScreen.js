import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//TODO: Use formik for handling forms like in registerscreen.js

function LoginScreen() {

    const [emailOrUname,setEmailOrUname] = useState('');
    const [password,setPassword] = useState('');

    const isEmail = (input) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(input);
    }

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            const loginData = {password};
            isEmail(emailOrUname) ? loginData.email = emailOrUname : loginData.username = emailOrUname; 
            const {data} = await Axios.post('/users/login', loginData);
            console.log(data);
            navigate('/');
        }catch(err){console.log(err)}
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email or username</Form.Label>
                <Form.Control 
                    type="text" name="email" placeholder="Enter email or username"
                    onChange={(e) => setEmailOrUname(e.target.value)}
                    required 
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                            type="password" name="password" placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)} 
                            required            
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
    </Form>
    );
}

export default LoginScreen;