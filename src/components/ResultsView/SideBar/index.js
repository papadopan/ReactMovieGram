import React, {Component} from 'react'
import './SideBar.css';
import logo from "../../../assets/logo1.png"
import { Link } from 'react-router-dom'
class SearchMovie extends Component{

//handling clicks
  handleMovieChange= (event)=>
  {
    this.props.onMovieChange( event.target.value)
  }

  render(){
    return(
      <div>
        <div className="form-group">
          <input type="text" className="movies_input " value={this.props.query} placeholder={this.props.placeholder} onChange={ this.handleMovieChange} />
        </div>
          <Link to="/movie"><button className="btn movies_btn">Search</button></Link>
      </div>
    );
  }
}

class SearchActor extends Component{
//handling clicks
  handleActorChange= (event)=>
  {
    this.props.onActorChange( event.target.value)
  }

  render(){
    return(
      <div>
        <div className="form-group">
          <input type="text" className="movies_input " value={this.props.query} placeholder={this.props.placeholder} onChange={ this.handleActorChange} />
        </div>
          <Link to="/actor"><button className="btn movies_btn">Search</button></Link>
      </div>
    );
  }
}

class SideBar extends Component{
  constructor(props){
    super(props);
    this.state = {
        genres: [],
        actor : "",
        movie:"",
        dropdown: " Genres"
    };
  }
  componentDidMount(){
     this.fetchData()
   }
   fetchData(){
     fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US')
     .then(response => response.json())
     .then(results => results.genres.map( movie =>(
       {
           name : `${movie.name}`,
           id : `${movie.id}`
       }
     )))
     .then(genres => this.setState({genres}))
     .catch(error => console.log("There is an error with the API"))
   }
//handling clicks
  handleMovieQuery = (param) =>
  {
    this.setState({movie:param});
    this.props.MovieQuery(param);
  }
  handleActorQuery = (param) =>
  {
    this.setState({actor:param});
    this.props.ActorQuery(param);
  }
handleli = (e)=>{
  this.setState({dropdown:e.target.className})
  this.props.SideBarDropDownInfo(e.target.className , e.target.id)
}
  render()
  {

    return(
      <div className={this.props.showing ? "sidenavbar move" : "sidenavbar"}>
        <img src={logo} alt="" />
        <div className="myprofile">
        <Link to="/profile">
            <i className="far fa-2x fa-user"></i>
            <p>my profile</p>
            </Link>
        </div>
        <hr/>
        <div className="searches">
          <div className="form-group">
            <p>I am interested in</p>
          <div className="dropdown">
            <button className="btn  dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              {this.state.dropdown}
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        {
                            this.state.genres.map(movie=>{
                              return <li key = {movie.name} onClick={this.handleli}> <Link to="/searchresults" className ={movie.name} id={movie.id}>{movie.name}</Link> </li>
                            })
                }
            </ul>
            </div>
          </div>
        </div>
        <div className="searches">
            <SearchMovie
              placeholder={"Search movies . . ." }
              onMovieChange= {this.handleMovieQuery}
                />
        </div>
        <div className="searches">
            <SearchActor
            placeholder={"Search actor . . . "}
            onActorChange= {this.handleActorQuery}
            />
        </div>
      </div>
    );
  }
}

export default SideBar;
