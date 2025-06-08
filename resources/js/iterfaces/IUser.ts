interface IPivot {
    model_type: string;
    model_id: number;
    role_id: number;
}

export interface IRole {
    id: number;
    name: string;
    guard_name: string;
    created_at: string; // bisa juga diubah ke Date jika diproses lebih lanjut
    updated_at: string; // sama seperti di atas
    pivot: IPivot;
}

export interface Province {
    id: number;
    name: string;
    code: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface City {
    id: number;
    province_id: number;
    name: string;
    code: string;
    created_at: string | null;
    updated_at: string | null;
    province: Province | null;
}

export interface District {
    id: number;
    city_id: number;
    name: string;
    code: string | null;
    created_at: string | null;
    updated_at: string | null;
    city: City | null;
}

export interface UserProfile {
    id: number;
    user_id: number;
    nik: string;
    place_birth: string;
    date_birth: string | null;
    gender: string;
    citizenship: string;
    address: string;
    province_id: number;
    city_id: number;
    district_id: number;
    phone: string;
    last_education_nursing: string;
    last_education: string;
    workplace: string;
    hope_in: string | null;
    contribution: string | null;
    is_member_payment: boolean;
    member_payment_file: string;
    reason_reject: string | null;
    photo: string;
    created_at: string;
    updated_at: string;
    province: Province;
    city: City;
    district: District;
    front_title: string;
    back_title: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    nia: string;
    status: string | null;
    sort: number;
    join_year: number;
    created_by: number;
    profile: UserProfile;
    is_organization: boolean;
    is_active: boolean;
    parent_id: number;
    job_title: string;
    department_id: number;
    roles: IRole[];
    superior:User | null;
}

export interface IUserResponse {
    current_page: number;
    data: User[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface IResponseProvince {
    current_page: number;
    data: Province[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
export interface IResponseCity {
    current_page: number;
    data: City[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
export interface IResponseDistrict {
    current_page: number;
    data: District[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
