const initialState={
    foodItem:[]
}

export const rootReducer=(state=initialState,action)=>{
    switch(action.type){
        case "addtocart":return{
            ...state,
            foodItem:[...state.foodItem,action.payload]
        }
        case "deletecart":return{
            ...state,
            foodItem:state.foodItem.filter((item)=>item.id!==action.payload.id)
        }
        case "updatecart":return{
            ...state,
            foodItem:[...state.foodItem,action.payload]
        }
        default : return state
    }
}