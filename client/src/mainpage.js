import React, { useState, useEffect  } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/mainpage.css';
import './css/vertical_bar.css';

function Mainpage() {
    const navigate = useNavigate();

    const [formData] = useState({
        item_name: '',
        price: ''
    });

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

    const handleSubmit = async (item_name, price) => {
        const data = {
            item_name: item_name,
            price: price,
            user_ip: userIP 
        };
        try {
            const response = await fetch('http://127.0.0.1:8000/add_to_cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                alert('Registration successful!');
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


    useEffect(() => {
        
        const body = document.querySelector("body");
        const sidebar = body.querySelector("nav");
        const toggle = body.querySelector(".toggle");
        const searchBtn = body.querySelector(".search-box");
        const modeSwitch = body.querySelector(".toggle-switch");
        const modeText = body.querySelector(".mode-text");
        const cards = body.querySelector(".cards");

        
        if (toggle) {
            toggle.addEventListener("click", () => {
                sidebar.classList.toggle("close");
                cards.classList.toggle("rightmove");
            });
          }

       

        if (searchBtn) {
            searchBtn.addEventListener("click", () => {
                sidebar.classList.remove("close");
            });
        }

        if (modeSwitch) {
            modeSwitch.addEventListener("click", () => {
                body.classList.toggle("dark");
                if (body.classList.contains("dark")) {
                    modeText.innerText = "Light mode";
                } else {
                    modeText.innerText = "Dark mode";
                }
            });
        }

        // Cleanup function to remove event listeners
        return () => {
            if (toggle) toggle.removeEventListener("click", () => {});
            if (searchBtn) searchBtn.removeEventListener("click", () => {});
            if (modeSwitch) modeSwitch.removeEventListener("click", () => {});
        };
    }); 
  
    return (
        <div className="background-container">

            <link rel='stylesheet' href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css'></link>
            <link rel='stylesheet' href='https://pro.fontawesome.com/releases/v6.0.0-beta3/css/all.css'></link>
            <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&amp;display=swap'></link>

            
              <nav className="sidebar close">
                <header>
                    <div className="image-text">
                        <a href="#" className="text-logo-a">
                            <span className="image">
                                <img src="#" alt="" />
                            </span>
                            <div className="text logo-text">
                                <span className="name">hardware website</span>
                            </div>
                        </a>
                        <span className="profession">👋 Hello, James</span>
                    </div>
                    <i className='bx bx-chevron-right toggle'></i>
                </header>
                <div className="menu-bar">
                    <div className="menu">
                        <ul className="menu-links">
                            <li className="search-box">
                                <i className='bx bx-search icon'></i>
                                <input type="text" placeholder="Search..." />
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <span className="text nav-text">shopping_cart</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <span className="text nav-text">statistic</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <span className="text nav-text">Notifications</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <span className="text nav-text">Analytics</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <span className="text nav-text">Likes</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <span className="text nav-text">Wallets</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="bottom-content">
                        <li>
                            <a href="#">
                                <i className='bx bx-log-out icon'></i>
                                <span className="text nav-text">Logout</span>
                            </a>
                        </li>
                        <li className="mode">
                            <div className="sun-moon">
                                <i className='bx bx-moon icon moon'></i>
                                <i className='bx bx-sun icon sun'></i>
                            </div>
                            <span className="mode-text text">Dark mode</span>
                            <div className="toggle-switch">
                                <span className="switch"></span>
                            </div>
                        </li>
                    </div>
                </div>
            </nav>
            


            <div className="cards">
                <div className="card-a">
                    <div className="card-img"></div>
                    <div className="card-info">
                        <p className="text-title">CPU void edition</p>
                        <p className="text-body">manufactured my air</p>
                    </div>
                    <div className="card-footer">
                        <span className="text-title">$0.9</span>
                        <button onClick={() => handleSubmit("CPU", "0.9")} className="btn">
                            add
                        </button>
                    </div>
                </div> 
           
                <div className="card-b">
                    <div className="card-img"></div>
                    <div className="card-info">
                        <p className="text-title">Mainboard void edition</p>
                        <p className="text-body">manufactured my air</p>
                    </div>
                    <div className="card-footer">
                        <span className="text-title">$0.18</span>
                        <button onClick={() => handleSubmit("mainboard", "0.18")} className="btn">
                            add
                        </button>
                    </div>
                </div> 


                <div className="card-c">
                    <div className="card-img"></div>
                    <div className="card-info">
                        <p className="text-title">ssd void edition</p>
                        <p className="text-body">manufactured my air</p>
                    </div>
                    <div className="card-footer">
                        <span className="text-title">$0.07</span>
                        <button onClick={() => handleSubmit("SSD", "0.07")} className="btn">
                            add
                        </button>
                    </div>
                </div>
        

                <div className="card-d">
                    <div className="card-img"></div>
                    <div className="card-info">
                        <p className="text-title">GPU void edition</p>
                        <p className="text-body">manufactured my air</p>
                    </div>
                    <div className="card-footer">
                        <span className="text-title">$1.7</span>
                        <button onClick={() => handleSubmit("GPU", "1.7")} className="btn">
                            add
                        </button>
                    </div>
                </div>


                <div className="card-e">
                    <div className="card-img"></div>
                    <div className="card-info">
                        <p className="text-title">power supply void edition</p>
                        <p className="text-body">manufactured my air</p>
                    </div>
                    <div className="card-footer">
                        <span className="text-title">$0.56</span>
                        <button onClick={() => handleSubmit("power supply", "0.56")} className="btn">
                            add
                        </button>
                    </div>
                </div>


                <div className="card-f">
                    <div className="card-img"></div>
                    <div className="card-info">
                        <p className="text-title">cooler void edition</p>
                        <p className="text-body">manufactured my air</p>
                    </div>
                    <div className="card-footer">
                        <span className="text-title">$0.05</span>
                        <button onClick={() => handleSubmit("cooler", "0.05")} className="btn">
                            add
                        </button>
                    </div>
                </div>

                <div className="card-g">
                    <div className="card-img"></div>
                    <div className="card-info">
                        <p className="text-title">case void edition</p>
                        <p className="text-body">manufactured my air</p>
                    </div>
                    <div className="card-footer">
                        <span className="text-title">$0.03</span>
                        <button onClick={() => handleSubmit("cooler", "0.03")} className="btn">
                            add
                        </button>
                    </div>
                </div>


                
                <div className="card-h">
                    <div className="card-img"></div>
                    <div className="card-info">
                        <p className="text-title">ram void edition</p>
                        <p className="text-body">manufactured my air</p>
                    </div>
                    <div className="card-footer">
                        <span className="text-title">$0.05</span>
                        <button onClick={() => handleSubmit("cooler", "0.05")} className="btn">
                            add
                        </button>
                    </div>
                </div>
        

            </div>
            </div>
    );
}

export default Mainpage;