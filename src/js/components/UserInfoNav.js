import React from 'react';
import firebase, { auth, provider } from '../../firebase.js';
import Chip from 'material-ui/Chip';

class UserInfoNav extends React.Component {

  constructor(props) {
    super(props);
  }

  _onChange() {
    // this.setState({ user: UserStore.getUser() });
  }

  componentWillMount() {
  }

  componentWillUnmount() {
    // UserStore.removeChangeListener(this._onChange);
  }

  render() {

    // Show a friendly message instead if there are no mountains.

    return (
      <Chip label={this.props.user != undefined ? this.props.user.displayName : 'No User'}></Chip>
    );
  }
}

export default UserInfoNav;
