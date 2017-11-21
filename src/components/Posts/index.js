import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Helmet from 'react-helmet';
import Waypoint from 'react-waypoint';

const cardStyle = {
  minHeight: '300px',
  marginBottom: '25px'
};

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bottomReachedCount: 0
    };
  }
  handleScrollToBottom = () => {
    const { bottomReachedCount } = this.state;
    const { fetchMorePosts } = this.props;
    if (bottomReachedCount > 0) {
      fetchMorePosts();
    }
    this.setState({bottomReachedCount: bottomReachedCount + 1});
  }
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
                  <div className="card" style={cardStyle}>
                    <div className="card-body">
                      <div className="card-title">
                        <NavLink to={`/posts/${item.slug}`}><h2>{item.title}</h2></NavLink>
                      </div>
                      <div className="card-text">
                        <p>{item.preview}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }) 
          }
        </div>
        <Waypoint onEnter={this.handleScrollToBottom}/>
      </div>
    );
  }
}