import React from 'react'
import './item1.css'

class Item1 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            bitcoinValue: this.props.bitcoin,
            item: this.props.item
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ item: props.item });
    }

    howManyCanYouBuy(bitcoinCost, itemCost) {
        return Math.floor(bitcoinCost/itemCost)
    }

    fillAPool() {
        let poolSize = 2500349
        let bottleSize = this.state.item.quantity
        let numberOfBottles = poolSize/bottleSize
        return Math.ceil(numberOfBottles/this.howManyCanYouBuy(this.state.bitcoinValue, this.state.item.price))
    }


    render() {
        return (
            <div className="info">
                <p>{this.state.item.name} is £{this.state.item.price}</p>
                <p>You can buy {this.howManyCanYouBuy(this.state.bitcoinValue, this.state.item.price)} for 1 Bitcoin</p>
                <img src={this.state.item.image} alt="lovely milk"/>
                <p>You'd need {this.fillAPool()} Bitcoin to fill a swimming-pool full of milk</p>
            </div>
        )
    }
}

export default Item1