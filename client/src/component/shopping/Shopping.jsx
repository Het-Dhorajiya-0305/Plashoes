import React,{useState,useEffect} from 'react'
import './shopping.css';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { backEndUrl } from '../../App';

function Shopping({category}) {

        const [productDetail, setProductDetail] = useState([]);

    useEffect(()=>{
        const fetchdata=async()=>{
            try {
                const response=await axios.get(`${backEndUrl}/product/listproduct`)
                if(response.data.success)
                {
                    if(category==='male')
                    {
                        const Arr=response.data.productData.filter((iteam)=>iteam.proGender==='male')
                        setProductDetail(Arr)
                        return ;
                    }
                    else if(category==='female'){
                        const Arr=response.data.productData.filter((iteam)=>iteam.proGender==='female')
                        setProductDetail(Arr)
                        return ;
                    }
                }
                else{
                    console.log("error in fetching men data",response.data.message)
                    alert("error in fetching data!!", response.data.message)
                    return ;
                }
            } catch (error) {
                console.log("error in fetching men data",error.message)
                    alert("error in fetching data!!", error.message)
                    return ;
            }
        }
        fetchdata();
    },[])
    
    return (
        <div className='shopping-main-container'  >
            <div className='shopping_content'>
                <h1 className='heading'>{category}</h1>
                <div className="shopping" id={category == "men" ? "men_box" : "women_box"}>
                    {productDetail.map((detail) => (
                        <div key={detail._id} className="iteam_shopping">
                            <Link to={`/product/${detail._id}`}>
                                <img src={detail.proImg} alt={detail.proName} />
                            </Link>
                            <h2>{detail.proName}</h2>
                            <div className="price">
                                <span>
                                    <FaIndianRupeeSign className='rupees' />
                                    {detail.proPrice}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Shopping
