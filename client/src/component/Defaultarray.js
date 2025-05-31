

import shoes7 from '../assets/shoes7.jpg';
import shoes8 from '../assets/shoes8.jpg';
import mint_shoes from '../assets/mint_shoes.jpg';
import red_shoes from '../assets/red_shoes.jpg';
import black_shoes from '../assets/black_shoes.jpg';
import shoes13 from '../assets/shoes13.jpg';
import shoes14 from '../assets/shoes14.jpg';
import shoes1 from '../assets/shoes1.jpg';
import shoes4 from '../assets/shoes4.jpg';
import shoes3 from '../assets/shoes3.jpg';
import choco_city from '../assets/choco_city.jpg';
import shoes2 from '../assets/shoes2.jpg';
import green_training from '../assets/green_traning.jpg';
import shoes10 from '../assets/shoes10.jpg';
import shoes5 from '../assets/shoes5.jpg';
import shoes11 from '../assets/shoes11.jpg';
import pink_suede from '../assets/pink_suede.jpg';
import pink_training from '../assets/pink_training.jpg';
import shoes9 from '../assets/shoes9.jpg';
import tosca_city from '../assets/tosca_city.jpg';



export default function defaultarray(gender) {
    if (gender === "male") {
        const arr = [
            { id: "1", gender: "male", name: "men's navy running", price: 8740, loc: shoes7, description: "A sleek and stylish navy blue running shoe designed for comfort and durability, perfect for both casual joggers and seasoned runners." },
            { id: "2", gender: "male", name: "men's green running", price: 7480, loc: shoes8, description: "A lightweight, breathable running shoe with a vibrant green tone, offering great grip and shock absorption." },
            { id: "3", gender: "male", name: "men's classic mint", price: 6720, loc: mint_shoes, description: "A fresh take on classic sneaker design, featuring a cool mint colorway and a timeless silhouette for everyday wear." },
            { id: "4", gender: "male", name: "men's red running", price: 7478, loc: red_shoes, description: "A bold red running shoe engineered for speed and agility, with cushioned soles for enhanced comfort." },
            { id: "5", gender: "male", name: "men's black running", price: 4789, loc: black_shoes, description: "A versatile and minimalist black running shoe, ideal for training sessions and casual wear alike." },
            { id: "6", gender: "male", name: "men's earth-tone sneaker", price: 7512, loc: shoes13, description: "A stylish sneaker featuring earthy hues, blending fashion with function for a laid-back yet sophisticated look." },
            { id: "7", gender: "male", name: "men's moonstone sneaker", price: 4980, loc: shoes14, description: "Inspired by the elegance of moonstone, this sneaker combines light hues and superior comfort for all-day wear." },
            { id: "8", gender: "male", name: "men's classic blue", price: 6218, loc: shoes1, description: "A timeless blue sneaker that offers a balance of durability and flexibility, perfect for daily activities." },
        ];
        return arr;
    } else if (gender === "female") {
        const arr2 = [
            { id: "1", gender: "female", name: "women blue training", price: 5102, loc: shoes4, description: "A breathable and lightweight training shoe in a stunning blue shade, designed for high-performance workouts." },
            { id: "2", gender: "female", name: "women candy city run", price: 4850, loc: shoes3, description: "A fun and vibrant sneaker with a candy-colored design, perfect for city strolls and active lifestyles." },
            { id: "3", gender: "female", name: "women choco city run", price: 7850, loc: choco_city, description: "A stylish city runner in a rich chocolate brown hue, offering both elegance and athletic functionality." },
            { id: "4", gender: "female", name: "women cream suede", price: 6410, loc: shoes2, description: "A soft and luxurious suede sneaker in a creamy hue, ideal for casual outings and stylish streetwear." },
            { id: "5", gender: "female", name: "women green training", price: 4816, loc: green_training, description: "A durable training shoe in a fresh green tone, built for endurance and flexibility." },
            { id: "6", gender: "female", name: "women mint sneaker", price: 5840, loc: shoes10, description: "A chic and comfortable sneaker with a refreshing mint color, great for both fitness and fashion." },
            { id: "7", gender: "female", name: "women orange sneaker", price: 7405, loc: shoes5, description: "A bold and energetic sneaker in a striking orange shade, adding a pop of color to any outfit." },
            { id: "8", gender: "female", name: "women peach training", price: 6712, loc: shoes11, description: "A lightweight training shoe in a soft peach hue, offering style and support for workouts." },
            { id: "9", gender: "female", name: "women pink suede", price: 4586, loc: pink_suede, description: "A feminine and elegant suede sneaker in a delicate pink, perfect for everyday casual looks." },
            { id: "10", gender: "female", name: "women pink training", price: 4503, loc: pink_training, description: "A vibrant pink training shoe designed for comfort and agility, ideal for gym sessions and outdoor activities." },
            { id: "11", gender: "female", name: "women tan sneaker", price: 8540, loc: shoes9, description: "A trendy tan-colored sneaker that blends versatility with modern style, suitable for multiple occasions." },
            { id: "12", gender: "female", name: "women tosca city run", price: 8450, loc: tosca_city, description: "A unique city running shoe in a beautiful tosca hue, perfect for those who want to stand out with style and performance." },
        ];
        return arr2;
    }
    else {
        const arr2 = [
            { id: "1", gender: "female", name: "women blue training", price: 5102, loc: shoes4, description: "A breathable and lightweight training shoe in a stunning blue shade, designed for high-performance workouts." },
            { id: "2", gender: "female", name: "women candy city run", price: 4850, loc: shoes3, description: "A fun and vibrant sneaker with a candy-colored design, perfect for city strolls and active lifestyles." },
            { id: "3", gender: "female", name: "women choco city run", price: 7850, loc: choco_city, description: "A stylish city runner in a rich chocolate brown hue, offering both elegance and athletic functionality." },
            { id: "4", gender: "female", name: "women cream suede", price: 6410, loc: shoes2, description: "A soft and luxurious suede sneaker in a creamy hue, ideal for casual outings and stylish streetwear." },
            { id: "5", gender: "female", name: "women green training", price: 4816, loc: green_training, description: "A durable training shoe in a fresh green tone, built for endurance and flexibility." },
            { id: "6", gender: "female", name: "women mint sneaker", price: 5840, loc: shoes10, description: "A chic and comfortable sneaker with a refreshing mint color, great for both fitness and fashion." },
            { id: "7", gender: "female", name: "women orange sneaker", price: 7405, loc: shoes5, description: "A bold and energetic sneaker in a striking orange shade, adding a pop of color to any outfit." },
            { id: "8", gender: "female", name: "women peach training", price: 6712, loc: shoes11, description: "A lightweight training shoe in a soft peach hue, offering style and support for workouts." },
            { id: "9", gender: "female", name: "women pink suede", price: 4586, loc: pink_suede, description: "A feminine and elegant suede sneaker in a delicate pink, perfect for everyday casual looks." },
            { id: "10", gender: "female", name: "women pink training", price: 4503, loc: pink_training, description: "A vibrant pink training shoe designed for comfort and agility, ideal for gym sessions and outdoor activities." },
            { id: "11", gender: "female", name: "women tan sneaker", price: 8540, loc: shoes9, description: "A trendy tan-colored sneaker that blends versatility with modern style, suitable for multiple occasions." },
            { id: "12", gender: "female", name: "women tosca city run", price: 8450, loc: tosca_city, description: "A unique city running shoe in a beautiful tosca hue, perfect for those who want to stand out with style and performance." },
            { id: "1", gender: "male", name: "men's navy running", price: 8740, loc: shoes7, description: "A sleek and stylish navy blue running shoe designed for comfort and durability, perfect for both casual joggers and seasoned runners." },
            { id: "2", gender: "male", name: "men's green running", price: 7480, loc: shoes8, description: "A lightweight, breathable running shoe with a vibrant green tone, offering great grip and shock absorption." },
            { id: "3", gender: "male", name: "men's classic mint", price: 6720, loc: mint_shoes, description: "A fresh take on classic sneaker design, featuring a cool mint colorway and a timeless silhouette for everyday wear." },
            { id: "4", gender: "male", name: "men's red running", price: 7478, loc: red_shoes, description: "A bold red running shoe engineered for speed and agility, with cushioned soles for enhanced comfort." },
            { id: "5", gender: "male", name: "men's black running", price: 4789, loc: black_shoes, description: "A versatile and minimalist black running shoe, ideal for training sessions and casual wear alike." },
            { id: "6", gender: "male", name: "men's earth-tone sneaker", price: 7512, loc: shoes13, description: "A stylish sneaker featuring earthy hues, blending fashion with function for a laid-back yet sophisticated look." },
            { id: "7", gender: "male", name: "men's moonstone sneaker", price: 4980, loc: shoes14, description: "Inspired by the elegance of moonstone, this sneaker combines light hues and superior comfort for all-day wear." },
            { id: "8", gender: "male", name: "men's classic blue", price: 6218, loc: shoes1, description: "A timeless blue sneaker that offers a balance of durability and flexibility, perfect for daily activities." }
        ];
        return arr2;
    }
}

