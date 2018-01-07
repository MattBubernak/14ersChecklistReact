import React from 'react';

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };

    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    this.setState({ user: UserStore.getUser() });
  }

  componentWillMount() {
    UserStore.addChangeListener(this._onChange);
    this.set
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  render() {

    // Show a friendly message instead if there are no mountains.

    return (
      <li> {this.props.user.id != undefined ? this.props.user.id : 'No User'}</li>
    );
  }
}

export default User;
