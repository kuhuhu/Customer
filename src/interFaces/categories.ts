export interface ICateReq {
    name: string;
    description?: string;
    image?: File;
}

export interface Icate {
    id: number;
    name: string;
    phone: number;
    diemthuong: number;
    created_at: Date;
    updated_at: Date;
}