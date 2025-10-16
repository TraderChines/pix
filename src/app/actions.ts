'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { PixReceiptData } from '@/components/pix-receipt';

export async function saveReceipt(data: PixReceiptData) {
    try {
        const docRef = await addDoc(collection(db, "comprovantes"), {
            amount: data.amount,
            recipientName: data.recipientName,
            payerName: data.payerName,
            receiptTimestamp: data.timestamp,
            savedAt: serverTimestamp(),
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding document: ", error);
        if (error instanceof Error) {
             // Basic check for permission errors, assuming project ID is not set
            if (error.message.includes('Could not find settings for project') || error.message.includes('permission-denied')) {
                return { success: false, error: "Falha ao salvar: Verifique a configuração do Firebase." };
            }
        }
        return { success: false, error: "Falha ao salvar o comprovante." };
    }
}
