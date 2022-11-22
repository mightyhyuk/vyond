import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: { _id: "", name: "All" },
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, selectedGenre, movies } = this.state;

    if (count === 0) return <p>There are no movies in the DB.</p>;

    const filteredMovies = selectedGenre._id
      ? movies.filter((movie) => movie.genre._id === selectedGenre._id)
      : movies;

    const paginatedMovies = paginate(filteredMovies, currentPage, pageSize);

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

  handleSort = (path) => {
    console.log(path);
  };
}

export default Movies;
