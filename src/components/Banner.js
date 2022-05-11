 import React, { Component } from 'react'
 import { movies } from '../movieData'
 import { Link } from 'react-router-dom';



 
 export class Banner extends Component {

  click=(id)=>{
    localStorage.setItem("movId",id)
    console.log(id);
    // window.open("/info")
  }
   render() {
    let MoviesArr = movies.results[Math.floor((Math.random() * 20) + 1)]
    
     return (
       <>
       <div style={{height : "15vh"}}></div>
        <div className="banner-card">
        <Link to="/info"><img onClick={()=> this.click(MoviesArr.id)} src={`https://image.tmdb.org/t/p/original${MoviesArr.backdrop_path}`} className="card-img-top banner-img" alt="..."/></Link>
          <h5 className="card-title banner-title neonText ">{MoviesArr.title}</h5>
          <p className="card-text banner-text">{MoviesArr.overview}</p>
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
      </div>
       </>
     )
   }
 }
 
 export default Banner

 
 