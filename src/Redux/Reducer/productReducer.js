const INITIAL_STATE = {
    productList : [],
    brands: [],
    loading : false,
    error : '',
    productById : {}
}

export const productReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'FETCH_DATA_START' :
            return{
                ...state,
                loading: true
            }
        case 'FETCH_DATA_SUCCESS' : 
            return{
                ...state,
                productList : action.payload,
                loading: false
            }
        case 'FETCH_DATA_ID_SUCCESS' : 
            return{
                ...state,
                productById : action.payload,
                loading : false
            }
        case 'FETCH_DATA_FAILED' : 
            return{
                ...state,
                error : action.payload,
                loading : false
            }
        default : 
            return state
    }
}