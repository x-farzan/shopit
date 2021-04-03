import React, { useEffect } from 'react'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js"
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import ShippingSteps from './ShippingSteps';

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const history = useHistory()
    const { res } = useSelector(state => state.auth.login)
    const { list, shippingInfo } = useSelector(state => state.entities.cart)

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
    return (
        <div className="container">
            <ShippingSteps shipping confirmOrder payment />
            <div className="d-flex align-items-center justify-content-center">
                <div className="card mt-3" style={{ minWidth: "50%" }}>
                    <div className="card-header h3">Card Info</div>
                    <div className="card-body">
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
                            <input type="submit" className="btn btn-warning btn-block" value="Pay" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
