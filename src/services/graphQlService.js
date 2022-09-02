import config from './config.json';
import {GraphQLClient, gql} from 'graphql-request';


export default class GraphQlService {
    constructor() {
        this.client = new GraphQLClient(config.endpoint);
    }

    getCategories = async () => {
        const request = gql`
            {
                categories {
                    name
                }
            }
        `;

        return await this.client.request(request);
    };

    getCurrencies = async () => {
        const request = gql`
            {
                currencies {
                        label,
                        symbol
                    }
            }
        `;

        return await this.client.request(request);
    };

    getProductsByCategory = async (inputCategory) => {
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
        return await this.client.request(request);
    };

    getProductById = async (productId) => {
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

        return await this.client.request(request);
    };
}