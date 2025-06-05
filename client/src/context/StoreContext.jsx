import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [menu, setmenu] = useState("home")
    const [showmenu, setShowmenu] = useState(false);
    const [cartIteam, setCartIteam] = useState([]);
    const navigate=useNavigate();

    const addToCart = async (product, size) => {
        product["size"] = size;
        product["quantity"] = 1;
        toast.success("product added successfully!!")
        try {
            if (cartIteam.find((iteam) => (iteam.id == product.id) && (iteam.size == product.size))) {
                const newcartIteam = [...cartIteam];
                const existProduct = cartIteam.find((iteam) => (iteam.id == product.id) && (iteam.size == product.size));
                existProduct.quantity++;
                setCartIteam(newcartIteam);
            }
            else {
                setCartIteam([...cartIteam, product])
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(cartIteam)

    }, [cartIteam]);

    const getCartCount = () => {
        let totalCount = 0;
        for (const iteams in cartIteam) {
            totalCount += cartIteam[iteams].quantity;
        }
        return totalCount;
    }

    function increamentOrder(product) {
        const newIteamList = [...cartIteam]
        const selectIteam = cartIteam.find((iteam) => ((iteam.size == product.size)&&(iteam.id == product.id)))
        selectIteam.quantity++;
        setCartIteam(newIteamList);
    }

    function decreamentOrder(product) {
        let newIteamList = [...cartIteam];
        const selectIteam = cartIteam.find((iteam) => ((iteam.size == product.size)&&(iteam.id == product.id)))
        selectIteam.quantity--;
        if (selectIteam.quantity == 0) {
            newIteamList = cartIteam.filter((iteam) => (iteam.id != product.id));
        }
        setCartIteam(newIteamList);
    }
    function deleteIteam(product) {
        const afterDelete = cartIteam.filter((iteam) => iteam.id != product.id);
        setCartIteam(afterDelete)
    }


    const contexValue = {
        menu, setmenu, showmenu, setShowmenu, addToCart, cartIteam, getCartCount, increamentOrder, decreamentOrder, deleteIteam,navigate
    }

    return (
        <StoreContext.Provider value={contexValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;