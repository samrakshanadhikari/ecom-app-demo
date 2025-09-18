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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(
        `http://localhost:3000/api/updateUser/${user._id}`,
        { username: userData.username },
        { headers: { Authorization: `${token}` } }
      );
      alert("Username updated successfully");
      setUser({ ...user, username: userData.username });
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update username");
    }
  };

  if (!user) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
      

        {/* Profile Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg mt-24 p-8">
          {/* Profile Picture */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0">
              <img
                className="w-40 h-40 rounded-full border-4 border-white shadow-md object-cover"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=60"
                alt="User"
              />
            </div>

            {/* User Info */}
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    className="w-full text-3xl font-bold text-gray-800 border rounded px-3 py-2"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setUserData({ username: user.username });
                      }}
                      className="bg-gray-400 text-white px-4 py-1.5 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <h2
                    className="text-3xl font-bold text-gray-900 cursor-pointer"
                    onClick={() => setIsEditing(true)}
                    title="Click to edit username"
                  >
                    {user.username}
                  </h2>
                  <p className="text-sm text-gray-600">Click name to edit</p>
                </div>
              )}

              <div className="mt-4 space-y-2">
                <p className="text-md text-gray-700">
                  <span className="font-medium">Email:</span> {user.email || 'Not available'}
                </p>
                <p className="text-md text-gray-700">
                  <span className="font-medium">User ID:</span> {user._id}
                </p>
                <p className="text-md text-gray-700">
                  <span className="font-medium">Account Created:</span>{' '}
                  {new Date(user.createdAt).toLocaleDateString() || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
