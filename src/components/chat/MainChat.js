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
import { useSelector } from "react-redux";
import { userSelector } from "../../state/user/userSlice";

function MainChat() {
  const { user } = useSelector(userSelector);

  useEffect(() => {
    console.log(ChatSocket);
  }, []);

  return (
    <ChatEngineWrapper>
      <ChatSocket
        projectID="0535de57-3586-4aed-a156-edc6c4912ef6"
        chatID="57815"
        chatAccessKey="ca-4cfd0fd4-cd07-4e3e-b8e1-f1184995dcc0"
        senderUsername={user.name}
      />
      <ChatFeed activeChat={"57815"} />
    </ChatEngineWrapper>
  );
}

export default MainChat;
