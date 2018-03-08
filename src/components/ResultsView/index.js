import React, {Component} from 'react'
import './ResultsView.css';
import SideBar from "./SideBar"
import logo from "../../assets/logo1.png"
import loader from "../../assets/loader.gif"


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
      isLoaderOn:false
    }
  }

  componentDidMount(){
    this.fetchTopRated(this.state.filter);
    this.setState({isLoaderOn:true})

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
    .catch("There is an error with the API")

  }
  fetchTopRated(filtering)
  {
    fetch('https://api.themoviedb.org/3/movie/' + filtering+'?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US')
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
handlefind = (param)=>
{
  this.props.AppQuery(param);
}

//dropdown info
handleDropdownInfo = (name , id)=>
{
  this.props.ResultsDropDownInfo(name,id)
}
//Add movies to the list
ButtonHandle= (e)=>
{
  this.props.AddMyMovies(e.target.id)
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
    this.fetchTopRated(e.target.id);
  }
  render()
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
          ResultsQuery = {this.handlefind}
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
                            <div className="card" >
                            <div onClick={this.handleImageClick} data-toggle="modal" data-target="#myModal">
                              <img id={movies.id} src={movies.image} alt="movie"/>
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
}

export default ResultsView;
