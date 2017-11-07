import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import Helmet from 'react-helmet';

import Post from '../../components/Post';
import { fetchPost } from '../../redux/actions/posts';

class PostContainer extends Component {
  constructor(props) {
      super(props);
  }
  componentDidMount() {
    const { fetchPost, slug } = this.props;
    fetchPost(slug);
  }
  render() {
    const { posts: { items, limit, skip , loading }, slug } = this.props;
    const post = items.filter((item) => { return item.slug == slug}).pop();
    return (
      <div>
        {
          post && 
          <div>
            <Helmet>
              <title>{post.title}</title>
            </Helmet>
            <Post {...this.props}/>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
  fetchPost: (slug) => {
    dispatch(fetchPost(slug));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
