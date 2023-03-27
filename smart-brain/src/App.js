import React,{useCallback,useState} from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-tsparticles';
import {loadFull} from 'tsparticles';
import Signin from './components/Signin/Signin';
import Register from './components/register/Register';
import './App.css';

import axios from 'axios'; 

function App() {
    const [first,setFirst]=useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegister,setIsRegister]=useState(false);
    const [isRegisterSign,setIsRegisterSign]=useState(false);
    const [user,newUser]=useState({id:'',
    name:'',
    email:'',
    entries:0,
    joined:''})
    

    const loadUser=(data)=>{

      newUser({
          id:data.id,
          name:data.name,
          email:data.email,
          entries:data.entries,
          joined:data.joined
      })

    }

  const loginHandler = () => {
    setIsLoggedIn(true);
    setIsRegister(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setIsRegister(false);
    console.log('merge');
  };

  const registerHandler=()=>{
    setIsRegister(true);
    setIsLoggedIn(true);
    setIsRegisterSign(false);
  }

  const registerSignHandler=()=>{
    setIsRegisterSign(true);
    setIsRegister(true);
    console.log('merge');
  }

  const serverUser=()=>{
    fetch('http://localhost:3000',{
      method:'GET',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        email:user.email
      })
    }).then(response=>response.json()).then(data=>{
      if (data==='succes'){
        console.log(data);
        return data;
      }
    })
  }

  const onButtonSubmit=()=>{
    //serverUser();

    console.log(user.id)

    axios({
      method: 'get',
      url: `http://localhost:3000/profile/${user.id}`,
      responseType: 'json'
    })
      .then(function (response) {

        newUser({
          id:response.data.id,
          name:response.data.name,
          email:response.data.email,
          entries:response.data.entries,
          joined:response.data.joined
      })
      });

      /* axios.post('http://localhost:3000/image', {
        id: user.id
      })
      .then(response=>response.json()).then(count=>{
        Object.assign(newUser({entries:count}))
      })
      .catch(function (error) {
        console.log(error);
      }); */
      

     fetch('http://localhost:3000/image',{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          id:user.id
        })}).then(response=>response.json()).then(count=>{
            Object.assign(newUser({entries:count+1}));
        }) 
      
  }

// componentDidMount(){
//     fetch('http://localhost3000').then(response=>response.json()).then(console.log)
// }

// useEffect(()=>{
//     fetch('http://localhost:3000').then(resp=>resp.json()).then(console.log);
    
// },[])

const particlesInit = useCallback(async engine => {
    //console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
}, []);

const particlesLoaded = useCallback(async container => {
    //await console.log(container);
}, []);


  return (<>
  <div className="App">
              <Particles className='particles'
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        
                        move: {
                            directions: "none",
                            enable: true,
                            outModes: "bounce","bounce":false,
                            random: false,
                            speed: 1,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 150,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                      
                    },
                   
                }}
            />


      {isLoggedIn&& isRegister && <div><Navigation onLogout={logoutHandler}/> <Logo/> <Rank name={user.name} entries={user.entries}/> <ImageLinkForm onButtonSubmit={onButtonSubmit}/></div>}
    {!isLoggedIn&&!isRegister&&<Signin className='index' loadUser={loadUser} onLogin={loginHandler} onRegisterSign={registerSignHandler}/>}
    {isRegisterSign && <Register className='index' loadUser={loadUser} onRegister={registerHandler}/>}
    
    </div>
   </>
   
  );
}

export default App;
