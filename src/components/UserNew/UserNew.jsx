import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

function UserNew({ isOpen, onCancel, onSave }) {
  const [newUser, setNewUser] = useState({
    name: "",
    job: "",
    age: "",
    hobby: "",
  });

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleSaveNewUser = async () => {
    try {
      await axios.post("http://localhost:5000/api/people", newUser);

      setNewUser({
        name: "",
        job: "",
        age: "",
        hobby: "",
      });

      onSave();
    } catch (error) {
      console.error("Error adding a new user:", error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={onCancel} contentLabel="Add User">
        <h2>Add User</h2>
        <form onSubmit={handleSaveNewUser}>
          {" "}
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleFieldChange}
            />
          </div>
          <div>
            <label>Job:</label>
            <input
              type="text"
              name="job"
              value={newUser.job}
              onChange={handleFieldChange}
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={newUser.age}
              onChange={handleFieldChange}
            />
          </div>
          <div>
            <label>Hobby:</label>
            <input
              type="text"
              name="hobby"
              value={newUser.hobby}
              onChange={handleFieldChange}
            />
          </div>
          <div>
            <button type="submit">Insert new user</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default UserNew;
