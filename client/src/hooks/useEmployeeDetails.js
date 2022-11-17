import axios from "axios";
import { useEffect, useState } from "react";

export default function useEmployeeDetails(employeeId){
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState([]);

  useEffect(() => {
    async function fetchEmployeeDetails(){
      try {
        setError(false);
        setLoader(true);
        
        await axios.get(`../details/${employeeId}`).then(response => {
          setEmployeeDetails(response.data.result);
          setLoader(false);
        });
      } catch (err) {
        console.log(err);

        setLoader(false);
        setError(true);
      }
    }

    fetchEmployeeDetails();
  }, [employeeId]);

  return {
    loader,
    error,
    employeeDetails,
  }
}