import {FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS} from "../actions/categoryActions";


const initialState = {
    categories: [],
    fetchLoading: false,
    fetchError: null,
    singleLoading: false,
    singleError: null,
};

const categoriesReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_CATEGORIES_REQUEST:
            return {...state, fetchLoading: true};
        case FETCH_CATEGORIES_SUCCESS:
            return {...state, fetchLoading: false, categories: actions.payload};
        case FETCH_CATEGORIES_FAILURE:
            return {...state, fetchLoading: false, fetchError: actions.payload};
        default:
            return state;
    }
};

export default categoriesReducer;