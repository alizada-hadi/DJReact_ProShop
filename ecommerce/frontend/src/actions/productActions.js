import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL, 

    PRODUCT_DETAIL_FAIL, 
    PRODUCT_DETAIL_REQUEST, 
    PRODUCT_DETAIL_SUCCESS,

    PRODUCT_DELETE_REQUEST, 
    PRODUCT_DELETE_SUCCESS, 
    PRODUCT_DELETE_FAIL, 

    PRODUCT_CREATE_REQUEST, 
    PRODUCT_CREATE_SUCCESS, 
    PRODUCT_CREATE_FAIL
 } from '../constants/productConstants'

 import axios from 'axios'

export const listProducts = () => async (dispatch) => {
     try{
        dispatch({type: PRODUCT_LIST_REQUEST})
        const {data} = await axios.get("/api/products/")

        dispatch({type:PRODUCT_LIST_SUCCESS, payload: data})


     }catch(error){
        dispatch({
            type : PRODUCT_LIST_FAIL, 
            payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
     }
 }


 export const detailProduct = _id => async dispatch => {
    try{
      dispatch({
         type : PRODUCT_DETAIL_REQUEST
      })
      const {data} = await axios.get(`/api/product/${_id}/`)

      dispatch({
         type : PRODUCT_DETAIL_SUCCESS, 
         payload : data
      })
    }catch(error){
      dispatch({
         type : PRODUCT_DETAIL_FAIL, 
         payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
      })
    }
 }


 export const product_delete = id => async(dispatch, getState) => {
    try{
      dispatch({type : PRODUCT_DELETE_REQUEST})

      const {
         userLogin : {userInfo}
      } = getState()

      const  config = {
         headers : {
            "Content-type" : "application/json", 
            Authorization : `Bearer ${userInfo.token}`
         }
      }

      const {data} = await axios.delete(
         `/api/product/${id}/delete/`, 
         config
      )

      dispatch({
         type : PRODUCT_DELETE_SUCCESS, 
      })

      dispatch({
         type : PRODUCT_DETAIL_SUCCESS, 
         payload : data
      })
    }catch(error){
      dispatch({
         type : PRODUCT_DELETE_FAIL, 
         payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
      })
    }
 }


 export const createNewProduct = (name, brand, category, price, description) => async(dispatch, getState) => {
   try{
      dispatch({
         type : PRODUCT_CREATE_REQUEST
      })
      const {
         userLogin : {userInfo}
      } = getState()

      const config = {
         headers : {
            "Content-type" : "application/json", 
            Authorization : `Bearer ${userInfo.token}`
         }
      }

      const {data} = await axios.post(
         "/api/product/create/", 
         {name, brand, category,  price, description},
         config
      )

      dispatch({
         type : PRODUCT_CREATE_SUCCESS, 
         payload : data
      })
   }catch(error){
      dispatch({
         type : PRODUCT_CREATE_FAIL, 
         payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
      })
   }
 }