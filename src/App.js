import React from 'react'
import './App.scss'
import Airtable from 'airtable'
import {Line} from 'react-chartjs-2'
import Cal from './components/Cal'
import Options from './components/Options'

const base = new Airtable({apiKey: 'keyCQeHBrRMkb8kGg'}).base('appIEjO1d0RcTFHPg');

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      dates:[],
      prices:[]
    };
  }
  
  componentDidMount(){
    base('stocks').select({view: 'Grid view'})
    .eachPage(
      (records, fetchNextPage) => {
        this.setState({
          records
        });
        let dates = records.map((e)=>e.fields['Date']);
        let prices = records.map((e)=> e.fields['Price']);
        this.setState({dates,prices});
        fetchNextPage();
        console.log(records);
      });
    }
    
    render(){
      return (
        <div className="App">
        {/* {
          this.state.records.length > 0 ? (
            this.state.records.map((record, index) =>
            <div key={index}>
              <span>{record.fields['Date']} : {record.fields['Price']}</span>
            </div>))
          :
          <p>loading...</p>
        } */}
        <Cal data={this.state.records} base={base}/>
        <div className="chart">
        <Chart dates={this.state.dates} prices={this.state.prices} />
        </div>
        <Options />
        </div>
  );
}
}

function Chart(props){
  const data = {
    labels: props.dates,
    datasets: [
      {
        label: 'stock price',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.prices
      }
    ]
  };
  return(
    <Line data={data}/>
  )
}

export default App;