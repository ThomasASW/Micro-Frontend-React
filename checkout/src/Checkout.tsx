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

    const { register, handleSubmit, formState: { errors } } = useForm({
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
                        <input type='text' {...register("address1", { required: { value: true, message: "This field is required" }, minLength: { value: 3, message: "Min 3 chars required" } })} placeholder='Address Line 1' disabled={disabled} />
                        {errors.address1 && <p className='errorMessage'>{errors.address1.message}</p>}
                        <input type='text' {...register("address2", { required: { value: true, message: "This field is required" }, minLength: { value: 3, message: "Min 3 chars required" } })} placeholder='Address Line 2' disabled={disabled} />
                        {errors.address2 && <p className='errorMessage'>{errors.address2.message}</p>}
                        <input type='text' {...register("district", { required: { value: true, message: "This field is required" }, minLength: { value: 3, message: "Min 3 chars required" } })} placeholder='District' disabled={disabled} />
                        {errors.district && <p className='errorMessage'>{errors.district.message}</p>}
                        <input type='text' {...register("state", { required: { value: true, message: "This field is required" }, minLength: { value: 3, message: "Min 3 chars required" } })} placeholder='State' disabled={disabled} />
                        {errors.state && <p className='errorMessage'>{errors.state.message}</p>}
                        <input type='text' {...register("country", { required: { value: true, message: "This field is required" }, minLength: { value: 3, message: "Min 3 chars required" } })} placeholder='Country' disabled={disabled} />
                        {errors.country && <p className='errorMessage'>{errors.country.message}</p>}
                        <input type='text' {...register("zipCode", { required: { value: true, message: "This field is required" }, pattern: { value: /[0-9]{6}/, message: "Please enter a valid zip code" } })} placeholder='ZipCode' disabled={disabled} />
                        {errors.zipCode && <p className='errorMessage'>{errors.zipCode.message}</p>}
                        <Button style={{ marginTop: "10px" }} type='primary' loading={loading} disabled={disabled} onClick={handleSubmit(handleFormSubmit)}>{disabled ? "Order placed" : "Place order"}</Button>
                    </Card>
                </Flex>
            </form>
        </>
    )
}
