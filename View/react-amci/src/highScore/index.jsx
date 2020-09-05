import React, { useEffect } from 'react';
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
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }
];

const data = [
  {
    name: 'John Brown',
    age: 32
  },
  {
    name: 'Jim Green',
    age: 42
  },
  {
    name: 'Joe Black',
    age: 32
  },
];

const App = () => {

  useEffect(()=>{
    axios.get('http://localhost:1234/user/getHighScore')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  })

  return (
    <div>
        <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default App;
