import React from 'react';
import firebase, { auth, provider } from '../../firebase.js';

class NavCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentWillReceiveProps(newProps) {
    this.retrieveUserChecks(newProps.user);
  }

  retrieveUserChecks(user) {
    if (user == undefined) {
      this.setState({ count: 0})
      return;
    }
    let userChecks = firebase.database().ref('userChecks/' + user.uid);

    userChecks.on('value', (snapshot) => {
      let userChecks = snapshot.val() == undefined ? {} : snapshot.val();
      userChecks = Object.values(userChecks).filter(function( check ) {
        return check.checked === true;
      });
      this.setState({ count: userChecks.length });
    })
  }

  render() {
    return (
      <h1> {this.state.count} / 58 </h1>
    );
  }

}
export default NavCount;
