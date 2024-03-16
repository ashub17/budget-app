import React, { useContext } from "react";
import { Transaction } from "./Transaction";
import { GlobalContext } from "../context/GlobalState";

export const TransactionList = () => {
    const { transactions } = useContext(GlobalContext);
    console.log(transactions);

    const downloadCsvFile = () => {
        const csvRows = [
            ["Text", "Expense", "Income"], // Header row
        ];

        transactions.forEach((transaction) => {
            const expense =
                transaction.amount < 0 ? Math.abs(transaction.amount) : 0;
            const income = transaction.amount > 0 ? transaction.amount : 0;
            csvRows.push([transaction.text, expense, income]);
        });

        const csvContent =
            "data:text/csv;charset=utf-8," +
            csvRows.map((row) => row.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link); // Required for Firefox
        link.click();
    };

    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {transactions.map((transaction) => (
                    <Transaction
                        key={transaction.id}
                        transaction={transaction}
                    />
                ))}
            </ul>
            <button className="btn" onClick={downloadCsvFile}>Download Transactions</button>
        </>
    );
};
