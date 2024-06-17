import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './App.css';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Card from './components/Card';
import EditModal from './components/EditModal';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const CardMapping = [
  {
    name: 'Total Product',
    icon: <ShoppingCartOutlinedIcon />
  },
  {
    name: 'Total Store Value',
    icon: <CurrencyExchangeOutlinedIcon />
  },
  {
    name: 'Out of stocks',
    icon: <RemoveShoppingCartOutlinedIcon />
  },
  {
    name: 'No of Category',
    icon: <CategoryOutlinedIcon />
  }
]

const USER_TYPE = {
  ADMIN: 'admin',
  USER: 'user'
}

function App() {
  const [productData, setProductData] = useState([]);
  const [userType, setUserType] = useState(USER_TYPE.ADMIN);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct,setSelectedProduct] = useState({});

  const fetchInventoryData = async () => {
    try {
      const res = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        }
      );
      const responseData = await res.json();
      setProductData(responseData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchInventoryData();
  }, []);

  function parseCurrency(currencyString) {
    return Number(currencyString.replace(/[^0-9.-]+/g, ""));
  }

  const getTotalCount = (cardName) => {
    switch (cardName) {
      case 'Total Product':
        return productData.length;
      case 'Total Store Value':
        return productData.reduce((acc, curr) => acc + parseCurrency(curr.value), 0);
      case 'Out of stocks':
        return productData.filter(product => product.quantity === 0).length;
      case 'No of Category':
        return (new Set(productData.map(product => product.category))).size;
      default:
        return 0;
    }
  }

  const onProductDisable = (productName) => {
    const updatedProductData = productData.map(product => product.name === productName ? { ...product, disabled: product.disabled ? false : true } : product);
    setProductData(updatedProductData);
  }

  const onProductDelete = (productName) => {
    const updatedProductData = productData.filter(product => product.name !== productName);
    setProductData(updatedProductData);
  }

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSave = (updatedProduct) => {
    setProductData(prevProductData => prevProductData
      .map(product => product.name === updatedProduct.name ? updatedProduct : product));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {modalOpen && <EditModal open={modalOpen} onClose={handleClose} product={selectedProduct} onSave={handleSave} />}
      <div>
        <AppBar position="static" style={{ backgroundColor: '#161718', alignItems: 'flex-end' }}>
          <Box
            p={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>admin</Typography>
              <Switch
                onClick={() => {
                  setUserType(prevState => prevState === 'admin' ? USER_TYPE.USER : USER_TYPE.ADMIN)
                }}
              />
              <Typography>user</Typography>
              <Divider orientation="vertical" flexItem />
              <LogoutOutlinedIcon />
            </Stack>
          </Box>
        </AppBar>
        <Typography variant='h3' color={'#fff'} p={4}>Inventory stats</Typography>
        <Stack direction="row" p={4} spacing={2} flexWrap="wrap" justifyContent="space-between" alignItems="center" >
          {CardMapping.map(card => {
            return (
              <Card
                key={card.name}
                icon={card.icon}
                name={card.name}
                count={getTotalCount(card.name)}
              />
            )
          })}
        </Stack>
        <Box p={4}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Button size="medium" sx={{ margin: '8px 2px', color: '#c7db65', backgroundColor: '#161718', borderRadius: '8px' }}>
                      Name
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button size="medium" sx={{ margin: '8px 2px', color: '#c7db65', backgroundColor: '#161718', borderRadius: '8px' }}>
                      Category
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button size="medium" sx={{ margin: '8px 2px', color: '#c7db65', backgroundColor: '#161718', borderRadius: '8px' }}>
                      Price
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button size="medium" sx={{ margin: '8px 2px', color: '#c7db65', backgroundColor: '#161718', borderRadius: '8px' }}>
                      Quantity
                    </Button></TableCell>
                  <TableCell align="center">
                    <Button size="medium" sx={{ margin: '8px 2px', color: '#c7db65', backgroundColor: '#161718', borderRadius: '8px' }}>
                      Value
                    </Button></TableCell>
                  <TableCell align="center">
                    <Button size="medium" sx={{ margin: '8px 2px', color: '#c7db65', backgroundColor: '#161718', borderRadius: '8px' }}>
                      Action
                    </Button></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productData?.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">{row.value}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" justifyContent="center" spacing={1}>
                        <IconButton 
                        onClick={() => {handleOpen(); setSelectedProduct(row)}}
                        disabled={USER_TYPE.USER === userType || row.disabled}
                        >
                          <EditIcon color={USER_TYPE.USER === userType || row.disabled ? 'inherit' : 'success'  } />
                        </IconButton>
                        <IconButton
                          onClick={() => onProductDisable(row.name)}
                          disabled={USER_TYPE.USER === userType}>
                          {USER_TYPE.USER === userType || !row.disabled ? <RemoveRedEyeIcon style={{ color: USER_TYPE.USER !== userType? '#c597d4' : null}} /> : <VisibilityOffIcon style={{ color: USER_TYPE.USER !== userType?'#c597d4' : null }} />}
                        </IconButton>
                        <IconButton
                          onClick={() => onProductDelete(row.name)}
                          disabled={USER_TYPE.USER === userType || row.disabled}>
                          <DeleteIcon color={USER_TYPE.USER === userType || row.disabled ? 'inherit' : 'error'} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
