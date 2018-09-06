import gql from "graphql-tag";

const mutationLogout = gql`
	mutation {
		logout {
			email
		}
	}
`;

export default mutationLogout;
