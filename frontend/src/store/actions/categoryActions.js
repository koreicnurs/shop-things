import axiosApi from "../../axiosApi";

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

const fetchProductsRequest = () => ({type: FETCH_CATEGORIES_REQUEST});
const fetchProductsSuccess = categories => ({type: FETCH_CATEGORIES_SUCCESS, payload: categories});
const fetchProductsFailure = error => ({type: FETCH_CATEGORIES_FAILURE, payload: error});

export const fetchCategories = () => {
    return async dispatch => {
        try {
            dispatch(fetchProductsRequest());
            const response = await axiosApi('/category');
            dispatch(fetchProductsSuccess(response.data));
        } catch (e) {
            dispatch(fetchProductsFailure(e.message));
        }
    }
};
