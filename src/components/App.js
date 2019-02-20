import React, {Component} from 'react';
import CardList from '../modules/CardList';
import SearchBox from '../modules/SearchBox';
import './App.css';
import Loading from '../modules/Loading';
import Scroll from '../modules/Scroll';
import ErrorBoundary from './ErrorBoudary';
import {setSearchField} from '../actions';
import {connect} from 'react-redux';

/*
Redux: 
1. import the actions.
2. import connect from react-redux and export along with the class like export defualt connect(mapStateToProps, mapDispatchToProps)(ClassName)
3.  Tell what state it should listen to from the reducers in the mapStateToProps
*/
const mapStateToProps = (state) =>{
    return { searchField: state.searchField}  //TODO:: But searchRobots take parameter of state =>?? When are we passing that here"?
}

const mapDispatchToProps = (dispatch) => {
    return { onSearch: (event) => {
        dispatch(setSearchField(event.target.value));
    }}; 
}
class App extends Component{ 
    constructor(){
        super();
         this.state = {
            robots: [],
        }
    };

  
/*Any custom function in JSX has to follow the arrow funcitons *
@updated this.sea rchField value*/
    // onSearch = (event) => {
    //     //setting state:
    //     this.setState({ searchField: event.target.value});
    // };
    
    /*
    The cycle is:
    1. Constructor
    2. static getDerivedStateFromProps()
    3. render()
    4. componentDidMount()
    if componenetDidMount() then render() aagain.
    */
    componentDidMount(){

        console.log(this.props.store);
        //Using API to getch response.
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots: users})); 
        //if used without {, they will return by default
    }

    render(){
        const {searchField, onSearch} = this.props;
        var filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase());
        });
        if(!this.state.robots.length){
            return <Loading />
        }else{
        return(
            <div className="tc">
                <h1 className="f1">Robo App</h1>
                <SearchBox searchChange={onSearch} />
                <Scroll>
                    <ErrorBoundary>
                        { <CardList robots={filteredRobots}/> /*Abstracting Cards into CardList with CardList being the parent, and Cards its child. */ }
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
        }
    }
}
// Connect is a higher order function...
export default connect(mapStateToProps, mapDispatchToProps)(App);