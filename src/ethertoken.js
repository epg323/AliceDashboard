import React, {Component} from 'react';
import logo from './cheshire.png';
import './App.css';

class Ethertoken extends Component{
    constructor(props){
        super(props);

        this.state = { items: [] };

    }

    componentDidMount(){
        fetch("http://api.ethplorer.io/getTopTokens?apiKey=freekey")
            .then(
                result => result.json()
            )
            .then(
                items => this.setState({items})
            )
    }
    render() {
        var rows= ["Names"]
        var txs= ["txs"]
        var holders=["#holders"]
        var totalSupply= ["TotalSupply"]
        var tokens = this.state.items.tokens
        for(var key in tokens) {
            console.log(tokens[key].name)
            rows.push(<li>{tokens[key].name}</li>)
            txs.push(<li>{tokens[key].txsCount}</li>)
            holders.push(<li>{tokens[key].holdersCount}</li>)
            totalSupply.push(<li>{tokens[key].totalSupply} </li>)
        }
        return(
        <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Alice in Wonderland</h1>
        </header>
        <div class="table-container">
        <li>{rows}  </li>
        <li> {txs}</li>
        <li>{holders}</li>
        <li>{totalSupply}</li>
        </div>
        </div>
        )
    }
  /**  render() {
        var tokens= this.state.items.map(currency =>
            <li key={currency.tokens.symbol}> </li>
        );
        return(
            <div className="App">
                <li>
                    {tokens}
                </li>
            </div>
        );

    } **/
}
export default Ethertoken;
