import React from 'react';
import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {
    let transform_ingredients = Object.keys(props.ingredients) // ingredients were objects so tranform them in array
        // console.log(transform_ingredients)
        .map(the_ingredient => {
            return [...Array(props.ingredients[the_ingredient])].map((_, i) => {
                // console.log(the_ingredient)
                return <BurgerIngredient key={the_ingredient + i} type={the_ingredient} />;
            }); // array of 2 elements
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        },[]);
    console.log(transform_ingredients)
    if (transform_ingredients.length === 0){
        transform_ingredients = <p>Please start adding ingredients!</p>
    }
    return(
        <div className={ 'Burger' }>
            <BurgerIngredient type='bread-top' />
            {transform_ingredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

export default Burger;