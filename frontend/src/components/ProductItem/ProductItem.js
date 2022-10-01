import React from 'react';
import { Card, CardContent, CardHeader, CardMedia, Grid, Typography} from "@mui/material";
import {apiUrl} from "../../config";

const ProductItem = ({children, username, title, description, price, image}) => {

    let cardImage;

    if (!isNaN(image) ) {
        cardImage = null;
    } else {
        cardImage = apiUrl + '/' + image;
    }

    return (
        <Grid item xs={12}>
            <Card sx={{height: '100%', padding: '0 15px'}}>
                <CardHeader title={username} sx={{textTransform: "capitalize"}}/>
                <CardMedia
                    title={title}
                    image={cardImage}
                    sx={{paddingTop: '15%', maxWidth: '15%', height: 0}}
                />
                <CardContent>
                    <Typography variant={"h6"}>
                        {title}
                    </Typography>
                    <Typography>
                        {description}
                    </Typography>
                    <Typography style={{fontWeight: "bold", fontSize: '14px' }}>
                        <small>Price: {price}</small>
                    </Typography>

                    {children}
                </CardContent>


            </Card>
        </Grid>
    );
};

export default ProductItem;