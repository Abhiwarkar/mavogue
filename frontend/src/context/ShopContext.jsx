import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import p_img1 from '../assets/p_img1.png'
import p_img3 from '../assets/p_img3.png'
import p_img4 from '../assets/p_img4.png'
import p_img5 from '../assets/p_img5.png'
import p_img6 from '../assets/p_img6.png'
import p_img7 from '../assets/p_img7.png'
import p_img8 from '../assets/p_img8.png'
import p_img9 from '../assets/p_img9.png'
import p_img10 from '../assets/p_img10.png'
import p_img11 from '../assets/p_img11.png'
import p_img12 from '../assets/p_img12.png'
import p_img13 from '../assets/p_img13.png'
import p_img14 from '../assets/p_img14.png'
import p_img15 from '../assets/p_img15.png'
import p_img16 from '../assets/p_img16.png'
import p_img17 from '../assets/p_img17.png'
import p_img18 from '../assets/p_img18.png'
import p_img19 from '../assets/p_img19.png'
import p_img20 from '../assets/p_img20.png'
import p_img21 from '../assets/p_img21.png'
import p_img22 from '../assets/p_img22.png'
import p_img23 from '../assets/p_img23.png'
import p_img24 from '../assets/p_img24.png'
import p_img34 from '../assets/p_img34.png'


const defaultProducts = [
  {
    _id: "default_1",
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 100,
    image: [p_img1, p_img34],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "default_2",
    name: "Girls Round Neck Pure Cotton Skirts",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    image: [p_img3, p_img4],
    category: "Kids",
    subCategory: "Topwear", 
    sizes: ["S", "M", "L", "XL"],
    date: Date.now(),
    bestseller: false
  },
  {
    _id: "default_3",
    name: "Women Slim Fit Relaxed Denim Jacket",
    description: "A classic denim jacket with a modern slim fit design, perfect for casual wear and layering.",
    price: 220,
    image: [p_img5, p_img6],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "default_4", 
    name: "Men's Zip-Front Relaxed Fit Jacket",
    description: "A comfortable and stylish jacket with zip-front closure, perfect for casual outings.",
    price: 300,
    image: [p_img7, p_img8],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: false
  },
  {
    _id: "default_5",
    name: "Girls Round Neck Cotton Top",
    description: "A cute and comfortable cotton top for girls, perfect for everyday wear.",
    price: 180,
    image: [p_img9, p_img10],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "default_6",
    name: "Men Tapered Fit Flat-Front Trousers",
    description: "Comfortable and stylish trousers with a modern tapered fit, perfect for both casual and formal occasions.",
    price: 250,
    image: [p_img11, p_img12],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    date: Date.now(),
    bestseller: false
  },
  {
    _id: "default_7",
    name: "Women Palazzo Pants with Waist Belt",
    description: "Elegant palazzo pants with a stylish waist belt, perfect for both casual and formal wear.",
    price: 280,
    image: [p_img13, p_img14],
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "default_8",
    name: "Boy Round Neck Pure Cotton Trousers",
    description: "A comfortable pure cotton t-shirt for boys, perfect for daily wear and play.",
    price: 150,
    image: [p_img15, p_img16],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: false
  },
  {
    _id: "default_9",
    name: "Men's Tapered Slim Fit Trouser",
    description: "Comfortable and stylish trousers for kids with a modern tapered slim fit.",
    price: 200,
    image: [p_img17, p_img18],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "default_10",
    name: "Kids Printed Plain Cotton Shirt",
    description: "A versatile cotton shirt with subtle prints, suitable for both casual and semi-formal occasions.",
    price: 320,
    image: [p_img19, p_img20],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: Date.now(),
    bestseller: false
  },
  {
    _id: "default_11",
    name: "Women Designer Floral Dress",
    description: "Elegant floral dress perfect for casual outings and special occasions.",
    price: 380,
    image: [p_img21, p_img22],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "default_12",
    name: "Kids Premium Cotton Hoodie",
    description: "Comfortable premium cotton hoodie with modern fit and style.",
    price: 420,
    image: [p_img23, p_img24],
    category: "Kids",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    date: Date.now(),
    bestseller: false
  }
];

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            
            setProducts(defaultProducts);
            
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success && response.data.products.length > 0) {
                const backendProducts = response.data.products.reverse();
                const allProducts = [...defaultProducts, ...backendProducts];
                setProducts(allProducts)
            }
        } catch (error) {
            console.log('Using default products:', error.message)
        }
    }

    const getUserCart = async ( token ) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
        if (token) {
            getUserCart(token)
        }
    }, [token])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;