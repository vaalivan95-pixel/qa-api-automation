const getUserData = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  const data = await response.json();
  return { status: response.status, data: data };
};

const getPostsData = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  const posts = await response.json();
  return { status: response.status, posts: posts };
};

module.exports = { getUserData, getPostsData };
