import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { backEndUrl } from "../App";



export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [menu, setmenu] = useState("home")
    const [showmenu, setShowmenu] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [total, setTotal] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [token, setToken] = useState(false);

    const navigate = useNavigate();





    const auth = async () => {
        try {
            const response = await axios.get(backEndUrl + '/api/user/authorized', {
                withCredentials: true
            })
            if (response.data.success) {
                setToken(response.data.success);
                return;
            }
        } catch (error) {
            setToken(false);
            console.error(error);
        }
    }
    useEffect(() => {
        getCartCount();
    }, [cartData])

      useEffect(() => {
          if(token){
              fetchCartData();
          }
    }, [token])


    const addToCart = async (size, productDetail) => {
        try {
            if (!size) {
                toast.error("Please select at least one product size!");
                return;
            }

            const payload = {
                proName: productDetail.proName,
                size: size,
                proDetails: productDetail,
            };

            const response = await axios.post(`${backEndUrl}/api/cartIteam/addtocart`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (response.data.success) {
                // toast.success(response.data.message);
                fetchCartData();
                return;
            }
            else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.error("Error adding product to cart:", error.response?.data || error.message);
            toast.error(error.response.data.message);
        }
    };

    const deleteIteam = async (orderId) => {
        try {
            const response = await axios.post(`${backEndUrl}/api/cartIteam/deletecartiteam`, { "cartId": orderId }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })

            if (response.data.success) {
                // toast.success(response.data.message);
                fetchCartData();
                return;
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error.response.data.message)
            toast.error(error.response.data.message)
        }
    }

    const fetchCartData = async () => {
        try {
            const response = await axios.get(`${backEndUrl}/api/cartIteam/getusercart`, {
                withCredentials: true,
            });

            if (response.data.success) {
                setCartData(response.data.cartData);
                getCartCount();
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            console.error("Error fetching cart data:", err.response.data.message);
            toast.error(err.response.data.message);
        }
    };

    const updateQuantity = async (orderId, quantity) => {
        try {
            if (quantity == 0) {
                deleteIteam(orderId);
                return;
            }
            const payload = {
                orderId: orderId,
                quantity: quantity
            }

            const response = await axios.post(`${backEndUrl}/api/cartIteam/updatequantity`, payload, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true,
            })

            if (response.data.success) {
                fetchCartData();
                // toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error.response.data.message)
            toast.error(error.response.data.message)
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        cartData.map((iteam) => {
            if (iteam.quantity > 0) {
                totalCount += iteam.quantity;
            }
        })
        setCartCount(totalCount);
    }


    const contexValue = {
        menu, setmenu, showmenu, setShowmenu, updateQuantity, navigate, setCartData, getCartCount, deleteIteam, showUser, setShowUser, fetchCartData, cartData, addToCart, cartCount, setCartCount, total, setTotal,auth,token
    }

    return (
        <StoreContext.Provider value={contexValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
