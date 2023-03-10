import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button} from "@mui/material";
import {deleteProductAction, fetchProduct} from "../../store/actions/productsActions";
import ProductItem from "../../components/ProductItem/ProductItem";

const Category = ({match}) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const loading = useSelector(state => state.products.singleLoading);

    useEffect(() => {
        dispatch(fetchProduct(match.params.id));
    }, [dispatch, match.params.id]);

    const deleteProduct = (id) => {
        dispatch(deleteProductAction(id))
    };

    return (
        <div>
            {loading
                ? <Box sx={{textAlign: 'center'}}>Loading ...</Box>
                : <>
                    {product && <ProductItem

                        username={product.user.username}
                        title={product.title}
                        description={product.description}
                        image={product.image}
                        price={product.price}
                    >
                    </ProductItem>
                    }
                    <Button
                        style={{textDecoration: 'none', padding: '5px 0 10px', display: 'flex', marginLeft: 'auto'}}
                        onClick={() => deleteProduct(product._id)}
                    >
                        Delete
                    </Button>
                </>
            }
        </div>
    );
};

export default Category;