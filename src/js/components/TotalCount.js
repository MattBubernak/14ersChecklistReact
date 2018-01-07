import React from 'react';
//import MountainStore from '../stores/mountainStore';

class TotalCount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };

    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    console.log("onchange fired for total count");
    this.setState({ count: MountainStore.getChecklistCount() });
  }

  componentWillMount() {
    MountainStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    MountainStore.removeChangeListener(this._onChange);
  }

  render() {

    // Show a friendly message instead if there are no mountains.

    return (
      <h1> {this.state.count} / 58 </h1>
    );
  }
}

export default TotalCount;
