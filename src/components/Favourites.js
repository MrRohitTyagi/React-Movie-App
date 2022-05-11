import React, { Component } from "react";

// import { movies } from "../movieData";

export class Favourites extends Component {
  constructor() {
    super();

    this.state = {
      genres: [],
      currgenre: "All genres",
      movies: [],
      currText: ""
    };
  }

  componentDidMount() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let data = JSON.parse(localStorage.getItem("movies-app") || "[]");
    let tempArr = [];
    data.map((movieObj) => {
      if (!tempArr.includes(genreids[movieObj.genre_ids[0]])) {
        tempArr.push(genreids[movieObj.genre_ids[0]]);
      }
    });

    tempArr.unshift("All genres");

    this.setState({
      movies: [...data],
      genres: [...tempArr],
    });
  }

  HandleGenreChange = (genre) => {
    this.setState({
      currgenre: genre
    })
  }
  deleteMovie = (ele) => {
    let id = ele.id
    let movar = []
    let data = JSON.parse(localStorage.getItem("movies-app"));
    data.forEach(elem => {
      if (elem.id !== id) {
        movar.push(elem)
      }
      localStorage.setItem("movies-app", JSON.stringify(movar))
      this.setState({
        movies: movar
      })
    });


  }

  render() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };



    let filterArr = [];
    if (this.state.currText == '') {

      filterArr = this.state.movies
    }
    else {
      filterArr = this.state.movies.filter((MovieEle) => {
        let title = MovieEle.title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase().trim())
      })
    }






    if (this.state.currgenre != 'All genres') {
      filterArr = this.state.movies.filter((movObj) =>
        genreids[movObj.genre_ids[0]] == this.state.currgenre
      )
    }

    return (
      <>
      <div style={{height : "12vh"}}></div>
      <div className="main">
        <div className="row">
          <div className="col-3">
            <ul className="list-group genre-selector">
              {this.state.genres.map((genre) =>
                this.state.currgenre == genre ? (
                  <li
                    style={{

                      background: "#3f51b5",
              color: "white",
              fontWeight: "bold",
                    }}
              className="list-group-item"
                  >
              {genre}
            </li>
            ) : (
            <li style={{ color: "#3f51b5" }} className="list-group-item" onClick={() => this.HandleGenreChange(genre)}>
              {genre}
            </li>
            )
              )}
          </ul>
        </div>
        <div className="col-9 favourites-table">
          <div className="row">
            <input
              value={this.state.currText}
              onChange={(e) => this.setState({ currText: e.target.value })}
              placeholder="Search"
              type="text"
              className="input-group-text col search-bar"
            />
          </div>

          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th ></th>
                  <th style={{ color: " white" }} scope="col">Title</th>
                  <th style={{ color: " white" }} scope="col">Genre</th>
                  <th style={{ color: " white" }} scope="col">Popularity</th>
                  <th style={{ color: " white" }} scope="col">Ratings</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {

                  filterArr.map((movieElem) => (
                    <tr style={{
                      color: " white"
                    }}>
                      <td >
                        <img
                          style={{ width: "6rem" }}
                          src={`https://image.tmdb.org/t/p/original${movieElem.backdrop_path}`}
                        />
                      </td>
                      <th scope="row">{movieElem.title}</th>
                      <td>{genreids[movieElem.genre_ids[0]]}</td>
                      <td>{movieElem.popularity}</td>
                      <td>{movieElem.vote_average}</td>
                      <td>
                        <button onClick={() => this.deleteMovie(movieElem)} type="button" className="btn btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      </div >
      </>
    );
  }
}

export default Favourites;