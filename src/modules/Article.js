import React, { Component ,useState,useEffect} from "react";
import { articles } from "../data/frontend/javascript.js";
import { getCategories, getArticleById, getArticles, getCommentsByArticleId } from '../utilities.js';
import SingleArticle from "./SingleArticle.js";

const Article =(props)=>{
  //Initialize
  const [articles,setArticles]=useState([]);
  let singlearticle=articles.map((value)=>(
    <SingleArticle user_name={value.author_user_info.user_name} time={value.article_info.mtime-value.article_info.ctime} 
    title={value.article_info.title} brief_content={value.article_info.brief_content}/>
  ));
  useEffect(()=>{
    let getData=[];
    getArticles(props.category_id,props.sortby,0,10).then((all)=>{
      console.log(props);
      getData=all.data.articles;
      setArticles(getData);
    });
  },[props.category_id,props.sortby]);
  return (
    <div>
        {singlearticle}
    </div>
  );
}
export default Article;