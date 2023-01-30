const { GET_USERS, DELETE_USER, ADD_USER, EDIT_USER } = require("./actionTypes");


const init = {
    users:[],
    loading:true,
    errors:null,
    msg:null
}


const reducer = (state=init,{type,payload}) =>{
    switch (type) {
        case GET_USERS:
        return {
            ...state,users:payload,
            loading:false
        }
        case DELETE_USER:
            return {
                ...state,loading:false,users: state.users.filter(el=>el._id!==payload)
            }
        case ADD_USER:
            return {
                ...state,users:[...state.users,payload]
            }
        case EDIT_USER:
            return {
                ...state,users:state.users.map(el=>el._id===payload.id?payload.data:el)
            }
        default:
            return state
    }
}


export default reducer