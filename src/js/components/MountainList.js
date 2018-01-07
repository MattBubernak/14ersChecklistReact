import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import MountainStore from '../stores/mountainStore';
import MountainCheckbox from './MountainCheckbox';
import MountainCheckDialog from './MountainCheckDialog';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';


const styles = theme => ({
});


class MountainList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			mountains: {},
		};

		// this._onChange = this._onChange.bind(this);
	}

	// _onChange() {
	// 	this.setState({})
	// 	this.setState({ mountains: MountainStore.getAllMountains() });
	// }

	componentWillMount() {
		//MountainStore.addChangeListener(this._onChange);
	}

	// componentWillUnmount() {
	// 	MountainStore.removeChangeListener(this._onChange);
	// }

	render() {
     const { classes } = this.props;
		return (
				<List className="mountains_list" style={{'list-style': 'none'}}>
					{Object.keys(this.props.mountains).map((key) => {
						return (<ListItem dense button key={key}>
											<MountainCheckbox id={key} user={this.props.user} name={this.props.mountains[key].name} check={this.props.mountains[key].check}/>
											{this.props.mountains[key].elevation}
											<ListItemSecondaryAction>
											  <MountainCheckDialog id={key} user={this.props.user} mountain={this.props.mountains[key]} />
											</ListItemSecondaryAction>
										</ListItem>);
					})}
				</List>
		);
	}
}

MountainList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MountainList);

