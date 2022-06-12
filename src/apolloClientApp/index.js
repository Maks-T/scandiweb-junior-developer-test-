import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import state from './../redux/store';

const URI_SERVER = `http://localhost:4000/`;

class ApolloClientApp {
  constructor() {
    this.client = new ApolloClient({
      uri: URI_SERVER,
      cache: new InMemoryCache(),
    });
  }

  getCategories = async () => {
    const query = await this.client.query({
      query: gql`
        query {
          categories {
            name
          }
        }
      `,
    });

    return query.data.categories.map((category) => category.name);
  };

  getCurrencies = async () => {
    const query = await this.client.query({
      query: gql`
        query {
          currencies {
            symbol
            label
          }
        }
      `,
    });

    return query.data.currencies;
  };

  getProductsByCategory = async (categoryName) => {
    const query = await this.client.query({
      query: gql`
        query {
          category(input: { title: "${categoryName}" }) {
            name
            products {
              id
              name
              inStock
              gallery
              description
              category
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
      `,
    });

    if (!query.data.category) return null;

    const curSymbol = state.getState().currency.curCurrency.symbol;

    return query.data.category.products;
  };

  getProductById = async (idProduct) => {
    const query = await this.client.query({
      query: gql`
        query {
          product(id: "${idProduct}") {
            id
            name
            inStock
            gallery
            description
            category
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
      `,
    });

    if (!query.data.product) return null;

    return query.data.product;
  };
}

export default new ApolloClientApp();
