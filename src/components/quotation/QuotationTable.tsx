import React, { useCallback, useState } from "react";
import { GetQuotation, SendEmailQuotationRequest } from "../../types/Quotation";
import Collapsible from "../collapsible/Collapsible";
import useDeleteQuotation from "../../hooks/useDeleteQuotation";
import Button from "../Button";
import useSendEmailQuotation from "../../hooks/useSendEmailQuotation";
import useGenerateQuotationPdf from "../../hooks/useGeneratePdfQuotation";
import { CurrencyUtils } from "../../util/currencyUtils";
import { QuotationUtils } from "../../util/quotationUtils";

interface QuotationTableProps {
    quotations: GetQuotation[];
    username: string;
}

const QuotationTable: React.FC<QuotationTableProps> = ({ quotations, username }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(() => {
        const activeIdx = quotations.findIndex(q => q.isActive);
        return activeIdx !== -1 ? activeIdx : null;
    });

    const handleToggle = (index: number, open: boolean) => {
        setOpenIndex(open ? index : null);
    };

    const { mutate: deleteQuotation } = useDeleteQuotation({username});
    const { mutate: sendEmailQuotation } = useSendEmailQuotation({username});
    const { mutate: downloadPdf, isPending } = useGenerateQuotationPdf();

    const handleDeleteQuotation = useCallback((quotationId: string) => {
      deleteQuotation(quotationId);
    }, [deleteQuotation]);

    const handleSendEmailQuotation = useCallback((quotationId: string) => {
      const sendEmailQuotationRequest: SendEmailQuotationRequest = {quotationId};
      sendEmailQuotation(sendEmailQuotationRequest);
    }, [sendEmailQuotation]);

    const handleDownloadPdfQuotation = useCallback((quotationId: string) => {
      downloadPdf(quotationId);
    }, [downloadPdf]);

    const renderTrigger = useCallback(({ isOpen, quotation }: {isOpen: boolean, quotation: GetQuotation}): React.ReactNode => {
        return(
          <div
            className={`flex justify-between items-center p-4 rounded-lg cursor-pointer transition shadow-sm border border-gray-200 hover:bg-blue-50 focus:bg-blue-100 outline-none ring-0 ${
              isOpen ? "bg-blue-100" : "bg-white"
            }`}
            tabIndex={0}
            aria-expanded={isOpen}
          >
            <div>
              <p className="font-bold text-base text-blue-900">Cotización #{quotation.quotationId}</p>
              <p className="text-xs text-gray-600">
                Creada: {new Date(quotation.createdQuotation).toLocaleDateString()}
              </p>
              {quotation.endQuotation && (
                <p className="text-xs text-gray-600">
                  Finalizada: {new Date(quotation.endQuotation).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="text-2xl text-blue-500">{isOpen ? "▲" : "▼"}</div>
          </div>
        );
    }, [quotations]);

    const renderContent = useCallback(({ quotation }: { quotation: GetQuotation }): React.ReactNode => {
        // Calculate total cost
        const total = quotation.addProductToQuotations.reduce((sum, product) => {
            return sum + product.subtotal;
        }, 0);

        // Determine status (adjust as needed for your data model)
        const status = quotation.status || (quotation.endQuotation ? "COMPLETED" : "CREATED");

        return(
            <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white mt-2">
            <table className="w-full text-sm md:text-base border-collapse">
              <thead className="bg-blue-50">
                <tr>
                  <th className="p-2 border text-blue-900">Producto</th>
                  <th className="p-2 border text-blue-900">Color</th>
                  <th className="p-2 border text-blue-900">Marca</th>
                  <th className="p-2 border text-blue-900">Tamaño</th>
                  <th className="p-2 border text-blue-900">Precio Unitario</th>
                  <th className="p-2 border text-blue-900">Cantidad</th>
                  <th className="p-2 border text-blue-900">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {quotation.addProductToQuotations.map((product) => {
                  const printName = product.printName;
                  const isCustomPrint = printName !== "";
                  const unitPrice = QuotationUtils.calculateUnitPrice(product.productPrice, product.printPrice, product.isPrintPersonalizable, product.width ?? 0, product.height ?? 0, printName);

                  return (
                    <tr key={product.id} className="text-center even:bg-blue-50 hover:bg-blue-100 transition text-gray-800">
                    <td className="p-2 border whitespace-nowrap">{product.productName}</td>
                    <td className="p-2 border whitespace-nowrap">{product.colorName}</td>
                    <td className="p-2 border whitespace-nowrap">{product.printName || 'No Aplica'}</td>
                    <td className="p-2 border whitespace-nowrap">{isCustomPrint ? product.height + " cm " + " x " + product.width + " cm" : "No Aplica" }</td>
                    <td className="p-2 border whitespace-nowrap">{CurrencyUtils.convertNumberToCurrency(unitPrice)}</td>
                    <td className="p-2 border whitespace-nowrap">{product.quantity}</td>
                    <td className="p-2 border font-semibold whitespace-nowrap">{CurrencyUtils.convertNumberToCurrency(product.subtotal)}</td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex flex-col items-center mt-4 gap-2 pb-4">
                <span className="font-bold text-lg text-blue-900 mb-2">Total: {CurrencyUtils.convertNumberToCurrency(total)}</span>
                <div className="flex flex-wrap justify-center gap-2">
                  {status === "CREATED" && (
                    <>
                      <Button 
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => handleDeleteQuotation(quotation.quotationId)}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        type="button"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => handleSendEmailQuotation(quotation.quotationId)}
                      >
                        Enviar Cotización
                      </Button>
                    </>
                  )}
                  {status === "COMPLETED" && (
                    <Button
                      type="button" 
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                      onClick={() => handleDownloadPdfQuotation(quotation.quotationId)}
                    >
                      {isPending ? "Generando PDF..." : "Descargar Cotización"}
                    </Button>
                  )}
                </div>
            </div>
          </div>
        );
    }, [handleDeleteQuotation, handleSendEmailQuotation, handleDownloadPdfQuotation, quotations]);
    
    return(
        <div className="space-y-4">
            {quotations.map((quotation, index) => {
                const isOpen = openIndex === index;

                return (
                    <Collapsible
                        key={quotation.quotationId}
                        isOpen={isOpen}
                        onToggle={(open) => handleToggle(index, open)}
                        trigger={renderTrigger({isOpen, quotation})}
                        content={renderContent({quotation})}
                    />
                );
            })}
        </div>
    );
};

export default QuotationTable;