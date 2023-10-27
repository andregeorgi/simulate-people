import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import UserEdit from "./components/UserEdit/UserEdit";
import UserNew from "./components/UserNew/UserNew";

function App() {
  const [items, setItems] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleEditUser = (user) => {
    setEditingUser(user);
    setOpenModal(true);
  };

  const handleNewPeople = () => {
    setOpenModal(true);
  };

  const handleSaveUser = async (editedUser) => {
    try {
      await axios.put(
        `http://localhost:5000/api/people/${editedUser._id}`,
        editedUser
      );

      setOpenModal(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/people/${userId}`);
      setItems(items.filter((item) => item._id !== userId));
    } catch (error) {
      console.error("There was an error deleting the user!", error);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const refreshUserList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/people");
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveAndCloseModal = () => {
    refreshUserList();
    setOpenModal(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/people")
      .then((response) => setItems(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App-header">
      <h1>People</h1>
      <button onClick={handleNewPeople}>Add new people</button>

      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Age</th>
            <th>Hobby</th>
            <th></th>
          </tr>
          {items.map((item) => (
            <tr key={item._id}>
              <th>{item.name}</th>
              <th>{item.job}</th>
              <th>{item.age}</th>
              <th>{item.hobby}</th>
              <th>
                <button onClick={() => handleEditUser(item)}>Edit</button>
                <button onClick={() => handleDeleteUser(item._id)}>
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>

      {openModal && editingUser && (
        <UserEdit
          isOpen={openModal}
          user={editingUser}
          onCancel={handleCancel}
          onSave={handleSaveUser}
        />
      )}

      <UserNew
        isOpen={openModal}
        onCancel={handleCancel} // make sure handleCancel sets openModal to false
        onSave={handleSaveAndCloseModal} // this is the new function that closes the modal and refreshes the list
      />
    </div>
  );
}

export default App;
