import React, {Component} from 'react';
import logo from './cheshire.png';
import ReactTable from "react-table";
import './App.css';
import Web3 from "web3";
import scrape from "scrape-it";
import "react-table/react-table.css";

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
            tokens:[],
            complete:[]        
        };



    }

    getInitialState(){
        return{
            info:[]
        }
    }
    
    componentWillMount(){
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
            var comp=[]
            var erc721= data
            for(var key in erc721){
                var ercdata=erc721[key]
            }
            var prac=[]
            var market=[]
            for (var i in ercdata){
                var ethertokens=ercdata[i].replace(/\d+/,'')
                rows.push(ethertokens)
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
                    //console.log(`Status Code: ${response.statusCode}`)
                    data.title.splice(0,1)
                    this.setState({
                        info:data.title[0].amount
                    })
                    //console.log(data.title[4])
                    var names= response.responseUrl.split("/")[7]
                    indx.push(names)
                    console.log(parseFloat(data.title[0].amount.replace("㆔","")))
                    estimate.push(<li>{data.title[0].amount}</li>)
                    averagePrice.push(data.title[1].amount)
                    thisWeek.push(<li>{data.title[2].amount}</li>)
                    total.push(<li>{data.title[3].amount}</li>)
                    tokens.push(<li>{data.title[4].amount}</li>)
                    var temp= {
                        index:names,
                        estimate:parseFloat(data.title[0].amount.replace("㆔","")),
                        avg:parseFloat(data.title[1].amount.replace("㆔","")),
                        wkvol:parseFloat(data.title[2].amount.replace("㆔","")),
                        totvol:parseFloat(data.title[3].amount.replace("㆔","")),
                        tokens:parseFloat(data.title[4].amount.replace("㆔",""))
                    }
                    comp.push(temp)
                },this.setState({
                    index:indx,
                    stuff:estimate,
                    avg:averagePrice,
                    wk:thisWeek,
                    total: total,
                    tokens:tokens,
                    complete:comp
                })).catch((err)=>{
                    console.log("fuck")
                })
            };
        })
    }
    
        render() { 
        var stuff= this.state.complete

        return(
        <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Alice in Wonderland</h1>
        </header>
        <div>
            <ReactTable
                data={stuff}
                columns={[{
                    columns:[
                    {
                        Header:"Name",
                        accessor:"index"
                    },{
                        Header:"Estimate",
                        accessor:"estimate" 
                    },{
                        Header:"Average Volume",
                        accessor:"avg" 
                    },{
                        Header:"Week Volume",
                        accessor:"wkvol" 
                    },{
                        Header:"Total Volume",
                        accessor:"totvol" 
                    },{
                        Header:"Tokens",
                        accessor:"tokens" 
                    }
                ]
                }
                ]}
                className="-striped"
             />
        </div>
        </div>
        )
    }
}
export default Ethertoken;
