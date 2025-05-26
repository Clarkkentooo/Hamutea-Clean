import { ActionButton } from "@components/common/button"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching transaction data
        setTimeout(() => {
            setTransactions([
                { id: 1, customer: "Maria Santos", date: "15 June 2023, 10:30 AM", amount: 150, status: "completed" },
                { id: 2, customer: "Juan Dela Cruz", date: "14 June 2023, 2:45 PM", amount: 220, status: "completed" },
                { id: 3, customer: "Ana Reyes", date: "14 June 2023, 9:15 AM", amount: 85, status: "completed" },
                { id: 4, customer: "Carlos Mendoza", date: "13 June 2023, 4:20 PM", amount: 310, status: "completed" },
                { id: 5, customer: "Sofia Garcia", date: "12 June 2023, 11:05 AM", amount: 175, status: "completed" }
            ]);
            setLoading(false);
        }, 800);
    }, []);

    return (
        <div className="border border-hamutea-border rounded-2xl p-5 h-full flex flex-col w-full">
            <div className="border-b border-hamutea-border pb-2 flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-xl font-bold">Transactions</h1>
                    <p className="text-hamutea-gray text-sm">Latest Overview</p>
                </div>
                <ActionButton 
                    variant="danger" 
                    label="View All" 
                    icon="ArrowRight" 
                    iconAlign="right"
                    onClick={() => navigate('/admin/transactions')} 
                />
            </div>

            <div className="px-2 flex-1 overflow-y-auto max-h-[400px]">
                {loading ? (
                    <div className="py-10 text-center text-hamutea-gray">Loading transactions...</div>
                ) : (
                    <div className="flex flex-col space-y-1">
                        {transactions.map((transaction) => (
                            <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-hamutea-border hover:bg-gray-50 px-2 rounded-md w-full">
                                <div className="overflow-hidden max-w-[70%]">
                                    <p className="text-hamutea-blue font-bold truncate">{transaction.customer}</p>
                                    <p className="text-sm text-hamutea-gray truncate">{transaction.date}</p>
                                </div>
                                <p className="text-lg font-medium whitespace-nowrap ml-2">₱{transaction.amount.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Transactions;