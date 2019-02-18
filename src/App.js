import React from 'react';
import CardList from './CardList';
import {robots} from './robots';
import SearchBox from './SearchBox';

const App = () => {
    return(
        <div className="tc">
            <h1>Robo App</h1>
            <SearchBox />
            { <CardList robots={robots}/> /*Abstracting Cards into CardList with CardList being the parent, and Cards its child. */ }
        </div>
    );
}

export default App;