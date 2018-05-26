import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import PropTypes from 'prop-types';

import PostsList from '../posts_list/posts_list';

export default class HashtagFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hashtag: ''
    };

    props.loadTrendingHashtags();
  }

  renderSearchField() {
    const {trendingHashtags} = this.props;

    return (
      <Card
        zDepth={2}
        style={{
          marginBottom: 20
        }}>
        <CardHeader
          style={{
            backgroundColor: window.themePalette.primary1Color
          }}
          title={i18n.label}
          titleStyle={{
            fontSize: 18,
            fontWeight: 'bold',
            color: window.themePalette.alternateTextColor
          }}/>
        <Divider/>
        <CardText>
          <TextField
            hintText={i18n.placeholder}
            multiLine={true}
            rows={1}
            rowsMax={4}
            onChange={(e, hashtag) => {
              this.setState({
                hashtag
              });;
            }}
            underlineShow={false}
            style={{
              marginLeft: 20,
              marginRight: 20
            }}
            value={this.state.hashtag}
            fullWidth
          />
        </CardText>

        <div style={{
          margin: '5px 10px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {trendingHashtags && trendingHashtags.map((tag, index) => {
            return (<Chip
              key={index}
              onClick={(e) => {
                this.setState({
                  hashtag: tag
                });
                this.props.loadPostsByHashtag(tag);
              }}
              style={{
                marginRight: 10
              }}
              backgroundColor={window.themePalette.primary1Color}
              labelColor={'white'}
            >
              {tag}
            </Chip>)
          })}
        </div>
        <CardActions>
          <FlatButton
            label={i18n.action}
            secondary={true}
            fullWidth
            onTouchTap={() => {
              this.props.loadPostsByHashtag(this.hashtag);
            }}/>
        </CardActions>
      </Card>
    )
  }
  render() {
    const {posts, loggedUser, likePost, dislikePost} = this.props;

    return (
      <div className="feed">
        <div>
          {this.renderSearchField()}
          <PostsList
            posts={posts}
            loggedUser={loggedUser}
            likePost={likePost}
            dislikePost={dislikePost}/>
        </div>
      </div>
    );
  }
}

HashtagFeed.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  loggedUser: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
  loadPostsByHashtag: PropTypes.func.isRequired,
  trendingHashtags: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadTrendingHashtags: PropTypes.func.isRequired
};
