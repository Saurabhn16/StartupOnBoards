import React, { useState } from "react";
// import "./styles.css"; // Import the CSS file
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const MessageI = () => {


  return (
    <div className="container">
      <Sidebar />

      <MessageContainer />
    </div>
  );
};

export default MessageI;
