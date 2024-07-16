import QRCode from 'qrcode';
import CryptoJS from "crypto-js";

export const generateQRCode = async (text: string): Promise<string> => {
    const signature = CryptoJS.HmacSHA256(text, process.env.SECRET_KEY).toString();
    const dataWithSignature = `${text}|${signature}`;
    try {
        return await QRCode.toDataURL(dataWithSignature);
    } catch (err) {
        console.error('Failed to generate QR code:', err);
        throw err;
    }
};
