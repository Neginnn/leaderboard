import React, { useEffect, useState } from "react";
import axios from "axios";
import { LeaderboardStyles } from "./styles";

interface User {
  id?: number;
  name: string;
  age: number;
  points: number;
  address: string;
}

export const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("http://localhost:5050/users", { signal: controller.signal })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        if (error.name !== "CanceledError") {
          console.error("Error fetching users:", error);
        }
      });

    return () => controller.abort(); // Cleanup function
  }, []);

  const updatePoints = (id: number, change: number) => {
    setUsers((prev) => {
      const updatedUsers = prev.map((user) =>
        user.id === id ? { ...user, points: user.points + change } : user
      );
      return [...updatedUsers].sort((a, b) => b.points - a.points); // Sort properly
    });
  };

  const sortUsers = (users: User[]) => {
    if (sortConfig) {
      return [...users].sort((a, b) => {
        if (sortConfig.key === "name") {
          return sortConfig.direction === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (sortConfig.key === "points") {
          return sortConfig.direction === "asc"
            ? a.points - b.points
            : b.points - a.points;
        }
        return 0;
      });
    }
    return users;
  };

  const addUser = () => {
    const userInput = prompt(
      "Enter user's name, age, and address (comma-separated):\nExample: John Doe, 25, 123 Main St"
    );

    if (!userInput) return;

    const [newName, newAge, newAddress] = userInput
      .split(",")
      .map((item) => item.trim());

    if (!newName) {
      alert("Name is required.");
      return;
    }

    const ageNumber = parseInt(newAge);
    if (isNaN(ageNumber)) {
      alert("Age must be a valid number.");
      return;
    }

    const newUser: User = {
      name: newName,
      age: ageNumber,
      points: 0,
      address: newAddress || "Unknown",
    };

    axios
      .post("http://localhost:5050/users", newUser)
      .then((res) => {
        setUsers((prevUsers) => sortUsers([...prevUsers, res.data])); // Sort after adding the new user
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while adding the user.");
      });
  };

  const deleteUser = (id: number) => {
    axios
      .delete(`http://localhost:5050/users/${id}`)
      .then(() => {
        // After successful deletion, update the users in the state without resetting points
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the user:", error);
        alert("An error occurred while deleting the user.");
      });
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortUsersByColumn = (key: keyof User) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    setUsers((prevUsers) =>
      [...prevUsers].sort((a, b) => {
        if (key === "name") {
          return direction === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (key === "points") {
          return direction === "asc"
            ? a.points - b.points
            : b.points - a.points;
        }
        return 0;
      })
    );
  };

  return (
    <LeaderboardStyles>
      <input
        type="text"
        placeholder="Search..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <div
            className={`leaderboard-header-item ${
              sortConfig?.key === "name"
                ? `sorting ${sortConfig.direction}`
                : ""
            }`}
            onClick={() => sortUsersByColumn("name")}
          >
            Name
          </div>
          <div
            className={`leaderboard-header-item ${
              sortConfig?.key === "points"
                ? `sorting ${sortConfig.direction}`
                : ""
            }`}
            onClick={() => sortUsersByColumn("points")}
          >
            Points
          </div>
          <div className="leaderboard-header-item">Actions</div>
        </div>

        <div className="leaderboard-body">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`leaderboard-row ${
                selectedUser?.id === user.id ? "selected" : ""
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="leaderboard-item">{user.name}</div>
              <div className="leaderboard-item">{user.points} pts</div>
              <div className="leaderboard-actions">
                <div className="points-buttons">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (user.id) {
                        updatePoints(user.id, 1);
                      }
                    }}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (user.id) {
                        updatePoints(user.id, -1);
                      }
                    }}
                  >
                    -
                  </button>
                </div>
                <button
                  type="button"
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (user.id) {
                      deleteUser(user.id);
                    }
                  }}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button type="button" className="" onClick={addUser}>
        + Add User
      </button>

      {selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-header">User Details</h3>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Age:</strong> {selectedUser.age}
            </p>
            <p>
              <strong>Points:</strong> {selectedUser.points}
            </p>
            <p>
              <strong>Address:</strong> {selectedUser.address}
            </p>
            <button type="button" onClick={() => setSelectedUser(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </LeaderboardStyles>
  );
};
