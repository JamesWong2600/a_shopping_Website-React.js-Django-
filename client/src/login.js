import React, { useState, useEffect  } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/register.css';

function Login() {
    const navigate = useNavigate();

    const [userIP, setUserIP] = useState('');

    useEffect(() => {
        const getUserIP = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                setUserIP(data.ip);
                console.log('User IP:', data.ip);
            } catch (error) {
                console.error('Error getting IP:', error);
            }
        };
        
        getUserIP();
    }, []);
    
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        user_ip: userIP 
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
            const response = await fetch('http://127.0.0.1:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('login successful:', data);
                console.log(data.message);
                if(data.message === "User found") {
                //alert('login successful!');
                navigate("/mainpage");
                }
                else {
                alert('login failed!');
                }
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
            <form class="form" onSubmit={handleSubmit}>
            <span class="input-span">
            <label for="username" class="label">username</label>
            <input type="username" name="username" id="username" 
            placeholder="username" value={formData.username} onChange={handleChange} required/>
            </span>
            <span class="input-span">
            <label for="password" class="label">Password</label>
            <input type="password" name="password" id="password" 
            placeholder="password" value={formData.password} onChange={handleChange} required/>
            </span>
            <span class="span">No account? <Link to="/">register</Link></span>
            <button type="submit" class="btn2">Login</button>
            </form>
            </div>
        </div>
    );
}

export default Login;