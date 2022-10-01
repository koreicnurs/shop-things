import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import ProductItem from "../../components/ProductItem/ProductItem";
import {fetchProducts} from "../../store/actions/productsActions";

const Products = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.products.fetchLoading);
    const products = useSelector(state => state.products.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (<Grid container direction="column" spacing={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h5">
                        Products
                    </Typography>
                </Grid>
            </Grid>
            {loading ? <Box sx={{textAlign: 'center'}}>Loading ...</Box> : <Grid item container spacing={3}>
                {products.map(p => (<ProductItem
                        key={p._id}
                        title={p.title}
                        description={p.description}
                        username={p.user.username}
                        image={p.image}
                        price={p.price}
                    >
                        <Button
                            component={Link}
                            style={{textDecoration: 'none', padding: '5px 0 10px'}}
                            to={`products/${p._id}`}
                        >
                            Read more
                        </Button>
                    </ProductItem>))}
            </Grid>}
        </Grid>);
};

export default Products;