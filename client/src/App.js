import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, getUsers } from './redux/actions';
import EditUser from './components/EditUser';

function App() {
  const {users,loading}= useSelector(state=>state)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsers())
    
  }, [])
  
const reset = () => {
  setEmail("");
  setName("");
  setPhone("")
}

const handleSubmit = (e) => {
  e.preventDefault();
  const newUser = {
    name,
    email,
    phone
  }
  dispatch(addUser(newUser))
  reset()
}

  return (
    <div className="App">
      <form action="" onSubmit={handleSubmit}  >
        <label htmlFor="">Name</label>
        <input type="text" value={name}  onChange={(e)=>setName(e.target.value)}  />
        <label htmlFor="">Email</label>
        <input type="text" value={email}  onChange={(e)=>setEmail(e.target.value)} />
        <label htmlFor="">Phone</label>
        <input type="text" value={phone}  onChange={(e)=>setPhone(e.target.value)} />
        <button>Add</button>
      </form>
     {
      loading? <h3>loading...</h3>
      :  users.map(el=>
        <div key={el._id} style={{border:"1px solid black",marginTop:"2%  "}} >
          <h2> {el.name} </h2>
          <h3> {el.email} </h3>
          <button onClick={()=>dispatch(deleteUser(el._id))}  >Delete</button>
          <EditUser user={el} />
        </div>
        )
     }
    </div>
  );
}

export default App;
