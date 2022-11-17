import axios from "axios";
import { useEffect, useState } from "react";

export default function useEmployeeList(){
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchEmployees(){
      try {
        setError(false);
        setLoader(true);
        
        await axios.get('employees/list').then(response => {
          setEmployees(response.data.result);
          setLoader(false);
        });
      } catch (err) {
        console.log(err);

        setLoader(false);
        setError(true);
      }
    }

    fetchEmployees();
  }, []);

  return {
    loader,
    error,
    employees,
  }
}