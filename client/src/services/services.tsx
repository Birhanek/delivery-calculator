import axios from "axios";
import { IDelivery, IResponse, SERVER_PORT } from "../helper";

export  const getDeliveryFee = async(feeData:IDelivery) => {
    const response = await axios.post(`${SERVER_PORT}/delivery`,feeData)
    const data:IResponse = await response.data

    return data
}
