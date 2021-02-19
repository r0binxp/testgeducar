import {createStore} from "redux"

const initialState = {
    users: [{}],
    posts: [],
    selectedUser: "",
    selectedPostId: "",
    postComments: [],
}


const reduceStore = (state = initialState, action) => {
    switch (action.type){
        case 'SET_USERS':
            return({
                ...state, 
                users: action.users
            })
        break;
        case 'SET_SELECTED':
            return({
                ...state, 
                selectedUser: action.userId
            })
        break;
        case 'SELECT_POST':
            return({
                ...state, 
                selectedPostId: action.postId
            })
        break;
        case 'SET_POSTS':
            return({
                ...state, 
                posts: action.posts
            })
        break;
        case 'SET_POSTS_COMMENTS':
            return({
                ...state, 
                postComments: action.comments
            })
        break;
    }
    return state
}
export default createStore(reduceStore)