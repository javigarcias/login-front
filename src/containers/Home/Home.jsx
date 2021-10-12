import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';

import './Home.scss';

const Home = () => {

    const history = useHistory();
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = event => {
        event.preventDefault(); // para evitar refrescar la página

        axios.post('http://localhost:3001/users/login', login)
            .then(res => {
                localStorage.setItem("user", JSON.stringify(res.data));
                history.push("/admin")

            })
            .catch(error => console.log(error.response.data))
    }
    const eventHandler = (ev) => {
        setLogin({ ...login, [ev.target.name]: ev.target.value });
    };
    return (
        <div className="login">
            <Form
                name="login"
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
                    label="Email"
                    name="email"

                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input name="email" onChange={eventHandler} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password name="password" onChange={eventHandler} />
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

    )
}

export default Home;
