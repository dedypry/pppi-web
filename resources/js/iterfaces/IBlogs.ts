// Interface untuk kategori blog
export interface Category {
    id: number;
    name: string;
    icon: string | null;
    description: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}
interface Writer {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
}


// Interface untuk data blog
export interface Blog {
    id: number;
    category_id: number;
    writer_id: number;
    writer: Writer;
    cover: string;
    title: string;
    subtitle: string;
    content: string;
    tags: string; // Jika ingin sebagai array: string[]
    status: string;
    view_count: number;
    share_count: number;
    created_at: string;
    updated_at: string;
    publish_at: string;
    schedule: string;
    category: Category;
}

// Interface untuk pagination link
interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

// Interface utama untuk respon data paginasi blog
export interface BlogResponse {
    current_page: number;
    data: Blog[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
