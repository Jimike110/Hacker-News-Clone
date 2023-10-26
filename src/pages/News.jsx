import useNews from "../components/useNews";
import { useParams, Link } from "react-router-dom";
import NewsPageItem from "../components/NewsPageItem";
import Comments from "../components/Comments";

const News = () => {
  const { news } = useNews();
  const { id } = useParams();

  const selectedNews = news.find((item) => item.id === Number(id));

  if (!selectedNews) {
    return (
      <div className="text-3xl flex items-center justify-center text-white font-bold h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="news-inner text-white m-auto max-w-4xl">
      <div className="header flex justify-between items-center mb-8 ">
        <a href={selectedNews.url} className="text-2xl text-white underline font-bold truncate">{selectedNews.url}</a>
        <Link
        to="/"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm ml-3 px-5 py-2.5 text-center dark:bg-gray-900 hover:dark:bg-gray-950 dark:focus:bg-gray-900 inline-flex items-center"
      >Home
        </Link>
      </div>
      <NewsPageItem data={selectedNews} />
      <section className="comments-section my-16">
        <Comments data={selectedNews}/>
      </section>
    </div>
  );
};

export default News;
