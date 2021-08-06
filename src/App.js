import './App.css';
import React,{Component} from 'react';
import { Router } from "@reach/router";
import Main from './pages/Main.js';
import Post from './pages/Post.js';
import NotFound from './pages/NotFound.js';

const App=(props)=>{
  return(
    <>
    <div className="App-logo">
      <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/dcec27cc6ece0eb5bb217e62e6bec104.svg"/>
    </div>
    <div className="App-container">
      <Router>
        <Main path="/" />
        <Post path="/post/" />
        <NotFound default />
      </Router>
    </div>
  </>
  )
}

export default App;
