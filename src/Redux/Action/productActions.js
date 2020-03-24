import Axios from "axios"
import { API_URL } from "../../Support/API_URL"

export const fetchProduct = () => {
    return(dispatch) => {
        dispatch({
            type : 'FETCH_DATA_START'
        })
        Axios.get(`${API_URL}/products`)
        .then((res) => {
            dispatch({
                type : 'FETCH_DATA_SUCCESS',
                payload : res.data
            })
        })
        .catch((err) => {
            dispatch({
                type : 'FETCH_DATA_FAILED'
            })
        })
    }
}

export const fetchDataById = (id) => {
    return(dispatch) => {
        dispatch({
            type : 'FETCH_DATA_START'
        })
        Axios.get(`${API_URL}/products/${id}`)
        .then((res) => {
            dispatch({
                type : 'FETCH_DATA_ID_SUCCESS',
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type : 'FETCH_DATA_FAILED'
            })
        })
    }
}