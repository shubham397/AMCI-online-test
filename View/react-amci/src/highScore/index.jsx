import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table} from 'antd';

import './index.css';
import 'antd/dist/antd.css';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
  }
];

const App = () => {

  const [tdata,setTdata] = useState("");

  useEffect(()=>{
    axios.get('http://localhost:1234/user/getHighScore')
      .then(function (response) {
        const data = response.data.result.map((newData)=>{
          return {name:newData.name, score:newData.score}
        })
        setTdata(data);
      })
      .catch(function (error) {
        console.log(error);
      })
  },[])

  return (
    <div>
        <Table columns={columns} dataSource={tdata} pagination={false} />
    </div>
  );
};

export default App;
