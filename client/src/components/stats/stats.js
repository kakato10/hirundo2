import React from 'react';
import PropTypes from 'prop-types';
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import _ from 'lodash';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadStats();
  }

  _getHashtagChartData(hashtags) {
    const tags = _.keys(hashtags);
    const columns = tags.map(hashtag => {
      return [`#${hashtag}`, hashtags[hashtag]]
    }).sort((a, b) => b[1] - a[1]);
    const data = {
      columns,
      type: 'donut',
    };

    return data;
  }

  _getPostsChartData(posts) {
    return {
      columns: [
        ['With hashtags', posts.withHashTags],
        ['Without hashtags', posts.noHashTags]
      ],
      type: 'pie',
    };
  }

  render() {
    const {stats} = this.props;
    const {posts} = stats;

    return (
      <div className="stats">
        <h1>Statistics</h1>
        {posts &&
          <div>
            <div>
              <h2>Posts types</h2>
              <C3Chart
                data={this._getPostsChartData(stats.posts)}/>
            </div>
            {posts.hashtags &&
              <div>
                <h2>Hashtag Usage: </h2>
                <C3Chart
                  data={this._getHashtagChartData(stats.posts.hashtags)}/>
              </div>}
          </div>
        }
      </div>
    );
  }
}

Login.propTypes = {
  stats: PropTypes.object.isRequired,
  loadStats: PropTypes.func.isRequired
};
