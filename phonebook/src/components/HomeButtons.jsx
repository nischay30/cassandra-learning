import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import request from 'superagent';

import Form from './Form';
import ViewAll from './ViewAll';
import config from '../config';

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
			openAddDialog: false,
			openViewAllDialog: false,
			openSearchDialog: false,
			searchName: '',
			viewData: []
		}
	}

	showAddDialog = () => {
		this.setState({openAddDialog: true});
	}

	handleAViewAllDialog = () => {
		request
			.get(`${config.serverUrl}/view`)
			.end((err, res) => {
				if(err) { alert('May be table didn\'t exists in database'); this.setState({ openViewAllDialog: false}); return; }
				this.setState({viewData: res.body, openViewAllDialog: true});
		});
	}
		
	handleSearchByNameDialog = () => {
		this.setState({openSearchDialog: true});
	}

	handleCloseDialog = () => {
		this.setState({openAddDialog: false, openViewAllDialog: false, openSearchDialog: false, viewData: [], searchName: ''});
	}

	handleSearchNameChange = (event) => {
		this.setState({searchName: event.target.value});
	}

	handleSearchFormSubmit = (event) => {
		event.preventDefault();
		request
			.get(`${config.serverUrl}/search/${this.state.searchName}`)
			.end((err, res) => {
				if(err) { alert('May be table didn\'t exists in database'); this.setState({ openSearchDialog: false, searchName: ''}); return; }
				if(res.body.length ===0) {
					alert('Name didn\'t exists in database. Try other Name');
					this.setState({ searchName: '', viewData: []});
				} else {
					this.setState({viewData: res.body, openSearchDialog: true, searchName: ''});					
				}
		});
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
					open={this.state.openAddDialog}
					modal={ true}
				>
					<Form dialogState={this.handleCloseDialog}/>
				</Dialog>
				<Dialog
					title='Phonebook'
					contentStyle={{width: '100%', maxWidth: '90%'}}
					open={this.state.openViewAllDialog}
					modal={ true }
					actions={ <FlatButton
											label='close'
											primary={ true }
											onTouchTap={this.handleCloseDialog}
										/>}
				>
					<ViewAll data={this.state.viewData} dialogState={this.handleCloseDialog}/>
				</Dialog>
				<Dialog
					title='Search By Name(Case-sensitive)'
					contentStyle={{width: '100%', maxWidth: '90%'}}
					open={this.state.openSearchDialog}
					modal={ true }
					actions={ <FlatButton
											label='close'
											primary={ true }
											onTouchTap={this.handleCloseDialog}
										/>}
				>
					<form onSubmit={this.handleSearchFormSubmit}>
						<TextField
						  style={{marginLeft: '30%'}}
							type='text'
							required
							value={this.state.searchName}
							onChange={this.handleSearchNameChange}
						  inputStyle={{color: 'green', fontSize: 23}}
							hintText='Name'
							floatingLabelText='Enter Name To Search'
						/>
						<RaisedButton
							label='search'
							type='submit'
							key='search'
							primary={ true }
							style={style}
						/>
					</form>
					 <ViewAll data={this.state.viewData} dialogState={this.handleCloseDialog}/>
				</Dialog>
			</div>
		);
	}
}

export default HomeButtons;
