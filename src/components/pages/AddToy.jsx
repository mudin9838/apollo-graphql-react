import { useMutation } from '@apollo/client';
import React, { useRef } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { CREATE_NEW_TOY } from '../../grapghql/toyMutation';
import { useNavigate } from 'react-router-dom';

const AddToy = () => {
    const name = useRef("");
    const price = useRef("");
    const image = useRef("");
const navigate = useNavigate();
   const [createToy] = useMutation(CREATE_NEW_TOY); //we passed our mutation command then we get createToy as a method

const addToyHandler=()=>{ 
    createToy({//in click event handler we invoked createToy method by passing gpraghql variable object  with the fom data and navigate backto homepage
        variables: { 
            name: name.current.value, //input value
            price: parseFloat(price.current.value),
            image: image.current.value,
        },
    }).then(() => { //after completion
        navigate("/");
    }).catch((err) => {
        console.log(err);
    })
};


  return (
    <>
    <Container className='mt-2'>
        <Row>
           <Col>
           <legend>Add New Toy</legend>
           <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" ref={name}/>
            </Form.Group>
             <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" ref={price}/>
             </Form.Group>
             <Form.Group className="mb-3" controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" ref={image}/>
             </Form.Group>
             <Button variant="primary" type="submit" onClick={addToyHandler}>
                Add
             </Button>
           </Col>
        </Row>
    </Container>
    </>
  )
}

export default AddToy