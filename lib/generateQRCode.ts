import QRCode from 'qrcode';
import CryptoJS from "crypto-js";

export const generateQRCode = async (text: string): Promise<string> => {
    const signature = CryptoJS.HmacSHA256(text, process.env.SECRET_KEY).toString();
    const dataWithSignature = `${text}|${signature}`;
    const url = `${process.env.NEXT_PUBLIC_LOCAL_URL}/qr-check?paymentId=${encodeURIComponent(dataWithSignature)}`;

    try {
        return await QRCode.toDataURL(url);
    } catch (err) {
        console.error('Failed to generate QR code:', err);
        throw err;
    }
};
