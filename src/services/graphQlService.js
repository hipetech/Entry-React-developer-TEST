import config from './config.json';
import {GraphQLClient, gql} from 'graphql-request';


export default class GraphQlService {
    constructor() {
        this.client = new GraphQLClient(config.endpoint);
    }

    getCategories = () => {
        const request = gql`
            {
                categories {
                    category {
                        name
                    }
                }
            }
        `;

        this.client.request(request).then();
    };

}