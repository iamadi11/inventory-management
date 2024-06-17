import React from 'react';
import './card.css';


import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


const CardUI = (props) => {
    const { icon, name, count } = props;
    return (
        <Card
            sx={{ maxWidth: 400, minWidth: 300 }}
            style={{ background: '#243322', color: '#fff', borderRadius: '8px' }}>
            <Grid container>
                <Grid item xs={2}>
                    <div className='icon-grid'>
                        {icon}
                    </div>
                </Grid>
                <Grid item xs={10}>
                    <div className='product-grid'>
                        <Typography gutterBottom variant="caption" component="div">
                            {name}
                        </Typography>
                        <Typography gutterBottom variant="h4" component="div">
                            {count}
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </Card>
    )
}

CardUI.defaultProps = {
    icon: <ShoppingCartOutlinedIcon />,
    name: '',
    count: 0,
}

export default CardUI;