import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: { _id: "", name: "All" },
    sortColumn: { path: "title", order: "asc" },
  };

  render() {
    const { length: count } = this.state.movies;
    const { movies, currentPage, pageSize, selectedGenre, sortColumn } =
      this.state;

    if (count === 0) return <p>There are no movies in the DB.</p>;

    const filteredMovies = selectedGenre._id
      ? movies.filter((movie) => movie.genre._id === selectedGenre._id)
      : movies;

    const sortedMovies = filteredMovies.sort((a, b) => {
      if (typeof a[sortColumn.path] === "string") {
        const nameA = a[sortColumn.path].toUpperCase();
        const nameB = b[sortColumn.path].toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      } else if (typeof a[sortColumn.path] === "number") {
        return a[sortColumn.path] - b[sortColumn.path];
      }
      return 0;
    });

    if (this.state.sortColumn.order === "desc") {
      sortedMovies.reverse();
    }

    const paginatedMovies = paginate(sortedMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={selectedGenre}
            handleItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filteredMovies.length} movies in the database.</p>
          <MoviesTable
            movies={paginatedMovies}
            sortColumn={sortColumn}
            handleDelete={this.handleDelete}
            handleLike={this.handleLike}
            handleSort={this.handleSort}
          />
          <Pagination
            itemCount={filteredMovies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            handlePageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const genres = [this.state.selectedGenre, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
}

export default Movies;
