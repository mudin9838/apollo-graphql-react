import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Container } from "react-bootstrap";
import { GET_ALLToys } from "../../grapghql/toyQuery.js";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../shared/DeleteConfirmation.jsx";
import { DELETE_TOY_BY_ID } from "../../grapghql/toyMutation.js";

const AllToys = () => {
  const [allToysData, setAllToysData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedToyIdToDelete, setselectedToyIdToDelete] = useState(0);
  const navigate = useNavigate();
  const { data } = useQuery(GET_ALLToys, {
    fetchPolicy: "no-cache", // Initially show without cache. b/c in-memory cache enough
  });

const [deleteToy] = useMutation(DELETE_TOY_BY_ID); 


const confirmDeleteHandler = () => {
  deleteToy({
    variables: {
      id: selectedToyIdToDelete,
    },
            update: (cache, { data: { DELETE_TOY_BY_ID  } }) => { //update method immediately executed once the api response is successful. createToy newly createdobject
      cache.modify({
        fields: {
          allToys(existingToys = [], { readField }) { //readfield-help to read the field value from the cache
            existingToys = existingToys.filter(
              toy=>readField("id", toy) !== selectedToyIdToDelete); // remove the old data object
            return [...existingToys]; 
          },
        }
      });
      }
  }).then(() => {
    setAllToysData((prevToys) =>
      prevToys.filter((toy) => toy.id !== selectedToyIdToDelete) //removing the deleted toy from the list
    );
    setselectedToyIdToDelete(0);
    setShowModal(false);
  });
}




  useEffect(() => {
    if (data?.allToys) {
      setAllToysData(data.allToys);
    }
  }, [data]);

  const openConfirmDeleteModalHandler = (id) => {
    setselectedToyIdToDelete(id);
    setShowModal(true);
  };

  const closeConfirmDeleteModalHandler = () => {
    setselectedToyIdToDelete(0);
    setShowModal(false);
  };

  return (
    <>
      <DeleteConfirmation
        showModal={showModal} 
        title="Delete Confirmation"
        body="Are you sure you want to delete this toy?"
        closeConfirmDeleteModalHandler={closeConfirmDeleteModalHandler}
        confirmDeleteHandler={confirmDeleteHandler}
      />
      <Container className="mt-2">
        <Row>
          <Col className="col-md-4 offset-md-4">
            <Button
              variant="primary"
              type="button"
              onClick={() => navigate("/add-toy")}
            >
              Add New Toy
            </Button>
          </Col>
        </Row>
        <Row xs={1} md={2} className="g-4">
          {allToysData.map((toy) => (
            <Col key={toy.id}>
              <Card>
                <Card.Img variant="top" src={toy.image} />
                <Card.Body>
                  <Card.Title>{toy.name}</Card.Title>
                  <Card.Text>Price: {toy.price}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/edit-toy/${toy.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => openConfirmDeleteModalHandler(toy.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default AllToys;
