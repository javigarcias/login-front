import React from 'react';
import axios from 'axios';
import './Home.scss';

const Home = () => {
    const handleSubmit = event => {
        event.preventDefault(); // para evitar refrescar la página
        const user = {
            email: event.target.email.value,
            password: event.target.password.value
        };
        axios.post('http://localhost:3001/users/login',user)
        .then(res=>{
            console.log(res)
        })
        .catch(error=>console.log(error.response.data))
    }
    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <input type="email" name="email" required placeholder="Introduce email"/>
            <input type="password" name="password" required placeholder="Introduce Password"/>
            <button type="submit">Log in</button>
        </form>
    )
}

export default Home;