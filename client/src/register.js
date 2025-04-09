import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/register.css';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirm: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                alert('Registration successful!');
                //navigate("mainpage");
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
                alert(errorData.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Network error occurred');
        }
    };

    return (
        <div className="background-container">
           <div className="input_form"> 
            <form class="form">
            <span class="input-span">
            <label for="username" class="label">username</label>
            <input type="username" name="username" id="username" 
            placeholder="username" value={formData.username} onChange={handleChange}/>
            </span>
            <span class="input-span">
            <label for="email" class="label">Email</label>
            <input type="email" name="email" id="email" 
            placeholder="email" value={formData.email} onChange={handleChange}/>
            </span>
            <span class="input-span">
            <label for="password" class="label">Password</label>
            <input type="password" name="password" id="password" 
            placeholder="password" value={formData.password} onChange={handleChange}/>
            </span>
            <span class="input-span">
            <label for="password" class="label">Password</label>
            <input type="password" name="password_confirm" id="password_confirm" 
            placeholder="password_confirm" value={formData.password_confirm} onChange={handleChange}/>
            </span>
            <span class="span">Already have an account? <Link to="/login">Login</Link></span>
            </form>
            <button type="submit" class="btn" onClick={handleSubmit}>Register</button>
            </div>
        </div>
    );
}

export default Register;