import React, { useState } from 'react'
import './addIteam.css'
import { IoCloudUpload } from "react-icons/io5";
import upload from "../../assets/upload.png"

function AddIteam() {

  const [proImg, setProImg] = useState(false);

  const [proName, setProName] = useState('');
  const [proDescription, setProDescription] = useState("");
  const [proPrice, setProPrice] = useState('')
  const [proGender, setProGender] = useState("male");
  const [proSize, setProSize] = useState([]);


  const onSubmit = (e) => {
    e.preventDefault();

  }
  return (
    <div className='additeam-main-container'>
      <div className="additeam-inner-container">
        <form action="">
          <div className="image-cont">
            <p className='label'>Upload Image</p>
            <label htmlFor="proimage">
              <img src={!proImg ? upload : URL.createObjectURL(proImg)} alt="upload" />
              <input type="file" onChange={(e) => setProImg(e.target.files[0])} id="proimage" hidden required />
            </label>
          </div>
          <div className="name-cont">
            <p className="proname label">Product Name</p>
            <input className='input-field' type="text" onChange={(e) => setProName(e.target.value)} value={proName} id="proname" placeholder='Type here' required />
          </div>
          <div className="description-cont">
            <p className="prodescription label">Product Description</p>
            <textarea className='input-field' id="prodescription" onChange={(e) => setProDescription(e.target.value)} value={proDescription} placeholder='Write content here' required></textarea>
          </div>
          <div className="gender-price-cont">
            <div className="gender">
              <p className="progender label">Gender</p>
              <select className="product-gender" onChange={(e) => setProGender(e.target.value)} value={proGender} id="progender" required>
                <option value="male" >Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="price">
              <p className="proprice label" required>Price</p>
              <input className='product-price' type="number" onChange={(e) => setProPrice(e.target.value)} value={proPrice} id="proprice" placeholder='0' />
            </div>
          </div>
          <div className="size-cont">
            <p className='label'>Size</p>
            <div className="size-inner-cont">
              <div className={proSize.includes("6UK")? "selected-cont":""} onClick={() => setProSize(pre => pre.includes("6UK") ? pre.filter((iteam) => iteam != "6UK") : [...proSize, "6UK"])}><p className="size">6UK</p></div>
              <div className={proSize.includes("7UK")? "selected-cont":""} onClick={() => setProSize(pre => pre.includes("7UK") ? pre.filter((iteam) => iteam != "7UK") : [...proSize, "7UK"])}><p className="size">7UK</p></div>
              <div className={proSize.includes("8UK")? "selected-cont":""} onClick={() => setProSize(pre => pre.includes("8UK") ? pre.filter((iteam) => iteam != "8UK") : [...proSize, "8UK"])}><p className="size">8UK</p></div>
              <div className={proSize.includes("9UK")? "selected-cont":""} onClick={() => setProSize(pre => pre.includes("9UK") ? pre.filter((iteam) => iteam != "9UK") : [...proSize, "9UK"])}><p className="size">9UK</p></div>
              <div className={proSize.includes("10UK")? "selected-cont":""} onClick={() => setProSize(pre => pre.includes("10UK") ? pre.filter((iteam) => iteam != "10UK") : [...proSize, "10UK"])}><p className="size">10UK</p></div>
              <div className={proSize.includes("11UK")? "selected-cont":""} onClick={() => setProSize(pre => pre.includes("11UK") ? pre.filter((iteam) => iteam != "11UK") : [...proSize, "11UK"])}><p className="size">11UK</p></div>
              <div className={proSize.includes("12UK")? "selected-cont":""} onClick={() => setProSize(pre => pre.includes("12UK") ? pre.filter((iteam) => iteam != "12UK") : [...proSize, "12UK"])}><p className="size">12UK</p></div>
            </div>
          </div>
          <div className="submit-btn-cont">
            <button type="submit" className='submit-btn'>ADD</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddIteam