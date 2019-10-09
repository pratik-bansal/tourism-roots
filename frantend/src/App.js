import React from 'react';
 import Add from './Add';
 import Gallery from './Gallery';
import Login from './Login';
import {BrowserRouter as Router,Link,Route,withRouter} from 'react-router-dom';
import 'antd/dist/antd.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import "./App.css";

import PicturesWall from "./pimage"

import { Avatar,Menu,Layout,Icon,Drawer,Button  } from 'antd';
import axios from 'axios';
const { Header, Content, Footer, Sider } = Layout



const firebaseConfig = {
  apiKey: "AIzaSyCUCw74qn1TbyvEzlQLQJQTp8dERztdJ7k",
    authDomain: "routforturisum.firebaseapp.com",
    databaseURL: "https://routforturisum.firebaseio.com",
    projectId: "routforturisum",
    storageBucket: "",
    messagingSenderId: "128149440565",
    appId: "1:128149440565:web:db1c0728b0f79ee8f0897c",
    measurementId: "G-1QHBW0ENKJ"


};
firebase.initializeApp(firebaseConfig);

class App extends React.Component {

constructor(props){
  super(props)

  this.state = {collapsed: false,visible: false}
  this.state.db = {
    photos : [],
    date: new Date().toLocaleDateString(),
    favorite:false
  }

}


showDrawer = () => {
  this.setState({
    visible: true,
  });
}
onClose = () => {
  this.setState({
    visible: false,
  })}
onCollapse = collapsed => {
  console.log(collapsed);
  this.setState({ collapsed });
}

componentDidMount(){
  this.checkLogin()

}

getPhotos(uid){
  axios.get("http://localhost:8080/photos?uid="+uid).then(
    (res)=>{
      let db = this.state.db;
      db.photos = res.data;
      this.setState({
        db:db
      })
      }
  )
}

checkLogin(){
  firebase.auth().onAuthStateChanged((user)=> {
 if (user) {
  this.setState(
    {user:user}
  )
  this.getPhotos(user.uid)
  this.props.history.push("/add");
 } else {
   // No user is signed in.
 }
});
}

addPhoto(photo){

let db  = this.state.db;


photo.uid = this.state.user.uid;
photo.favorite=this.state.db.favorite;
photo.date=this.state.db.date;
let photodetails={title:photo.title,desc:photo.desc,uid:photo.uid,favorite:photo.favorite,date:photo.date};
console.log(photodetails);
axios.post("http://localhost:8080/photo",photodetails).then(
    (res)=>{
        db.photos.push(res.data);
        console.log(db.photos);
        this.setState(
          {db:db}
        )
        this.props.history.push('/gallery')
  
    }
  )
  

  
  





}

googleLogin(){
  var provider = new firebase.auth.GoogleAuthProvider();


  firebase.auth().signInWithPopup(provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    this.setState(
      {user:user}
    )
    this.props.history.push("/add");
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

logout(){
  firebase.auth().signOut().then(() =>{
  this.setState({
    user:null
  })
  this.props.history.push("/");
  }).catch(function(error) {
  // An error happened.
  });
}

render(){
  return (<div>

{this.state.user?  <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%',paddingLeft:'100px' }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        
        style={{ lineHeight: '64px' }}
      >
       <Menu.Item>
       <Avatar  style={{ backgroundColor: '#87d068',borderRadius: "50%",he}}  src="./icon.png" />
    <Link to="/add">Add</Link>
  </Menu.Item>
  <Menu.Item >
  <Link to="/gallery">Gallery</Link>
  </Menu.Item>
  <Menu.Item className="Avatar-pos" >
  <Avatar  style={{ backgroundColor: '#87d068',borderRadius: "50%"}} onClick={this.showDrawer} src={this.state.user.photoURL} />
  </Menu.Item>
  </Menu>
  <Drawer
            title="PROFILE"
            placement="right"
            closable={true}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <p>  
              <div style={{textAlign:"center",paddingLeft:"50px"}}>
                {/* <Avatar size={84} style={{ backgroundColor: '#87d068'}} icon="user" /> */}
                <PicturesWall pw={this.state.user} size={60}/>
              </div>
            </p>
            <p>
              <div style={{textAlign:"center",fontWeight:"bold"}}>
                {this.state.user.displayName} 
              </div>
            </p>
            <p>
            <div style={{textAlign:"center"}}>
                {this.state.user.email} 
              </div>
             </p>
             <p> 
              <div style={{textAlign:"center"}}>
            <Button onClick={this.logout.bind(this)} type='danger' >LogOut</Button>
            </div>
            </p>
          </Drawer>
    </Header>
    
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout> : null }



  <Route path="/" exact render={()=><Login googleLogin={this.googleLogin.bind(this)}></Login>}></Route>
  <Route path="/gallery" render={()=><Gallery db={this.state.db}></Gallery>}></Route>
  <Route path="/add" render={()=> <Add savePhoto={this.addPhoto.bind(this)}></Add>}></Route>



  </div>)
}

 
   
}

export default withRouter(App);