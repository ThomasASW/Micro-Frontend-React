import { ShoppingCartOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5000")

const Navbar = () => {

    const navigate = useNavigate()

    const [current, setCurrent] = useState('products');
    const [cartCount, setCartCount] = useState(0);

    socket.on('connect', () => {
        console.log("connected");
    });
    socket.on('disconnect', () => {
        console.log("disconnected");
    });
    socket.on('update', (value) => {
        console.log("update");
        setCartCount(value.count)
    });

    const url = "http://localhost:5000/api/cart/count"

    const getCartCount = async () => {
        const res = await fetch(url);
        const body = await res.json();
        console.log(body);
        setCartCount(body.count)
    }

    useEffect(() => {
        getCartCount()
    }, [])

    const onClick = (key: string) => {
        setCurrent(key);
        if (key == "products") {
            navigate("/")
        } else {
            navigate("/cart")
        }
    };

    return (
        <Flex>
            <Button onClick={() => onClick('products')} type={current == 'products' ? 'primary' : 'text'} icon={<UnorderedListOutlined />}>
                Products
            </Button>
            <Button onClick={() => onClick('cart')} type={current == 'cart' ? 'primary' : 'text'} icon={<ShoppingCartOutlined />}>
                {`Cart (${cartCount})`}
            </Button>
        </Flex>
    );
}

export default Navbar
