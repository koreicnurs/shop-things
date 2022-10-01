import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box} from "@mui/material";
import {fetchProduct} from "../../store/actions/productsActions";
import ProductItem from "../../components/ProductItem/ProductItem";

const Product = ({match}) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.product);
    const loading = useSelector(state => state.products.singleLoading);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchProduct(match.params.id));
    }, [dispatch, match.params.id]);

    // let comment;

    // if (!user) {
    //     comment = null;
    // } else {
    //     comment = product && <FormComment
    //         postId={product._id}
    //         user={user._id}
    //     />
    // }

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
                    >
                    </ProductItem>
                    }

                </>
            }
        </div>
    );
};

export default Product;