import React from 'react';
import PropTypes from 'prop-types'
// import { Form, Icon, Input,Button, Checkbox } from 'antd';
import { Avatar,Menu,Layout,Drawer,Button } from 'antd';
import "./App.css";
import {BrowserRouter as Link,Route} from 'react-router-dom';
import 'antd/dist/antd.css';
import { css } from '@emotion/core';
import "./Login.css";
const {Header, Sider, Content,Footer } = Layout



function Login(props) {
  return (
  <div>
     <Layout>
     <Header>
    <Menu
        theme="dark"
        mode="horizontal"
        
        style={{ lineHeight: '64px' }}
      >
       <Menu.Item>
    {/* <Link to="/add">Add</Link> */}
  </Menu.Item>
  <Menu.Item >
  {/* <Link to="/gallery">Gallery</Link> */}
  </Menu.Item>
  <Menu.Item className="Avatar-pos" >
  <Avatar  style={{ backgroundColor: '#87d068',borderRadius: "50%",left:-1180}}  src="./icon.png" />
  </Menu.Item>
  </Menu>
  </Header>
    
  
      
    </Layout>
    <div id='footer'>
    <Layout>

 <Footer style={{ position: "sticky", bottom: "-0",backgroundColor: '#1d4e8d' }}>
<div class="row">
<h1> CREATED BY: </h1>
<div class="column">
<a href="https://www.linkedin.com/in/pratik-b-7961a5138/">
<Avatar size={100} src="https://media.licdn.com/dms/image/C5103AQHjQcSLn4EkAg/profile-displayphoto-shrink_100_100/0?e=1575504000&v=beta&t=b_9L_HzjX5vQpXyOZic-7vek5QiGFnyydZqqyHUUKhs" />
<h4>Pratik Bansal</h4>
</a>
</div >
<div class="column">
<a href="https://www.linkedin.com/in/sahil-agarwal-b0775714a/">
<Avatar size={100} src="https://media.licdn.com/dms/image/C5103AQGEbwee0IvHyg/profile-displayphoto-shrink_800_800/0?e=1575504000&v=beta&t=wc7HnhrQ_Uu2ZGKI8lOPjKXdKOULjcKSdt-KvcLZQIA" />

<h4>Sahil Agarwal</h4>
</a>
</div >
<div class="column">
<a href="https://www.linkedin.com/in/vishal-tulsani-26926510a/">
<Avatar size={100} src="https://media.licdn.com/dms/image/C5103AQF5vtNOCjRcjw/profile-displayphoto-shrink_800_800/0?e=1575504000&v=beta&t=weDqKaNKvFMTI3tKOU_cSpv_lmiXGweKBJbokb4PRUg" />
<h4>Vishal Tulsani</h4></a>
</div >
</div >


                  
 </Footer>
 </Layout>
  </div>
  
  <Layout>
        <Content className="image">
         
        <h1 className="welcome" style={{color:'#330d00'}}> Welcome To Routes For Tourism</h1>
        <br/> 
     <Button type="primary" htmlType="submit" className="login-form-button login" onClick={props.googleLogin}>
            Login With Google
          </Button>
         

        
          </Content>
    
      </Layout>
   
   
 




</div>)
   
}

export default Login;
