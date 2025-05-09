import React, { useEffect, useState } from "react";
import {
    Briefcase,
    FileText,
    Users,
    Hourglass,
    CheckCircle,
    ListChecks,
    XCircle,
} from "lucide-react";
import makeRequest from "../../axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchDashboardStats = async () => {
        try {
            const response = await makeRequest.get("admin/dashboard-counter");
            setStats(response.data);
        } catch (err) {
            console.error("Error fetching stats:", err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const cards = [
        {
            label: "Total Employers",
            value: stats?.All_employers,
            icon: <Users className="text-blue-700" />,
            bgColor: "from-blue-100 to-blue-200",
            cardBg: "bg-blue-50",
            link: "/admin/employers", // Specify the URL to link to
        },
        {
            label: "Total Jobs",
            value: stats?.all_jobs,
            icon: <Briefcase className="text-green-700" />,
            bgColor: "from-green-100 to-green-200",
            cardBg: "bg-green-50",
            link: "/candidate/jobs", // Specify the URL to link to
        },
        {
            label: "Total Applications",
            value: stats?.application_total,
            icon: <FileText className="text-purple-700" />,
            bgColor: "from-purple-100 to-purple-200",
            cardBg: "bg-purple-50",
            // link: "/admin/applications", // Specify the URL to link to
        },
        {
            label: "Pending Applications",
            value: stats?.Pending_app,
            icon: <Hourglass className="text-yellow-600" />,
            bgColor: "from-yellow-100 to-yellow-200",
            cardBg: "bg-yellow-50",
            // link: "/admin/pending-applications", // Specify the URL to link to
        },
        {
            label: "Shortlisted",
            value: stats?.Shortlisted_app,
            icon: <ListChecks className="text-indigo-700" />,
            bgColor: "from-indigo-100 to-indigo-200",
            cardBg: "bg-indigo-50",
            // link: "/admin/shortlisted", // Specify the URL to link to
        },
        {
            label: "Selected",
            value: stats?.Selected_app,
            icon: <CheckCircle className="text-emerald-700" />,
            bgColor: "from-emerald-100 to-emerald-200",
            cardBg: "bg-emerald-50",
            // link: "/admin/selected", // Specify the URL to link to
        },
        {
            label: "Rejected",
            value: stats?.Rejected_app,
            icon: <XCircle className="text-red-700" />,
            bgColor: "from-red-100 to-red-200",
            cardBg: "bg-red-50",
            // link: "/admin/rejected", // Specify the URL to link to
        },
    ];

    if (loading) {
        return <div className="text-center p-10">Loading...</div>;
    }

        return (
            <div className="p-6 max-w-7xl mx-auto pt-20 mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                        <Link
                            key={index}
                            to={card.link} 
                            className={`group ${card.cardBg} shadow-md rounded-xl p-6 flex items-center gap-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                        >
                            <div
                                className={`w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br ${card.bgColor}`}
                            >
                                <div className="text-2xl">{card.icon}</div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{card.label}</p>
                                <h2 className="text-2xl font-semibold text-gray-800">{card.value}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
};
export default AdminDashboard;