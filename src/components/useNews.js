import { useState, useEffect } from "react";

const fetchNewsIds = async () => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
  );

  if (!response.ok) {
    throw new Error("Could not fetch data.");
  }

  const data = await response.json();
  return data.slice(0, 100);
};

const fetchNewsDetails = async (id) => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  );

  if (!response.ok) {
    throw new Error(`Could not fetch news item with ID: ${id}`);
  }

  return response.json();
};

const useNews = () => {
  const [news, setNews] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchNews = async () => {
    try {
      setLoader(true);

      const newsIds = await fetchNewsIds();
      const newsDetailsPromises = newsIds.map((id) => fetchNewsDetails(id));

      const newsDetails = await Promise.all(newsDetailsPromises);
      setNews(newsDetails.filter(Boolean));
    } catch (error) {
      console.error("Error fetching news:", error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchNews();

    // Fetch news every minute
    const intervalId = setInterval(fetchNews, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return { news, loader, fetchNews };
};

export default useNews;
