
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../../../globals/components/navbar/Navbar';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get("http://localhost:3000/api/profile", {
          headers: { Authorization: `${token}` }
        });
        setUser(response.data.data);
        setUserData({ username: response.data.data.username });
      } catch (err) {
        console.log("Error on fetching the data");
      }
    };

    fetchUserProfile();
  }, []);

  // Generic handleChange for any input with name attribute
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(
        `http://localhost:3000/api/updateUser/${user._id}`,
        { username: userData.username }, // send updated username
        { headers: { Authorization: `${token}` } }
      );
      alert("Username updated successfully");
      setUser({ ...user, username: userData.username });
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update username");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg overflow-hidden">
          {/* Banner */}
          <div className="h-36 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=600&q=60"
              alt="Profile banner"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Image */}
          <div className="flex justify-center -mt-16">
            <img
              className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=60"
              alt="User profile"
            />
          </div>

          {/* User Info */}
          <div className="text-center px-6 py-4">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  className="border rounded p-1 text-center text-2xl font-bold"
                  autoFocus
                />
                <div className="mt-2 space-x-2">
                  <button
                    onClick={handleUpdate}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setUserData({ username: user.username });
                    }}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2
                  className="text-2xl font-bold text-gray-800 cursor-pointer"
                  onClick={() => setIsEditing(true)}
                  title="Click to edit"
                >
                  {user.username}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{user.email || 'No email available'}</p>
              </>
            )}
          </div>
        </div>
      </div>

    </>




  );
};

export default Profile;
