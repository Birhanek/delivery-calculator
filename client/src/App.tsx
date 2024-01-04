import React, { FormEvent, useState } from "react";
import "./App.css";
import { getDeliveryFee } from "./services/services";
import moment from "moment";

function App() {
  const background = "images/fee-calculator-1.jpg";
  const [cartValue, setCartValue] = useState<number>(0);
  const [delivery_distance, setDeliveryDistance] = useState<number>(0);
  const [number_of_items, setItems] = useState<number>(0);
  const [time, setWhen] = useState<string>(moment().format('YYYY-MM-DD hh:mm'));
  const [isResult, setIsResult] = useState<boolean>(false);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);

  const handleCartValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCartValue(parseInt(event.target.value));
  };
  const handleDeliveryDistance = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryDistance(parseInt(event.target.value));
  };
  const handleCountItems = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItems(parseInt(event.target.value));
  };
  const handleWhen = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWhen(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formHandle = {
      cartValue,
      delivery_distance,
      number_of_items,
      time,
    };
    const response = await getDeliveryFee(formHandle);
    if (response.isOk) {
      setIsResult(true);
      setDeliveryFee(response.delivery_fee);
    }
  };
  const handleNew = () => {
    setCartValue(0);
    setDeliveryDistance(0);
    setItems(0);
    setWhen(moment().format('YYYY-MM-DD hh:mm'));
    setIsResult(false);
  };
  return (
    <div
      className="flex items-center justify-center w-full h-full p-4 bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/*<span className="text-orange-600 material-symbols-outlined">check_box</span>
      <span className="text-blue-700 material-symbols-outlined">more_vert</span>
      <span className="text-green-700 material-symbols-outlined">nightlight_round</span>
      <span className="text-red-600 material-symbols-outlined">view_headline</span>
  <span className="text-orange-400 material-symbols-outlined">vital_signs</span>*/}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-1/2 gap-2 p-2 border rounded-md bg-gradient-to-r from-slate-200 to-blue-100"
      >
        <h1 className="text-2xl font-bold text-center text-transparent bg-gradient-to-r from-indigo-700 to-pink-700 bg-clip-text">
          Delivery Fee Calculator
          {isResult ? (
            <button
              onClick={() => handleNew()}
              className="h-full px-4 ml-6 text-gray-700 bg-yellow-400 rounded-sm hover:bg-blue-500 hover:text-gray-100"
            >
              New
            </button>
          ) : (
            <></>
          )}
        </h1>
        <label htmlFor="cartValue" className="block">
          <span className="block text-sm font-medium text-slate-700">
            Cart Value
          </span>
          <input
            type="number"
            required
            name="cartValue"
            id="cartValue"
            className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm peer border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            value={cartValue}
            onChange={(event) => handleCartValue(event)}
          />
          <p className="invisible mt-2 text-sm text-pink-600 peer-invalid:visible">
            Please provide a total cost of the cart.
          </p>
        </label>
        <label htmlFor="distance" className="block">
          <span className="block text-sm font-medium text-slate-700">
            Delivery Distance
          </span>
          <input
            type="number"
            required
            name="distance"
            id="distance"
            className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm peer border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            value={delivery_distance}
            onChange={(event) => handleDeliveryDistance(event)}
          />
          <p className="invisible mt-2 text-sm text-pink-600 peer-invalid:visible">
            Please provide a total distance to cover.
          </p>
        </label>
        <label htmlFor="items" className="block">
          <span className="block text-sm font-medium text-slate-700">
            Number of Items
          </span>
          <input
            type="number"
            required
            name="items"
            id="items"
            className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm peer border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            value={number_of_items}
            onChange={(event) => handleCountItems(event)}
          />
          <p className="invisible mt-2 text-sm text-pink-600 peer-invalid:visible">
            Please provide a total number of items.
          </p>
        </label>

        <label htmlFor="when" className="block">
          <span className="block text-sm font-medium text-slate-700">When</span>
          <input
            type="datetime-local"
            required
            name="when"
            id="when"
            className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            value={time}
            onChange={(event) => handleWhen(event)}
          />
        </label>
        {isResult ? (
          <label className="text-lg italic text-rose-800">
            Delivery Fee ={" "}
            {deliveryFee.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </label>
        ) : (
          <></>
        )}
        <button
          type="submit"
          className="inline-block w-1/2 p-2 text-center rounded-md cursor-pointer text-slate-300 bg-blue-950 hover:bg-gradient-to-r hover:from-pink-700 hover:to-orange-800"
        >
          Calculate
        </button>
      </form>
    </div>
  );
}

export default App;
