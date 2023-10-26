import React, { useEffect } from "react";
import NewsItem from "../components/NewsItem";
import useNews from "../components/useNews";
import RefreshButton from "../components/RefreshButton";

const Home = () => {
  const { news, loader, fetchNews } = useNews();

  const fetchData = () => {
    // setLoader(true);
    fetchNews();
  };

  // useEffect(() => {
  //   return (
  //     loader && (
  //       <div className="text-3xl flex items-center justify-center text-white font-bold h-screen">
  //       Loading...
  //     </div>
  //     )
  //   );
  // }, []);

  return (
    <div className="home">
      <div className="flex justify-between items-center m-auto mb-8 max-w-4xl">
        <h1 className="text-3xl text-white font-bold">HackerNews Clone</h1>
        <RefreshButton clickAction={fetchData} loader={loader} />
      </div>
      {news.map((eachNews) => (
        <NewsItem key={eachNews.id} data={eachNews} />
      ))}
    </div>
  );
};

export default Home;
