export type User ={
    name: string;
    email: string;
    phone: string;
    password: string;
}
export type UserInfo ={
    name: string;
    email: string;
    phone: string;
}

export type Post ={
    name: string;
    description:string;
    price:string;
    images: (string|null)[];
    selectedCategory:string;
    subCategoryName:string;
}