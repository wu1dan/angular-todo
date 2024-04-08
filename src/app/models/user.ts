import { UUID } from "crypto";
import { item } from "./item";

export interface user{
    id: UUID;
    firstName: string;
    lastName: string;
    userItems: Array<item>;
}