import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";

const client = new ApolloClient({
	dataIdFromObject: o => o.id,
	link: new HttpLink({
		uri: "http://localhost:3090/graphql",
		credentials: "include"
	}),
	cache: new InMemoryCache({ dataIdFromObject: o => o.id })
});

export default client;
