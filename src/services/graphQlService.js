import config from './config.json';
import {GraphQLClient, gql} from 'graphql-request';


export default class GraphQlService {
    constructor() {
        this.client = new GraphQLClient(config.endpoint);
    }

    getMainPageData = () => {
        const request = gql`
            {
                categories {
                    name
                }
                currencies {
                    label,
                    symbol
                }
            }
        `;

        return this.client.request(request);
    };

}