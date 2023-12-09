import React, { useState } from "react";
import axios from 'axios';

export const Login = (props) => {
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');


    const [errors, setErrors] = useState([]);
    const validate = () => {
        const error = {};

        if (!mail) {
            error.mail = "Votre Email est nécessaire !";
        } else if (!/\S+@\S+\.\S+/.test(mail)) {
            error.mail = "Ceci ne correspond pas à un email !";
        } else {
            error.mail = "";
        }
        if (!pass) {
            error.pass = "Votre mot de passe est nécessaire !";
        } else if (pass.length < 8) {
            error.pass = "Votre mot de passe doit être au moins de 8 caractères !";
        } else {
            error.pass = "";
        }
    }

    async function save(e) {
        e.preventDefault();
        const errors=validate();
        setErrors(errors);
        const errorValues = Object.values(errors);
        try {
            const resultat = await axios.get("http://localhost:8888/users-registration/login/"+mail+"/"+pass
            );
            console.log(resultat);

            //window.location.replace('http://localhost:3001/?name='+name);
            alert("succes");
            setMail("");
            setPass("");

        } catch (err) {
            alert("Échec de l'inscription");
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(mail);
    };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    type="email"
                    placeholder="youremail@gmail.com"
                    id="email"
                    name="email"
                />
                {errors.mail && <div className='error'>{errors.mail}</div>}
                <label htmlFor="password">Mot de passe</label>
                <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="****"
                    id="password"
                    name="password"
                />
                {errors.pass && <div className='error'>{errors.pass}</div>}
                <button type="submit" onClick={save}>
                    S'inscrire
                </button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}