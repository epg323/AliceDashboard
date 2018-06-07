import React, {Component} from 'react';
import logo from './cheshire.png';
import ReactTable from "react-table";
import './App.css';
import Web3 from "web3";
import scrape from "scrape-it";

class Ethertoken extends Component{
    constructor(props){
        super(props);

        this.state = {
            items: [],
            ordered:[],
            index:[],
            erc721:[],
            info:[],
            stuff:[],
            avg:[],
            wk:[],
            total:[],
            tokens:[]
        
        };



    }

    getInitialState(){
        return{
            info:[]
        }
    }
    
    componentWillMount(){
        /*
        var tokenadd="0xec46f8207d766012454c408de210bcbc2243e71c"
        fetch("http://api.etherscan.io/api?module=account&action=txlist&address="+tokenadd+"&startblock=0&endblock=99999999&sort=dec&apikey=Token")
            .then(
                result => result.json()
            )
            .then(
                items => this.setState({items})
            )
            */
           //get open sea data
           var hold=[]
        scrape("https://cors.io/?https://opensea.io/assets", {
            title: {
                listItem:"div.category"
                ,name:"title"
                ,data:"div.category__name"
            }
        }).then(({ data, response }) => {
            //console.log(`Status Code: ${response.statusCode}`)
            //console.log(data.title["0"].replace(/\d+/,''))
            this.setState({
                erc721:data
            })
            var rows= ["Names"]
            var estimate= ["Market Cap Estimate"]
            var averagePrice=["Market Cap Average Price"]
            var thisWeek= ["Volume This Week"]
            var total=["Volume Total"]
            var tokens=["tokens"]
            var indx=["Names"]
            var erc721= data
            for(var key in erc721){
                var ercdata=erc721[key]
            }
            var prac=[]
            var market=[]
            for (var i in ercdata){
                var ethertokens=ercdata[i].replace(/\d+/,'')
                rows.push(<li>{ethertokens}</li>)
                var ercurl= ethertokens.replace(/\s/g,"").toLowerCase()
                prac.push(ercurl)                        
            };
            //console.log(ercurl)
            prac[18]="cryptospacecommanders-2"
            this.setState({
                items:rows,
                ordered:prac
            })
            for(var j in prac){
                scrape("https://cors.io/?https://opensea.io/recent/" + prac[j],{
                    title:{
                        listItem:".CategoryMenu p",
                        data:{
                            Parameter: "strong",
                            amount:".right"
                        }
                    }
                }).then(({data,response}) =>{
                    console.log(`Status Code: ${response.statusCode}`)
                    data.title.splice(0,1)
                    this.setState({
                        info:data.title[0].amount
                    })
                    //console.log(data.title[4])
                    var names= response.responseUrl.split("/")[7]
                    indx.push(<li>{names}</li>)
                    estimate.push(<li>{data.title[0].amount}</li>)
                    averagePrice.push(<li>{data.title[1].amount}</li>)
                    thisWeek.push(<li>{data.title[2].amount}</li>)
                    total.push(<li>{data.title[3].amount}</li>)
                    tokens.push(<li>{data.title[4].amount}</li>)
                },this.setState({
                    index:indx,
                    stuff:estimate,
                    avg:averagePrice,
                    wk:thisWeek,
                    total: total,
                    tokens:tokens
                })).catch((err)=>{
                    console.log("fuck")
                })
            };
        })
    }
    
         render() {
             //console.log(this.state.ordered)
             /*
             var unordered= this.state.index
             var ordered= this.state.ordered
             var index2=[]
             for(var z in ordered){
                 console.log(z)
                 var temp = ordered[z]
                 var num=unordered.indexOf(temp)
                //console.log(unordered[num])
                index2.push(unordered[num])
             }
             console.log(index2)*/
             //console.log(index2)
             //console.log(index2)
            //rows.push(<li>{ethertokens}</li>)
           /*
            for(var i=1; i<12; i++){
            scrape("https://cors.io/?https://etherscan.io/tokens?p=" + i, {
                title: {
                    listItem:".hidden-xs h5 "
                    ,name:"title"
                    ,data:{
                        name:"a",
                        txn:{
                            selector:"a",
                            attr:"href"
                        }
                    }
                }
            }).then(({ data, response }) => {
                console.log(`Status Code: ${response.statusCode}`)
                var count =data.title.length
                for(var i = 0; i< count; i++ ){
                    console.log(data.title[i.toString()].txn.split(/\W/)[2])
                    console.log(data.title[i.toString()].name)
                }
            })
        }
        console.log(this.state.items) */
        /** var web3 = new Web3(new Web3.providers.HttpProvider("https://api.myetherapi.com/eth"));
        var info =web3.eth.getBlock("latest");
        console.log(JSON.stringify(info));
        web3.eth.getBlock("latest", function(error, result){
            if(!error)
                console.log(JSON.stringify(result));
            else
                console.error(error);
        }) 
        web3.eth.getTransactionReceipt('0x44fd65a70b4ac20e6b59c10692b5d411c636a318afe33362d0c1214a2ede4e66', function(error, result){
            if(!error)
                console.log(JSON.stringify(result));
            else
                console.error(error);
        }) **/
        //console.log(this.state.erc721)
        
        
        /*
        var rows= ["Names"]
        var estimate= ["estimate"]
        var averagePrice=["Average Price"]
        var thisWeek= ["This Week"]
        var total=["total"]
        var tokens=["tokens"]
        var erc721= this.state.erc721
        for(var key in erc721){
            var ercdata=erc721[key]
        }
        var prac=[]
        var market=[]
        for (var i in ercdata){
            var ethertokens=ercdata[i].replace(/\d+/,'')
            rows.push(<li>{ethertokens}</li>)
            var ercurl= ethertokens.replace(/\s/g,"").toLowerCase()
            prac.push(ercurl)                        
        };

        for(var j in prac){
            scrape("https://cors.io/?https://opensea.io/recent/" + prac[j],{
                title:{
                    listItem:".CategoryMenu p",
                    data:{
                        Parameter: "strong",
                        amount:".right"
                    }
                }
            }).then(({data,response}) =>{
                console.log(`Status Code: ${response.statusCode}`)
                data.title.splice(0,1)
                console.log(data.title[0].amount)
                //console.log(data.title)
               return( market.push(data.title[0].amount))
            }).catch((err)=>{
                console.log("fuck")
            })
        };
        */     
    

        /** 
        for(var key in tokens) {
            //console.log(tokens.result[0])

            console.log(tokens.length)
            rows.push(<li>{tokens[key].name}</li>)
            txs.push(<li>{tokens[key].txsCount}</li>)
            holders.push(<li>{tokens[key].holdersCount}</li>)
            totalSupply.push(<li>{tokens[key].totalSupply} </li>)
        } **/
        return(
        <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Alice in Wonderland</h1>
        </header>
        <div class="table-container">
        <li>{this.state.index}</li>
        <li>{this.state.stuff}</li>
        <li>{this.state.avg}</li>
        <li>{this.state.wk}</li>
        <li>{this.state.total}</li>
        <li>{this.state.tokens}</li>
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
