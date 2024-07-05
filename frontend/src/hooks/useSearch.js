import { useState } from "react";
import axios from "axios";

const useSearch = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchUsers = async (role, fullName) => {
    setLoading(true);
    try {
      const queryParams = {};
      if (role && role !== "ALL") {
        queryParams.role = role;
      }
      if (fullName) {
        queryParams.fullName = fullName;
      }
      console.log("quey",queryParams);

      const response = await axios.get("/api/search", {
        params: queryParams,
      });

      setUsers(response.data);
      console.log("response",response.data);
    } catch (error) {
      setError(error.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error, searchUsers };
};

export default useSearch;
