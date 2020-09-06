import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Card, Radio} from 'antd';
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
  const [randomQuestion, setRandomQuestion] = useState(Math.floor((Math.random() * 10)));
  const question = useRef("");
  const active = useRef(false);
  const optionChecked = useRef("");
  const questionCount = useRef(1);
  const radioRef = useRef("");

  useEffect(()=>{
    axios.get('http://localhost:1234/question/getQuestion')
    .then(function (response) {
      question.current = response.data.result;
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
    console.log(question.current[randomQuestion].answer);
    if(optionChecked.current == question.current[randomQuestion].answer){
      localStorage.setItem("score",currentPoint);
    }
    radioRef.current.state.checked = true;
    // setActive(true);
    active.current = true
  }

  const saveScore = () =>{
    const user = {
      name: localStorage.getItem("userName"),
      score: localStorage.getItem("score"),
    };
    axios.post('http://localhost:1234/user/addUser', { user })
    .then(function (response) {
      console.log(response.data.status);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  const onNewClick = () => {
    if(questionCount.current>14){
      saveScore();
      return ;
    }
    if(active.current){
      // randomQuestion.current = Math.floor((Math.random() * 10));
      setRandomQuestion(Math.floor((Math.random() * 10)));
      questionCount.current = questionCount.current+1;
      // setActive(false);
      active.current = false
    }
    else{
      alert("Select any one")
    }
  };

  const QuestionComponent= ()=>{
    
    return (
      <div className="site-card-border-less-wrapper">
        <h1>Question No. -&gt; {questionCount.current}</h1>
      <Card title={`${question.current[randomQuestion].question}`} bordered={false}>
        <Radio.Group onChange={onChange}>
          <Radio ref={radioRef} disabled={active.current} value="0">A. {question.current[randomQuestion].options[0]}</Radio>
          <br/>
          <Radio ref={radioRef} disabled={active.current} value="1">B. {question.current[randomQuestion].options[1]}</Radio>
          <br/>
          <Radio ref={radioRef} disabled={active.current} value="2">C. {question.current[randomQuestion].options[2]}</Radio>
          <br/>
          <Radio ref={radioRef} disabled={active.current} value="3">D. {question.current[randomQuestion].options[3]}</Radio>
        </Radio.Group>
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
