import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import request from 'superagent';
import config from '../config';

class Form extends Component {
	constructor(props) {
		super(props);
		this.state={
			name: '',
			city: '',
			DOB: new Date(),
			gender: 'Male',
			mobile: ''
		}
	}

	handleNameChange = (event) => {
		this.setState({name: event.target.value});
	}

	handleMobileChange = (event) => {
		this.setState({mobile: event.target.value});
	}

	handleCityChange = (event) => {
		this.setState({city: event.target.value});
	}

	handleGenderChange = (event, value) => {
		this.setState({gender: value});
	}

	handleDOBChange = (event, date) => {
		this.setState({DOB: date});
	}

	handleFormSubmit = (event) => {
		event.preventDefault();
		const userData = this.state;
		this.setState({name: '', mobile: '', city: '', gender: 'Male', DOB: new Date()});

		request
		.post(`${config.serverUrl}/add`)
		.send(userData)
		.end((err, res) => {
			if(err) { console.log('Err', err); return; }
			alert('Data Saved', this.props.dialogState());
		});
	}

	render() {
		return(
			<form onSubmit={this.handleFormSubmit}>
				<label style={{margin: 10, fontWeight: 'bold', fontSize: 22}}> Name: </label>
				<TextField
					type='text'
					required
					value={this.state.name}
					onChange={this.handleNameChange}
				  inputStyle={{color: 'green', fontSize: 23}}
					hintText='Name'
				/>
				<br />
				<label style={{margin: 10, fontWeight: 'bold', fontSize: 22}}> Mobile: </label>
				<TextField
					type='number'
					required
					value={this.state.mobile}
					onChange={this.handleMobileChange}
				  inputStyle={{color: 'green', fontSize: 23}}
					hintText='Mobile Number'
				/>
				<br />
				<label style={{margin: 10, fontWeight: 'bold', fontSize: 22}}> City: </label>
				<TextField
					type='text'
					required
					value={this.state.city}
					onChange={this.handleCityChange}
				  inputStyle={{color: 'green', fontSize: 23}}
					hintText='City'
				/>
				<br/>
				<label style={{margin: 10, fontWeight: 'bold', fontSize: 22}}> Gender: </label>

				<RadioButtonGroup name='Gender' required defaultSelected='Male' onChange={this.handleGenderChange} >
					<RadioButton
						value='Male'
						label='Male'
						labelStyle={{fontSize: 20}}
						style={{marginBottom: 20, maxWidth: 100, marginLeft: '45%'}}
					/>
					<RadioButton
						value='Female'
						label='Female'
						labelStyle={{fontSize: 20}}
						style={{marginBottom: 20, maxWidth: 100, marginLeft: '45%'}}
					/>
				</RadioButtonGroup>

				<label style={{margin: 1, fontWeight: 'bold', fontSize: 22}}> DOB: </label>
				<DatePicker
					hintText='Select DOB'
					maxDate={ new Date() }
					onChange={this.handleDOBChange}
					value={this.state.DOB}
				/>
				<RaisedButton
				  onTouchTap={this.props.dialogState}
					label='Close'
					secondary={true}
					style={{marginLeft: '70%'}}
				/>
				<RaisedButton
					label='Submit'
					type='submit'
					primary={true}
					style={{marginLeft: 10}}
				/>

			</form>
		);
	}
}

export default Form;