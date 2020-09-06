import React, {useState, useEffect} from 'react';
import { Button} from 'antd';
import './index.css'
import 'antd/dist/antd.css';
import NewGame from "../question/index.jsx"
import HighScore from "../highScore/index.jsx"

const App = () => {

  const [page, setPage] = useState("new");

  useEffect(()=>{
    localStorage.setItem("userName", "");
    localStorage.setItem("score", 0);
  },[])

  const onNewClick = () => {
    localStorage.setItem("userName", "");
    localStorage.setItem("score", 0);
    setPage('');
    setPage('new');
  };

  const onHighClick = () => {
    setPage('high');
  };

  return (
    <div>
        <Button onClick={()=>{onNewClick()}}>
          New Game
        </Button>
        <Button onClick={()=>{onHighClick()}}>
          View High Score
        </Button>
        <div>
          {page==="new"?<NewGame />:<HighScore/>}
        </div>
    </div>
  );
};

export default App;
