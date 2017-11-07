import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Posts from '../../components/Posts';
import { fetchPosts } from '../../redux/actions/posts';

class PostsContainer extends Component {
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
        <Helmet>
          <title>Posts</title>
        </Helmet>
        <Posts {...this.props}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
