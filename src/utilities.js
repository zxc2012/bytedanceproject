import { categories } from './data/categories';
import { articles } from './data/articles';
import { comments } from './data/comments';

/**
 * 获取所有分类
 */
export async function getCategories() {
  return {
    code: 0,
    data: {
      categories,
    },
  };
}

/**
 * 获取分类和排序获取文章列表
 * @param {*} category 文章分类 id
 * @param {*} sortBy 文章列表排序 'hot' 代表热门， 'new' 代表最新
 * @param {*} offset 分页参数参考 sql 的 offset 和 limit
 * @param {*} limit 同上
 */
export async function getArticles(categoryId = 0, sortBy = 'hot', offset = 0, limit = 10) {
  const sortFunc = {
    new: (a, b) => b.article_info.ctime - a.article_info.ctime,
    hot: (a, b) => b.article_info.digg_count - a.article_info.digg_count,
  }[sortBy];

  const articlesWithCategory = categoryId ?
    articles.filter(
      a => a.category_info.first_category_id === categoryId || a.category_info.second_category_id === categoryId
    ) :
    articles;

  if (sortFunc) {
    articlesWithCategory.sort(sortFunc);
  }

  return {
    code: 0,
    data: {
      articles: articlesWithCategory.slice(offset).slice(0, limit),
    },
    total: articlesWithCategory.length,
    has_more: offset + limit < articlesWithCategory.length,
  };
}

/**
 * 根据文章 ID 获取文章
 * @param {*} articleId 文章 ID
 */
export async function getArticleById(articleId) {
  const article = articles.find(a => a.article_id === articleId);
  if (article) {
    return {
      code: 0,
      data: { article },
    };
  }
  return {
    code: 404,
    error_message: '找不到文章',
  };
}

/**
 * 根据文章 ID 获取文章评论
 * @param {*} articleId 文章 ID
 * @param {*} offset 分页参数参考 sql 的 offset 和 limit
 * @param {*} limit 同上
 */
export async function getCommentsByArticleId(articleId, offset = 0, limit = 10) {
  return {
    code: 0,
    data: {
      article_id: articleId,
      comments: comments.slice(offset).slice(0, limit),
    },
    total: comments.length,
    has_more: offset + limit < comments.length,
  };
}
/**
 * Utility functions to make API requests.
 * By importing this file, you can use the provided get and post functions.
 * You shouldn't need to modify this file, but if you want to learn more
 * about how these functions work, google search "Fetch API"
 *
 * These functions return promises, which means you should use ".then" on them.
 * e.g. get('/api/foo', { bar: 0 }).then(res => console.log(res))
 */

// ex: formatParams({ some_key: "some_value", a: "b"}) => "some_key=some_value&a=b"
function formatParams(params) {
  // iterate of all the keys of params as an array,
  // map it to a new array of URL string encoded key,value pairs
  // join all the url params using an ampersand (&).
  return Object.keys(params)
    .map((key) => key + "=" + encodeURIComponent(params[key]))
    .join("&");
}

// convert a fetch result to a JSON object with error handling for fetch and json errors
function convertToJSON(res) {
  if (!res.ok) {
    throw `API request failed with response status ${res.status} and text: ${res.statusText}`;
  }

  return res
    .clone() // clone so that the original is still readable for debugging
    .json() // start converting to JSON object
    .catch((error) => {
      // throw an error containing the text that couldn't be converted to JSON
      return res.text().then((text) => {
        throw `API request's result could not be converted to a JSON object: \n${text}`;
      });
    });
}

// Helper code to make a get request. Default parameter of empty JSON Object for params.
// Returns a Promise to a JSON Object.
export function get(endpoint, params = {}) {
  const fullPath = endpoint + "?" + formatParams(params);
  return fetch(fullPath)
    .then(convertToJSON)
    .catch((error) => {
      // give a useful error message
      throw `GET request to ${fullPath} failed with error:\n${error}`;
    });
}

// Helper code to make a post request. Default parameter of empty JSON Object for params.
// Returns a Promise to a JSON Object.
export function post(endpoint, params = {}) {
  return fetch(endpoint, {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(params),
  })
    .then(convertToJSON) // convert result to JSON object
    .catch((error) => {
      // give a useful error message
      throw `POST request to ${endpoint} failed with error:\n${error}`;
    });
}
