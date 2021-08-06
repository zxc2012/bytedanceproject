import React, { Component,useEffect, useState} from "react";
import { Link } from "@reach/router";
import Article from "../modules/Article.js";
import { categories } from "../data/categories.js";
import { getCategories, getArticleById, getArticles, getCommentsByArticleId } from '../utilities.js';
import "./NavBar.css";

const Main=(props)=>{
  //Initialize
  const [categories,setcategories]=useState([]);
  const [secondcategories,setsecondcategories]=useState([]);
  const [category_id,setcategory_id]=useState(0);
  const [sortby,setsortby]=useState("hot");
  //顶部Tab Bar
  const catgorieshandler=(e)=>{
    let getindex=parseInt(e.target.getAttribute("index"));
    let second=[];
    if(getindex<=4){
      if(categories[getindex].children!==undefined)
        second=categories[getindex].children;
      setcategory_id(getindex);
      setsecondcategories(second);
    }
    else{
      setcategory_id(getindex);
    }

  }
  //Choose hot or new
  const sortByhandler=(e)=>{
    let getsortby=e.target.getAttribute("sortby");
    setsortby(getsortby);
  }
  useEffect(()=>{
    let getData=[];
    getCategories().then((all)=>{
      getData=all.data.categories;
      setcategories(getData);
    });
  })

  //render
  let getCategory=[];
  let getsecondCategory=[];
  if(categories.length!=0){
    getCategory=categories.map((data)=>(
      <a href="#" className="NavBar-link" index={data.category_id} onClick={catgorieshandler}>{data.category_name}</a>
    ));
  }
  if(secondcategories.length!=0){
    getsecondCategory=secondcategories.map((data)=>(
      <li className="NavBar-list">
        <a href="#" className="NavBar-link" index={data.category_id} onClick={catgorieshandler}>{data.category_name}</a>
      </li>
    ));
  }
  let test=       
  <div className="NavBar-linkContainer u-inlineBlock">       
    <Link to="/" sortby='hot' className="NavBar-link" onClick={sortByhandler}>
      热门
    </Link>
    <Link to="/" sortby='new' className="NavBar-link" onClick={sortByhandler}>
      最新
    </Link>
    <Link to="/post/" className="NavBar-link">
      历史
    </Link>
  </div>;

  return (
    <>
      <nav className="NavBar-linkContainer">
        {getCategory}
        <hr />
      </nav>
      <nav className="NavBar-container">
        <ul className="tag-list">
        {getsecondCategory}
        </ul>
      </nav>
      <Article category_id={category_id} sortby={sortby}/>
      <nav className="NavBar-container">

          {test}
      </nav>
    </>
  );
}
  
export default Main;