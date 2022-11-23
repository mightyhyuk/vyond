import React, { Component } from "react";
import Like from "./common/like";

class MoviesTable extends Component {
  render() {
    const { movies, handleDelete, handleLike } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.determineSortOrder("title")}>Title</th>
            <th onClick={() => this.determineSortOrder("genre")}>Genre</th>
            <th onClick={() => this.determineSortOrder("numberInStock")}>
              Stock
            </th>
            <th onClick={() => this.determineSortOrder("dailyRentalRate")}>
              Rate
            </th>
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
  }

  determineSortOrder = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.handleSort(sortColumn);
  };
}

export default MoviesTable;
