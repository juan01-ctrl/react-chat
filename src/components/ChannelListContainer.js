import React, { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";

import logo from "../assets/logo-chat.svg";
import logoutIcon from "../assets/logout-icon.svg";

const cookies = new Cookies();

const SideBar = ({ logout }) => {
  return (
    <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__icon1">
        <div className="icon1__inner">
          <img src={logo} alt="logo" width="30" />
        </div>
      </div>
      <div className="channel-list__sidebar__icon2">
        <div className="icon2__inner">
          <img src={logoutIcon} alt="logout" width="30" onClick={logout} />
        </div>
      </div>
    </div>
  );
};

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Web Chat</p>
  </div>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};
const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const ChannelListContent = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}) => {
  const { client } = useChatContext();

  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("token");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    window.location.reload();
  };

  const filters = { members: { $in: [client.userID] } };
  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setToggleContainer={setToggleContainer}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              type="team"
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setToggleContainer={setToggleContainer}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  );
};

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      </div>

      <div
        className="channel-list__container-responsive"
        style={{
          left: toggleContainer ? "0%" : "-89%",
          backgroundColor: "#005fff",
        }}
      >
        <div
          className="channel-list__container-toggle"
          onClick={() => setToggleContainer((prev) => !prev)}
        ></div>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </>
  );
};
export default ChannelListContainer;
