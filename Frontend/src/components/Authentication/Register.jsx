import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Layout from '../../Layout';
import axios from 'axios'

export const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleRegister = () => {
        try {
            axios.post("https://e-commerce-platform-1trn.onrender.com/api/user/post", {
                "name": user,
                "password": pass,
            });
        } catch (error) {
            console.error("Error registering user:", error);
        }
        navigate('/login');
    }

    return (
        <Layout>
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-white w-full sm:max-w-md px-6 py-12 rounded shadow-md">
                    <h1 className="text-2xl mb-8 text-center font-bold">Register</h1>
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={user}
                            onChange={e => setUser(e.target.value)}
                            id="user"
                            className="block w-full p-3 border border-gray-300 rounded"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={pass}
                            onChange={e => setPass(e.target.value)}
                            id="password"
                            className="block w-full p-3 border border-gray-300 rounded"
                        />
                        <button
                            type="submit"
                            id="login-btn"
                            className="w-full bg-blue-500 text-white p-3 rounded mt-4 mb-4"
                        >
                            Register
                        </button>
                        <div className="text-center text-gray-500">
                            <p className="text-xs">
                                Already registered?{' '}
                                <NavLink to="/login" className="text-blue-500">
                                    Login
                                </NavLink>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};
