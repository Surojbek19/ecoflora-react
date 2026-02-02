import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularProducts from "./PopularProducts";
import NewProducts from "./NewProducts";
import Advertisement from "./Advertisement";
import Events from "./Events";
import ActiveUsers from "./ActiveUsers";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewProducts, setP, setTopUsers } from "./slice";
import { Product } from "../../../lib/data/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/data/enums/product.enum";
import { Member } from "../../../lib/data/types/member";
import MemberService from "../../services/MemberService";
import "../../../css/home.css"

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setP: (data: Product[]) => dispatch(setP(data)),
  setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});




export default function HomePage() {
  const { setP, setNewProducts, setTopUsers } = actionDispatch(useDispatch());

  console.log(process.env.REACT_APP_API_URL)

  useEffect(() => {
    // Backend server data request => Data 
    const product = new ProductService();
    product.getProducts({
      page: 1,
      limit: 4,
      order: "productViews",
      productCollection: ProductCollection.INDOOR,
    })
      .then(
        data => setP(data))
      .catch((err) => console.log("Error:", err))

    product.getProducts({
      page: 1,
      limit: 4,
      order: "createdAt",
      // productCollection: ProductCollection.INDOOR,
    })
      .then(
        data => setNewProducts(data))
      .catch((err) => console.log("Error:", err))

    const member = new MemberService();
    member.getTopUsers()
      .then(
        data => setTopUsers(data))
      .catch((err) => console.log("Error:", err))

  }, [])


  return <div className={"homepage"}>
    <Statistics />
    <PopularProducts />
    <NewProducts />
    <Advertisement />
    <ActiveUsers />
    <Events />
  </div>
}



