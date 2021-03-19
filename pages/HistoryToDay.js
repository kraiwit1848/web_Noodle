import { Component } from "react";
import Axios from 'axios'

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    toDay = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + dd + '-' + mm;
        return today
    }

    componentDidMount() {
        Axios.post('/api/History', {
            DateToday: this.toDay()
        }).then(response => {
            console.log(response)
            this.setState({
                data: response.data
            })
        })
    }

    sumPrice = (data) => {
        var dataPrice = 0
        var i = 0
        for (i = 0; i < data.length; i++) {
            dataPrice = dataPrice + data[i].Price
        }
        return dataPrice
    }

    render() {
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
            <div >
                <br />

                <div class="topnav">
                    <a href="/"><h1> รายการอาหาร </h1> </a>
                    {/* <a class="active " href={`/History`}> <h1> ประวัติ </h1> </a> */}
                    <div class="dropdown active" href={`/History`}>
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
                    <div class="dateTable">
                        <tr>
                            <th >{this.toDay()}</th>

                        </tr>
                    </div>
                    
                    <table>

                        <thead>
                            <tr>
                                <th><h2>เมนู</h2></th>
                                <th class="textcenter"><h2>ระดับความเผ็ด</h2></th>
                                <th class="textcenter"><h2>ทานผัก</h2></th>
                                <th class="textcenter"><h2>ทานที่ร้าน</h2></th>
                                <th class="textcenter"><h2>ราคา</h2></th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.data.map(data => (
                                <tr key={`${data.HistoryId}`}>
                                    {/* <td>{node.HistoryId}</td> */}
                                    <td>{data.Menu}</td>
                                    <td class="textcenter">{Spisy(data.Spicy)}</td>
                                    <td class="textcenter">{mark(data.Vegetable)}</td>
                                    <td class="textcenter">{mark(data.Restaurant)}</td>
                                    <td class="textcenter">{data.Price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table class="Price">
                        <thead>
                            <tr class="TotalPrice">
                                <td class="textcenter"> รวม </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td class="textcenter" >{this.sumPrice(this.state.data)} </td>
                            </tr>
                        </thead>
                    </table>
                </div>

            </div>
        )
    }

}


export default History;
