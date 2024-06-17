import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, DialogActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';

const currencyKey = [
  'value',
  'price'
]

const EditProductModal = ({ open, onClose, product, onSave }) => {
  const [formData, setFormData] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: currencyKey.includes[name] ? '$' + value : value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  function parseCurrency(currencyString) {
    return currencyString.length ? Number(currencyString.replace(/[^0-9.-]+/g, "")) : null;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant='h4' color={'#fff'}>Edit Product</Typography>
        <Typography variant='h6' color={'#fff'}>{product.name}</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Category"
              name="category"
              defaultValue={formData.category}
              value={formData.category}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Price"
              name="price"
              type="number"
              defaultValue={parseCurrency(formData.price)}
              value={parseCurrency(formData.price)}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              defaultValue={formData.quantity}
              value={formData.quantity}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>

            <TextField
              label="Value"
              name="value"
              type="number"
              defaultValue={parseCurrency(formData.value)}
              value={parseCurrency(formData.value)}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;
