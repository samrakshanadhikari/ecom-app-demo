import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/status/Status";
import { API, APIAuthenticated } from "../http";


const categorySlice = createSlice({
    name: "category",
    initialState: {
        category: [],
        singleCategory: null,
        status: STATUS.LOADING,
    },

    reducers: {
        setCategoryData(state, action) {
            state.category = action.payload;
        },
        setSingleCategory(state, action) {
            state.singleCategory = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        resetStatus(state) {
            state.status = STATUS.LOADING;
        },
        setUpdateCategory(state, action) {
            const index = state.category.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.category[index] = {
                    ...state.category[index],
                    ...action.payload.data,
                };
            }
        },
        setDeleteCategory(state, action) {
            state.category = state.category.filter(item => item.id !== action.payload.categoryId);
        },
    },
});



export const {
    setCategoryData,
    setSingleCategory,
    setStatus,
    setDeleteCategory,
    setUpdateCategory,
    resetStatus
} = categorySlice.actions;

export default categorySlice.reducer;

// Add category
export function addCategory(categoryData) {
    return async function addCategoryThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.post("/api/category", categoryData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            });
            if (response.status === 200) {
                dispatch(setStatus(STATUS.SUCCESS));
                dispatch(listAllCategory());
            } else {
                dispatch(setStatus(STATUS.ERROR));
            }
        } catch (err) {
            console.error(err);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

// List All category
export function listAllCategory() {
    return async function listAllCategoryThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await API.get("/api/category");

            console.log("response", response)
            if (response.status === 200) {
                dispatch(setCategoryData(response.data.data));
                dispatch(setStatus(STATUS.SUCCESS));
            } else {
                dispatch(setStatus(STATUS.ERROR));
            }
        } catch (err) {
            console.error(err);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

// Get Single category
export function listSingleCategory(categoryId) {
    return async function listSingleBookThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.get(`/api/category/${categoryId}`);
            if (response.status === 200) {
                dispatch(setSingleCategory(response.data.data));
                dispatch(setStatus(STATUS.SUCCESS));
            } else {
                dispatch(setStatus(STATUS.ERROR));
            }
        } catch (err) {
            console.error(err);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

// Delete category
export function deleteCategory(categoryId) {
    return async function deleteCategoryThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.delete(`/api/category/${categoryId}`);
            if (response.status === 200) {
                dispatch(setDeleteCategory({ categoryId }));
                dispatch(setStatus(STATUS.SUCCESS));
                dispatch(listAllCategory())
            } else {
                dispatch(setStatus(STATUS.ERROR));
            }
        } catch (err) {
            console.error(err);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

// Update category
export function updateCategory({ id, categoryData }) {
    return async function updateCategoryThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.patch(`/api/category/${id}`, categoryData
            );
            if (response.status === 200) {
                dispatch(setUpdateCategory({ id, data: response.data.data }));
                dispatch(setStatus(STATUS.SUCCESS));
            } else {
                dispatch(setStatus(STATUS.ERROR));
            }
        } catch (err) {
            console.error(err);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}