import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './login.css';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // SignUp Form
  const signUpFormik = useFormik({
    initialValues: {
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number')
        .required('Required'),
      password: Yup.string().required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (FormData) => {
      try {
        await axios.post('http://localhost:8080/register', FormData);
        console.log('Registration successful');
        setError('');
        navigate('/'); // Navigate to the home page upon successful sign-up
      } catch (err) {
        setError(err.response?.data?.message || 'Sign Up failed');
      }
    },
  });

  // SignIn Form
  const signInFormik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:8080/login', values);

        const token = response.data.token;
        localStorage.setItem('jwtToken', token);

        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        setError('');
        switch (userRole) {
          case 'admin':
            navigate('/getAll');
            break;
          case 'user':
            navigate('/createPost');
            break;
          default:
            setError('Invalid role');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
      }
    },
  });

  const switchPanel = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  return (
    <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
      <div className="form-container sign-up-container">
        <form onSubmit={signUpFormik.handleSubmit} className="form-Sign-up">
          <h1>Sign Up</h1>
          <input
            type="text"
            placeholder="Username"
            name="username"
            {...signUpFormik.getFieldProps('username')}
          />
          {signUpFormik.touched.username && signUpFormik.errors.username ? (
            <div className="error">{signUpFormik.errors.username}</div>
          ) : null}
          <input
            type="email"
            placeholder="Email"
            name="email"
            {...signUpFormik.getFieldProps('email')}
          />
          {signUpFormik.touched.email && signUpFormik.errors.email ? (
            <div className="error">{signUpFormik.errors.email}</div>
          ) : null}
          <input
            type="tel"
            placeholder="Phone Number"
            name="phoneNumber"
            {...signUpFormik.getFieldProps('phoneNumber')}
          />
          {signUpFormik.touched.phoneNumber && signUpFormik.errors.phoneNumber ? (
            <div className="error">{signUpFormik.errors.phoneNumber}</div>
          ) : null}
          <input
            type="password"
            placeholder="Password"
            name="password"
            {...signUpFormik.getFieldProps('password')}
          />
          {signUpFormik.touched.password && signUpFormik.errors.password ? (
            <div className="error">{signUpFormik.errors.password}</div>
          ) : null}
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            {...signUpFormik.getFieldProps('confirmPassword')}
          />
          {signUpFormik.touched.confirmPassword && signUpFormik.errors.confirmPassword ? (
            <div className="error">{signUpFormik.errors.confirmPassword}</div>
          ) : null}
          {error && <div className="error">{error}</div>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={signInFormik.handleSubmit} className="form-Sign-in">
          <h1>Sign In</h1>
          <input
            type="text"
            placeholder="Username"
            name="username"
            {...signInFormik.getFieldProps('username')}
          />
          {signInFormik.touched.username && signInFormik.errors.username ? (
            <div className="error">{signInFormik.errors.username}</div>
          ) : null}
          <input
            type="password"
            placeholder="Password"
            name="password"
            {...signInFormik.getFieldProps('password')}
          />
          {signInFormik.touched.password && signInFormik.errors.password ? (
            <div className="error">{signInFormik.errors.password}</div>
          ) : null}
          {error && <div className="error">{error}</div>}
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>Login with your personal information to stay connected with us.</p>
            <button className="ghost" onClick={switchPanel}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, There!</h1>
            <p>Start your journey with us by entering your personal details.</p>
            <button className="ghost" onClick={switchPanel}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
