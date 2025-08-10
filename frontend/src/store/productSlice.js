import { createSlice } from "@reduxjs/toolkit";
import { API, APIAuthenticated } from "../http";
import { STATUS } from "../globals/status/Status";

const productSlice = createSlice({
    name: "product",
    initialState: {
        product: [],
        singleProduct: null,
        productByCategory:[],
        status: STATUS.LOADING,
        searchProduct:[],
    },
    reducers: {
        setProductData(state, action) {
            state.product = action.payload;
        },
        setSingleProduct(state, action) {
            state.singleProduct = action.payload;
        },
        setproductByCategory(state, action) {
            state.productByCategory = action.payload;
        },
        setSearchProduct(state, action) {
            state.searchProduct = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        resetStatus(state) {
            state.status = STATUS.LOADING;
          },
        setUpdateProduct(state, action) {
            const index = state.product.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.product[index] = {
                    ...state.product[index],
                    ...action.payload.data,
                };
            }
        },
        setDeleteProduct(state, action) {
            state.product = state.product.filter(item => item.id !== action.payload.productId);
        },
    },
});

export const {
    setProductData,
    setSingleProduct, setproductByCategory,
    setStatus,
    setDeleteProduct,
    setUpdateProduct,
    resetStatus, setSearchProduct
} = productSlice.actions;

export default productSlice.reducer;

// Add product
export function addProduct(productData) {
    return async function addProductThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.post("/api/product/create", productData);
            if (response.status === 200) {
                dispatch(setStatus(STATUS.SUCCESS));
                dispatch(listAllProduct());
            } else {
                dispatch(setStatus(STATUS.ERROR));
            }
        } catch (err) {
            console.error(err);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

// List All product
export function listAllProduct() {
    return async function listAllProductThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await API.get("/api/product/getAll");
            if (response.status === 200) {
                dispatch(setProductData(response.data.data));
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


// Get Single product
export function listSingleProduct(productId) {
    return async function listSingleProductThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.get(`/api/product/singleProduct/${productId}`);
            if (response.status === 200) {
                dispatch(setSingleProduct(response.data.data));
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
// Get product by category
export function listProductByCategory(categoryName) {
    return async function listProductByCategoryThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await API.get(`/api/product/category/${categoryName}`);
            if (response.status === 200) {
                dispatch(setproductByCategory(response.data.data));  
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

// Delete product
export function deleteProduct(productId) {
    return async function deleteProductThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.delete(`/api/product/delete/${productId}`);
            if (response.status === 200) {
                dispatch(setDeleteProduct({ productId }));
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

// Update product
export function updateProduct({ id, productData }) {
    return async function updateProductThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.patch(`/api/product/update/${id}`, productData);
            if (response.status === 200) {
                dispatch(setUpdateProduct({ id, data: response.data.data }));
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
