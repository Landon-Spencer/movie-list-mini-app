import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'gray',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function AddMovie({addedMovie, setAddedMovie}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({})
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    formData.user_added = true;
    console.log(formData);
    try {
      const response = await fetch(`http://localhost:8080/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      alert(responseData);
      setOpen(false);
      setAddedMovie(!addedMovie);
    } catch (error) {
      console.error('Error:', error);
      alert('Error:' + error);
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>Add Movie</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        >
        <Box id="add-movie-box" sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Add a Movie</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          {/* <SubmitModal /> */}
        </Box>
      </Modal>
    </div>
  );
}