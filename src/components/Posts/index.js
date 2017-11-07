import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Helmet from 'react-helmet';

export default class Posts extends Component {
  render() {
    const { posts: { items, limit, skip , loading } } = this.props; 
    return (
      <div className="container">
        <div className="row">
          { 
            items &&
            items.map((item, key) => {
              return (
                <div key={key} className="col-md-4">
                  <NavLink to={`/posts/${item.slug}`}><h2>{item.title}</h2></NavLink>
                  <p>{item.text}</p>
                </div>
              );
            }) 
          }
        </div>
      </div>
    );
  }
}