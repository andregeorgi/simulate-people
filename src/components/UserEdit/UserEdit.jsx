import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

function UserEdit({ isOpen, user, onCancel, onSave }) {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleSave = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.put(
        `http://localhost:5000/api/people/${editedUser._id}`,
        editedUser,
        config
      );

      console.log("User data updated successfully");

      onSave(editedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onCancel} contentLabel="Edit User">
      <h2>Edit User</h2>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label>Job:</label>
          <input
            type="text"
            name="job"
            value={editedUser.job}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={editedUser.age}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label>Hobby:</label>
          <input
            type="text"
            name="hobby"
            value={editedUser.hobby}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

export default UserEdit;
