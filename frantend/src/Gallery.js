import React from 'react';
import 'antd/dist/antd.css';
// import Add from './Add';
import axios from 'axios';
import "./App.css";
import "./Gallery.css";

import { Card,Row,Col,Icon, Button,Menu,Dropdown } from 'antd';
var FileDownload = require('js-file-download');
const { Meta } = Card;


class Gallery extends React.Component {
    constructor(props){
      super(props)
    
    this.state = {
        pic:props.db.photos,
        db:props.db,
        favorite:props.db.favorite,
    }    
        
}   
Remoimg(item){
      let db = this.state.db.photos;
      let i = db.indexOf(item);
      axios.delete("http://localhost:8080/photo/"+db[i]._id).then((res)=>{console.log(res.data);})
      db.splice(i,1);
      this.setState({ 
        pic:db
    }) 
}
download(item){
  let db=this.state.db.photos;
  let i = db.indexOf(item);
  //axios.get("http://localhost:8080/photo/"+db[i].imagename).then((res)=>{        FileDownload(res.data, 'report.jpg');
  axios({
    url: 'http://localhost:8080/photo/'+db[i].imagename,
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', db[i].imagename);
    document.body.appendChild(link);
    link.click();
  });


}
setStatus(item){
  let db = this.state.pic;
  let i = db.indexOf(item);
  
  let id=db[i]._id;
  
  console.log(db[i].favorite)
  db[i].favorite=!db[i].favorite;
  console.log(db[i].favorite); 
  console.log(db[i]);
  //this.db[i].favorite = !this.db[i].favorite;
  axios.put("http://localhost:8080/photo/"+id,db[i]).then((res)=>{console.log(res.data);})
   
  
  this.setState({
    pic:db
  })
 
}


sortele(t){
  let l = this.state.db.photos;
  if(t=='n'){
    l.sort((a,b)=>{
      if(a.title < b.title){
        return -1;
      }
      if(a.title > b.title){
        return 1;
      }
      return 0;
    })
    axios.get("http://localhost:8080/photos/title").then((res)=>{console.log(res)});
  }
  if(t=='d'){
    l.sort((a,b)=>{
      if(a.date < b.date){
        return -1;
      }
      if(a.date > b.date){
        return 1;
      }
      return 0;
    })
  }
  this.setState({
    pic:l
  })

}

render(){
  return (
      <div className="back">
        
        <Dropdown overlay={  <Menu>
          <Menu.Item key="0">
      <div onClick={()=>{this.sortele('n')}}>Title</div>
    </Menu.Item>
    {/*Menu.Item key="1">
    <div onClick={()=>{this.sortele('d')}}>Date</div>
        </Menu.Item>*/}

  </Menu>
} trigger={['click']}>
      <div style={{fontWeight:"bold",color:"black",paddingLeft:"100px"}}> Sort By: <Icon type="down" /></div>
  </Dropdown>
  <br/>
        <Row gutter={8} >
          {this.state.pic.map( (photo)=>  <Col  xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 8 }} style={{paddingBottom:"7px"}}>
            <br/>
            <br/>
            <Card className="floating"
            hoverable
            style={{ width: 550 }}
            
            cover={<a href=""><img alt="example" src={photo.imagepath} height="550px" width="550px" /> </a>}

            actions={[<Button onClick={()=>{this.setStatus(photo)}}  className={photo.favorite?"succ":"fal"}>
              <Icon type="heart" theme="filled"/></Button>
              ,<Button onClick={()=>this.Remoimg(photo)}><Icon type="delete"/></Button>
                ,<Button onClick={()=>{this.download(photo)}}><Icon type="download" /></Button>]}>
            <Meta title={photo.title} description={photo.desc}/>
            </Card>
            </Col>)}
          </Row>

      </div>)
      }
  }
export default Gallery;