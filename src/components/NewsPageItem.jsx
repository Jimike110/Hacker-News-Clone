const NewsPageItem = ({ data }) => {
  const { title, descendants, by, time, url } = data;

  return (
    <div className="news-item">
      <div className="dark:text-gray-100 rounded-lg my-2">
        <div className="container max-w-4xl px-6 py-6 mx-auto rounded-lg shadow-sm dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <span className="text-sm dark:text-gray-400">
              {new Date(time * 1000).toLocaleDateString()}
            </span>
            <span>
              <span className="text-sm dark:text-gray-400">Comments: </span>
              <span className="px-1 py-1 font-semibold text-sm rounded dark:bg-violet-400 dark:text-gray-900">
                {descendants}
              </span>
            </span>
          </div>
          <div className="mt-3">
            <a
              rel="noopener noreferrer"
              href={url}
              className="text-2xl font-bold hover:underline"
            >
              {title}
            </a>
          </div>
          <div className="flex items-center justify-between mt-4">
            <a
              rel="noopener noreferrer"
              href={url}
              className="hover:underline dark:text-violet-400"
            >
              Read News
            </a>
            <div>
              <span className="flex items-center">
                <span className="hover:underline dark:text-gray-400">
                  {by}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPageItem;
