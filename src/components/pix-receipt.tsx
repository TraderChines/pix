'use client';

import React, { forwardRef } from 'react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { FileText, Mail } from 'lucide-react';
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

const ReceiptIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_2_63)">
        <path
          d="M18.6667 5.33331H45.3333C51.2217 5.33331 56 10.1116 56 16V48C56 53.8884 51.2217 58.6666 45.3333 58.6666H18.6667C12.7783 58.6666 8 53.8884 8 48V16C8 10.1116 12.7783 5.33331 18.6667 5.33331Z"
          fill="currentColor"
        />
        <path
          d="M42.6667 21.3333H21.3333C20.597 21.3333 20 21.9303 20 22.6666V41.3333C20 42.0696 20.597 42.6666 21.3333 42.6666H42.6667C43.403 42.6666 44 42.0696 44 41.3333V22.6666C44 21.9303 43.403 21.3333 42.6667 21.3333Z"
          stroke="black"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 34.6666L32 38.6666L36 34.6666"
          stroke="black"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 26.6666V38.6666"
          stroke="black"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2_63">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

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
        <ReceiptIcon className="text-accent mb-6" />

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
