import { UUID } from "crypto";

export interface item{
    id: UUID;
    title: string;
    completionStatus: boolean;
    dueDate: Date;
}