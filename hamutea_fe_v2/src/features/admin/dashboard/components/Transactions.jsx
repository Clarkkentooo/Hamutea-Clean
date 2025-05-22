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
                { id: 1, customer: "Maria Santos", date: "15 June 2023, 10:30 AM", amount: 150 },
                { id: 2, customer: "Juan Dela Cruz", date: "14 June 2023, 2:45 PM", amount: 220 },
                { id: 3, customer: "Ana Reyes", date: "14 June 2023, 9:15 AM", amount: 85 },
                { id: 4, customer: "Carlos Mendoza", date: "13 June 2023, 4:20 PM", amount: 310 },
                { id: 5, customer: "Sofia Garcia", date: "12 June 2023, 11:05 AM", amount: 175 }
            ]);
            setLoading(false);
        }, 800);
    }, []);

    return (
        <div className="border border-hamutea-border rounded-2xl p-5 h-full flex flex-col">
            <div className="border-b border-hamutea-border pb-2 flex items-center justify-between gap-10 mb-2">
                <div>
                    <h1 className="text-xl font-bold">Transactions</h1>
                    <p className="text-hamutea-gray">Latest Overview</p>
                </div>
                <ActionButton 
                    variant="danger" 
                    label="View All" 
                    icon="ArrowRight" 
                    onClick={() => navigate('/admin/transactions')} 
                />
            </div>

            <div className="px-2 flex-1 overflow-hidden">
                {loading ? (
                    <div className="py-10 text-center text-hamutea-gray">Loading transactions...</div>
                ) : (
                    <div className="h-full flex flex-col justify-between">
                        {transactions.map((transaction) => (
                            <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-hamutea-border">
                                <div>
                                    <p className="text-hamutea-blue font-bold">{transaction.customer}</p>
                                    <p className="text-sm text-hamutea-gray">{transaction.date}</p>
                                </div>
                                <p className="text-lg">₱{transaction.amount}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Transactions;