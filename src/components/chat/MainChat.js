import React, { useEffect } from "react";
import {
  ChatEngine,
  ChatEngineWrapper,
  ChatFeed,
  ChatSocket,
  ChatCard,
  NewMessageForm,
  ChatSettings,
  PeopleSettings,
} from "react-chat-engine";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, userSelector } from "../../state/user/userSlice";

function MainChat(props) {
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
    dispatch(fetchUserById(localStorage.getItem("user_id")));
  }, []);

  return (
    <ChatEngineWrapper>
      <ChatSocket
        projectID="0535de57-3586-4aed-a156-edc6c4912ef6"
        chatID="64264"
        chatAccessKey="ca-9cc50287-60d5-4b79-897e-69ada341b285"
        senderUsername={
          user?.previlage == "Guru" ? `${user?.name} - Guru` : user?.name
        }
      />
      <ChatFeed activeChat={"64264"} />
    </ChatEngineWrapper>
  );
}

export default MainChat;
