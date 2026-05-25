import { Loader2, ScanLine } from "lucide-react";
import { useEffect, useRef } from "react";
import useScanReceipt from "./useScanReceipt";
import { toast } from "sonner";
import { clientAPI } from "@/src/lib/api/api";

const ReceiptScanner = ({ onScanComplete }: { onScanComplete: (data: any) => void }) => {
    const receiptInputRef = useRef<HTMLInputElement>(null);

    const scanReceiptApi = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await clientAPI.post(
            "http://localhost:5000/api/expense/scan-receipt",formData);

        if (!response.data) {
            throw new Error("Failed to scan receipt");
        }

        return response.data;
    };

    const {
        loading: scanReceiptLoading,
        fn: scanReceiptFn,
        data: scannedData,
    } = useScanReceipt(scanReceiptApi);


    const handleReceiptScan = async (file: any) => {
        if(file.size > 5 * 1024 * 1024) {
            toast.error("File size exceeds 5MB limit.");
            return;
        }
        await scanReceiptFn(file);
    };

    useEffect(() => {
        if (scannedData && !scanReceiptLoading) {
            onScanComplete(scannedData);
            toast.success("Receipt scanned successfully!");
        }
    }, [scannedData, scanReceiptLoading]);

    return (
        <div>
            <input
                ref={receiptInputRef}
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                capture="environment"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleReceiptScan(file);
                }}
            />
            <button
                onClick={() => receiptInputRef.current?.click()}
                disabled={scanReceiptLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-2.5 text-xs font-medium text-gray-400 transition-all hover:border-[#00C950]/40 hover:bg-[#00C950]/3 hover:text-[#00C950]"
            >
                {scanReceiptLoading ? (
                    <>
                        <Loader2 className="animate-spin" size={14} />
                        Scanning Receipt...
                    </>
                ) : (
                    <>
                        <ScanLine size={14} /> 
                        Scan Receipt with Ai
                    </>
                )}
            </button>
        </div>
    );
};

export default ReceiptScanner;