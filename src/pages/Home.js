import React from "react";

const Home = () => {
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img src="/code-sync.png" alt="code-sync-logo" />
        <h4 className="mainLabel">Paste invitation ROOM ID</h4>
        <div className="inputGroup">
          <input type="text" className="inputBox" placeholder="ROOM ID" />
          <input type="text" className="inputBox" placeholder="USERNAME" />
        </div>
        <button className="btn joinBtn">Join</button>
        <span className="createInfo">
          If you don't have invite then create &nbsp;
          <a href="" className="craeteNewBtn">
            new room
          </a>
        </span>
      </div>

	  <footer>
		<h4>Built with 💖 by <a href="">Sudhanshu</a></h4>
	  </footer>
    </div>
  );
};

export default Home;
