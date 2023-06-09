import React,{useState} from "react";
import './Signin.css';

const Signin =(props)=>{
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  
  
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
 
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

  
  };

 
  const submitHandler = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/signin',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        email:enteredEmail,
        password:enteredPassword
      })
    }).then(response=>response.json()).then(user=>{
      if (user.id){
        
        props.onLogin(enteredEmail, enteredPassword);
        
      }
    })
  };



return<>
<div className="index">
<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
    <main className="pa4 black-80">
  <form onSubmit={submitHandler} className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0" to="/">Sign In</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input onChange={emailChangeHandler} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input onChange={passwordChangeHandler} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
      </div>
    </fieldset>
    <div className="">
      <input  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
    </div>
    <div className="lh-copy mt3">
      <p  className="f6 link dim black db pointer" onClick={props.onRegisterSign}>Register</p>
    </div>
  </form>
</main>
</article>
</div>
</>

}


export default Signin;