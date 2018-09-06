import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

class Dashboard extends Component {
	render() {
		return (
			<div style={{ textAlign: "center" }}>
				<h3>Wecome Authenticated User!!!</h3>
				<Icon size="massive" name="user secret" color="green" />
			</div>
		);
	}
}

export default Dashboard;
