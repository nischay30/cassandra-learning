import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Form from './Form';
import Dialog from 'material-ui/Dialog';

const style = {
	margin: 12
}

const labelStyle = {
	fontSize: 25
}

class HomeButtons extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		}
	}

	showAddDialog = () => {
		this.setState({open: true});
	}

	handleAViewAllDialog = () => {
		console.log('View Dialog');
	}
		
	handleSearchByNameDialog = () => {
		console.log('Search Dialog');
	}

	handleCloseDialog = () => {
		this.setState({open: false});
	}

	render() {

		const buttons = [	<RaisedButton
												label='Add'
												key='add'
												primary={ true }
												style={style}
												labelStyle={labelStyle}
												onTouchTap={this.showAddDialog}
											/>,
											<RaisedButton
												label='View All'
												key='view'
												secondary={ true }
												style={style}
												labelStyle={labelStyle}
												onTouchTap={this.handleAViewAllDialog}
											/>,
											<RaisedButton
												label='Search By Name'
												key='search'
												primary={ true }
												style={style}
												labelStyle={labelStyle}
												onTouchTap={this.handleSearchByNameDialog}
											/>
										];

		return(
			<div>
				{ buttons }
				<Dialog
					title='Add Entry in Database'
					open={this.state.open}
					modal={ true}
				>
					<Form dialogState={this.handleCloseDialog}/>
				</Dialog>
			</div>
		);
	}
}

export default HomeButtons;
