import React, { Component } from "react";
import { getCategories, getArticleById, getArticles, getCommentsByArticleId } from '../utilities.js';
import "./Card.css";
const gettime=(value)=>{
  let now =new Date(value);
  return now;
}
const SingleArticle=(props)=>{
  let now  =gettime(props.time);
  if(now.getDate()>1)now=(now.getDate()-1)+"天前";
  else{
    now=now.getHours()+"小时前";
  }
  return (
    <div className="Card-story">
        <span>{props.user_name}</span>
        <span>{" | "+now}</span>
        <p>{props.title}</p>
        <a href="#">{props.brief_content}</a>
    </div>
  );
}
  
  export default SingleArticle;