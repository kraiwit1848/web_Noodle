import { Component } from "react";
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
    Axios.get('/api/Menu'
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
      Axios.post('/api/Menu', {
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
    const Spisy = (spisy) => {
      if (spisy === 0) {
        return "ไม่เผ็ด"
      }
      else if (spisy === 2) {
        return "เผ็ด 2 เท่า"
      }
      else if (spisy === 3) {
        return "เผ็ด 3 เท่า"
      }
      else {
        return "เผ็ดปกติ"
      }
    }

    return (
      <div class="BG">
        <br />
        <div class="topnav">
          <a class="active" href="/"><h1> รายการอาหาร </h1> </a>
          {/* <a href={`/History`}> <h1> ประวัติ </h1> </a> */}
          <div class="dropdown" >
            <button class="dropbtn"><h1>ประวัติ</h1>
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="/HistoryToDay">วันนี้</a>
              <a href="/HistoryALL">ทั้งหมด</a>
            </div>
          </div>
          
        </div>

        <br />
        <div>
          <table >
            <thead>
              <tr>
                <th><h2>คิว</h2></th>
                <th><h2> เมนู</h2></th>
                <th class="textcenter"><h2> ระดับความเผ็ด </h2></th>
                <th class="textcenter"><h2> ทานผัก </h2></th>
                <th class="textcenter"><h2> ทานที่ร้าน </h2></th>
                <th class="textcenter"><h2> ราคา </h2></th>
                <th>    </th>

              </tr>
            </thead>
            <tbody>
              {this.state.data.map(data => (
                <tr key={`${data.MenuId}`} >
                  <td>{data.MenuId}</td>
                  <td>{data.Menu}</td>
                  <td class="textcenter">{Spisy(data.Spicy)}</td>
                  <td class="textcenter">{mark(data.Vegetable)}</td>
                  <td class="textcenter">{mark(data.Restaurant)}</td>
                  <td class="textcenter">{data.Price}</td>
                  <td ><button class="Button" onClick={() => { deleteData(data, toDay()) }} > เสร็จ </button></td>
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

