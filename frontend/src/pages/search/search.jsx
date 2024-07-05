import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import useSearch from "../../hooks/useSearch";

const SearchUpdate = () => {
  const { users, loading, error, searchUsers } = useSearch();
  const [searchQuery, setSearchQuery] = useState({
    role: "",
    fullName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await searchUsers(searchQuery.role, searchQuery.fullName);
      toast.success("Search updated successfully!");
    } catch (error) {
      console.error("Error updating search:", error.message);
      toast.error("Failed to update search");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mr-4"
            >
              Role
            </label>
            <input
              type="text"
              name="role"
              id="role"
              value={searchQuery.role}
              onChange={handleChange}
              placeholder="Enter role..."
              className="flex-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mr-4"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={searchQuery.fullName}
              onChange={handleChange}
              placeholder="Enter full name..."
              className="flex-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-indigo-600"
          >
            <FaSearch className="inline mr-2" /> Update Search
          </button>
        </div>
      </form>

      {/* Display search results */}
      <div className="mt-8">
        {loading && <p className="text-gray-700">Loading...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {users.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Search Results</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user) => (
                <li
                  key={user._id}
                  className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
                >
                  <Link
                    to={`/profile/${user._id}`}
                    className="flex items-center space-x-4"
                  >
                    <div>
                      <img
                        className="h-24 w-24 rounded-full"
                        src={user?.profilePic}
                        alt="Profile"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{user.fullName}</h3>
                      <p className="text-gray-500">{user.role}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUpdate;
