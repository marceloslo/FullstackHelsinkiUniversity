import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blog, config);

  return response.data;
};

const update = async (blog) => {
  const id = blog.id;

  const response = await axios.put(`${baseUrl}/${id}`, {
    user: blog.user.id,
    likes: blog.likes,
    title: blog.title,
    author: blog.author,
    url: blog.url,
  });

  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.data;
};

const comment = async ({id,comment}) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {content:comment});

  return response.data;
}

export default { getAll, setToken, create, update, remove, comment };
