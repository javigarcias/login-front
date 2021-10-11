import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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

    const [mensaje, setMensaje] = useState();
    const [user, setUser] = useState(defaultUser);

    const eventHandler = (ev) => {
        setUser({ ...user, [ev.target.name]: ev.target.value  });
      };
    const handleSubmit = event => {
        event.preventDefault(); // para evitar refrescar la página

        axios.post('http://localhost:3001/users/register', user)
            .then(res => {
                setMensaje(`${res.data.firstName} Registrado correctamente`);
                setTimeout(() => {
                    history.push("/")
                }, 1500);

            })
            .catch(error => console.log(error.response.data))
    }
    return (
        <div className="form">
            {JSON.stringify(user, null, 2)}
            <form className="register-form" onSubmit={handleSubmit}>
                <h4>First Name <input type="text" name="firstName" required onChange={eventHandler} /></h4>
                <h4>Last Name <input type="text" name="lastName" required onChange={eventHandler}/></h4>
                <h4>User Name <input type="text" name="userName" onChange={eventHandler}/></h4>
                <h4>Email <input type="email" name="email" required onChange={eventHandler}/></h4>
                <h4>Adress <input type="text" name="adress" required onChange={eventHandler}/></h4>
                <h4>Adress 2 <input type="text" name="adress2" onChange={eventHandler}/></h4>
                <h4>State <input type="text" name="state" required onChange={eventHandler}/></h4>
                <h4>Country <input type="text" name="country" required onChange={eventHandler}/></h4>
                <h4>Zip <input type="text" name="zip" required onChange={eventHandler}/></h4>
                <h4>Name of Card <input type="text" name="nameOfCard" required onChange={eventHandler}/></h4>
                <h4>Credit Card Number <input type="text" name="creditCardNumber" required onChange={eventHandler}/></h4>
                <h4>Expiration <input type="date" name="expiration" required onChange={eventHandler}/></h4>
                <h4>CVV <input type="number" name="cvv" required onChange={eventHandler}/></h4>
                <h4>Password <input type="password" name="password" required onChange={eventHandler}/></h4>
                <button type="submit">Register</button>
            </form>
            <div className="mensajeOk">
                {mensaje}
            </div>
        </div>
    )
}

export default Register;