import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import FileInput from "../UI/Form/FileInput/FileInput";
import {Alert, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {clearErrors, createProduct} from "../../store/actions/productsActions";
import {fetchCategories} from "../../store/actions/categoryActions";

const AddProductForm = () => {
    const user = useSelector(state => state.users.user);
    const error = useSelector(state => state.products.fetchError);
    const categories = useSelector(state => state.categories.categories);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        title: '',
        description: '',
        price: Number(''),
        category: '',
        image: '',
    });

    useEffect(() => {
        dispatch(fetchCategories());
        return () => {
            dispatch(clearErrors());
        }
    }, [dispatch]);

    if (!user) {
        return <Redirect to="/login"/>
    }

    const submitFormHandler = async e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(state).forEach(key => {
            formData.append(key, state[key]);
        });
        await dispatch(createProduct(formData))
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
        console.log(state.category);
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setState(prevState => ({...prevState, [name]: file}));
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
            style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '60%',
                margin: '50px auto'
            }}
        >
            {error && (
                <Alert severity="error" sx={{marginBottom: '20px'}}>
                    Error! {error}
                </Alert>
            )}
            <TextField
                label="Title"
                name="title"
                required
                sx={{marginBottom: '30px'}}
                value={state.title}
                onChange={inputChangeHandler}
            />
            <TextField
                required
                multiline
                rows={3}
                sx={{marginBottom: '30px'}}
                label="Description"
                name="description"
                value={state.description}
                onChange={inputChangeHandler}
            />
            <TextField
                multiline
                required
                rows={3}
                sx={{marginBottom: '30px'}}
                label="Price"
                name="price"
                value={state.price}
                onChange={inputChangeHandler}
            />
                <select
                    name="category"
                    onChange={inputChangeHandler}
                    value={state.category}
                    style={{padding: "10px", marginBottom: "20px"}}
                >
                    {categories.map(c => {
                        return <option value={c._id}>{c.title}</option>
                    })}
                </select>
            <FileInput
                required
                label="Image"
                name="image"
                onChange={fileChangeHandler}
            />
            <Button
                type="submit"
                color="primary"
                sx={{marginTop: '30px', bgcolor: '#012952'}}
                variant="contained">Add Product
            </Button>
        </form>
    );
};

export default AddProductForm;