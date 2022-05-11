
import { Link } from 'react-router-dom';


import Swal from 'sweetalert2'


import React, { Component } from 'react'

import axios from 'axios';

export class MovieList extends Component {


  constructor() {
    super();
    this.state = {
      hover: "",
      pArr: [1],
      movies: [],
      movBackup: [],
      CurrentPage: 1,
      inputValue: "",
      favourites: [],
      data: [],
      HeadLine: "Trending",
      id: 0,
      link : "",
      // newid : localStorage.setItem('movId',this.state.id),
    };
  }
  async componentDidMount() {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=017ffe9cf18ec497c6bf2ba0d3bb2f05&language=en-US&page=${this.state.CurrentPage}`)
    // const  res = await axios.get ("https://api.themoviedb.org/3/discover/movie?api_key=017ffe9cf18ec497c6bf2ba0d3bb2f05&language=en-US&sort_by=popularity.desc&page=1&primary_release_year=2022&with_original_language=hi|kn|ml|ta|te")
    let MoviesData = res.data
    this.setState({
      movies: [...MoviesData.results]

    })
    this.setState({ movBackup: [...MoviesData.results] })



  }

  changeMoviePage = async () => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=017ffe9cf18ec497c6bf2ba0d3bb2f05&language=en-US&page=${this.state.CurrentPage}`)
    // const  res = await axios.get ("https://api.themoviedb.org/3/discover/movie?api_key=017ffe9cf18ec497c6bf2ba0d3bb2f05&language=en-US&sort_by=popularity.desc&page=1&primary_release_year=2022&with_original_language=hi|kn|ml|ta|te")
    let MoviesData = res.data
    this.setState({
      movies: [...MoviesData.results],
    })


  }

  HandleNext = () => {
    // let tempArr = []
    // for (let i = 1; i <= this.state.pArr.length + 1; i++){
    //       tempArr.push(i)     
    // }
    // this.setState({
    //   pArr : [...tempArr],
    //   CurrentPage : this.state.CurrentPage + 1,
    // },this.changeMoviePage)

    //MY WAY 

    let temp = [...this.state.pArr]

    temp.push(temp.length + 1)

    this.setState({
      CurrentPage: this.state.CurrentPage + 1,
      pArr: temp
    }, this.changeMoviePage)


  }

  HandlePrevious = () => {

    if (this.state.CurrentPage > 1) {
      this.setState({
        CurrentPage: this.state.CurrentPage - 1,
      }, this.changeMoviePage)
    }

  }
  HandlePageClick = (value) => {
    if (value != this.state.CurrentPage) {
      this.setState({
        CurrentPage: value
      }, this.changeMoviePage)
    }
  }


  handleFavourites = (movieObj) => {
    let oldData = JSON.parse(localStorage.getItem('movies-app') || '[]')

    if (this.state.favourites.includes(movieObj.id)) {
      oldData = oldData.filter((movie) => movie.id != movieObj.id)
    }

    else {
      oldData.push(movieObj)
    }

    localStorage.setItem("movies-app", JSON.stringify(oldData))
    console.log(oldData)

    this.handleFavouritesState()


  }
  handleFavouritesState = () => {
    let oldData = JSON.parse(localStorage.getItem('movies-app') || '[]')
    let temp = oldData.map((movie) => movie.id)

    this.setState({
      favourites: [...temp]
    })
  }
  UniversalSEarch = async () => {
    let url = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=017ffe9cf18ec497c6bf2ba0d3bb2f05&query=${this.state.inputValue}`)
    //   fetch(url).then(res => res.json()).then(data => {
    let Searcheddata = url.data.results;
    console.log(url.data.results);
    if (this.state.data.length >= 0) {
      this.setState({
        movies: [...Searcheddata],
        HeadLine: "Showing Results For : " + this.state.inputValue.toUpperCase()
      })
    }
    // })
  }
  BollywoodFilter = async () => {
    const bollywood_url = "https://api.themoviedb.org/3/discover/movie?api_key=017ffe9cf18ec497c6bf2ba0d3bb2f05&with_origin_country=IN";

    // let url = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=017ffe9cf18ec497c6bf2ba0d3bb2f05&with_origin_country=IN")
    let url = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=017ffe9cf18ec497c6bf2ba0d3bb2f05&language=en-US&sort_by=popularity.desc&page=1&primary_release_year=2022&with_original_language=hi|kn|ml|ta|te")
    console.log(url.data.results);
    let Searcheddata = url.data.results;
    this.setState({
      movies: [...Searcheddata],
      HeadLine: "Bollywood Movies"
    })

  }
  HollyWoodFilter = async () => {

    // let url = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=017ffe9cf18ec497c6bf2ba0d3bb2f05&with_origin_country=IN")
    let url = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=017ffe9cf18ec497c6bf2ba0d3bb2f05&language=en-US&sort_by=popularity.desc&page=1&primary_release_year=2022&with_original_language=en")
    console.log(url.data.results);
    let Searcheddata = url.data.results;
    this.setState({
      movies: [...Searcheddata],
      HeadLine: "Hollywood Movies"
    })

  }
  UpcomingFilter = async () => {

    // let url = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=017ffe9cf18ec497c6bf2ba0d3bb2f05&with_origin_country=IN")
    let url = await axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=017ffe9cf18ec497c6bf2ba0d3bb2f05&language=en-US&page=1")
    console.log(url.data.results);
    let Searcheddata = url.data.results;
    this.setState({
      movies: [...Searcheddata],
      HeadLine: "Upcoming Movies"
    })

  }
  // Info = (ele) => {

  //   // <Banner/>
  //   // Swal.fire(`Title  :  ${ele.title} \n\n Overview         :  ${ele.overview} \n\n Popolarity  :  ${ele.popularity} \n\n Release Date  :  ${ele.release_date} \n\n IMDB Rating  :  ${ele.vote_average} `)
  //   Swal.fire({
  //     imageUrl: `https://image.tmdb.org/t/p/original${ele.backdrop_path}`,
  //     imageHeight: 300,
  //     imageWidth: 600,

  //     background: '#5B3838',
  //     color: '#A6E90B',
  //     width: 1000,
  //     title: 'About Movie',
  //     html:
  //       `<div style = {{position : "absolute"}}>\n\n
  //     <h1><u> <b>TITLE</b> </u>: ${ele.title}</h1>
  //     <p> <u> <b>OVERVIEW</b></u> : ${ele.overview}</p>
  //     <h3> <u> <b>POPULARITY</b> </u>: ${ele.popularity}</h3>
  //     <h3> <u> <b>RELEASE DATE </b></u>:  ${ele.release_date}</h3>
  //     <h3> <u> <b>IMDB RATING </b></u>: ${ele.vote_average}</h3>
  //     </div>`
  //   })


  // }

  Info1 = (ele)=> {
    localStorage.setItem('movId',ele.id)
    console.log(ele.id);
    // window.open("/info")

  }

  Watch =async (ele)=>{
    let url = await axios.get(`http://api.themoviedb.org/3/movie/${ele.id}/videos?api_key=017ffe9cf18ec497c6bf2ba0d3bb2f05`)
    let key = url.data.results[url.data.results.length - 1].key;
    // let YTurl = `https://www.youtube.com/watch?v=${key}`
    localStorage.setItem("ytlink",key)
    // console.log(YTurl);
    console.log(key);
    
    // window.open(`https://www.youtube.com/watch?v=${key}`)
  }




  render() {
    // let MoviesArr = movies.results;
    let MoviesArr = this.state.movies;

    return (
      <>
        <div className="line"></div>
        <div className="catagory" >
          <button onClick={this.BollywoodFilter} className='CatagoryButtons'>BollyWood</button>
          <button onClick={this.HollyWoodFilter} className='CatagoryButtons'>hollywood</button>
          <button onClick={this.UpcomingFilter} className='CatagoryButtons'>Upcoming</button>
        </div>
        <div className="line"></div>


        <div className="search" >
          <h3 style={{ fontSize: '2rem', textDecoration: "none" }} placeholder="Search" id='searchtext'>  Search All Movies : </h3>
          <input type="text" className='inp-field' value={this.state.inputValue} onChange={(e) => this.setState({ inputValue: e.target.value })} />
          <button className='butt btn' onClick={this.UniversalSEarch}>Search</button>

        </div>

        <div>
          <h3 className='text-center'><strong style={{ color: 'white', height: '1rem' }}> <h1 style={{ fontSize: '2rem', textDecoration: "none", padding: '1rem' }}> {this.state.HeadLine} </h1></strong></h3>
        </div>

        <div className="movies-list">


          {

            MoviesArr.map((MovieElement) => (
              <>
                  <div onMouseEnter={()=>this.Watch(MovieElement)}>
                <div className="card movie-card "  onMouseEnter={() => this.setState({ hover: MovieElement.id })} onMouseLeave={() => this.setState({ hover: "" })} >
                  <div className="rating" style={{ position: "relative", display: "flex" }}>
                    <div className="overview">{MovieElement.overview}</div>

                    
                    <Link to='/info'><img onClick={() => this.Info1(MovieElement)}  src={`https://image.tmdb.org/t/p/original${MovieElement.backdrop_path}`}

                      style={{ height: '40vh', width: '100vw' }} className="card-img-top movie-img" alt="..." /></Link>
                    {/* <div className='' >imdb</div> */}
                    <i className="fa-brands fa-imdb rating-button"> <span style={{ fontSize: "small" }}> {MovieElement.vote_average}</span></i>
                  </div>

                  <div  className="card-title Movie-title " style={{ display: "inline" }}>

                    <h5 style={{ color: 'white' }} >{MovieElement.title}</h5>
                    <h6 >  Release Date: {MovieElement.release_date}</h6>

                    {/* Trailor button */}

                    <Link to="/yt"><button   className='trailor-btn'>Watch Trailer</button></Link>

                  </div>

                  <div className="button-wrapper" style={{ display: "flex" }} >
                    {
                      this.state.hover == MovieElement.id &&
                      <a onClick={() => this.handleFavourites(MovieElement)} className='movie-button btn btn-primary' >
                        

                        {this.state.favourites.includes(MovieElement.id) ? "Remove From Favourites" : "Add To Favourites"}
                      </a>

                    }

                  </div>
                </div>
                </div>
              </>

            ))

          }
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <nav aria-label="Page navigation example ">
            <ul className="pagination" style={{ cursor: "pointer" }}>
              <li className="page-item"><a className="page-link" onClick={this.HandlePrevious}>Previous</a></li>
              {
                this.state.pArr.map((value) => (
                  <li className="page-item"><a className="page-link" onClick={() => this.HandlePageClick(value)}>{value}</a></li>
                ))
              }

              <li className="page-item"><a className="page-link" onClick={this.HandleNext}>Next</a></li>
            </ul>
          </nav>
        </div>

      </>
    )
  }
}

export default MovieList
