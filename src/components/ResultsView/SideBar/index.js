import React, {Component} from 'react'
import './SideBar.css';
import logo from "../../../assets/logo1.png"
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import profile from '../../../assets/user.png'

class SearchMovie extends Component{

//handling clicks
  handleMovieChange= (event)=>
  {
    this.props.onMovieChange( event.target.value)
  }

  render(){
    const styles = {
      floatingLabelStyle: {
        color: "#fff",
        borderColor: "#962A38"
      },
      floatingLabelFocusStyle: {
        color: "#962A38",
        textAlign: "center"
      }
    }
    return(
      <div>
        <div className="form-group">
        <TextField
             floatingLabelText=" Search movie . . . "  
             floatingLabelStyle={styles.floatingLabelStyle}
             floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
             underlineFocusStyle={styles.floatingLabelStyle}
             inputStyle={styles.floatingLabelFocusStyle}
             onChange = {this.handleMovieChange}
         />
          {/* <input type="text" className="movies_input " value={this.props.query} placeholder={this.props.placeholder} onChange={ this.handleMovieChange} /> */}
        </div>
          <Link to="/movies"><button className="btn movies_btn"><span className="profile_text">Search</span></button></Link>
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
    const styles = {
      floatingLabelStyle: {
        color: "#fff",
        borderColor: "#962A38"
      },
      floatingLabelFocusStyle: {
        color: "#962A38",
        textAlign: "center"
      }
    }
    return(
      <div>
        <div className="form-group">
         <TextField
             floatingLabelText=" Search actor . . . "  
             floatingLabelStyle={styles.floatingLabelStyle}
             floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
             underlineFocusStyle={styles.floatingLabelStyle}
             inputStyle={styles.floatingLabelFocusStyle}
             onChange = {(e)=>this.handleActorChange(e)}
         />
        </div>
          <Link to="/actor"><button className="btn movies_btn"><span className="profile_text">Search</span></button></Link>
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
    localStorage.setItem("movie-query" , param)
  }
  handleActorQuery = (param) =>
  {
   
  
      this.setState({actor:param});
      this.props.ActorQuery(param);
      localStorage.setItem("actor-query" , param)
    

  }
handleli = (e)=>{
  this.setState({dropdown:e.target.className})
  this.props.SideBarDropDownInfo(e.target.className , e.target.id)
  localStorage.setItem("genre-id" , e.target.id)
  localStorage.setItem("genre-name" , e.target.className)
}
  render()
  {

    return(
      <div className={this.props.showing ? "sidenavbar move" : "sidenavbar"}>
        <div className="myprofile">
        <Link to="/profile">
            <img src={profile} alt="profile" />
            <p className="profile_text">my profile</p>
            </Link>
        </div>
        <hr/>
        <div className="searches">
          <div className="form-group">
            <p className="profile_text">I am interested in</p>
          <div className="dropdown">
            <button className="btn  dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <span className="profile_text">{this.state.dropdown}</span>
              <span className="caret profile_text"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        {
                            this.state.genres.map(movie=>{
                              return <li key = {movie.name}  onClick={this.handleli}> <Link to="/searchresults" className ={movie.name} id={movie.id}>{movie.name}</Link> </li>
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
