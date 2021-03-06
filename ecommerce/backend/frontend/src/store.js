import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    productListReducer, 
    productDetailReducer, 
    productDeleteReducer, 
    productCreateReducer,
    productUpdateReducer, 
    productCreateReviewReducer, 
    productTopReducer

} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userUpdateReducer, userRegisterReducer, userDetailReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer } from './reducers/userReducers'
import { 
    orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer, 
    myOrderListReducer, 
    orderListReducer 

} from './reducers/orderReducers'


const reducer = combineReducers({
    productList : productListReducer, 
    productDetail : productDetailReducer, 
    productDelete : productDeleteReducer, 
    productCreate : productCreateReducer,
    productUpdate : productUpdateReducer,
    productCreateReview : productCreateReviewReducer,
    topProducts : productTopReducer,  
    cart : cartReducer, 
    userLogin : userLoginReducer, 
    userRegister : userRegisterReducer, 
    userDetails : userDetailReducer, 
    userUpdate : userUpdateProfileReducer, 
    updateUser : userUpdateReducer, 
    userList : userListReducer,
    userDelete : userDeleteReducer, 
    orderCreate : orderCreateReducer, 
    orderDetails : orderDetailsReducer, 
    orderPay : orderPayReducer, 
    myOrderList : myOrderListReducer, 
    orderList : orderListReducer
})

const cartItemsFromStorage = localStorage.getItem("cartItems") ?
        JSON.parse(localStorage.getItem("cartItems")) :
        []



const userInfoFromStorage = localStorage.getItem("userInfo") ? 
    JSON.parse(localStorage.getItem("userInfo")) : null

const shippingAddressFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {}

const initialState = {
    cart:{
        cartItems : cartItemsFromStorage, 
        shippingAddress : shippingAddressFromStorage
    }, 
    userLogin : {userInfo : userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store