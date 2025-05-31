import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [menu,setmenu]=useState("home")
    const [showmenu, setShowmenu] = useState(false);
    const [cartIteam, setCartIteam] = useState([]);

    const addToCart = async (product, size) => {
        product["size"] = size;
        product["quantity"]=1;
        toast.error("product added");
        try {
            if (cartIteam.find((iteam) => (iteam.id == product.id) && (iteam.size==product.size))) {
                const newcartIteam=[...cartIteam];
                const existProduct=cartIteam.find((iteam) => (iteam.id == product.id)&&(iteam.size==product.size));
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


    const contexValue = {
        menu,setmenu,showmenu, setShowmenu, addToCart, cartIteam, getCartCount
    }

    return (
        <StoreContext.Provider value={contexValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;