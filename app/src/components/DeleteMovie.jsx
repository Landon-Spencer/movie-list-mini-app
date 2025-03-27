import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   wth: 400,
//   bgcolor: 'gray',
//   border: '2px sol #000',
//   boxShadow: 24,
//   pt: 2,
//   px: 4,
//   pb: 3,
// };


export default function Delete({movie, addedMovie, setAddedMovie}) {

  const handleDelete = async (event) => {
    event.preventDefault();
    console.log(movie.id);
    try {
      const response = await fetch(`http://localhost:8080/movies/${movie.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      alert(responseData);
      setAddedMovie(!addedMovie);
    } catch (error) {
      console.error('Error:', error);
      alert('Error:' + error);
    }
  }

  return (
    <DeleteIcon onClick={handleDelete}/>
  )
}