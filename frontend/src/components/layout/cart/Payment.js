import React, { useEffect, useState } from 'react'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js"
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import ShippingSteps from './ShippingSteps';
import axios from 'axios'

const Payment = () => {
    const [payError, setPayError] = useState("")
    const stripe = useStripe();
    const elements = useElements();
    // const dispatch = useDispatch();
    const history = useHistory()
    const { res } = useSelector(state => state.auth.login)
    // const { list, shippingInfo } = useSelector(state => state.entities.cart)

    const options = {
        style: {
            base: {
                fontSize: "1rem"
            },
            invalid: {
                color: "#9e2146"
            }
        }
    }
    const finalOrderInfo = JSON.parse(sessionStorage.getItem("finalOrderInfo"))
    const paymentData = {
        amount: Math.round(finalOrderInfo.totalPrice * 100)
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        document.querySelector("#pay-btn").disabled = true;

        let ress;
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            ress = await axios.post("/api/v1/payment/process", paymentData, config)
            const clientSecret = ress.data.client_secret
            if (!stripe || !elements) {
                return
            }
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: res.name,
                        email: res.email
                    }
                }
            })
            if (result.error) {
                setPayError(result.error.message)

                document.querySelector("#pay-btn").disabled = false;
                setTimeout(() => {
                    setPayError("")
                }, 2000);
            } else {


                // if payment is successed or not
                if (result.paymentIntent.status === "succeeded") {
                    // TODO: New Order
                    history.push("/success")
                } else {
                    setPayError("There is some issue while payment processing")
                    setTimeout(() => {
                        setPayError("")
                    }, 2000);
                }
            }
        } catch (error) {
            document.querySelector("#pay-btn").disabled = false;
            // setPayError(error.response.data.message)
            setTimeout(() => {
                setPayError("")
            }, 2000);
        }
    }
    return (
        <div className="container">
            <ShippingSteps shipping confirmOrder payment />
            <div className="d-flex align-items-center justify-content-center">
                <div className="card mt-3" style={{ minWidth: "50%" }}>
                    {payError ? (
                        <div className="alert alert-danger">{payError}</div>
                    ) : null}
                    <div className="card-header h3">Card Info</div>

                    <form className="card-body" onSubmit={handleOnSubmit}>
                        <div className="form-group">
                            <label htmlFor="card-number"> Card Number</label>
                            <CardNumberElement type="number" className="form-control"
                                options={options}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="card-number"> Card Expiry</label>
                            <CardExpiryElement type="number" className="form-control"
                                options={options}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="card-number"> Card CVC</label>
                            <CardCvcElement type="number" className="form-control"
                                options={options}
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-warning btn-block" value={`Pay - $${finalOrderInfo && finalOrderInfo.totalPrice}`} id="pay-btn" onClick={handleOnSubmit} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Payment
