import React, { useState, useEffect } from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import { InviteIcon } from "../assets";

const ListContainer = ({ children }) => {
  return (
    <div className="user-list__container">
      <div className="user-list__header">
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
};

const UserItem = ({ user, setSelectedUsers }) => {
  const [selected, setSelected] = useState(false);

  const handleSelected = () => {
    if (selected) {
      setSelectedUsers((prevUsers) =>
        prevUsers.filter((prevUser) => prevUser !== user.id)
      );
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
    }
    setSelected((prev) => !prev);
  };
  return (
    <div className="user-item__wrapper" onClick={handleSelected}>
      <div className="user-item__name-wrapper">
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p className="user-item__name">{user.fullName || user.id}</p>
      </div>
      {selected ? <InviteIcon /> : <div className="user-item__invite-empty" />}
    </div>
  );
};

const UserList = ({ setSelectedUsers }) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      if (isLoading) return;
      setIsLoading(true);

      try {
        const response = await client.queryUsers(
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 8 }
        );

        if (response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        setError(true);
      }
      setIsLoading(false);
    };
    if (client) getUsers();
  }, []);

  if (error) {
    return (
      <ListContainer>
        <div className="user-list__message">
          Error loading, please refresh and try again.
        </div>
      </ListContainer>
    );
  }
  if (listEmpty) {
    return (
      <ListContainer>
        <div className="user-list__message">
          No users found.
        </div>
      </ListContainer>
    );
  }
  return (
    <ListContainer>
      {isLoading ? (
        <div className="user-list__message">Loading users...</div>
      ) : (
        users?.map((user, idx) => (
          <UserItem
            key={user.id}
            user={user}
            index={idx}
            setSelectedUsers={setSelectedUsers}
          />
        ))
      )}
    </ListContainer>
  );
};

export default UserList;
