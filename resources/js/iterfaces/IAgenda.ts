export interface IAgenda {
    id: number;
    icon: string | null;
    cover: string | null;
    title: string;
    subtitle: string;
    content: string | null;
    schedule: string | null;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
    start_at: string; // Format: "YYYY-MM-DD HH:mm:ss"
    end_at: string; // Format: "YYYY-MM-DD HH:mm:ss"
}
