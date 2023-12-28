export const SERVER_PORT = process.env['REACT_APP_SERVER_SIDE_URL'] as string || 'http://127.0.0.1:5000'


export interface IDelivery {
    cartValue:number,
    delivery_distance:number,
    number_of_items:number,
    time:string
}

export type IResponse ={
    delivery_fee:number,
    isOk:boolean
}