import { check } from "express-validator";

const deliveryValidator = [
    check("cartValue").trim().notEmpty().withMessage("cart value is missing").isLength({min:0}).withMessage("cart value should be positive"),
    check("delivery_distance").trim().notEmpty().withMessage("delivery distance is missing"),
    check("number_of_items").trim().notEmpty().withMessage("number of items is missing"),
    check("time").notEmpty().withMessage("time is missing").isISO8601().toDate().withMessage('Invalid date received')
]


export default deliveryValidator