import { ReactNode } from "react";

export interface IChild{
    children: ReactNode
}


export interface Banners {
    id: number;
    url: string;
    size: number;
    type: string;
    is_active: boolean;
}

