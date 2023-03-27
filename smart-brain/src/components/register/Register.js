import React,{useState} from "react";


const Register =(props)=>{

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredName, setEnteredName] = useState('');
  
  
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
 
  };

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
 
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

  
  };

  const submitHandler = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/register',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        email:enteredEmail,
        password:enteredPassword,
        name:enteredName
      })
    }).then(response=>response.json()).then(user=>{
      if (user){
        console.log(enteredEmail,enteredName,enteredPassword)
        props.loadUser(user);
        props.onRegister(enteredEmail, enteredPassword,enteredName);
      }
    })
  };

return<>
<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
    <main className="pa4 black-80">
  <form onSubmit={submitHandler} className="measure">
    <fieldset id="register" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0" >Register</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
        <input  onChange={nameChangeHandler} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90" type="input" name="name"  id="name"/>
      </div>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input onChange={emailChangeHandler} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address1"/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input onChange={passwordChangeHandler}className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password1"/>
      </div>
    </fieldset>
    <div className="">
      <input  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
    </div>
  </form>
</main>
</article>
</>

}


export default Register;