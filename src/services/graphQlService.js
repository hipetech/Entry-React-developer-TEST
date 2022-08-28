import config from './config.json';
import {GraphQLClient, gql} from 'graphql-request';


export default class GraphQlService {
    constructor() {
        this.client = new GraphQLClient(config.endpoint);
    }

    getProductCategories = () => {
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
                        brand
                    }
                }
            }
        `;

        return this.client.request(request);
    };

    getCurrencies = () => {
        const request = gql`
            {
                currencies {
                        label,
                        symbol
                    }
            }
        `;

        return this.client.request(request);
    };

}