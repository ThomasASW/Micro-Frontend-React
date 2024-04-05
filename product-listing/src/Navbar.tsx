import { ShoppingCartOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const items: MenuProps['items'] = [
    {
        label: 'Products',
        key: 'products',
        icon: <UnorderedListOutlined />,
    },
    {
        label: 'Cart',
        key: 'cart',
        icon: <ShoppingCartOutlined />,
    },
];

const Navbar = () => {

    const navigate = useNavigate()

    const [current, setCurrent] = useState('products');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        if (e.key == "products") {
            navigate("/")
        } else {
            navigate("/cart")
        }
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}

export default Navbar
