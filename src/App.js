import React from 'react'
import './App.scss'
import Airtable from 'airtable'
import {Line} from 'react-chartjs-2'
import Cal from './components/Cal'
import Profit from './components/Profit'
import Options from './components/Options'

const base = new Airtable({apiKey: 'keyCQeHBrRMkb8kGg'}).base('appIEjO1d0RcTFHPg')

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      dates:[],
      prices:[],
      maxProfit: '',
      // gridCol : '0',
    };
    this.getMaxProfit = this.getMaxProfit.bind(this);
    this.addRecord = this.addRecord.bind(this);
    this.delRecord = this.delRecord.bind(this);
  }
  addRecord(id,value,index){
    let updateRec = this.state.records;
    console.log("from app:",id,value,index)
    updateRec[index].fields.Price = value;
    base('stocks').update(id, {
            "Price": parseFloat(value),
          }, function(err) {
                if (err) {
              console.error(err.message);
              return;
            }
          });
    this.setState({records:updateRec});
  }
  delRecord(id,index){
    let updateRec = this.state.records;
    updateRec[index].fields.Price = undefined;
    base('stocks').replace(id, {
          }, function(err, record) {
            if (err) {
              console.error(err.message);
              return;
            }
        });
    this.setState({records:updateRec})
  }
  getMaxProfit(i){
    console.log("got ",i)
    let maxProfit = i;
    this.setState({maxProfit})
  }
  
  componentDidMount(){
    base('stocks').select({view: 'Grid view'})
    .eachPage(
      (records, fetchNextPage) => {
        this.setState({
          records
        });
        let dates = records.map((r)=>{
          if(r.fields['Price']!==undefined)
          return r.fields['Date']
      }
        )
        let prices = records.map((r)=> {
          if(r.fields['Price']!==undefined)
            return r.fields['Price']
          })

        this.setState({dates,prices});
        fetchNextPage();
        console.log(records);
      });

    // let date = new Date()
    // let day = new Date(date.getFullYear(),date.getMonth(),1);
    // console.log(day.getDay());
    // this.setState({gridCol:day.getDay()})
    }
    
    render(){
      return (
        <div className="App">
        <Cal data={this.state.records} base={base} delRecord={this.delRecord}
         addNewRec={this.addRecord}/>
        <Profit profit={this.state.maxProfit}/>
        <div className="chart">
        <Chart dates={this.state.dates} prices={this.state.prices} />
        </div>
        <Options getProfit={this.getMaxProfit} data={this.state.records} />
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
        fill: true,
        lineTension: 0.5,
        pointRadius: 1,
        pointHitRadius: 10,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        data: props.prices
      }
    ]
  };
  return(
    <Line data={data}/>
  )
}