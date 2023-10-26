import { useState, useEffect } from "react";
import RefreshButton from "./RefreshButton";

const Comments = ({ data }) => {
  const [comments, setComments] = useState([]);
  const [nestedComments, setNestedComments] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchComments = async (commentIds) => {
    const comments = await Promise.all(
      commentIds.map(async (commentId) => {
        const response = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`
        );

        if (!response.ok) {
          throw new Error(`Could not fetch comment with ID: ${commentId}`);
        }

        const commentData = await response.json();
        if (commentData.kids) {
          // Fetch nested comments if available
          commentData.nestedComments = await fetchComments(commentData.kids);
        }
        return commentData;
      })
    );

    return comments;
  };

  const fetchData = async () => {
    try {
      setLoader(true);
      const mainComments = await fetchComments(data.kids);
      setComments(mainComments);
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [data.kids]);

  return (
    <div className="dark:text-gray-100 rounded-lg my-2">
      <div className="container max-w-4xl px-6 py-6 mx-auto rounded-lg shadow-sm dark:bg-gray-700">
        <div className="comments-heading flex justify-between">
        <h2 className="text-2xl text-white font-bold mb-5">All Comments</h2>
        <RefreshButton loader={loader} clickAction={() => fetchData()}/>
        </div>
        {comments.filter(comment => !comment.dead).map((comment) => (
          <div
            className="rounded-lg p-6 my-4 dark:bg-gray-900"
            key={comment.id}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm dark:text-gray-400">
                {new Date(comment.time * 1000).toLocaleDateString()}
              </span>
              <span>
                <span className="text-sm dark:text-gray-400">
                  Replies:{" "}
                </span>
                <span className="px-1 py-1 font-semibold text-sm rounded dark:bg-violet-400 dark:text-gray-900">
                  {comment.kids ? comment.kids.length : 0}
                </span>
              </span>
            </div>
            <div className="mt-3">
                <div
                  className="comment text-wrap break-words"
                  dangerouslySetInnerHTML={{ __html: comment.text }}
                ></div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div>
              {comment.nestedComments && (
                <button
                className="text-violet-400"
                  onClick={() => setNestedComments(comment.nestedComments)}
                >
                  Load Replies
                </button>
              )}
              </div>
              <div>
                <span className="flex items-center">
                  <span className="hover:underline dark:text-gray-400">
                    {comment.by}
                  </span>
                </span>
              </div>
            </div>
            {nestedComments.map((nestedComment) => (
              nestedComment.parent === comment.id ?
              <div key={nestedComment.id} className="nested-comment rounded-lg mt-3 ml-5 p-3 shadow-sm bg-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm dark:text-gray-400">
                    {new Date(nestedComment.time * 1000).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-3">
                    <div
                      className="comment text-wrap text-sm break-words"
                      dangerouslySetInnerHTML={{ __html: nestedComment.text }}
                    ></div>
                </div>
                <div className="flex items-center justify-end mt-2">
                  <div>
                    <span className="flex items-center">
                      <span className="hover:underline text-sm dark:text-gray-400">
                        {nestedComment.by}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              : <></>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
