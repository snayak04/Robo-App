import React from 'react';
import Card from './Card';

const CardList = ({robots}) => { //inline destructring based on ES6
    const CardsArray = robots.map((user)=>{//.map returns a new array, where as forEach is a void function and we need to use the callback
        return <Card key={user.id} id={user.id} name={user.name} email={user.email} /> 
    });
    return(
        <div>
            {CardsArray}
        </div>
    );
}

export default CardList;