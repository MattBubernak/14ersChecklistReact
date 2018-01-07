import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import firebase, { auth, provider } from '../../firebase.js';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
});

class LoginLogout extends React.Component {
    constructor(props) {
        super();
        this.state = { user: null }
        this.login = this.login.bind(this); // <-- add this line
        this.logout = this.logout.bind(this);
    }

    handleChange(e) {
      /* ... */
    }
    logout() {
      firebase.auth().signOut().then((result) => {
          console.log('signed out');
        }, function(error) {
          console.error('Sign Out Error', error);
        });
    }
    login() {
      auth.signInWithPopup(provider)
        .then((result) => {
          console.log('logged in');
        });
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        // FacebookStore.removeChangeListener(this._onFacebookChange);
      }

    _onFacebookChange() {
        // this.setState(this.getFacebookState());
    }


    render() {
      const { classes } = this.props;
      return (
        <Button className={classes.button} raised color="accent" onClick={this.props.user ? this.logout : this.login}>
          {this.props.user ? "Log Out" : "Log In"}
        </Button>
      );
    }
}

LoginLogout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginLogout);

