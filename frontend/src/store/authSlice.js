import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/status/Status";
import { API } from "../http";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        data: [],
        status: STATUS.LOADING,

    },
    reducers: {
        setUserData(state, action) {
            state.data = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload
        }
    }
})


export const { setUserData, setStatus } = authSlice.actions
export default authSlice.reducer



export function register(data) {
    return async function registerThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await API.post("/api/register", data)
            console.log("Response : ", response)
            if (response.status === 200) {
                dispatch(setUserData(response.data));
                dispatch(setStatus(STATUS.SUCCESS));
            } else {
                dispatch(setStatus(STATUS.ERROR));
            }
        } catch (error) {
            dispatch(setStatus(STATUS.ERROR));
        }
    }
}


