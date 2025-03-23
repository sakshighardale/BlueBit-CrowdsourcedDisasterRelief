// src/pages/AuthPage.jsx
import { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import GoogleAuth from '../components/auth/GoogleAuth';
import Button from '../components/Button';

const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const { loading } = useAuth();

//   if (loading) return <div>Loading...</div>;

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      
      <LoginForm />
      
      <div className="my-4 text-center">OR</div>
      
      <GoogleAuth />

<Button
className="text-blue-600 hover:underline"
onClick={()=>setIsLogin(!isLogin)}
text={isLogin ? 'Create new account' : 'Already have an account?'}
/>
    
    </div>
  );
};

export default AuthPage;