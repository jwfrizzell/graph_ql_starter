import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { ApolloProvider } from "react-apollo";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";

import App from "components/App";
import requireAuth from "components/requireAuth";
import Dashboard from "components/Dashboard";
import LoginForm from "components/LoginForm";
import SignupForm from "components/SignupForm";

import client from "utils/apollo";

const Root = () => {
	return (
		<ApolloProvider client={client}>
			<Router>
				<App {...this.props}>
					<Switch>
						<Route exact path="/" component={requireAuth(Dashboard)} />
						<Route path="/login" component={LoginForm} />
						<Route path="/signup" component={SignupForm} />
						<Redirect to="/" />
					</Switch>
				</App>
			</Router>
		</ApolloProvider>
	);
};

ReactDOM.render(<Root />, document.querySelector("#root"));
