import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import umbrellaLogo from "./umbrellalogo.png"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import "./MiApi.css"

const MiApi = () => {
    const [data, setData] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [sortAscending, setSortAscending] = useState(true)

    useEffect(() => {
        consumeApi()
    }, [])

    const consumeApi = async () => {
        const url = "https://raw.githubusercontent.com/Nandem1/desafio-4-examenFinalReact1/main/src/data.js"
        try {
            let response = await fetch(url)
            let database = await response.json()
            setData(database.data)
        } catch {
            alert("No hay respuesta de la API en Github Pages")
        }
    }

    const handleInputChange = event => {
        setInputValue(event.target.value)
    }

    const handleSortClick = () => {
        setSortAscending(!sortAscending)
    }

    const filteredData = data.filter(item => item.nombre.toLowerCase().includes(inputValue.toLowerCase())).sort((a, b) => {
        if (a.nombre < b.nombre) return sortAscending ? -1 : 1
        if (a.nombre > b.nombre) return sortAscending ? 1 : -1
        return 0
    })

    return (
        <div>
            <Navbar bg="light" variant="light" className="border">
                <Container>
                    <Navbar.Brand href="#home" className="d-flex justify-content-center align-items-center">
                        <img
                            alt=""
                            src={umbrellaLogo}
                            width="80"
                            height="80"
                            className="d-inline-block align-top"
                        />{' '}
                        <p className="head-text">Resident Evil Characters</p>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Container>
                <Row>
                    <Col>
                        <div className="w-100 mt-3 d-flex">
                            <Button className="me-1" variant="dark" onClick={handleSortClick}>Sort</Button>
                            <input className="w-100 ms-auto" type="text" value={inputValue} onChange={handleInputChange} placeholder="Buscar por nombre" />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row className="mt-3">
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Estado actual</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (<tr>
                                    <td key={item.id}>{index + 1}</td>
                                    <td key={item.nombre}>{item.nombre}</td>
                                    <td key={item.status}>{item.status}</td>
                                </tr>))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MiApi