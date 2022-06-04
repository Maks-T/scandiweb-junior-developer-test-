import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

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
    console.log('query get Categories', query);

    return query.data.categories.map((category) => category.name);
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
    console.log(`query get Category = ${categoryName}`, query);

    return query.data.category.products.map((product) => ({
      id: product.id,
      title: product.name,
      imgSrc: product.gallery[0],
      amount: product.prices[0].currency.symbol + product.prices[0].amount,
    }));
  };
}

export default new ApolloClientApp();
