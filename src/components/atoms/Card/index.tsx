import { CardBody, CardBodyProps } from "./CardBody";
import { CardFooter, CardFooterProps } from "./CardFooter";
import { CardHeader, CardHeaderProps } from "./CardHeader";
import { Root } from "./Root";

export { Root as Card, CardBody, CardFooter, CardHeader };

const Card = { Root, Body: CardBody, Footer: CardFooter, Header: CardHeader };

export default Card;

export type { CardBodyProps, CardFooterProps, CardHeaderProps };
