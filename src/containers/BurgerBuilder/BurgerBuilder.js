import React, {Component} from 'react';
import Aux from '../../hoc/Auxilliary';
import Burger from "../../components/Burger/Burger"
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            cheese:0,
            bacon:0,
            meat:0
        } ,
        purchasable: false,
        totalPrice : 5, 
        purchasing: false
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchase(updatedIngredients);
    }


    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        
        updatedIngredients[type] = updatedCount;
        const priceReduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceReduction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})  
        this.updatePurchase(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    updatePurchase = (ingredients) => {
        
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum,el) =>  {
                console.log(sum+el)
                return sum + el;
            }, 0)
            this.setState({purchasable: sum > 0})
    }

    purchaseContinueHandler = () => {
        alert('you Continue')
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    render(){
        // console.log(this.state.ingredients)
        const disabledInfo={ 
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing}
                        modalClosed={this.purchaseCancelHandler}>
                        <OrderSummary 
                            ingredients={this.state.ingredients} 
                            purchaseCanceled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler}
                            price={this.state.totalPrice}
                            />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded ={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}
                />
            </Aux>
        )
    }    
}

export default BurgerBuilder;