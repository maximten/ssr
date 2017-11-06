import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'

import { fetchPosts } from '../../redux/actions/posts';

class Feed extends Component {
  constructor(props) {
      super(props);
  }
  componentDidMount() {
    const { fetchPosts, posts: { limit, skip } } = this.props;
    fetchPosts(limit, skip);
  }
  render() {
    const { posts: { items, limit, skip , loading } } = this.props; 
    return (
      <div>
        { items.map((item, key) => {
          return (
            <div key={key}>
              <NavLink to={`/posts/${item.slug}`}><h2>{item.title}</h2></NavLink>
              <p>{item.text}</p>
            </div>
          );
        }) }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: (limit, skip) => {
    dispatch(fetchPosts(limit, skip));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
