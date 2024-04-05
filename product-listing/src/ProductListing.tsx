import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Product } from './models/Product'
import { Card, Flex, Pagination, PaginationProps, Radio, RadioChangeEvent } from 'antd'

const ProductListing = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([])

    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(0)
    const [sortField, setSortField] = useState("title")
    const [sortDirection, setSortDirection] = useState("1")

    const url = "http://localhost:5000/api/products"

    const getProducts = async () => {
        const params = new URLSearchParams();
        params.append("skip", `${(page * 10)}`);
        params.append("limit", "10");
        params.append("sort", sortField);
        params.append("direction", sortDirection);
        const res = await fetch(`${url}?${params.toString()}`);
        const body = await res.json();
        console.log(body);
        setProducts(body.products)
        setTotal(body.total)
    }

    useEffect(() => {
        getProducts();
    }, [page, sortDirection, sortField])

    const pageChange: PaginationProps['onChange'] = (page) => {
        setPage(page - 1);
    }

    const onClick = (id: string) => {
        navigate(`/product/${id}`)
    }

    const changeSortField = (e: RadioChangeEvent) => {
        setSortField(e.target.value);
    }

    const changeSortDirection = (e: RadioChangeEvent) => {
        setSortDirection(e.target.value);
    }

    return (
        <div>
            <div style={{ width: "100%", padding: "10px" }}>
                <Radio.Group onChange={changeSortField} value={sortField}>
                    <Radio value="title">Name</Radio>
                    <Radio value="price">Price</Radio>
                </Radio.Group>
                <Radio.Group onChange={changeSortDirection} value={sortDirection}>
                    <Radio value="1">Ascending</Radio>
                    <Radio value="-1">Descending</Radio>
                </Radio.Group>
            </div>
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
