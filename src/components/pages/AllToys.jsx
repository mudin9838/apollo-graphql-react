// @ts-nocheck
import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, Container } from 'react-bootstrap'
import { GET_ALLToys } from '../../grapghql/toyQuery.js'
import { useNavigate } from 'react-router-dom'
const AllToys = () => {
    const [allToysData, setAllToysData] = useState([])
    const navigate = useNavigate()
 const { data } =   useQuery(GET_ALLToys, {
        fetchPolicy: "no-cache", //intially to show without cache. b/c inmemory cache enough
    });

    useEffect(() => {
     if (data?.allToys) {
        setAllToysData(data.allToys)
     }
    }, [data])
    
  return (
    <>
    <Container className='mt-2'>
      <Row>
        <Col className='col-md-4 offset-md-4'>
        <Button variant="primary" type="button" onClick={() => navigate("/add-toy")}>Add New Toy</Button>
        </Col>
      </Row>
     <Row xs={1} md={2} className="g-4">
      {allToysData.map((toy) => (
        <Col key={toy.id}>
          <Card>
            <Card.Img variant="top" src={toy.image} />
            <Card.Body>
              <Card.Title>{toy.name}</Card.Title>
              <Card.Text>
                Price: {toy.price} 
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </Container>
    </>
  )
}

export default AllToys