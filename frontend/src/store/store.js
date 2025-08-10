import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"
import productSlice from "./productSlice"
import cartSlice from "./cartSlice"
import orderSlice from "./orderSlice"
import categorySlice from "./categorySlice"

const store = configureStore({
    reducer :{
        auth : authSlice,
        product : productSlice,
        cart :cartSlice,
        order :orderSlice,
        category :categorySlice
    }
})

export default store