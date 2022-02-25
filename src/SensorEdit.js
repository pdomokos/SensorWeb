import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';

function SensorEdit(){

    const emptyItem = {
        name: '',
        minAlarm: '',
        maxAlarm: '',
        description: ''
    };

    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(emptyItem);
    const [isError, setIsError] = useState(false);    
   
    useEffect(() => {
        const fetchData = async () => {
                const result = await axios.get(`http://localhost:8080/api/v1/sensor/${id}`);
                setItem(result.data);
        };
        fetchData();
    }, []);
    

    const handleChange = (event) => {
        setItem({
            ...item,
            [event.target.name]: event.target.value
         })
    }
 
    const handleSubmit = (event) => {
        event.preventDefault(); 
        setIsError(false);
        axios.put(`http://localhost:8080/api/v1/sensor/update/${id}`, item).then(() => {
            navigate('../sensors');
        }).catch(() => {
            setIsError(true);
        });
    }

    return <div>
        <Container>
            <h2>Edit Sensor</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" value={item.name || ''}
                           onChange={handleChange} autoComplete="name"/>
                </FormGroup>
                <FormGroup>
                    <Label for="minAlarm">minAlarm</Label>
                    <Input type="number" name="minAlarm" id="minAlarm" value={item.minAlarm || ''}
                           onChange={handleChange} autoComplete="minAlarm"/>
                </FormGroup>
                <FormGroup>
                    <Label for="maxAlarm">maxAlarm</Label>
                    <Input type="number" name="maxAlarm" id="maxAlarm" value={item.maxAlarm || ''}
                           onChange={handleChange} autoComplete="maxAlarm"/>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Desc</Label>
                    <Input type="text" name="description" id="description" value={item.description || ''}
                           onChange={handleChange} autoComplete="description"/>
                </FormGroup>
                <FormGroup>
                    <Button color="primary" type="submit">Update</Button>{' '}
                    <Button color="secondary" tag={Link} to="../sensors">Cancel</Button>
                </FormGroup>
            </Form>
            {isError && <div>Something went wrong ...</div>}
        </Container>
    </div>
}

export default SensorEdit;
