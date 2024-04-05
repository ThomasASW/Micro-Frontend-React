import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Product } from './models/Product'
import { Card, Flex, Pagination, PaginationProps } from 'antd'
import Meta from 'antd/es/card/Meta'

const ProductListing = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([])

    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(0)

    const [nextId, setNextId] = useState("")

    const url = "http://localhost:5000/api/products"

    const getProducts = async () => {
        const params = new URLSearchParams();
        if (page != 0) {
            params.append("id", nextId);
        }
        params.append("limit", "10");
        const res = await fetch(`${url}?${params.toString()}`);
        const body = await res.json();
        console.log(body);
        setProducts(body.products)
        setTotal(body.total)
        setNextId(body.products[9]._id)
    }

    useEffect(() => {
        getProducts();
    }, [page])

    const pageChange: PaginationProps['onChange'] = (page) => {
        setPage(page - 1);
    }

    const onClick = (id: string) => {
        navigate(`/product/${id}`)
    }

    return (
        <div>
            <Flex wrap="wrap" gap={15} style={{ width: "100%", paddingTop: "10px" }} justify='space-evenly'>
                {products.map((product) => {
                    return (
                        <Card
                            key={product._id}
                            hoverable
                            bordered
                            style={{ width: "47%", height: "300px" }}
                            onClick={() => onClick(product._id)}
                        >
                            <Card.Grid style={{ width: "50%" }} hoverable={false}>
                                <img alt={product.title} src={product.thumbnail} height={250} width={250} />
                            </Card.Grid>
                            <Card.Grid style={{ width: "50%" }} hoverable={false}>
                                <h2>{product.title}</h2>
                                <h3>{product.category}</h3>
                                <h4>{`Rs. ${product.price}`}</h4>
                            </Card.Grid>
                        </Card>
                    )
                })}
            </Flex>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", paddingTop: "10px", paddingBottom: "10px" }}>
                <Pagination
                    showSizeChanger={false}
                    defaultCurrent={page + 1}
                    defaultPageSize={20}
                    total={total}
                    onChange={pageChange}
                />
            </div>
        </div >
    )
}

export default ProductListing
