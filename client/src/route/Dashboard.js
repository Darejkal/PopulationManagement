import { Card, CardBody, CardHeader, ListGroup, ListGroupItem } from "react-bootstrap"
import {HouseholdTable,RecentChangeTable} from "../component/DashboardComponent"

export function Dashboard(){
    return (
        <ListGroup style={{ padding: "0 5rem", border: "none" }}>
        <ListGroupItem style={{ border: "none",display:"flex",flexDirection: "row" }}>
            <RecentChangeTable/>
        </ListGroupItem>
        <ListGroupItem style={{ border: "none",display:"flex",flexDirection: "row" }}>
            <HouseholdTable/>
        </ListGroupItem>
    </ListGroup>
    )
}