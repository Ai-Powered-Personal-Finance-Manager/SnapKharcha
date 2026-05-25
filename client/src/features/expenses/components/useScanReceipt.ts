import { useState } from "react";
import { toast } from "sonner";

type ScanReceiptError = {
    response?: {
        data?: {
            message?: string;
        };
    };
    message?: string;
};

const useScanReceipt = (cb: (...args: unknown[]) => Promise<unknown>) => {
    const [data, setData] = useState<unknown>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ScanReceiptError | null>(null);

    const fn = async (...args: unknown[]) => {
        setLoading(true);
        setError(null);
        setData(undefined);

        try {
            const response = await cb(...args);
            setData(response);
            setError(null);
        } catch (caughtError) {
            const scanError = caughtError as ScanReceiptError;
            setError(scanError);
            const errorMessage =
                scanError?.response?.data?.message ||
                scanError?.message ||
                "Failed to scan receipt";
            toast.error(errorMessage);
            setData(undefined);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fn, setData };
};

export default useScanReceipt;