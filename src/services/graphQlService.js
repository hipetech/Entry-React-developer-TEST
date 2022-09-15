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

    getProductsByCategory = (inputCategory) => {
        const request = gql`
        {
            category(input: {title: "${inputCategory}"}) {
                products {
                    id
                    name
                    inStock
                    gallery
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
                    prices {
                        currency {
                            label
                            symbol
                        }
                        amount
                    }
                    brand
                }
            }
        }
        `;
        return this.client.request(request);
    };

    getProductById = (productId) => {
        const request = gql`
        {
            product(id: "${productId}") {
                id
                name
                inStock
                gallery
                description
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
                prices {
                    currency {
                        label
                        symbol
                    }
                    amount
                }
                brand
            }
        }
        `;

        return this.client.request(request);
    };
}