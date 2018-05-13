import React , { Component } from 'react'
import './MovieView.css'
import minutes from '../../assets/circular-clock-tool.png'
import ranking from '../../assets/star.png'
import cost from '../../assets/dollar-symbol.png'
import Coverflow from 'react-coverflow'
import { StyleRoot } from 'radium'


class MovieView extends Component
{
    constructor(props)
    {
        super();
        this.state = {
            genres:[],
            budget:'',
            title:'',
            overview:'',
            date: '',
            revenue:'',
            runtime:'',
            vote:'',
            image:'',
            similar:[],
            recommended :[]
        }
    }


    componentDidMount()
    {
        this.fetchMovieDetails();
        this.fetchRecommended(); 
    }

    fetchMovieDetails()
    {
        fetch('https://api.themoviedb.org/3/movie/' + this.props.match.params.movieID + '?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US')
        .then( response => response.json())
        .then(response => this.setState({
            genres: response.genres,
            budget: response.budget,
            title: response.title,
            overview: response.overview,
            date: response.release_date,
            revenue: response.revenue,
            runtime:response.runtime,
            vote: response.vote_average,
            image: "http://image.tmdb.org/t/p/w185//"+response.poster_path
            
        }))
        .catch( () => console.log("error"))
    }

    fetchRecommended()
    {
        fetch('https://api.themoviedb.org/3/movie/' + this.props.match.params.movieID + '/recommendations?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US&page=1')
        .then( response => response.json())
        .then( response =>  this.setState({
            recommended : response.results
        }))
        .catch( () => console.log("error"))
    }

    render()
    {

        return(
            <div>
                <div className="movie_container">

                    <div className="movie_header">

                        <div className="movie_poster">
                            <img src={this.state.image} alt=" movie poster"/>                        
                        </div>
                        <div className="movie_info">

                            <div className="informations">
                                <p className="informations_title">{this.state.title}</p>
                                <p className="informations_genres">{ this.state.genres.map( genre=>{ return <span key={genre.id}> | {genre.name}  </span>})}</p>
                                <p className="informations_date">{this.state.date}</p>
                            </div>
                        
                        </div>
                    </div>

                    <div className="movie_stats">

                        <div className="movie_minutes">

                            <div>
                                <img src={minutes} alt="minutes"/>
                                <p>{this.state.runtime} minutes</p>
                            </div>

                        </div>
                        <div className="movie_ranking">
                            <div>
                                <img src={ranking} alt="minutes"/>
                                <p>{this.state.vote}</p>
                            </div>
                        </div>
                        <div className="movie_cost">
                            <div>
                                <img src={cost} alt="minutes"/>
                                <p>{this.state.revenue}</p>
                            </div>

                        </div>
                    </div>

                    <div className="movie_body">
                        <div className="movie_description">
                            <p>{this.state.overview}</p>
                        </div>
                        <div className="recommended">

                        <p>Recommended movies . . . </p>
                            <div className="recommended_movies">
                                    <div>
                                        <StyleRoot>
                                            <Coverflow
                                                displayQuantityOfSide={2}
                                                navigation
                                                infiniteScroll
                                                enableHeading
                                                media={{
                                                    '@media (max-width: 900px)': {
                                                    width: '600px',
                                                    height: '500px'
                                                    },
                                                    '@media (min-width: 900px)': {
                                                    width: '960px',
                                                    height: '600px'
                                                    },
                                                    '@media (max-width: 765px)': {
                                                        width: '550px',
                                                        height: '500px'
                                                    },
                                                    '@media (max-width: 480px)': {
                                                        width: '330px',
                                                        height: '600px'
                                                    },
                                                    '@media (max-width: 320px)': {
                                                        width: '300px',
                                                        height: '500px'
                                                    },
                                                }}
                                                >
                                                {
                                                    this.state.recommended.map( movie=>{
                                                        return <img key={movie.id} src ={ `http://image.tmdb.org/t/p/w185//${movie.poster_path}`}  alt="" />
                                                    })
                                                }
                                                </Coverflow>
                                            </StyleRoot>
                                     </div>
                            </div>
                        
                        
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


export default MovieView;