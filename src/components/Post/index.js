import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Helmet from 'react-helmet';

export default class Post extends Component {
  render() {
    const { posts: { items, limit, skip , loading }, slug } = this.props;
    const post = items.filter((item) => { return item.slug == slug}).pop();
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <h1>{post.title}</h1>
                </div>
                <div className="card-text">
                  <p>{post.text}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}