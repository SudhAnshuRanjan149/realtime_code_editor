import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Created a new room");
  };

  const joinRoom = () => {
    if (!roomId || !userName) {
      toast.error("ROOM ID & username is required");
      return;
    }

    //Redirect
    navigate(`/editor/${roomId}`, {
      state: {
        userName,
		roomId
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img
          className="homePageLogo"
          src="/code-sync.png"
          alt="code-sync-logo"
        />
        <h4 className="mainLabel">Paste invitation ROOM ID</h4>
        <div className="inputGroup">
          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            type="text"
            className="inputBox"
            placeholder="ROOM ID"
            onKeyUp={handleInputEnter}
          />
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            className="inputBox"
            placeholder="USERNAME"
            onKeyUp={handleInputEnter}
          />
          <button className="btn joinBtn" onClick={joinRoom}>
            Join
          </button>
          <span className="createInfo">
            If you don't have invite then create &nbsp;
            <a onClick={createNewRoom} href="" className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>

      <footer>
        <h4>
          Built with 💖 by &nbsp;
          <a href="https://github.com/SudhAnshuRanjan149/realtime_code_editor">
            Sudhanshu
          </a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
