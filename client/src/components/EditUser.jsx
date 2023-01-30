import React, { useState } from 'react'
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { editUser } from '../redux/actions';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const EditUser = ({user}) => {
    const dispatch = useDispatch()
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
  function openModal() {
    setIsOpen(true);
  }

// id=user._id

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
   
    dispatch(editUser(user._id,name,email,phone))
    closeModal()
  }
  return (
    <div><button onClick={openModal}>Edit</button>
    <Modal
      isOpen={modalIsOpen}

      onRequestClose={closeModal}
      style={customStyles}
    
    >

     
        <form action=""  onSubmit={handleSubmit} >
        <label htmlFor="">Name</label>
        <input type="text" value={name}  onChange={(e)=>setName(e.target.value)}  />
        <label htmlFor="">Email</label>
        <input type="text" value={email}  onChange={(e)=>setEmail(e.target.value)} />
        <label htmlFor="">Phone</label>
        <input type="text" value={phone}  onChange={(e)=>setPhone(e.target.value)} />
        <button>Confirm</button>
        </form>
       </Modal> 
    </div>
  )
}

export default EditUser