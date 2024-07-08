import React, { useState } from 'react';
import './write.css';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

function Write() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send binary data (file) and text data (title, description)
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      // Send POST request to backend to save the post
      await axios.post('http://localhost:8080/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Redirect or navigate to the home page after successful post creation
      window.location.replace('/'); // Example: Redirect to the home page
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <div className='write'>
      {file && (
        <img
          className='writeImg'
          src={URL.createObjectURL(file)}
          alt="Selected"
        />
      )}
      <form className='writeForm' onSubmit={handleSubmit}>
        <div className='writeFormGroup'>
          <label htmlFor='fileInput'>
            <i className='writeIcon'>
              <AddIcon />
            </i>
          </label>
          <input
            type='file'
            id='fileInput'
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <input
            type='text'
            placeholder='Title'
            className='writeInput'
            autoFocus={true}
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder='Tell Your story...'
            type="text"
            className='writeInput writeText'
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <button className='writeSubmit' type='submit'>Publish</button>
      </form>
    </div>
  );
}

export default Write;
