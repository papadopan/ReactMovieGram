import React, {Component} from 'react'
import './ResultsView.css';
import SideBar from "./SideBar"
import logo from "../../assets/logo1.png"
import image from "../../assets/logo3.png"
import loader from "../../assets/loader.gif"
import {Link} from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon'
import Pagination from "react-js-pagination"
import IconButton from 'material-ui/IconButton'

const styles = {
  success :{
    color:"#962A38", 
    fontSize: "30px"
  },
  fail :{
    borderColor : "#962A38",
    color: "white", 
    fontSize: "25px"
  } 
}

class ResultsView extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      showingSideBar : false,
      top_rated: [],
      id:"10",
      title:"Firends",
      date:" 1994-08-02",
      overview:"jndjnjkcnwecnblnlnclwbelcblinblnlcnewinl",
      original_language:"en",
      image_path:"",
      spoken_languages: [],
      movie_details:[],
      filter: "top_rated",
      filter_name: "top rated",
      isLoaderOn:false,
      activePage: 1,
      results:1,
      pages:1,
      error:false
    }
  }

  componentDidMount(){
    this.setState({isLoaderOn:true , activePage:1})
    this.fetchInfo(this.state.filter)
    this.fetchMovies(this.state.filter , this.state.activePage); 
  }
  fetchInfo(filtering)
  {
    fetch('https://api.themoviedb.org/3/movie/' + filtering+'?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US&page=1')
    .then(response => response.json())
    .then(response => this.setState({
        activePage : response.page,
        totalResults: response.total_results,
        totalPages : response.total_pages
    }))
    .catch( ()=> this.setState({error:true}) )

  }
  fetchMovieDetails(id){
    fetch('https://api.themoviedb.org/3/movie/'+id+'?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US')
    .then(response => response.json())
    .then(data=> this.setState({
        title: data.title,
        date: data.release_date,
        overview:data.overview,
        original_language:data.original_language,
        image_path: "http://image.tmdb.org/t/p/w185//"+data.poster_path,

        isLoaderOn:false
    }))
    .catch(() => this.setState({error:true}))

  }
  fetchMovies(filtering , num )
  {
    fetch('https://api.themoviedb.org/3/movie/' + filtering+'?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US&page=' + num)
    .then(response => response.json())
    .then(data => data.results.map(movies =>(
      {
        title :`${movies.original_title}`,
        date: `${movies.release_date}`,
        image: `http://image.tmdb.org/t/p/w185//${movies.poster_path}`,
        id: `${movies.id}`,
        pages : data.total_pages , 
        results : data.total_results,
      }
    )))
    .then(data => this.setState({
      top_rated: data,
      pages: data[0].pages,
      results: data[0].results,
      isLoaderOn:false
    }))
    .catch(() => this.setState({error:true}))

  }
//show the movies
handleImageClick = (e)=>
{

  this.setState({
    id: e.target.id,
    isLoaderOn:true
  })
  this.fetchMovieDetails(e.target.id);

  this.props.MoveToMovie(e.target.id)
}

//search query
handlemovie = (param)=>
{
  this.props.MovieQuery(param);
}
handleactor = (param)=>
{
  this.props.ActorQuery(param);
}

//dropdown info
handleDropdownInfo = (name , id)=>
{
  this.props.ResultsDropDownInfo(name,id)
}
//Add movies to the list
ButtonHandle= (e)=>
{
  console.log(e.target.id)
  if (this.props.mymovies.indexOf(e.target.id) > -1)
  {
    this.props.deleted_id(e.target.id)
  }
  else{
    if(e.target.id === "" || e.target.id ===" " || e.target.id === undefined)
    {

    }
    else{
      this.props.AddMyMovies(e.target.id);
    }
    
  }

}
handleHamburgerClick = () =>{
   if(this.state.showingSideBar)
    {
        this.setState(oldState => ({
         showingSideBar: false
     }));
    }
    else{
      this.setState(oldState => ({
        showingSideBar: true
      }));
    }
  }
changefilter = (e)=>
  {
    
    this.setState({filter:e.target.id})
    if(e.target.id ==="top_rated")
    {
      this.setState({filter_name:"top rated"})
    }
    else if(e.target.id === "now_playing")
    {
      this.setState({filter_name:"now playing"})
    }
    else {
      this.setState({filter_name:e.target.id})
    }
    this.fetchMovies(e.target.id , 1);
    this.setState({activePage:1})
  }

//pagination handle
handlePageChange = (pageNumber) =>
{
    this.setState({
      activePage : pageNumber,
      isLoaderOn:true
    })

    this.fetchMovies(this.state.filter , pageNumber)
    
}
render()
  {
    if( !this.state.error)
     {
          return(
              <div className="second_screen">

                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                      <div  className={this.state.showingSideBar ? "cross_button cross move_btn" : "cross_button "} onClick={ this.handleHamburgerClick} data-toggle="collapse"  data-target="#expanded">
                          <svg viewBox="0 0 800 600">
                          <path d="M 300 220 C 300 220 500 220 540 220 C 740 220 640 540 520 420 C 440 340 300 200  300 200 "id="top" stroke="green" strokeWidth="3" fill="none"/>
                          <path d="M 300 320 C 300 320 500 320 540 320 C 740 320 740 530 540 520 L 540 520" stroke="green" id="middle" strokeWidth="3" fill="none" />
                          <path d="M 300 210 C 300 210 520 210 540 210 C 740 210 640 530 520 410 C 440 330 300 190 300 190"  stroke="green" strokeWidth="3" id="bottom" fill="none" transform="translate(480 ,320) scale(1,-1) translate(-480 ,-318)"/>
                          </svg>
                        </div>
                      <div className="navbar-header">
                        <a className="navbar-brand" >
                          <span>movie</span>
                          <img src={logo} alt="logo img"/>
                          <span>gram</span>
                        </a>
                      </div>
                    </div>
                  </nav>
          <SideBar
                  showing={this.state.showingSideBar}
                  MovieQuery = {this.handlemovie}
                  ActorQuery = {this.handleactor}
                  SideBarDropDownInfo={this.handleDropdownInfo}
                />
          <div className="wrapper">
              <div className="search_header">
                <h1>Box office time . . .</h1>
              </div>

              <div className="dropdown_selection">
                  <div className="form-group">
                  <div className="dropdown">
                    <button className="btn filtered dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                      {this.state.filter_name}
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={this.changefilter}><a id="popular">Popular</a></li>
                        <li onClick={this.changefilter}><a id="now_playing">Now Playing</a></li>
                        <li onClick={this.changefilter}><a id="top_rated">Top rated</a></li>
                        <li onClick={this.changefilter}><a id="upcoming">Upcoming</a></li>
                    </ul>
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
                  return   <div key={movies.id} className="movie_slides">
                            <div className="card" >
                              <Link to={`movie/${movies.id}`}>
                                <div  data-toggle="modal" data-target="#myModal">
                                  <img id={movies.id} src={movies.image} alt="movie"/>
                                </div>
                                </Link>
                                <div className="info">
                                  <p>{movies.title}({movies.date})</p>
                                </div>
                                <IconButton 
                                  onClick={this.ButtonHandle}  
                                  className="favourite"
                                  style = { this.props.mymovies.includes(movies.id) ? styles.success : styles.fail}
                                >
                                  <FontIcon id={movies.id} className="material-icons "  color = { this.props.mymovies.includes(movies.id) ? styles.success : styles.fail}>
                                    favorite
                                  </FontIcon>      
                                </IconButton>
                              </div>
                            </div>
                }
              )
          }

          </div>

          <div className="pagination">
            <div>
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={20}
                  totalItemsCount={this.state.results}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                />
            </div> 
          </div>

        </div>


      );
    }
    else
    {
      return(
        <div className="error_screen">
        <div className="back_button">
          <div>
            <Link to="/"><img src={image} alt="arrow" /></Link>
          </div>
        </div>
        <div className="error_message">
            <h1>Our service is unavailable now, please visit us another time </h1>
        </div>
        </div>
      );
    }
  }
}

export default ResultsView;
