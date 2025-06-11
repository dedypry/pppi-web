interface Props {
    Icon: any;
    title: string;
    subtitle: string;
}
export default function ListSidebar({ Icon, title, subtitle }: Props) {
    return (
        <div className="flex items-center gap-10 rounded-lg border border-primary-200 p-5 shadow-md">
            <Icon size={60} className="text-primary"/>
            <div>
                <p className="text-[20px] font-semibold text-gray-700">{title}</p>
                <p className="text-[15px] text-gray-500">{subtitle}</p>
            </div>
        </div>
    );
}
