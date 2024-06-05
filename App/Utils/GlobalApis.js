import axios from 'axios';

const API_URL = "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clwg78ta603h007w78tp5qwz0/master";

const getItems = async (query) => {
    try {
        const response = await axios.post(API_URL, {
            query,
        });
    
        return response.data;
    } catch (error) {
        console.error('GraphQL request error:', error);
        throw new Error('Failed to fetch data from GraphQL API');
    }
};

const getMainBanners = async () => {
    try {
        const query = `query MainBanner {
            mainBanners {
              id
              name
              image {
                url
              }
            }
          }`;
        const response = await getItems(query);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error('Failed to fetch categories');
    }
};

const getCategories = async () => {
    try {
        const query = `query getCategories {
            categories {
              image {
                url
              }
              name
              id
            }
          }`;
        const response = await getItems(query);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error('Failed to fetch categories');
    }
};

const getSubCategories = async ({category}) => {
  try {
      const query = `query getSubCategories {
        subCategories(where: {category: {name: "`+category+`"}}) {
          name
          id
          image {
            url
          }
          category {
            name
          }
        }
      }
      `;
      const response = await getItems(query);
      return response.data;
  } catch (error) {
      console.error("Error fetching business list:", error);
      throw new Error('Failed to fetch business list');
  }
};

const getMenuLists = async ({subCategory}) => {
  try {
      const query = `query getMenuList {
        menuLists(where: {subCategory: {name: "`+subCategory+`"}}) {
          name
          price
          weight
          id
          image {
            url
          }
          composition
          detail
        }
      }
      `;
      const response = await getItems(query);
      return response.data;
  } catch (error) {
      console.error("Error fetching menuLists:", error);
      throw new Error('Failed to fetch menuLists');
  }
};

const getRandomMenuLists = async () => {
  try {
      const query = `query getMenuList {
        menuLists{
          name
          price
          weight
          id
          composition
          detail
          image {
            url
          }
        }
      }
      `;
      const response = await getItems(query);
      return response.data.menuLists;
  } catch (error) {
      console.error("Error fetching menuLists:", error);
      throw new Error('Failed to fetch menuLists');
  }
};

const getOrders = async (email) => {
  try {
    const query = `query GetUserOrders {
      orders(orderBy: publishedAt_ASC, where: {userEmail: "`+email+`"}) {
        id
        userEmail
        userName
        qty
        menuList {
          id
          image {
            url
          }
          name
          weight
          price
          createdAt
        }
      }
    }`;
    const response = await axios.post(API_URL, { query: query });
    return response.data
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    throw new Error('Failed to fetch orders');
  }
}

const createOrder = async (data) => {
  try {
    const query = `mutation createOrder {
      createOrder(
        data: {
          userEmail: "${data.userEmail}",
          qty: "${data.qty}",
          userName: "${data.userName}"
          ${data.id ? `, menuList: {connect: {id: "${data.id}"}}` : ''}
        }
      ) {
        id
      }
      publishManyOrders(to: PUBLISHED) {
        count
      }
    }`;

    const response = await axios.post(API_URL, { query: query });
    return response.data;
  }catch (error) {
    console.error('GraphQL API Error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch data from GraphQL API');
  }
}

const getStoresList = async () => {
  try {
      const query = `query getStoresList {
        storesLists {
          id
          location
          phone
          workingHours
        }
      }`;
      const response = await getItems(query);
      return response.data;
  } catch (error) {
      console.error("Error fetching stores:", error);
      throw new Error('Failed to fetch stores');
  }
};


export default {
    getMainBanners,
    getCategories,
    getSubCategories,
    getMenuLists,
    getRandomMenuLists,
    getOrders,
    createOrder,
    getStoresList
}