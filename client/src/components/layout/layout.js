/**
 * Created by kakato10 on 6/18/2017.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import {Link, withRouter} from 'react-router';
import PropTypes from 'prop-types';

import './layout.css';

const navButtonStyle = {
  color: '#0097a7',
  textAlign: 'left',
  paddingLeft: 20,
  fontSize: 16,
  paddingBottom: 5,
  paddingTop: 5,
  height: 'auto'
};


class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openMenu: false
    };
  }

  renderNavButton(link, label) {
    const {router} = this.props;
    const active = router && router.isActive(link);
    const activeStyles = active
      ? {
        backgroundColor: '#e3e5e8'
      }
      : {};

    return (
      <Link to={`/${link}`}
            onClick={() => {
              this.setState({
                openMenu: false
              });
            }}>
        <FlatButton
          fullWidth
          style={{
            ...navButtonStyle,
            ...activeStyles
          }}>
         {label}
        </FlatButton>
      </Link>
    )
  }

  render() {
    const {user} = this.props;

    return (
      <div>
        <AppBar
          style={{
            marginBottom: 20
          }}
          title="Hirundo"
          onLeftIconButtonTouchTap={() => {
            this.setState({
              openMenu: true
            });
          }}/>
        <div className="content">
          {this.props.children}
        </div>
        <Drawer
          width={300}
          open={this.state.openMenu}
          docked={false}
          onRequestChange={() => {
            this.setState({
              openMenu: false
            });
          }}>
          <AppBar
            title="Menu"
            iconStyleLeft={{
              display: 'none'
            }}
            style={{
              marginBottom: 20
            }}/>
          { this.renderNavButton('feed', 'Feed') }
          { this.renderNavButton('hashtag_feed', 'Hashtag Feed') }
          { this.renderNavButton('my_posts', 'My Posts') }
          {
            !user &&
            this.renderNavButton('login', 'Login')
          }
          {
            !user &&
            this.renderNavButton('register', 'Register')
          }
        </Drawer>
      </div>
    )
  }
}

Layout.propTypes = {
  router: PropTypes.object.isRequired,
  user: PropTypes.object
};

export default withRouter(Layout);
