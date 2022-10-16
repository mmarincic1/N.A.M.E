import React, { useEffect, useState } from 'react';
import '../korisnik/korisnik.css';
import Swal from 'sweetalert2'
import 'animate.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function DoktorHome(props) {
    const [doktor, setDoktor] = useState("");

    return (
        <>
            <Card className="mx-auto">
                <Card.Header>Featured</Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </>
    )
}