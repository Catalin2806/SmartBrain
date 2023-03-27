import React from 'react';


const Rank=(props)=>{
  //console.log(props);

  
    return(
      
        <div>
  <div className='white f3'>
    {`${props.name}, your current rank is ...'`}
  
  </div>
  <div className='white f3'>
    {props.entries}
  </div>
   </div>
    );
}

export default Rank;