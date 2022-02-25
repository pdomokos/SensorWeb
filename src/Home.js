import React, {useState, useEffect} from 'react';
import './App.css';
import {Container} from 'reactstrap';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Label,
    ReferenceLine,
    ResponsiveContainer
} from 'recharts';
import axios from 'axios';
import moment from "moment";

function Home() {

    const emptyList = [];
    const [temps, setTemps] = useState(emptyList);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:8080/api/v1/temp/chartPage');
            setTemps(result.data);
        }
        fetchData();
    }, []);

    return (
        <Container>
            <div style={{width: '100%', height: 400}}>
                <ResponsiveContainer>
                    <LineChart margin={{top: 15, right: 20, left: 10, bottom: 15}}
                               data={temps}>
                        <XAxis dataKey="dateOfMeasure" type="number" domain={['dataMin', 'dataMax']}
                               axisLine={false}
                               tickFormatter={(unixTime) => moment(unixTime).format('YYYY-MM-DD')}>
                            <Label value="Title" offset={-10} position="insideBottom"/>
                        </XAxis>
                        <ReferenceLine y={0} stroke="#000000"/>
                        <YAxis type="number" label={{value: 'Temperature', angle: -90, position: 'insideLeft'}}/>

                        <Tooltip cursor={false}
                                 formatter={function (value, name) {
                                     return [`${value}`, `${name}`];
                                 }}
                                 labelFormatter={function (value) {
                                     return moment(value).format('YYYY-MM-DD HH:mm');
                                 }}
                        />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>

                        <Line type="monotone" dataKey="value1" stroke="#ff7300" strokeWidth={2} dot={false}/>
                        <Line type="monotone" dataKey="value2" stroke="#387908" strokeWidth={2} dot={false}/>
                        <Line type="monotone" dataKey="value3" stroke="#734722" strokeWidth={2} dot={false}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Container>
    );

}

export default Home;
