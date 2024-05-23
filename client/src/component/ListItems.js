import * as React from "react";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Accordion, ListGroup, useAccordionButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AdminWrap } from "../component/Auth";
import { SECURITY_LEVEL,ROUTE_LIST } from "../utils/config";

export default function ListItems({isDrawerOpen}) {
  const accordionRef=React.useRef(null);
	const [listItemChildren, setListItemChildren] = React.useState(ROUTE_LIST);
	return (
		<React.Fragment>
			<Accordion ref={accordionRef}>
				{listItemChildren.map((v, i) => (
					<ListItemsChild
            key={`list_item_child_${i}`}
						icon={v.icon}
						security={v.security}
						eventKey={`${i}`}
						listItemsChildNodes={v.nodes}
						listItemsChildTitle={v.title}
            hiddenFromNavList={v.hiddenFromNavList}
            isDrawerOpen={isDrawerOpen}
					/>
				))}
			</Accordion>
		</React.Fragment>
	);
}
const ListItemsChild = ({
	eventKey,
	listItemsChildNodes,
	listItemsChildTitle,
	security,
	icon,
  hiddenFromNavList,
  isDrawerOpen
}) => {
  const isOpenRef=React.useRef(false);
  const accordionItemRef=React.useRef(null);
	const navigate = useNavigate();
	const listItemChildAccordion = !hiddenFromNavList&&(
		<Accordion.Item ref={accordionItemRef} onSelect={()=>{
      isOpenRef.current=!isOpenRef.current
      console.log(isOpenRef.current);
    }} eventKey={eventKey}>
			<Accordion.Header>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText
					primary={
						<span style={{ fontSize: "1rem" }}>{listItemsChildTitle}</span>
					}
				/>
			</Accordion.Header>
			<Accordion.Body>
				<ListGroup>
					{listItemsChildNodes.map((v) => {
						if (v.security == SECURITY_LEVEL.ADMIN) {
							return !v.hiddenFromNavList&&(
								<AdminWrap>
									<ListGroup.Item
										onClick={() => {
											navigate(v.link);
										}}
									>
										{v.title}
									</ListGroup.Item>
								</AdminWrap>
							);
						}
						return !v.hiddenFromNavList&&(
							<ListGroup.Item
								onClick={() => {
									navigate(v.link);
								}}
							>
								{v.title}
							</ListGroup.Item>
						);
					})}
				</ListGroup>
			</Accordion.Body>
		</Accordion.Item>
	);
	if (security==SECURITY_LEVEL.ADMIN) {
		return <AdminWrap>{listItemChildAccordion}</AdminWrap>;
	} else {
		return listItemChildAccordion;
	}
};
