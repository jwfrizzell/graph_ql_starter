import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";

class AuthForm extends Component {
	state = {
		email: "",
		password: ""
	};

	onSubmit = event => {
		event.preventDefault();

		const { email, password } = this.state;

		this.props.onSubmit({ email, password });

		this.setState({ email: "", password: "" });
	};

	render() {
		const { email, password } = this.state;
		return (
			<Form onSubmit={event => this.onSubmit(event)}>
				<Form.Field width={8}>
					<label>Email</label>
					<input
						placeholder="Enter Email"
						value={email}
						onChange={e => this.setState({ email: e.target.value })}
					/>
				</Form.Field>
				<Form.Field width={8}>
					<label>Password</label>
					<input
						type="password"
						placeholder="Enter Password"
						value={password}
						onChange={e => this.setState({ password: e.target.value })}
					/>
				</Form.Field>
				<Form.Field>
					{this.props.errors.map((error, key) => (
						<Message negative key={key}>
							{error}
						</Message>
					))}
				</Form.Field>
				<Form.Field>
					<Button color="teal" size="mini">
						Submit
					</Button>
				</Form.Field>
			</Form>
		);
	}
}

export default AuthForm;
