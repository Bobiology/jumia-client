import logo from './logo.svg';
import React from "react";
import './App.css';
class App extends React.Component {
   
    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            currentPage: 0,
            totalElements: 0,
            DataisLoaded: false
        };
    }
   
    componentDidMount() {
        fetch(
"http://localhost:8081/customers")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json.content,
                    currentPage: json.number + 1,
                    totalElements: json.size,
                    DataisLoaded: true
                });
            })
    }
    render() {
        const { DataisLoaded, items, currentPage,  totalElements} = this.state;

        console.log("current="+ currentPage );

        const indexOfLastItem =  currentPage  *  totalElements;
        const indexOfFirstItem = indexOfLastItem  - totalElements;
        const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);


        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(items.length / totalElements); i++) {
          pageNumbers.push(i);
          console.log("page="+i);
        }
        //console.log("currentItems=" +currentItems + " indexOfFirstItem="+indexOfFirstItem+ " indexOfLastItem="+indexOfLastItem);
        
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div> ;
   
        return (
        <div className = "App">
          <div className='container'>
            <h1 align="center"> JUMIA SERVICE - COUNTRIES PHONE NUMBERS</h1> 
            </div>
            <div className = 'phone-container'>
            <table align="center">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Country Name</td>
                  <td>Country Code</td>
                  <td>Phone Number</td>
                  <td>Phone Status</td>
                </tr>
                </thead>
                <tbody>
                {
                  items.map((item) => (
                    <tr>
                      <td>{ item.id }</td>
                      <td>{ item.countryName }</td>
                      <td>{ item.countryCode }</td>
                      <td>{ item.phoneNumber }</td>
                      <td>{ item.countryState }</td>
                    </tr>
                  )
                  )
                }
                </tbody>
                <tfoot>
                </tfoot>
              </table>
              </div>
              <div className='footer-container'>
                  <h3 align="center">All rights reserved.</h3>
                  </div>
        </div>
    );
}
}
   
export default App;