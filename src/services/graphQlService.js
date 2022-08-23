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
                    products {
                        id
                        name
                        inStock
                        gallery
                        prices {
                            currency {
                                label
                                symbol
                            }
                            amount
                        }
                        attributes {
                            id
                            name
                            type
                            items {
                                displayValue
                                value
                                id
                            }
                        }
                    }
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