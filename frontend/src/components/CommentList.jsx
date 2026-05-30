export default function CommentList({ comments }) {
  return (
    <div className="card">
      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to share tips.</p>
      ) : (
        <div className="grid">
          {comments.map((comment) => (
            <div key={comment._id} className="card">
              <p>{comment.text}</p>
              <p className="status-line">{comment.author?.name} · {new Date(comment.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
