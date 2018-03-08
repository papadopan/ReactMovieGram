import React, {Component} from 'react'
import './MovieList.css';
import left from "../../assets/long-left.svg"
import loader from "../../assets/loader.gif"
import { Link } from 'react-router-dom'


class MovieList extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      showingSideBar : false,
      top_rated: [],
      id:"",
      title:"",
      date:" ",
      overview:"",
      original_language:"",
      image_path:"",
      spoken_languages: [],
      movie_details:[],
      isLoaderOn:false
    }
  }
  componentDidMount(){
    if(this.props.value !==" ")
    {
      this.setState({isLoaderOn:true})
      this.fetchGenreMovies();
    }
  }
  fetchMovieDetails(id){
    fetch('https://api.themoviedb.org/3/movie/'+id+'?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US')
    .then(response => response.json())
    .then(data=> this.setState({
        title: data.title,
        date: data.release_date,
        overview:data.overview,
        original_language:data.original_language,
        image_path: "http://image.tmdb.org/t/p/w185//" +data.poster_path,
        isLoaderOn:false
    }))
    .catch("There is an error with the API")
  }
  fetchGenreMovies()
  {
    fetch('https://api.themoviedb.org/3/search/movie?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US&query='+this.props.value )
    .then(response => response.json())
    .then(data => data.results.map(movies =>(
      {
        title :`${movies.original_title}`,
        date: `${movies.release_date}`,
        image: `http://image.tmdb.org/t/p/w185//${movies.poster_path}`,
        id: `${movies.id}`
      }
    )))
    .then(data => this.setState({
      top_rated: data,
      isLoaderOn:false
    }))
    .catch("There is an error with the API")
  }

  //handling functions
  ButtonHandle= (e)=>
  {
    this.props.AddMyMovies(e.target.id)
  }
  handleImageClick = (e)=>
  {
    this.setState({
      id: e.target.id,
      isLoaderOn:true
    })
    this.fetchMovieDetails(e.target.id);
  }
  handleULClick = (event) =>
  {
    this.setState({drop:event.target.className})
  }
  render()
  {

    if(this.props.value !== " ")
    {
          return(
            <div className="second_screen">
            <div className="go_back">
              <Link to="/results"><img src={left} alt="arrow"/></Link>
            </div>

              <div className="wrapper">
                  <div className="search_header">
                    <h1>movies about . . . {this.props.value}</h1>
                  </div>
                  <div className="container">
                    <div className="modal fade" id="myModal" role="dialog">
                      <div className="modal-dialog">
                        <div className="modal-content">
                              <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal"><i className="fas fa-times"></i></button>
                                <h4 classame="modal-title">{this.state.title} ({this.state.date})</h4>
                                <p>Original language: {this.state.original_language} </p>
                              </div>
                                  <div className="modal-body">
                                    <img  src={this.state.image_path} alt="movie"/>
                                    <p>{this.state.overview}</p>
                                  </div>
                                <div className="modal-footer">
                                </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div className="results_list">
              <div className={this.state.isLoaderOn ? "loader showing" :"loader hiding"}>
                <img src={loader} alt="loader"  />
              </div>
                  {
                      this.state.top_rated.map(movies =>
                        {
                          return      <div key={movies.id} className="movie_slides">
                                            <div className="card">
                                            <div  onClick={this.handleImageClick} data-toggle="modal" data-target="#myModal">
                                              <img src={movies.image} alt="movie" id={movies.id}/>
                                              </div>
                                            <div className="info">
                                              <p>{movies.title}({movies.date})</p>
                                            </div>
                                            <button className="btn" onClick={this.ButtonHandle}  id={movies.id}>{this.props.mymovies.includes(movies.id) ? "Added!!!" : "Add"}</button>
                                            </div>
                                          </div>
                        }
                      )
                  }
        </div>
      </div>
          );
      }
    else
    {
      return(
          <div className="error_screen">

          <div className="back_button">
              <Link to="/results"><img src={left} alt="arrow" /></Link>
          </div>

          <div className="error_message">
              <h1>You search is empty </h1>
          </div>

          </div>
      );
    }
  }
}
export default MovieList;
