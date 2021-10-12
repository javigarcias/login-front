import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';

import './Register.scss';

const Register = () => {

    const history = useHistory();
    const defaultUser = {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        adress: "",
        adress2: "",
        country: "",
        state: "",
        zip: "",
        nameOfCard: "",
        creditCardNumber: "",
        expiration: "",
        cvv: 0,
        password: ""
    }

    const [user, setUser] = useState(defaultUser);
    //REGEX Pass entre 8 y 10 caracteres con Mayusculas, minúsculas y caracter especial
    let regExPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;

    const eventHandler = (ev) => {
        setUser({ ...user, [ev.target.name]: ev.target.value  });
      };
    const handleSubmit = event => {
        event.preventDefault(); // para evitar refrescar la página
        if (regExPassword.test(user.password)){
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/register`, user)
                .then(res => {
                    message.success(`${res.data.firstName} Registrado correctamente`);
                    setTimeout(() => {
                        history.push("/")
                    }, 1500);
    
                })
                .catch(error => message.error(error.message))

        }else{
            message.error("El Password debe de ser entre 8 y 10 caracteres con Mayusculas, minúsculas y caracter especial")

        }

    }
    return (
        <div className="formWraper">
            <div className="formImputs">
            <Form
                name="register"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}

                autoComplete="off"
            >
                <Form.Item
                    label="First Name"
                    name="firstName"

                    rules={[
                        {
                            required: true,
                            message: 'This field is required!',
                        },
                    ]}
                >
                    <Input name="firstName" onChange={eventHandler} />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="lastName"

                    rules={[
                        {
                            required: true,
                            message: 'This field is required!',
                        },
                    ]}
                >
                    <Input name="lastName" onChange={eventHandler} />
                </Form.Item>
                <Form.Item
                    label="User Name"
                    name="userName"

                    rules={[
                        {
                            required: false,
                            message: 'This field is required!',
                        },
                    ]}
                >
                    <Input name="userName" onChange={eventHandler} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required!',
                        },
                    ]}
                >
                    <Input.Password name="password" onChange={eventHandler} />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required!',
                        },
                    ]}
                >
                    <Input name="email" onChange={eventHandler} />
                </Form.Item>
                <Form.Item
                    label="Adress"
                    name="adress"

                    rules={[
                        {
                            required: true,
                            message: 'This field is required!',
                        },
                    ]}
                >
                    <Input name="adress" onChange={eventHandler} />
                </Form.Item>
                <Form.Item
                    label="Adress 2"
                    name="adress2"

                    rules={[
                        {
                            required: false,
                            message: 'This field is required!',
                        },
                    ]}
                >
                    <Input name="adress2" onChange={eventHandler} />
                </Form.Item>
                <Form.Item
                    label="Country"
                    name="country"

                    rules={[
                        {
                            required: true,
                            message: 'This field is required!',
                        },
                    ]}
                >
                    <Input name="country" onChange={eventHandler} />
                </Form.Item>
                <Form.Item
                    label="State"
                    name="state"

                    rules={[
                        {
                            required: true,
                            message: 'This field is required!',
                        },
                    ]}
                >
                    <Input name="state" onChange={eventHandler} />
                </Form.Item>
                <Form.Item
                    label="Zip"
                    name="zip"

                    rules={[
                        {
                            required: true,
                            message: 'This field is required!',
                        },
                    ]}
                >
                    <Input name="zip" onChange={eventHandler} />
                </Form.Item>
                <Form.Item
                    label="Name of Card"
                    name="nameOfCard"

                    rules={[
                        {
                            required: true,
                            message: 'This field is required!',
                        },
                    ]}
                >
                    <Input name="nameOfCard" onChange={eventHandler} />
                </Form.Item>
                <Form.Item
                    label="Credit card number"
                    name="creditCardNumber"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required!',
                        },
                    ]}
                >
                    <Input name="creditCardNumber" onChange={eventHandler} />
                </Form.Item>
                <Form.Item
                    label="Expiration"
                    name="expiration"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required!',
                        },
                    ]}
                >
                    <Input name="expiration" onChange={eventHandler} />
                </Form.Item>
                <Form.Item
                    label="CVV"
                    name="cvv"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required!',
                        },
                    ]}
                >
                    <Input.Password name="cvv" onChange={eventHandler} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </div>
            
        </div>
    )
}

export default Register;