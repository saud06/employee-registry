import axios from "axios";
import { useEffect, useState } from "react";

export default function useComments(employeeId){
  const [commentLoader, setCommentLoader] = useState(true);
  const [commentError, setCommentError] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments(){
      try {
        setCommentError(false);
        setCommentLoader(true);

        await axios.get(`../details/commentList/${employeeId}`).then(response => {
          setComments(response.data.result);
          setCommentLoader(false);
        });
      } catch (err) {
        console.log(err);

        setCommentLoader(false);
        setCommentError(true);
      }
    }

    fetchComments();
  }, [employeeId]);

  return {
    commentLoader,
    commentError,
    comments,
  }
}