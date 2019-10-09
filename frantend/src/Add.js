 import React from 'react';
import 'antd/dist/antd.css';
import Popover from '@material-ui/core/Popover';
import "./App.css";
import Popup from "reactjs-popup";
import "@fortawesome/fontawesome-free/css/all.css"
import axios from 'axios';


import { Form,Input,Button,Upload,Icon} from 'antd';




/*function Add(props) {
    let title;
    let desc;
    let image;

    return (<div> 
       <Form> 
       <Form.Item label="Title">
          <Input placeholder="Title" id="title" onChange={(e)=>{title=e.target.value}} />
        </Form.Item>
        <Form.Item label="Description"> 
          <Input placeholder="Description" id="desc" onChange={(e)=>{desc=e.target.value}}  />
        </Form.Item>
        <Form.Item label="Image">
          <Input type="file" id="image" onChange={(e)=>{image=e.target.files}} />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" onClick={()=>{props.savePhoto({image,desc,title})}}>
            Submit
          </Button>
        </Form.Item>
       </Form>
    </div>)
   
}*/

function Add(props){
  
  let title;
    let desc;
    let image;

  return(
    <Popup trigger={<button className="btn btn-primary btn-circle btn-xl"><i className="fa fa-plus"></i></button>} modal>
    {close => (
      <div className="modal">
        <a className="close" onClick={close}>
          &times;
        </a>
        <div className="header"> Add Photograph </div>
        <div className="content">
          {" "}
          <div> 
       <Form>
       

       <Form.Item label="Image">
          <Input type="file" id="image" onChange={(e)=>{let fd = new FormData()
  fd.append("avatar",e.target.files[0])

   axios.post("http://localhost:8080/profile",fd,{headers:{
    'Content-Type': "multipart/form-data"
  }})}} />
        </Form.Item>
  
       <Form.Item label="Title">
          <Input placeholder="Title" id="title" onChange={(e)=>{title=e.target.value}} />
        </Form.Item>
        <Form.Item label="Description"> 
          <Input placeholder="Description" id="desc" onChange={(e)=>{desc=e.target.value}}  />
        </Form.Item>
              

        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" className="submit" onClick={()=>{props.savePhoto({desc,title})}}>
            Submit
          </Button>
        </Form.Item>
       </Form>
    </div>
        </div>
        <div className="actions">
          
          <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            close
          </button>
        </div>
       
      </div>
    )}
  </Popup>
  )
}




export default Add;
