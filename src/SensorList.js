import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

function SensorList(){

    const emptyList = [];
    const [sensors, setSensors] = useState(emptyList);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:8080/api/v1/sensor/');
            setSensors(result.data);
        };
        fetchData();
    }, []);

    const remove = (id) => {
        setIsError(false);
        axios.delete(`http://localhost:8080/api/v1/sensor/delete/${id}`).then(() => {
            let updatedSensors = [...sensors].filter(i => i.id !== id);
            setSensors(updatedSensors);
        }).catch(() => {
            setIsError(true);
        });
    }

    const sensorList = sensors.map(sensor => {
        return <tr key={sensor.id}>
            <td>{sensor.id}</td>
            <td style={{whiteSpace: 'nowrap'}}>{sensor.name}</td>
            <td>{sensor.minAlarm}</td>
            <td>{sensor.maxAlarm}</td>
            <td>{sensor.description}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/sensors/" + sensor.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(sensor.id)}>Delete</Button> 
                </ButtonGroup>
            </td>
        </tr>
    });

    return <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="new">Add Sensor</Button>
                    </div>
                    <h3>Sensors</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Id</th>
                            <th width="30%">Name</th>
                            <th width="30%">Min alarm</th>
                            <th width="30%">Max alarm</th>
                            <th width="30%">Desc</th>
                            <th width="40%">Mod</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sensorList} 
                        </tbody>
                    </Table>
                    {isError && <div>Something went wrong ...</div>}
                </Container>
        </div> 
    }

export default SensorList;
