import React from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { backEndUrl } from '../../App'
import { toast } from 'react-toastify'

function Verify() {

    const { navigate, setCartData } = useContext(StoreContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            const payload = {
                'success': success,
                'orderId': orderId
            }

            const response = await axios.post(backEndUrl + '/api/orders/verifystripe', payload, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            })

            if (response.data.success) {
                setCartData([]);
                navigate('/orders')

            }
            else {
                navigate('/cart')
            }
        } catch (error) {
            console.error(error.response.data.message)
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [])

    return (
        <div>Verify</div>
    )
}

export default Verify