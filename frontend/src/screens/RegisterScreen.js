import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import differenceInYears from 'date-fns/differenceInYears';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().min(3).max(30).required(),
    password: yup.string().min(3).max(255).required(),
    repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'passwords must match'),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
    name: yup.string().min(3).max(15).required(),
    lastName: yup.string().min(3).max(50).required(),
    birthDate: yup.date()
        .required('Date of birth is required')
        .test('dob', 'You must be at least 18 years old', 
            value => {
                return differenceInYears(new Date(), new Date(value)) >= 18;
            }),
    country: yup.string().min(2).max(20).required(),
    state: yup.string().min(2).max(20).required(),
    postal_code: yup.number().required(),
    city: yup.string().min(2).max(20).required(),
    street: yup.string().min(1).max(100),
    house_number: yup.number().required(),
    floor: yup.number(),
    description: yup.string().required()        
  });

function RegisterScreen() {
    const navigate = useNavigate();

    const formik = useFormik
    ({
        validationSchema: schema,
        initialValues: {
            email: '',
            password: ''
        },
        
        onSubmit: async (values) => {
            try{ 
                const {data} = await Axios.post('/users/registration', {
                    user: {
                        email: values.email,
                        password: values.password
                    }
                });
                console.log(data);
                navigate('/');
            }catch(err){console.log(err)}
        }
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="text" name="email" placeholder="Email"
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.email}
                    value={formik.values.email}
                    required 
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
                
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    type="text" name="username" placeholder="Enter Username"
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.username}
                    value={formik.values.username}
                    required 
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.username}
                </Form.Control.Feedback>                
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                            type="password" name="password" placeholder="Password"
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.password} 
                            required            
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="repeatPassword">
                <Form.Label>Repeat password</Form.Label>
                <Form.Control
                            type="password" name="repeatPassword" placeholder="Password"
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.repeatPassword} 
                            required            
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.repeatPassword}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="date">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                            type="date" name="birthDate" placeholder="Birth Date"
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.birthDate} 
                            required            
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.birthDate}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                            type="date" name="birthDate" placeholder="Birth Date"
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.birthDate} 
                            required            
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.birthDate}
                </Form.Control.Feedback>
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

export default RegisterScreen;