import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { CartItem } from './models/CartItem';
import { Button, Card, Flex } from 'antd'

export const Cart = () => {

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [total, setTotal] = useState(0)

    const url = "http://localhost:5000/api/cart"
    const updateCartUrl = "http://localhost:5000/api/cart/"

    const getCartItems = async () => {
        const res = await fetch(url);
        const body = await res.json()
        console.log(body);
        setCartItems(body.cart);
    }

    useEffect(() => {
        let sum = 0;
        cartItems.forEach((cartItem) => {
            sum += cartItem.product[0].price * cartItem.quantity
        })
        setTotal(sum)
    }, [cartItems])


    useEffect(() => {
        getCartItems()
    }, [])

    const updateQuantity = async (id: string, quantity: number) => {
        const params = new URLSearchParams();
        params.append("quantity", quantity.toString())
        const res = await fetch(updateCartUrl + id + `?${params.toString()}`);
        const body = await res.json();
        console.log(body);
        getCartItems();
    }

    const decreaseQuantity = async (cartItem: CartItem) => {
        let quantity = Number.parseInt(`${cartItem.quantity}`);
        if (quantity == 1) {
            const res = await fetch(updateCartUrl + cartItem._id, {
                method: "delete",
            });
            const body = await res.json();
            console.log(body);
            getCartItems();
        } else {
            updateQuantity(cartItem._id, Number.parseInt(`${cartItem.quantity}`) - 1);
        }
    }

    const checkout = () => {
        navigate("/checkout")
    }

    return (
        cartItems.length > 0 ?
            <Flex wrap="wrap" gap={15} style={{ width: "100%", paddingTop: "10px" }} justify='space-evenly'>
                {cartItems.map((cartItem) => {
                    return (
                        <Card
                            key={cartItem._id}
                            hoverable
                            bordered
                            style={{ width: "47%", height: "300px" }}
                        >
                            <Card.Grid style={{ width: "50%" }} hoverable={false}>
                                <img alt={cartItem.product[0].title} src={cartItem.product[0].thumbnail} height={250} width={250} />
                            </Card.Grid>
                            <Card.Grid style={{ width: "50%" }} hoverable={false}>
                                <h2>{cartItem.product[0].title}</h2>
                                <h3>{cartItem.product[0].category}</h3>
                                <h4>{`Rs. ${cartItem.product[0].price}`}</h4>
                                <Flex gap={15} align='center'>
                                    <Button type='primary' onClick={() => decreaseQuantity(cartItem)}><strong>-</strong></Button>
                                    <p>{cartItem.quantity}</p>
                                    <Button type='primary' onClick={() => updateQuantity(cartItem._id, Number.parseInt(`${cartItem.quantity}`) + 1)}><strong>+</strong></Button>
                                </Flex>
                            </Card.Grid>
                        </Card>
                    )
                })}
                <Flex style={{ width: "100%" }} justify='center'>
                    <Button type='primary' onClick={checkout}>Checkout {`(Rs. ${total})`}</Button>
                </Flex>
            </Flex>
            : <Flex justify='center' align='center'><p>Cart is empty</p></Flex>
    )
}
