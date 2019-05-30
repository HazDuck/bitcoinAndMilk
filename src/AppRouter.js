import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './AppRouter.css';
import Item1 from "./components/item1";
import Cow from './assets/cow.svg'
import Coin from './assets/coin.svg'
import Milk from './assets/milk-carton.svg'


class AppRouter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bitcoinValue: this.bitcoinValue(),
      product: this.productValue(),
    }
  }

  timeAndDate = () => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    let time = today.getHours() + ":" + today.getMinutes()+ ":" + today.getSeconds()
    let dateTime = date+' '+time
    return dateTime
  }

  bitcoinValue = () => {
      fetch('https://api.coindesk.com/v1/bpi/currentprice/gbp.json')
        .then((data) => data.json())
        .then((data) => {
          let rate_float = parseFloat(data.bpi.GBP.rate_float).toFixed(2)
          this.setState({bitcoinValue:rate_float})
          return rate_float
        })
  }

  productValue = () => {
    //YOU NEED YOUR OWN TESCO API KEY - ADD IT IN BELOW :)
    let yourTescoAPIKey = ""
    fetch('https://dev.tescolabs.com/grocery/products/?query=milk&offset=0&limit=10', {
      headers: {"Ocp-Apim-Subscription-Key":yourTescoAPIKey}
      }
    )
        .then((data) => data.json())
        .then((data) => {
          let arrayItem = Math.floor(Math.random() * 10)
          let itemInfo = {
            price: data.uk.ghs.products.results[arrayItem].price,
            name: data.uk.ghs.products.results[arrayItem].name,
            image: data.uk.ghs.products.results[arrayItem].image,
            quantity: data.uk.ghs.products.results[arrayItem].ContentsQuantity
          }
          this.setState({product: itemInfo})
        })
  }

  render () {
    return (
        <Router>
          <div>
            <img className="cow1" src={Cow} alt="cow"/>
            <img className="cow2" src={Cow} alt="cow"/>
            <h2>Milko-Crypto</h2>
            <h5>Data updated: {this.timeAndDate()}</h5>
            <img className="coin" src={Coin} alt="bitcoin"/>
            <h3>£{this.state.bitcoinValue} </h3>
            <p className="intro">Click the carton to get your milk...</p>
            <Link to="/item1/">
              <img className="milk" src={Milk} alt="milk link" onClick={this.productValue}/>
            </Link>
            <Route path="/item1" render={(props) => <Item1 {...props} bitcoin={this.state.bitcoinValue} item={this.state.product}/>}/>
          </div>
        </Router>
    )
  }
}

export default AppRouter;
