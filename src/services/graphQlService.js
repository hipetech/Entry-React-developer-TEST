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
                    name
                }
            }
        `;

        return this.client.request(request);
    };

    getProductsByCategory = (inputCategory) => {
        const request = gql`
            {
                category(input: {title: "${inputCategory}"}) {
                    products {
                        id
                        name
                        brand
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