import {
    CLEAR_ERRORS,
    CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCTS_FAILURE,
    FETCH_PRODUCT_FAILURE,
    FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS
} from "../actions/productsActions";


const initialState = {
    products: [],
    product: null,
    fetchLoading: false,
    fetchError: null,
    singleLoading: false,
    singleError: null,
};

const productsReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {...state, fetchLoading: true};
        case FETCH_PRODUCTS_SUCCESS:
            return {...state, fetchLoading: false, products: actions.payload};
        case FETCH_PRODUCTS_FAILURE:
            return {...state, fetchLoading: false, fetchError: actions.payload};

        case FETCH_PRODUCT_REQUEST:
            return {...state, singleLoading: true};
        case FETCH_PRODUCT_SUCCESS:
            return {...state, singleLoading: false, product: actions.payload};
        case FETCH_PRODUCT_FAILURE:
            return {...state, singleLoading: false, singleError: actions.payload};

        case CREATE_PRODUCT_REQUEST:
            return {...state, fetchLoading: true};
        case CREATE_PRODUCT_SUCCESS:
            return {...state, fetchLoading: false};
        case CREATE_PRODUCTS_FAILURE:
            return { ...state, fetchLoading: false, fetchError: actions.payload };

        case CLEAR_ERRORS:
            return { ...state, fetchError: null };
        default:
            return state;
    }
};

export default productsReducer;