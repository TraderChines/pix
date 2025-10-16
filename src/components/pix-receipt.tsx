'use client';

import React, { forwardRef } from 'react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { CircleDollarSign, FileText, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

export interface PixReceiptData {
  amount: number;
  timestamp: Date;
  recipientName: string;
  payerName: string;
}

interface PixReceiptProps {
  data: PixReceiptData;
}

export const PixReceipt = forwardRef<HTMLDivElement, PixReceiptProps>(({ data }, ref) => {
  const { toggleSidebar } = useSidebar();

  const displayDate = format(data.timestamp, "dd MMM yyyy - HH:mm:ss", { locale: pt }).toUpperCase();

  const formattedAmount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
  }).format(data.amount);

  return (
    <div ref={ref} className="bg-black text-white w-full max-w-md mx-auto p-8 font-body">
      <div className="flex flex-col items-center text-center">
        <CircleDollarSign className="w-16 h-16 text-accent mb-6" strokeWidth={1.5}/>

        <h1 className="text-xl font-bold text-foreground mb-4">{data.recipientName}</h1>

        <p className="text-5xl font-bold text-foreground my-4">{formattedAmount}</p>

        <p className="text-muted-foreground text-sm mb-6">{displayDate}</p>

        <div className="flex items-center gap-2 mb-8">
            <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1.5 rounded-full">Transferência recebida</span>
            <span className="bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">Pix</span>
        </div>

        <div className="w-full border-t border-secondary my-6 opacity-50"></div>

        <div className="flex justify-around w-full mb-8 text-sm text-center">
            <button className="flex flex-col items-center gap-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded-lg p-2">
                <span className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6"/>
                </span>
                <span>Abrir<br/>comprovante</span>
            </button>
            <button className="flex flex-col items-center gap-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded-lg p-2">
                <span className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6"/>
                </span>
                <span>Enviar<br/>comprovante</span>
            </button>
        </div>

        <div className="w-full border-t border-secondary my-6 opacity-50"></div>

        <div className="w-full text-left space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-foreground font-medium">Nome</p>
                    <p className="text-muted-foreground text-lg">{data.payerName}</p>
                </div>
                <Button variant="secondary" size="sm" onClick={toggleSidebar}>Alterar</Button>
            </div>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-foreground font-medium">Nome original</p>
                    <p className="text-muted-foreground text-lg">{data.payerName}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
});

PixReceipt.displayName = 'PixReceipt';
