import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Product } from './models/Product';
import { Button, Card, Carousel } from 'antd';

export const ProductDetails = () => {

    const { id } = useParams();

    const [product, setProduct] = useState<Product>();

    const url = "http://localhost:5000/api/products/"

    const getProductDetails = async () => {
        const res = await fetch(`${url}${id}`)
        const body = await res.json();
        console.log(body);
        setProduct(body);
    }

    useEffect(() => {
        getProductDetails();
    }, [id])

    return (
        <Card
            hoverable={true}
            bordered={true}
            style={{ width: "95%", height: "85%", marginLeft: "auto", marginRight: "auto" }}
        >
            <Card.Grid hoverable={false} style={{ width: "50%" }}>
                <Carousel autoplay>
                    {product?.images.map((image, index) => {
                        return (
                            <div key={index}>
                                <img src={image} style={{ height: "40%" }} />
                            </div>
                        )
                    })}
                </Carousel>
            </Card.Grid>
            <Card.Grid hoverable={false} style={{ width: "50%" }}>
                <h1>{product?.title}</h1>
                <h2>{product?.brand}</h2>
                <h3>{product?.description}</h3>
                <h4>{`Rs. ${product?.price}`}</h4>
                <Button type='primary'>Add to cart</Button>
            </Card.Grid>
        </Card>
    )
}
