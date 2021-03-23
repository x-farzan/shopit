import { createSlice } from '@reduxjs/toolkit';

//////////////////////////////////////////////////
//                  Reducer
//////////////////////////////////////////////////

const slice = createSlice({
    name: 'metaData',
    initialState: {
        pageSize: 6,
        currentPage: 1,
        totalPages: 0
    },
    reducers: {
        getTotalMetadata: (state, action) => {
            state.totalPages = action.payload.totalPages
            state.currentPage = action.payload.currentPage
        }
    }
})

export default slice.reducer;

export const { getTotalMetadata } = slice.actions


//////////////////////////////////////////////////////////
//                  Actions
//////////////////////////////////////////////////////////
