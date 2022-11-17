import employeeRegistryImage from '../assets/images/employee.svg';
import Illustration from "../Illustration";

export default function Home() {
  return (
    <h1 style={{'textAlign': 'center'}}>
      An Employee Management System

      <Illustration height="250px" image={employeeRegistryImage} alt="Emplpyee Registry" />
    </h1>
  );
}