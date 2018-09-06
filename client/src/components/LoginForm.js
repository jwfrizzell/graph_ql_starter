import React, { Component } from "react";
import { graphql, compose } from "react-apollo";

import AuthForm from "components/AuthForm";
import mutationLogin from "mutations/Login";
import getUser from "queries/CurrentUser";

class LoginForm extends Component {
	state = {
		errors: []
	};

	componentWillUpdate(nextProps) {
		if (!this.props.data.user && nextProps.data.user) {
			this.props.history.push("/");
		}
	}

	onSubmit = ({ email, password }) => {
		this.setState({ errors: [] });

		this.props
			.mutate({
				variables: {
					email,
					password
				},
				refetchQueries: [{ query: getUser }]
			})
			.catch(res => {
				const errors = res.graphQLErrors.map(error => error.message);
				this.setState({ errors });
			});
	};

	render() {
		return (
			<div>
				<h3>Login</h3>
				<AuthForm
					errors={this.state.errors}
					onSubmit={this.onSubmit}
					{...this.props}
				/>
			</div>
		);
	}
}

export default compose(
	graphql(getUser),
	graphql(mutationLogin)
)(LoginForm);
