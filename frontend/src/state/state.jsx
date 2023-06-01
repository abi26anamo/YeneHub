import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode:'light',
    user:null,
    token:null,
    posts:[],
    searchResults: [],
    users : [],
    URL:"http://localhost:3001"
};

export const authSlice = createSlice({
    name:"authSlice",
    initialState,
    reducers:{
        setMode:(state)=>{
        state.mode = state.mode==="light" ? "dark" : "light";
        },
        setLogin:(state,action)=>{
             state.user = action.payload.user;
             state.token = action.payload.token;
        },
        setLogout:(state)=>{
            state.user = null;
            state.token = null;
        },
        setFriends:(state,action)=>{
            if (state.user){
                state.user.friends = action.payload.friends;
            }else{
                console.log('user friends non-existent')
            }
        },
        setPosts:(state,action)=>{
            state.posts = action.payload.posts;
        },
        setPost:(state,action)=>{
            const updatedPosts = state.posts.map((post)=>{
                if (post._id === action.payload.post_id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        setUsers:(state,action)=>{
            state.users = action.payload.users;

        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload.searchResults;
          },

    }
});

export const {setMode,setLogin,setLogout,setSearchResults,setUsers, setFriends,setPost,setPosts} = authSlice.actions;
export default authSlice.reducer;
