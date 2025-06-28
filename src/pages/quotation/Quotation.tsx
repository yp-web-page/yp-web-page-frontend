import React from "react";
import useGetAllQuotations from "../../hooks/useGetQuotations";
import { UserUtils } from "../../util/userUtils";
import { useModal } from "../../context/ModalContext";
import { TypeNotification } from "../../types/TypeNotifcation";
import { useNavigate } from "react-router";
import QuotationTable from "../../components/quotation/QuotationTable";

const Quotation: React.FC = () => {

    const { openModal, closeModal } = useModal();
    const navigate = useNavigate();
    const handleOpenNotification = (message: string, typeNotification: TypeNotification) => {
        openModal("notification", message,    typeNotification);
    };

    const username: string | null = UserUtils.getUsernameFromLocalStorage();

    if (username == null) {
        handleOpenNotification("El usuario no se encuentra logeado, por lo tanto no puede cotizar.", 'error');
        setTimeout(() => {
            closeModal();
        }, 5000);
        navigate("/");
    }

    const { data: quotations } = useGetAllQuotations(username || "");

    return(
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center py-8 px-2 overflow-auto">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
                <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center break-words">{username}</h1>
                <QuotationTable quotations={quotations?.quotations || []} username={username || ""} />
            </div>
        </div>
    );
}

export default Quotation;