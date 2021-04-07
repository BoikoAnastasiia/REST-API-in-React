import axios from 'axios';

axios.defaults.headers.common['Authorization'] =
  'Bearer fb416686c0cf4be5b520956836ebc075';

const fetchArticles = ({ searchQuery = '', currentPage = 1, pageSize = 5 }) => {
  return axios
    .get(
      `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=${pageSize}&page=${currentPage}`,
    )
    .then(response => response.data.articles);
};

export default { fetchArticles };
