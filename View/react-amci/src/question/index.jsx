import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Card, Checkbox} from 'antd';
import axios from 'axios';
import './index.css'
import 'antd/dist/antd.css';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const App = () => {

  const [user, setUser] = useState(null);
  const [active, setActive] = useState(false);
  const question = useRef("");
  const optionChecked = useRef("");
  const questionCount = useRef(1);
  const randomQuestion = useRef(1)//Math.floor((Math.random() * 10)));

  useEffect(()=>{
    axios.get('http://localhost:1234/question/getQuestion')
    .then(function (response) {
      question.current = response.data.result;
      console.log(question.current);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  },[])

  const onFinish = values => {
    setUser(values);
    localStorage.setItem("userName", values.username);
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const FormController = ()=>{
    return (<Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>);
  }

  function onChange(e) {
    optionChecked.current = e.target.value;
    let currentPoint = parseInt(localStorage.getItem("score"));
    currentPoint++;
    if(optionChecked.current == question.current[randomQuestion.current].answer){
      localStorage.setItem("score",currentPoint);
    }
    setActive(true);
  }

  const onNewClick = () => {
    if(questionCount.current>14){
      return;
    }
    if(active){
      randomQuestion.current = 1//Math.floor((Math.random() * 10));
      questionCount.current = questionCount.current+1;
      setActive(false);
    }
    else{
      alert("Select any one")
    }
  };

  const QuestionComponent= ()=>{
    
    return (
      <div className="site-card-border-less-wrapper">
        <h1>Question No. -&gt; {questionCount.current}</h1>
      <Card title={`${question.current[randomQuestion.current].question}`} bordered={false}>
        <Checkbox onChange={onChange} disabled={active} value="0">A. {question.current[randomQuestion.current].options[0]}</Checkbox>
        <br/>
        <Checkbox onChange={onChange} disabled={active} value="1">B. {question.current[randomQuestion.current].options[1]}</Checkbox>
        <br/>
        <Checkbox onChange={onChange} disabled={active} value="2">C. {question.current[randomQuestion.current].options[2]}</Checkbox>
        <br/>
        <Checkbox onChange={onChange} disabled={active} value="3">D. {question.current[randomQuestion.current].options[3]}</Checkbox>
        <br/>
        <Button onClick={()=>{onNewClick()}}>
          Submit
        </Button>
      </Card>
    </div>
      ) 
  }

  return (
    <div>
      {
        user?<QuestionComponent/>:<FormController />
      }
    </div>
  );
};

export default App;
