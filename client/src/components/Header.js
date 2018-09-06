import React, { Component } from "react";
import { Header as H, Grid, Button } from "semantic-ui-react";
import { graphql, compose } from "react-apollo";
import { Link, withRouter } from "react-router-dom";

import styles from "styles/Header";
import getUser from "queries/CurrentUser";
import mutationLogout from "mutations/Logout";

class Header extends Component {
	onLogoutClick = () => {
		this.props.mutate({
			refetchQueries: [{ query: getUser }]
		});
		this.props.history.push("/login");
	};

	renderButtons() {
		const { data } = this.props;
		if (data.error) {
			return <div />;
		}
		if (data.loading) {
			return <div />;
		}

		if (data.user) {
			return (
				<div>
					<Button
						onClick={this.onLogoutClick}
						size="mini"
						color="blue"
						inverted
					>
						Logout
					</Button>
				</div>
			);
		} else {
			return (
				<Button.Group size="mini" color="blue" inverted>
					<Button>
						<Link to="/signup">Signup</Link>
					</Button>
					<Button.Or />
					<Button>
						<Link to="/login">Login</Link>
					</Button>
				</Button.Group>
			);
		}
	}

	render() {
		return (
			<H style={styles.header} block color="grey">
				<Grid>
					<Grid.Row>
						<Grid.Column width={10}>
							<Link to="/">Home</Link>
						</Grid.Column>
						<Grid.Column style={styles.buttons} width={6}>
							{this.renderButtons()}
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</H>
		);
	}
}

export default compose(
	graphql(mutationLogout),
	graphql(getUser),
	withRouter
)(Header);
