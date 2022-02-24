import React, { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";

import { ResultsDropdown } from "./";
import { SearchIcon } from "../assets";

const ChannelSearch = ({ setToggleContainer }) => {
  const { client, setActiveChannel } = useChatContext();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);

  useEffect(() => {
    if (!query) {
      setTeamChannels([]);
      setDirectChannels([]);
    }
    console.log(directChannels)
  }, [query]);

  const getChannels = async (text) => {
    try {
      const channelResponse = client.queryChannels({
        type: "team",
        name: { $autocomplete: text },
        members: { $in: [client.userID] },
      });
      const userResponse = client.queryUsers({
        id: { $ne: client.userID },
        name: { $autocomplete: text },
      });

      const [channels, { users }] = await Promise.all([
        channelResponse,
        userResponse,
      ]);

      if (channels.length) setTeamChannels(channels);
      if (users.length) setDirectChannels(users);
      setIsLoading(false)
    } catch (error) {
      setQuery("");
     
    }
  };

  const onSearch = (event) => {
    event.preventDefault();

    setIsLoading(true);
    setQuery(event.target.value);
    getChannels(event.target.value);
  };

  const setChannel = (channel) => {
    setQuery("");
    setActiveChannel(channel);
  };

  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className="channel-serach__input__icon">
          <SearchIcon />
        </div>
        <input
          className="channel-search__input__text"
          placeholder="Search"
          type="text"
          value={query}
          onChange={onSearch}
        />
      </div>
      {query && (
        <ResultsDropdown
          teamChannels={teamChannels}
          directChannels={directChannels}
          isLoading={isLoading}
          setChannel={setChannel}
          setQuery={setQuery}
          setToggleContainer={setToggleContainer}
        />
      )}
    </div>
  );
};

export default ChannelSearch;
