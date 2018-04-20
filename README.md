# MovieGram #

## Let me introduce you what this platform is about

* It is an online platform for movies
* Users can search their movies based on the genre, title, or category ( top rated , latest, upcoming ).
* Users can select a movie and go through the details of the movie such as, release date, duration, ranking, budget, description of the movie, and finaly recommended movies based on the movie thery select.
* This service provides an opportunity  to save the movies they already have seen and the service will provide them with stats about their preferences
* Besides the previous functionality , users will be able to save their movies in their wish list , and then after wtaching them , they can transfer it to the other list. We are aiming to implement this functionality with drag and drop.
* Another feature of this application will be that the users can also delete some of the movies that they want ( probably with drag and drop again)


### So far implementation
* Users can find movies based on the filters we mentioned above
* Users can save the movies they have already watched


### About to implement 
* The wish list feature
* The stats for every user and also preferences need to implement
* The drag and drop functionality 
* Error handling needs improvement
* MovieList and SearchResults components might combined because their functionality is very close and we might manage to it in one component
* Pagination in order to load even more movies

## Technologies 
* HTML , CSS , JavaScript (React)
* Firebase ( database , hosting)
* API : The Movie Database API ( https://developers.themoviedb.org/3/getting-started/introduction )

## Project File Structure
* The project's hierarchy starts with App.js file where every route is implemented and all the components are imported
* MainView is the first ( welcome screen) of the platform
* ResultsView is the second screen where the users can sort the movies based on the categories (top rated, upcoming) and also in this view there is a child component (Sidebar) in which the users can search movies based on other criteria
* When the users sort movies based on the genre  the SearchResults component will display the results
* When the users search for a movie the MovieList component will display their results
* When the users search for an Actor the ActorsView is the component that will display the results
* When the users want to check their profile the ProfileView is the responsible one


## Firebase Deploy
 The website is accesible through Firebase from this link 
[MovieGram](https://moviegram-bc401.firebaseapp.com/ )

