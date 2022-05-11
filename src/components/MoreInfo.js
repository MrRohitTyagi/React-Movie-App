import React, { Component } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'


export class MoreInfo extends Component {

    constructor() {
        super();
        this.state = {
            cast: [],
            Bcast: [],
            info : "Cast Names",
            crew : [],
            Bcrew : [],

        };
    }

    async componentDidMount() {
        let id = localStorage.getItem("movId")
        console.log(id);
        const url = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=017ffe9cf18ec497c6bf2ba0d3bb2f05&language=en-US&append_to_response=credits`)
        const data = url.data.credits
        // console.log(data);
        this.setState({
            cast: [...data.cast],
            Bcast: [...data.cast],
            // crew : [...data.crew],
            Bcrew : [...data.crew]
        })
    }
    personInfo =async (ele)=>{
        const url = await axios.get(`https://api.themoviedb.org/3/person/${ele.id}?api_key=017ffe9cf18ec497c6bf2ba0d3bb2f05&language=en-US`)
        console.log(url.data);
        let Data = url.data
        Swal.fire({
            imageUrl: `https://image.tmdb.org/t/p/original${ele.profile_path}`,
            imageHeight: 300,
            imageWidth: 600,
      
            background: '#5B3838',
            color: '#A6E90B',
            width: 1000,
            title: 'About Movie',
            html:
              `<div style = {{position : "absolute"}}>\n\n
            <h1><u> <b>Name</b> </u>: ${Data.name}</h1>
            <h1><u> <b>Gender</b> </u>: ${(Data.gender)==2 ? "Male" : "Female"}</h1>
            <h3> <u> <b>POPULARITY</b> </u>: ${Data.popularity}</h3>
            <p> <u> <b>Bday</b></u> : ${Data.birthday}</p>
            <h3> <u> <b>Place Of Birth </b></u>:  ${Data.place_of_birth}</h3>
            <p> <u> <b>Biography</b></u> : ${Data.biography}</p>
            </div>`
          })

    }

    crew = ()=>{
        let data = this.state.crew
        // console.log(data);
        this.setState({
            cast : this.state.Bcrew,
            info : "Crew names"
        })

    }
    cast = ()=>{
        let data = this.state.cast
        // console.log(data);
        this.setState({
            cast : this.state.Bcast,
            info : "Cast names"
        })

    }

    render() {
        let MoviesArr = this.state.cast
        // console.log(MoviesArr);
        return (
            <>
            <div style={{height : "12vh"}}></div>
            <div className="cast-crew-nav shadow" style={{borderRadius :"50px"}}>
                <h1 onClick={()=>this.cast()} className='cast_heading shadow'>Cast</h1>
                <h1 onClick={()=>this.crew()} className='cast_heading shadow'>Crew</h1>

            </div>
            <div className="info-header">
                <h1 style={{color:"white",fontSize :"25px",margin : "1rem"}}>{this.state.info}</h1>
            </div>

                <div className="More-info-Div">
                    {

                        MoviesArr.map((MovieElement) => (


                            <div className="card movie-card shadow" >
                                <div className="rating" style={{ position: "relative", display: "flex" }}>
                                    <div className="overview">{MovieElement.character}</div>


                                    <img onClick={() => this.personInfo(MovieElement)} src={`https://image.tmdb.org/t/p/original${MovieElement.profile_path}`}
                                        style={{ height: '40vh', width: '100vw' }} className="card-img-top movie-img" alt="..." />
                                    {/* <div className='' >imdb</div> */}
                                    <i className="fa-brands fa-imdb rating-button"> <span style={{ fontSize: "small" }}> {MovieElement.popularity}</span></i>
                                </div>

                                <div className="card-title Movie-title " style={{ display: "inline" }}>

                                    <h5 style={{ color: 'white' }} >Original Name : {MovieElement.original_name}</h5>
                                    <h5 style={{ color: 'white' }} >Movie name : {MovieElement.character}</h5>
                                    {/* <h6 >  Release Date: {MovieElement.release_date}</h6> */}

                                    {/* Trailor button */}


                                </div>


                            </div>


                        ))

                    }
                    </div>



                </>

                )
    }
}

                export default MoreInfo