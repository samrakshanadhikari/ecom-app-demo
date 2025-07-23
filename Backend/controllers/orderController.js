import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
    const userId = req.user.id;
    const { products, shippingAddress, phoneNumber, totalAmount, paymentMethod, orderStatus } = req.body;

    console.log("ShippingAddress : ", shippingAddress)

    if (!userId) {
        return res.status(400).json({ message: "User not found" });
    }

    //array products.length
    if (products.length == 0 || !shippingAddress, !phoneNumber, !totalAmount, !paymentMethod, !orderStatus) {
        return res.status(400).json({ message: "All field are required" });
    }

    //payment method
    // if(paymentMethod==='khalti'){
    //     console.log("Redirect to the khalti");

    // }else if(paymentMethod==='cod'){
    //     console.log("Direct cash on hand");
    // }else{
    //     console.log("Select the valid payment method");
    // }

    const createOrder= await Order.create({
        userId,
        products,
        phoneNumber,
        totalAmount,
        paymentMethod,
        shippingAddress,
        orderStatus
    })

    res.status(200).json({ message: "Order places succcessfull", data :createOrder });
}

//get the order of the login user
//get all the order

// delete order
//admin update orderstatus
//get single order




