import React, {Component} from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import './App.css';
import Loading from './Loading';
import Scroll from './Scroll';

class App extends Component{ 
    constructor(){
        super();
        this.state = {
            robots: [],
            searchField: ""
        }
    };

/*Any custom function in JSX has to follow the arrow funcitons *
@updated this.searchField value*/
    onSearch = (event) => {
        //setting state:
        this.setState({ searchField: event.target.value});
    };
    
    /*
    The cycle is:
    1. Constructor
    2. static getDerivedStateFromProps()
    3. render()
    4. componentDidMount()
    if componenetDidMount() then render() aagain.
    */
    componentDidMount(){
        //Using API to getch response.
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots: users})); 
        //if used without {, they will return by default
    }

    render(){
        var filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLocaleLowerCase().includes(this.state.searchField.toLocaleLowerCase());
        });
        if(!this.state.robots.length){
            return <Loading />
        }else{
        return(
            <div className="tc">
                <h1 className="f1">Robo App</h1>
                <SearchBox searchChange={this.onSearch} />
                <Scroll>
                    { <CardList robots={filteredRobots}/> /*Abstracting Cards into CardList with CardList being the parent, and Cards its child. */ }
                </Scroll>
            </div>
        );
        }
    }
}

export default App;