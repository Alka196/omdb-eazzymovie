import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MovieSearch.css";

const MovieSearch = ({ apiKey }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [watchingDate, setWatchingDate] = useState('');

  const movieRows = [];

  const searchMovies = async () => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${currentPage}`);
    const data = await response.json();
    setMovies(data.Search || []);
    setTotalPages(Math.ceil(data.totalResults / 9));
  };

  useEffect(() => {
    if (query) {
      searchMovies();
    }
  }, [query, currentPage]);

  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    if (query) {
      searchMovies();
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleMovieClick = async (imdbID) => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
    const data = await response.json();
    setSelectedMovie(data);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleWatchingDateChange = (date) => {
    setWatchingDate(date);
  };

  const handleRating = (movieId, rating) => {
    // code to handle the rating for the movie with the given ID
  };

  const handleSaveRating = () => {
    // Save rating and watching date for selected movie
    const updatedMovies = movies.map((movie) => {
      if (movie.imdbID === selectedMovie.imdbID) {
        const newRatings = [...(movie.ratings || []), { rating, watchingDate }];
        return { ...movie, ratings: newRatings };
      }
      return movie;
    });
    setMovies(updatedMovies);
  
    setSelectedMovie(null);
    setRating(0);
    setWatchingDate('');
  };

  const renderMovieList = () => {
    if (selectedMovie) {
      return (
        <div className="movie-popup">
          <div className="movie-popup-content">
            <h2>{selectedMovie.Title}</h2>
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
            <div>
              <label>Name:</label>
              <input type="text" required />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
            </div>
            <div>
              <label>Mobile Number:</label>
              <input type="tel" required pattern="[0-9]{10}" />
            </div>
            <div>
              <label>Watching Date:</label>
              <DatePicker selected={watchingDate} onChange={handleWatchingDateChange} required />
            </div>
            <div>
              <label>Rating:</label>
              <select value={rating} onChange={handleRatingChange}>
                <option value={0}>--Select Rating--</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                </select>
                </div>
                <button onClick={handleSaveRating}>Save Rating</button>
                </div>
                </div>
                );
                }

                return (
                    <div className="movie-list">
                      {movies.map((movie) => (
                        <div key={movie.imdbID} className="movie">
                          <img src={movie.Poster} alt={movie.Title} onClick={() => handleMovieClick(movie.imdbID)} />
                          <div>{movie.Title}</div>
                          <div>{movie.Year}</div>
                          <div>
                            <button onClick={() => handleRating(movie.imdbID, 1)}>1</button>
                            <button onClick={() => handleRating(movie.imdbID, 2)}>2</button>
                            <button onClick={() => handleRating(movie.imdbID, 3)}>3</button>
                            <button onClick={() => handleRating(movie.imdbID, 4)}>4</button>
                            <button onClick={() => handleRating(movie.imdbID, 5)}>5</button>
                          </div>
                        </div>
                      ))}
                      {totalPages > 1 && (
                        <div className="pagination">
                          {[...Array(totalPages).keys()].map((pageNumber) => (
                            <button
                              key={pageNumber}
                              onClick={() => handlePageChange(pageNumber + 1)}
                              className={currentPage === pageNumber + 1 ? 'active' : ''}
                            >
                              {pageNumber + 1}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                };

                return (
                <div className="movie-search" >
                <form onSubmit={handleSearch}>
                <input
                type="text"
                placeholder="Search Movie with …"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                />
                <button type="submit">Search</button>
                </form>
                {renderMovieList()}
                </div>
                );
                };
                
                export default MovieSearch;