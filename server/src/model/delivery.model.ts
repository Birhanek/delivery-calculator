
interface AcceptedValue {
    cartValue:number,
    delivery_distance:number,
    number_of_items:number,
    time:string
}

export type deliveryResponse = {
    delivery_fee:number
}

export default AcceptedValue