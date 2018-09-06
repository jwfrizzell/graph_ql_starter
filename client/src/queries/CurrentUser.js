import gql from "graphql-tag";

const getUser = gql`
	query {
		user {
			id
			email
		}
	}
`;

export default getUser;
