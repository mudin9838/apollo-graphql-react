import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useRef } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { data, useNavigate, useParams } from 'react-router-dom';
import { GET_TOY_BY_ID } from '../../grapghql/toyQuery';
import { UPDATE_TOY } from '../../grapghql/toyMutation';

const EditToy = () => {
       const name = useRef("");
        const price = useRef("");
        const image = useRef("");
const navigate = useNavigate();
      const{id} = useParams(); //to get the id from the url
    const { data } =  useQuery(GET_TOY_BY_ID, {
        fetchPolicy: "no-cache", //intially to show without cache. b/c inmemory cache enough
        variables: { 
            id: Number(id), // //pass the id as a variable to the query
        },
    });

const [updateToy] =  useMutation(UPDATE_TOY);

const updateToyHandler = () =>{ //in click event handler we invoked updateToy method by passing gpraghql variable object  with the fom data and navigate backto homepage
     updateToy({//in click event handler we invoked updateToy method by passing gpraghql variable object  with the fom data and navigate backto homepage
        variables: { 
            id: Number(id), // //pass the id as a variable to the query
            name: name.current.value, //input value
            price: parseFloat(price.current.value),
            image: image.current.value,
        },
    }).then(() => { //after completion
        navigate("/");
    }
).catch((err) => {
        console.log(err);
    })
};   
useEffect(() => {
 if(data?.Toy){
     name.current.value = data.Toy.name; //set the input value to the data from the query
     price.current.value = data.Toy.price;
    image.current.value = data.Toy.image;
 }
}, [data]) //when data is changed, set the input value to the data from the query





  return (
    <>
    <Container className='mt-2'>
        <Row>
           <Col>
           <legend>Update Toy</legend>
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
             <Button variant="primary" type="submit" onClick={updateToyHandler}>
                Update
             </Button>
           </Col>
        </Row>
    </Container>
    </>
  )
}


export default EditToy;