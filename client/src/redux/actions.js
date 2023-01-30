import axios from "axios"
import { ADD_USER, DELETE_USER, EDIT_USER, GET_USERS } from "./actionTypes"

export const getUsers = ()=> async(dispatch)=>{
    try {
        const res = await axios.get("/viewUsers")
        console.log(res)
        dispatch({
            type:GET_USERS,
            payload:res.data
        })
    } catch (error) {
        alert('get error')
    }
}


export const deleteUser = (id) => async(dispatch)=>{
try {
    const res = await axios.delete(`/deleteUser/${id}`)
    dispatch({
        type:DELETE_USER,
        payload:id
    })
} catch (error) {
    alert('delete error')
}
}


export const addUser = (newUser) => async(dispatch)=>{
    try {
        const {data} = await axios.post('/addUser',newUser)
        dispatch({
            type:ADD_USER,
            payload:data
        })
    } catch (error) {
        alert('add error')
    }
}

export const editUser = (id,name,email,phone) => async(dispatch) => {
   const editedUser = {
    id,
    name,
    email,
    phone
   }
    try {
        const {data} =await axios.put(`/editUser/${id}`,editedUser)
        dispatch({
            type:EDIT_USER,
            payload:{
                id,
                data
            }
        })
    } catch (error) {
        alert('edit error')
    }
}