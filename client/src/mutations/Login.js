import gql from "graphql-tag";

const mutationLogin = gql`
	mutation Login($email: String, $password: String) {
		login(email: $email, password: $password) {
			id
			email
		}
	}
`;

export default mutationLogin;
