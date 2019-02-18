import React, {Component} from 'react';
import CardList from './CardList';
import {robots} from './robots';
import SearchBox from './SearchBox';


class App extends Component{ 
    constructor(){
        super();
        this.state = {
            robots: robots,
            searchField: ""
        }
    };
/*Any custom function in JSX has to follow the arrow funcitons *
@updated this.searchField value*/
    onSearch = (event) => {
        //setting state:
        this.setState({ searchField: event.target.value});
    };

    render(){
        var filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLocaleLowerCase().includes(this.state.searchField.toLocaleLowerCase());
        });
        return(
            <div className="tc">
                <h1>Robo App</h1>
                <SearchBox searchChange={this.onSearch} />
                { <CardList robots={filteredRobots}/> /*Abstracting Cards into CardList with CardList being the parent, and Cards its child. */ }
            </div>
        );
    }
}

export default App;