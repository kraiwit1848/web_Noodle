import React, { Component } from "react";
import Axios from 'axios'

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            group: []
        }
    }

    SortDate = (data) => {
        // console.log(data)
        let count = 0
        let newData = []
        for (const [key, value] of Object.entries(data)) {
            count = count + 1
            newData.push(value)
            // console.log(key,value)
        }
        let i
        let result = []
        for (i = count; i > 0; i--) {
            result.push(newData[i - 1])
        }
        return result
    }

    componentDidMount() {
        Axios.get('http://localhost:3000/api/History'
        ).then(response => {
            this.setState({
                data: response.data,
                group: this.SortDate(response.data.reduce((n, data) => {
                    (n[data.Date] = n[data.Date] || []).push(data);
                    return n
                }, {}))
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

        return (
            <div >
                <br />


                <div class="topnav">
                    <a href="/"><h1> รายการอาหาร </h1> </a>
                    <a class="active" href={`/History`}> <h1> ประวัติ </h1> </a>
                </div>

                <div>
                    {this.state.group.map(node => (
                        <div>
                            <br />

                            <div class="dateTable">
                                <tr>
                                    <th >{node[0].Date}</th>
                                </tr>
                            </div>

                            <table>
                                <thead>
                                    <tr>
                                        {/* <th>HistoryId</th> */}
                                        <th>เมนู</th>
                                        <th class="textcenter">ระดับความเผ็ด</th>
                                        <th class="textcenter">ทานผัก</th>
                                        <th class="textcenter">ทานที่ร้าน</th>
                                        <th class="textcenter">ราคา</th>
                                    </tr>
                                </thead>
                                {node.map(data => (
                                    <tbody>
                                        <tr key={`${data.HistoryId}`}>
                                            {/* <td>{node.HistoryId}</td> */}
                                            <td>{data.Menu}</td>
                                            <td class="textcenter">{data.Spicy}</td>
                                            <td class="textcenter">{mark(data.Vegetable)}</td>
                                            <td class="textcenter">{mark(data.Restaurant)}</td>
                                            <td class="textcenter">{data.Price}</td>
                                        </tr>
                                    </tbody>
                                ))}

                                <thead>
                                    <br />
                                    <tr class="TotalPrice">
                                        <td> รวม </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td class="textcenter" >{this.sumPrice(node)} </td>
                                    </tr>
                                </thead>
                            </table>

                        </div>
                    ))}
                </div>

            </div>
        )
    }

}


export default History;
