import {Request,Response,NextFunction} from 'express'
import moment from 'moment'
import AcceptedValue from '../model/delivery.model'

export const deliveryFee = (req:Request,res:Response,next:NextFunction) => {
    // if the cart value is > 100$ then the delivery fee is 0$
    const Fee_1000_M = 2 
    const Thousand_M = 1000
    const Fee_per_500_M = 1 // if distance is > 1000 add 1 per 500M
    const Fee_per_Item = 0.5 // if item is > 4 add 0.5 per item
    const CartValue_LE_10 =10 // cart value is less than 10, subChargeFee = 10 - (cartValue)
    const total_items = 4 // discharge fee is added if number of items is >4
    const bulk_Fee = 1.2 // is added when the number of items >13
    const Max_delivery_Fee = 15
    let total_distance_partition_per_500M = 0
    let surcharge =0
    let total_items_Fee = 0
    let total_delivery = 0
    try {
        const {cartValue,delivery_distance,number_of_items,time}:AcceptedValue = req.body
        if(cartValue >= 100){
            return res.status(200).json({
                isOk:true,
                delivery_fee:0
            })
        }

        else if(cartValue <10){
             surcharge = CartValue_LE_10 - cartValue
            // calculating fee based on the distance
            if(delivery_distance > Thousand_M){
                let diff_distance = delivery_distance - Thousand_M
                let divided = diff_distance / 500
                let module_distance = diff_distance % 500
                if(module_distance > 0){
                    total_distance_partition_per_500M = Fee_1000_M + (divided + 1) * Fee_per_500_M 
                }
                else{
                    total_distance_partition_per_500M = Fee_1000_M + (divided) *Fee_per_500_M
                }
            }
            else{
                total_distance_partition_per_500M = Fee_1000_M
            }
            // calculating fee based on the items
            if(number_of_items > 12){
                total_items_Fee = bulk_Fee
                let diff_items = number_of_items - total_items
                total_items_Fee = total_items_Fee + diff_items * Fee_per_Item
            }
            else if(number_of_items > 4){
                total_items_Fee = 0
                let diff_items = number_of_items - total_items
                total_items_Fee = total_items_Fee + diff_items * Fee_per_Item
            }
            else{
                total_items_Fee = 0
            }
            // 
        }

        else{
            surcharge = 0
            if(delivery_distance > Thousand_M){
                let diff_distance = delivery_distance - Thousand_M
                let divided = diff_distance / 500
                let module_distance = diff_distance % 500
                if(module_distance > 0){
                    total_distance_partition_per_500M = Fee_1000_M + (divided + 1) * 1 
                }
                else{
                    total_distance_partition_per_500M = Fee_1000_M + (divided) *1
                }
            }
            else{
                total_distance_partition_per_500M = Fee_1000_M
            }
            // calculating fee based on the items
            if(number_of_items > 12){
                total_items_Fee = bulk_Fee
                let diff_items = number_of_items - total_items
                total_items_Fee = total_items_Fee + diff_items * Fee_per_Item
            }
            else if(number_of_items > 4){
                total_items_Fee = 0
                let diff_items = number_of_items - total_items
                total_items_Fee = total_items_Fee + diff_items * Fee_per_Item
            }
            else{
                total_items_Fee = 0
            }
        }

        total_delivery = surcharge + total_distance_partition_per_500M + total_items_Fee

        const day = moment(time).format('dddd')
        const hour = moment(time).format('h')
        const meridian = moment(time).format('a')
        if(day === "Friday" && (Number.parseInt(hour) >=3 && Number.parseInt(hour) <= 7) && meridian === "pm"){
            total_delivery *= 1.2
        }

        if(total_delivery > 15){
            return res.status(200).json({
                isOk:true,
                delivery_fee: Max_delivery_Fee,
            })
        }
        
        return  res.status(200).json({
            isOk:true,
            delivery_fee: total_delivery,
        })
        
    } catch (error) {
        next(error)
    }
}