import React, { Component } from "react";
import Axios from 'axios';

class index extends Component {
  // interval;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      key: null,
      Today: ""
    }
  }

  getData = () => {
    Axios.get('http://localhost:3000/api/Menu'
    ).then(response => {
      this.setState({
        data: response.data
      })
    })
  }


  componentDidMount() {
    this.getData()
    this.interval = setInterval(this.getData, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.intervalId);
  }



  render() {

    const deleteData = (Menu, ToDay) => {
      Axios.post('http://localhost:3000/api/Menu', {
        MeNu: Menu,
        Today: ToDay
      }).then(response => {
        // console.log(response)
        this.setState({
          data: response.data
        })
      })
    }

    const mark = (number) => {
      if (number === 0) {
        return (
          <div class="removekmark" ></div>
        )
      }
      else {
        return (
          <div class="checkmark" ></div>
        )
      }
    }
    const toDay = () => {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + '-' + dd + '-' + mm;
      return today
    }

    return (
      <div class="BG">
        {/* <p>{this.state.currentCount}</p> */}
        <br/>
        
        <div class="topnav">
          <a class="active" href="/"><h1> รายการอาหาร </h1> </a>
          <a href={`/History`}> <h1> ประวัติ </h1> </a>
        </div>
        <br />
        <div>
          <table >
            <thead>
              {/* <td /> */}
              <tr>
                <th>คิว</th>
                <th>เมนู</th>
                <th class="textcenter">ระดับความเผ็ด</th>
                <th class="textcenter">ทานผัก</th>
                <th class="textcenter">ทานที่ร้าน</th>
                <th class="textcenter">ราคา</th>
                <th>    </th>

              </tr>
            </thead>
            <tbody>
              {this.state.data.map(data => (
                <tr key={`${data.MenuId}`} >
                  <td>{data.MenuId}</td>
                  <td>{data.Menu}</td>
                  <td class="textcenter">{data.Spicy}</td>
                  <td class="textcenter">{mark(data.Vegetable)}</td>
                  <td class="textcenter">{mark(data.Restaurant)}</td>
                  <td class="textcenter">{data.Price}</td>
                  <td ><button onClick={() => { deleteData(data, toDay()) }} > เสร็จ </button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}
export default index;

