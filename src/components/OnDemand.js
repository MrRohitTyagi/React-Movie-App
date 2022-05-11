import React, { Component } from 'react'
import { movies } from '../MyData'

export class MovieList extends Component {


  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    let MoviesArr = movies.results;
    console.log(MoviesArr);
    return (
      <>
      <div style={{height : "15vh"}}></div>
        <div>
          <h3 className='text-center '><strong style={{ color: 'white', height: '1rem',marginTop:'1rem' }}>Movies with Streaming Links</strong></h3>
        </div>
        <div className="hello" style={{display :"flex",flexWrap :"wrap" ,alignItems :"center" ,justifyContent : "center"}}>
        {
          MoviesArr.map((MovEle) => (
            <div className="movies-list">







              <div className="card movie-card "  >
                <div className="rating" style={{ position: "relative", display: "flex" }}>
                  <img src={MovEle.img_path}
                    style={{ height: '40vh', width: '20vw' }} className="card-img-top movie-img" alt="..." />
                  {/* <div className='' >imdb</div> */}
                  <i className="fa-brands fa-imdb rating-button"> <span style={{ fontSize: "small" }}> {MovEle.vote_average}</span></i>
                </div>

                <div className="card-title Movie-title " style={{ display: "inline" }}>

                  <h5 style={{ color: 'white' }} >{MovEle.title}</h5>
                  <h6 > Release Date : {MovEle.release_date} </h6>

                </div>

                <div className="button-wrapper" >
                  {
                    <a href={MovEle.watch_Link} target='_blank' className='movie-button btn btn-primary' style={{ display: 'flex', justifyContent: 'center',left :'6rem'  }}>Watch Now</a>

                  }

                </div>
              </div>




            </div>

          ))

        }
        </div>








      </>
    )
  }
}

export default MovieList
