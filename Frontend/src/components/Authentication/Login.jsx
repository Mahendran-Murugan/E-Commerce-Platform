import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Layout from '../../Layout';
import axios from 'axios'
import { useAuth } from './Auth';

export const Login = () => {

    useEffect(() => {
        axios.get('https://e-commerce-platform-1trn.onrender.com/api/user/get')
            .then(res => setUserList(res.data))
            .catch(err => console.log(err))
    }, [])

    const [userList, setUserList] = useState([]);
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();
    const context = useAuth();

    const handleLogin = () => {
        const isUserValid = userList.some(u =>
            u.name === user && u.password === pass
        )
        if (isUserValid) {
            context.login(user);
            context.changeStatus();
            navigate('/')
        } else {
            alert("User name or Password Not Match")
        }
    };

    return (
        <Layout>
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-white w-full sm:max-w-md px-6 py-12 rounded shadow-md">
                    <h1 className="text-2xl mb-8 text-center font-bold">Login</h1>
                    <form className="space-y-4" onSubmit={handleLogin}>
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
                            Login
                        </button>
                        <div className="text-center text-gray-500">
                            <p className="text-xs">
                                Not registered?{' '}
                                <NavLink to="/register" className="text-blue-500">
                                    Create an account
                                </NavLink>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};
