import Like from "./common/like";

const MoviesTable = (props) => {
  const { movies, handleDelete, handleLike, handleSort } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => handleSort("title")}>Title</th>
          <th onClick={() => handleSort("genre")}>Genre</th>
          <th onClick={() => handleSort("numberInStock")}>Stock</th>
          <th onClick={() => handleSort("dailyRentalRate")}>Rate</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => {
          return (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like
                  liked={movie.liked}
                  handleLike={() => handleLike(movie)}
                />
              </td>
              <td>
                <button
                  onClick={() => handleDelete(movie)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MoviesTable;
