import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../contexts/AuthContext';
import Form from "./Form";
import classes from './styles/Comment.module.css';
import TextInput from "./TextInput";

export default function Comments({commentAdditionalData}) {
  const [comment, setComment] = useState('');
  const [error, setError] = useState();
  const [loader, setLoader] = useState();

  const {currentUser} = useAuth();

  // handle signup on submit button click
  async function handleSubmit(e){
    e.preventDefault();

    if(!comment){
      return setError('Please input some comment !');
    }
    
    try {
      // remove error
      setError('');

      // show loader
      setLoader(true);
      
      const commentData = {
        commentAdditionalData,
        comment
      };
      
      await axios
        .post('../details/addComment', commentData)
        .then(response => console.log(response))
        .catch(err => console.log(err));

      // reload page
      window.location.reload();
    } catch (err) {
      console.log(err);

      // remove loader
      setLoader(false);

      // set error
      setError('Failed to add comment !');
    }
  }

  return(
    <Form onSubmit={handleSubmit} >
      <div className={classes.container}>
        <TextInput disabled={commentAdditionalData[1] === currentUser.data.id} type="text" placeholder={commentAdditionalData[1] === currentUser.data.id ? 'You cannot comment to yourself' : 'Input comment'} icon="comment" value={comment} onChange={(e) => setComment(e.target.value)} />

        {/* disable button after a click when loader is active */}
        <Button disabled={loader || commentAdditionalData[1] === currentUser.data.id} type='submit' variant='outline-primary'>Add</Button>
      </div>

      {error && <p className='error'>{error}</p>}
    </Form>
  );
};