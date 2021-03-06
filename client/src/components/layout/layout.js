/**
 * Created by kakato10 on 6/18/2017.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import {Link, withRouter} from 'react-router';
import PropTypes from 'prop-types';
import Menu from 'material-ui-icons/Menu'

import './layout.css';
const navButtonStyle = {
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
        backgroundColor: window.themePalette.accent1Color,
        color: window.themePalette.alternateTextColor
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
      <div className='page'>
        <AppBar
          style={{
            marginBottom: 20
          }}
          iconElementLeft={(
            <Menu
              color={window.themePalette.alternateTextColor}
            />
          )}
          iconStyleLeft={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 0
          }}
          title={(
            <div className='logo-container'>
              <img src="https://image.ibb.co/b6zgBT/logo.png"/>
            </div>
          )}
          onLeftIconButtonTouchTap={() => {
            this.setState({
              openMenu: true
            });
          }}>
        </AppBar>
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
            title={i18n.navigation.label}
            titleStyle={{
              color: window.themePalette.alternateTextColor
            }}
            style={{
              marginBottom: 20
            }}
            showMenuIconButton={false}
          />
          { user && this.renderNavButton('feed', i18n.navigation.feed) }
          { user && this.renderNavButton('hashtag_feed', i18n.navigation.hashtagFeed) }
          { user && this.renderNavButton('my_posts', i18n.navigation.myPosts) }
          { user && this.renderNavButton('settings', i18n.navigation.settings) }
          {
            !user &&
            this.renderNavButton('login', i18n.navigation.login)
          }
          {
            !user &&
            this.renderNavButton('register', i18n.navigation.register)
          }
          {this.renderNavButton('statistics', i18n.navigation.statistics)}
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
