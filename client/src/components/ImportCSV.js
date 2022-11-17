import axios from 'axios';
import _ from 'lodash';
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import classes from './styles/CSV.module.css';

function ImportCSV() {
  const [file, setFile] = useState();
  const [employeeData, setEmployeeData] = useState([]);
  const fileReader = new FileReader();

  // Get the CSV
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Convert string to array
  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf('\n')).split(',');
    const csvRows = string.slice(string.indexOf('\n') + 1).split('\n');

    // Extract employee data from strings
    const extractedData = csvRows.map(i => {
      const values = i.split(',');

      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});

      return obj;
    });

    setEmployeeData(extractedData);
  };

  // Handle submit
  const handleImport = () => {
    if(file) {
      fileReader.onload = event => {
        // Fetch all data as string
        const string = event.target.result;

        // Pass string to array converter
        csvFileToArray(string);
      };

      fileReader.readAsText(file);
    }
  };

  // Check if the employee data has been processed from CSV to array
  if(employeeData.length > 0){
    // Store the proceesed data
    async function storeEmployeeData() {
      const employeeArr = [];

      employeeData.forEach(item => {
        let employeeObj = {};
        let address = '';

        // Simplify the object data and store to array
        Object.keys(item)[0].split(';').forEach((val, indx) => {
          if(Object.values(item)[0]){
            if(val === 'Vorname')
              employeeObj['fname'] = Object.values(item)[0].split(';')[indx];
            else if(val === 'Nachname')
              employeeObj['lname'] = Object.values(item)[0].split(';')[indx];
            else if(val.replace(/\r/g, '') === 'Rolle')
              employeeObj['role'] = Object.values(item)[0].split(';')[indx].replace(/\r/g, ''); 
            else
              employeeObj['address'] = address += `${val}: ${Object.values(item)[0].split(';')[indx]}; `;

            employeeObj['username'] = `${_.lowerCase(employeeObj['fname'])}01`; // set temporary username
            employeeObj['email'] = `${_.lowerCase(employeeObj['fname'])}01@email.com`; // set temporary email
          }
        });

        if(_.size(employeeObj) > 0) employeeArr.push(employeeObj);
      });

      const importedCSV = {
        'importedCSV': employeeArr
      };

      // Send employee data
      await axios
        .post('employees/addMultiple', importedCSV)
        .then(response => console.log(response))
        .catch(err => console.log(err));

      window.location.reload();
    }

    storeEmployeeData();
  }

  return (
    <div className={classes.container}>
      <input type="file" accept=".csv" onChange={handleChange}/>
      
      <Button variant='outline-success' onClick={() => handleImport()}>Import</Button>
    </div>
  );
}

export default ImportCSV;
