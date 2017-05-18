import React, { Component } from 'react';
import { 
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn } from 'material-ui/Table';

class ViewAll extends Component {
	render() {
		const header = <TableHeader>
										 <TableRow>
										 	 <TableHeaderColumn>Name</TableHeaderColumn>
										 	 <TableHeaderColumn>City</TableHeaderColumn>
										 	 <TableHeaderColumn>D.O.B(YYYY-MM-DD)</TableHeaderColumn>
										 	 <TableHeaderColumn>Gender</TableHeaderColumn>
										 	 <TableHeaderColumn>Mobile</TableHeaderColumn>
										 	 <TableHeaderColumn>Operations</TableHeaderColumn>
										 </TableRow>
									 </TableHeader>

		const rows = this.props.data.map((row, index) => {
			return(
				<TableRow key={row.id}>
					<TableRowColumn style={{fontSize: 18}}>{row.name}</TableRowColumn>
					<TableRowColumn style={{fontSize: 18}}>{row.city}</TableRowColumn>
					<TableRowColumn style={{fontSize: 18}}>{row.dob}</TableRowColumn>
					<TableRowColumn style={{fontSize: 18}}>{row.gender}</TableRowColumn>
					<TableRowColumn style={{fontSize: 18}}>{row.mobile}</TableRowColumn>
					<TableRowColumn style={{fontSize: 18}}>{row.mobile}</TableRowColumn>
				</TableRow>
			);
		});
		return(
			<div>
					{ this.props.data.length ?
						<Table height='200px'>
							{header}
							<TableBody>
								{rows}
							</TableBody>
						</Table>: null
					}
			</div>
		);
	}
}

export default ViewAll;