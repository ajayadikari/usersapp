import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        editUser: false,
        editUserId: -1,
        tempUser: [],
        currPage: 1,
        tot_pages: 0,
    },
    reducers: {
        fillUsers: (state, action) => {
            state.users = action.payload
            state.tempUser = action.payload
        },
        editUser: (state, action) => {
            state.editUser = action.payload.value
            state.editUserId = action.payload.id
        },
        clearEdit: (state) => {
            state.editUser = false
            state.editUserId = -1
        },
        updateUser: (state, action) => {
            const users = state.users
            const index = users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                users[index] = { ...users[index], ...action.payload.data };
            }
            console.log(state.users)
            state.users = users;
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload.id);
        },
        filterUsers: (state, action) => {
            if (action.payload.searchTerm.length === 0) state.user = state.tempUser
            else {
                state.users = state.tempUser.filter((user) => {
                    const fullName = (user.first_name + " " + user.last_name).toLowerCase();
                    return fullName.includes(action.payload.searchTerm.toLowerCase());
                });
            }
        },
        setTotPages: (state, action) => {
            state.tot_pages = action.payload
        },
        setPage: (state, action) => {
            if ((state.currPage === 1 && action.payload > 0) || (state.currPage === state.tot_pages && action.payload < 0)) state.currPage += action.payload
        },

    }
})


export const { fillUsers, editUser, clearEdit, updateUser, deleteUser, filterUsers, setTotPages, setPage } = userSlice.actions
export default userSlice.reducer