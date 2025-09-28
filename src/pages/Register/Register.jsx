import Lottie from 'lottie-react';
import React, { useContext } from 'react';
import registerLottieData from '../../assets/lottie/register.json'
import AuthContext from '../../context/AuthContext/AuthContext';
const Register = () => {
   

  const {createUser} = useContext(AuthContext);
  const handleRegister = e =>{
    e.preventDefault();
    const form= e.target;
    const email = form.email.value;
    const password = form.password.value;
    // Password validation regex: min 6 chars, at least one uppercase, one number
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (!regex.test(password)) {
    alert("Password must be at least 6 characters long, contain one uppercase letter, and one number.");
    return; // stop submission
  }

createUser(email,password)
.then(result =>{
  console.log(result.user)
})
.catch(error =>{
  console.log(error.message)
})
  }
    return (
<div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left w-96">
      <Lottie animationData={registerLottieData}></Lottie>
    </div>
    <div class        Name="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-5xl font-bold ml-8 mt-4">Register now!</h1>
      <div className="card-body">
        <form onSubmit={handleRegister} className="fieldset">
          <label className="label">Email</label>
          <input type="email" name='email' className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" name='password' className="input" placeholder="Password" autoComplete='current-password' />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Register</button>
        </form>
      </div>
    </div>
  </div>
</div>
    );
};

export default Register;