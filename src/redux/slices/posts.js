import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/posts');
    return data;
});

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tagss: {
        items: [],
        status: 'loading',
    },

}

// extraReducers описываю состояние асинхронного экшена
// Также отлавливаю три состояния
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
[fetchPosts.pending]: (state) => {
    state.posts.items = [];
    state.posts.status = 'loading';
},
[fetchPosts.fulfilled]: (state,action) => {
    state.posts.items = action.payload;
    state.posts.status = 'loaded';
},
[fetchPosts.rejected]: (state) => {
    state.posts.items = [];
    state.posts.status = 'error';
}
    }
})

export const postsReducer = postsSlice.reducer;
