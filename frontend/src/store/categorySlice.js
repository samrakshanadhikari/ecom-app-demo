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
            // Convert to FormData for file upload
            const formData = new FormData();
            formData.append('categoryName', categoryData.categoryName);
            if (categoryData.image) {
                formData.append('image', categoryData.image);
            }
            
            console.log("📤 Sending category creation request:");
            console.log("  - Category name:", categoryData.categoryName);
            console.log("  - Has image:", !!categoryData.image);
            console.log("  - FormData entries:", Array.from(formData.entries()).map(([k, v]) => [k, v instanceof File ? v.name : v]));
            
            // Don't set Content-Type header - let browser set it automatically with boundary
            const response = await APIAuthenticated.post("/api/category/", formData);
            
            console.log("✅ Category creation response:", response.data);
            if (response.status === 200) {
                dispatch(setStatus(STATUS.SUCCESS));
                dispatch(listAllCategory());
                return { success: true, data: response.data };
            } else {
                dispatch(setStatus(STATUS.ERROR));
                return { success: false, error: "Failed to create category" };
            }
        } catch (err) {
            console.error("❌ Category creation error:", err);
            console.error("  - Error response:", err.response?.data);
            console.error("  - Error status:", err.response?.status);
            console.error("  - Error message:", err.message);
            console.error("  - Request config:", {
                url: err.config?.url,
                method: err.config?.method,
                headers: err.config?.headers
            });
            
            dispatch(setStatus(STATUS.ERROR));
            
            // Return error with more details
            let errorMessage = "Failed to create category";
            
            if (err.response?.data) {
                // Prioritize message field, then error, then errorMessage
                errorMessage = err.response.data.message || 
                              err.response.data.error || 
                              err.response.data.errorMessage || 
                              errorMessage;
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            // Handle specific error cases
            if (err.response?.status === 400) {
                // Bad request - usually duplicate category or validation error
                if (errorMessage.toLowerCase().includes('unique')) {
                    errorMessage = "This category name already exists. Please choose a different name.";
                } else if (errorMessage.toLowerCase().includes('required')) {
                    errorMessage = "Category name is required.";
                }
            } else if (err.response?.status === 401) {
                errorMessage = "You are not authenticated. Please log in again.";
            } else if (err.response?.status === 403) {
                errorMessage = "You don't have permission to create categories. Admin access required.";
            } else if (err.response?.status === 500) {
                errorMessage = "Server error occurred. Please try again later.";
            }
            
            console.error("❌ Final error message:", errorMessage);
            return { success: false, error: errorMessage };
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