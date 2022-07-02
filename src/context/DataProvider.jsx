import { createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatusApi } from "../components/helpers/apiCalls";

export const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [errors, setErrors] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const employeesApi = await response.json();
      // console.log({employeesApi});
      setEmployees(employeesApi);

      response = await fetch(`${process.env.REACT_APP_API_URL}/courses`);
      const coursesApi = await response.json();
      setCourses(coursesApi);

      response = await fetch(`${process.env.REACT_APP_API_URL}/teachers`)
      const teachersApi= await response.json();
      setTeachers(teachersApi);

      response = await fetch(`${process.env.REACT_APP_API}/users`);
      const usersApi = await response.json();
      setUser(usersApi);
    };
    fetchData();

    const checkAuthStatus = async () => {
      const result = await checkAuthStatusApi();
      if (!result.error) {
        setUser(result);
      }
    };
    checkAuthStatus();
  }, []);

  const sharedData = {
    employees,
    setEmployees,
    courses,
    setCourses,
    user,
    setUser,
    teachers, 
    setTeachers,
    errors,
    setErrors,
  };

  return (
    <DataContext.Provider value={sharedData}>{children}</DataContext.Provider>
  );
};
