    import { useState, useEffect } from "react"
    import axios from "axios"
    import "./PaymentConfirmation.css"
    import { toast, ToastContainer } from "react-toastify"
    import "react-toastify/dist/ReactToastify.css"
    import PaymentConfirmationContent from "../../../components/user/Payment/PaymentConfirmationContent"

    export default function Cart() {
        return (
            <>
                <PaymentConfirmationContent />
                <ToastContainer />
            </>
        )
    }
