"use client"

import { Card, CardBody, CardHeader, ListGroup, ListGroupItem } from "react-bootstrap"
import {FeeTable} from "./component"

export default function Dashboard(){
    return (
        <ListGroup style={{ padding: "0 5rem", border: "none" }}>
        <ListGroupItem style={{ border: "none",display:"flex",flexDirection: "row" }}>
            <FeeTable/>
        </ListGroupItem>
    </ListGroup>
    )
}