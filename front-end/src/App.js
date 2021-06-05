import React from 'react';
import Axios from 'axios';
import './App.css';
import {useState} from 'react';
// import {Card} from 'react-bootstrap';


function App() {
  const [name,setName]=useState("");
  const [age,setAge]=useState(0);
  const [country,setCountry]=useState("");
  const [position,setPosition]=useState("");
  const [wage,setWage]=useState(0);


  const [newwage,setnewWage]=useState(0);

  const [empData,setempData]=useState([]);

  const addData=()=>{
    console.log(name+','+age+','+country+','+position+','+wage);
    Axios.post('http://localhost:3001/create',
    {
      name:name,
      age:age,
      country:country,
      position:position,
      wage:wage
    })
    .then(()=>{
      console.log('value added to db');
      setempData([...empData,{
        name:name,
        age:age,
        country:country,
        position:position,
        wage:wage
      }])
    });

  }

  const showData=()=>{
    Axios.get('http://localhost:3001/read')
    .then((res)=>{
      // console.log(res);
      setempData(res.data);
    });

  }

  const updateWage=(id)=>{
    // console.log(name+','+age+','+country+','+position+','+wage);
    Axios.put('http://localhost:3001/update',
    {
      // name:name,
      // age:age,
      // country:country,
      // position:position,
      wage:newwage,
      id:id
    })
    .then((res)=>{
      setempData(empData.map((val)=>{
        return val.id===id
        ?
        {
          id:val.id,
          name:val.name,
          age:val.age,
          country:val.country,
          position:val.position,
          wage:newwage
        }
        :
        val
      }))
    })
  }

  const deleteData=(id)=>{
    // Axios.delete('http://localhost:3001/delete',{id:id})
    Axios.delete(`http://localhost:3001/delete/${id}`)
    .then((res)=>{
      console.log(res);
      // showData();
      setempData(empData.filter((val)=>{return val.id!==id}))

    });
  }
      
  return (
    <div className="App">
      <div className="information">
          Employee Record
          <label>name:</label>
          <input type="text" onChange={(e)=>setName(e.target.value)}/>  
          <label>age:</label>
          <input type="number" onChange={(e)=>setAge(e.target.value)}/>  
          <label>country:</label>
          <input type="text" onChange={(e)=>setCountry(e.target.value)}/>  
          <label>position:</label>
          <input type="text" onChange={(e)=>setPosition(e.target.value)}/>  
          <label>wage (years):</label>
          <input type="number" onChange={(e)=>setWage(e.target.value)}/>
          <button onClick={addData}>Add to DB</button>
      </div>
      <hr style={{
            color: '#000000',
            backgroundColor: '#000000',
            height: .5,
            borderColor : '#000000'
      }}/>
      <div className='employees'>
        <button onClick={showData}>Show Employees</button>
        {
          empData.map((val,key)=>{
            return (
              <div className='employee'>
              <div>
                  <h3>Name : {val.name}</h3>
                  <h3>Age : {val.age}</h3>
                  <h3>Country : {val.country}</h3>
                  <h3>Position : {val.position}</h3>
                  <h3>Wage : {val.wage}</h3>
              </div>
              <div>
              
              <input type="text" placeholder={val.wage} onChange={(e)=>setnewWage(e.target.value)}/>
              <button onClick={()=>{updateWage(val.id)}}>Update Data</button>
              <button onClick={()=>{deleteData(val.id)}}>Delete Data</button>
              </div>
              </div>)
          })
        }
      </div>

    </div>
  );
}

export default App;
