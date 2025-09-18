import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/status/Status";
import { APIAuthenticated } from "../http";

// Initial state
const orderSlice = createSlice({
  name: "order",
  initialState: {
    items: [],
    singleOrder: [],
    allOrders: [],
    myOrder:[],
    status: STATUS.LOADING,
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setSingleOrder(state, action) {
      state.singleOrder = action.payload;
    },
    setAllOrders(state, action) {
      state.allOrders = action.payload;
    },
    setMyOrders(state, action) {
      state.myOrder = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    resetStatus(state) {
      state.status = STATUS.LOADING;
    },
  },
});

export const {
  setItems,
  setSingleOrder,
  setAllOrders,
  setStatus,
  resetStatus,setMyOrders
} = orderSlice.actions;

export default orderSlice.reducer;


// create order
export function submitOrder(orderData, navigate) {
  return async function submitOrderThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await APIAuthenticated.post(`/api/order`, orderData);
      console.log("response : ", response);

      if (response.status === 200) {
        dispatch(setStatus(STATUS.SUCCESS));
        dispatch(setItems(response.data));
        const { url } = response.data;
        if (url) {
          window.location.href = url; 
        } else {
          navigate("/success"); 
        }
      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (err) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}

// Fetch all orders
export function fetchAllOrders() {
  return async function fetchAllOrdersThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await APIAuthenticated.get(`/api/order`);
      if (response.status === 200) {
        dispatch(setStatus(STATUS.SUCCESS));
        dispatch(setAllOrders(response.data));
      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (err) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}
// Fetch my orders
export function fetchMyOrders() {
  return async function fetchMyOrdersThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await APIAuthenticated.get(`/api/order/myOrders`);
      if (response.status === 200) {
        dispatch(setStatus(STATUS.SUCCESS));
        dispatch(setMyOrders(response.data.data));
      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (err) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}

// Fetch single order
export function fetchSingleOrder(orderId) {
  return async function fetchSingleOrderThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await APIAuthenticated.get(`/api/order/${orderId}`);
      if (response.status === 200) {
        dispatch(setStatus(STATUS.SUCCESS));
        dispatch(setSingleOrder(response.data.data));
      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (err) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}
