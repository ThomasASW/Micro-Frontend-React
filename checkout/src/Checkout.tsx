import { Button, Card, Flex, message } from 'antd';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";

export const Checkout = () => {

    const [messageApi, contextHolder] = message.useMessage();

    const defaultValues = {
        address1: "",
        address2: "",
        district: "",
        state: "",
        zipCode: "",
        country: "",
    }

    const url = "http://localhost:5000/api/checkout"

    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(false)

    const { register, handleSubmit, reset } = useForm({
        defaultValues: defaultValues
    });

    const handleFormSubmit = async (data: any) => {
        setLoading(true)
        const res = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const body = await res.json();
        console.log(body);
        if (body.acknowledged) {
            messageApi.open({
                type: "success",
                content: "Order placed successfully"
            })
            setDisabled(true)
            setLoading(false)
        }
    }

    return (
        <>
            {contextHolder}
            <form>
                <Flex style={{ width: "100%", margin: "10px", padding: "10px" }} justify='center'>
                    <Card hoverable bordered style={{ width: "60%" }} title="Checkout">
                        <input type='text' {...register("address1", { required: true })} placeholder='Address Line 1' disabled={disabled} />
                        <input type='text' {...register("address2", { required: true })} placeholder='Address Line 2' disabled={disabled} />
                        <input type='text' {...register("district", { required: true })} placeholder='District' disabled={disabled} />
                        <input type='text' {...register("state", { required: true })} placeholder='State' disabled={disabled} />
                        <input type='text' {...register("country", { required: true })} placeholder='Country' disabled={disabled} />
                        <input type='text' {...register("zipCode", { required: true })} placeholder='ZipCode' disabled={disabled} />
                        <Button type='primary' loading={loading} disabled={disabled} onClick={handleSubmit(handleFormSubmit)}>{disabled ? "Order placed" : "Place order"}</Button>
                    </Card>
                </Flex>
            </form>
        </>
    )
}
