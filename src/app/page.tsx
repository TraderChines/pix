'use client';

import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { PixReceipt, type PixReceiptData } from '@/components/pix-receipt';
import { EditPanel } from '@/components/edit-panel';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, SidebarHeader, SidebarContent } from '@/components/ui/sidebar';

export default function Home() {
  const [receiptData, setReceiptData] = useState<PixReceiptData>({
    amount: 178.41,
    timestamp: new Date('2023-08-12T08:06:34'),
    recipientName: 'Localpay do Brasil Serviços de Pagamentos Ltda',
    payerName: 'Nome do Cliente',
  });
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDownloadImage = async () => {
    const element = receiptRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#000000',
        scale: 2,
      });
      const data = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = data;
      link.download = 'comprovante-pix.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <SidebarProvider>
      <Sidebar className="border-secondary">
        <SidebarHeader className="border-b border-secondary">
          <h2 className="text-xl font-semibold text-foreground">Editar Comprovante</h2>
        </SidebarHeader>
        <SidebarContent>
          <EditPanel receiptData={receiptData} setReceiptData={setReceiptData} />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <main className="relative bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
          <div className="absolute top-4 left-4">
            <SidebarTrigger />
          </div>
          <div className="w-full max-w-md">
            <div ref={receiptRef}>
              <PixReceipt data={receiptData} />
            </div>
            <div className="mt-8">
              <Button onClick={handleDownloadImage} className="w-full bg-secondary hover:bg-secondary/80 text-foreground">
                <Download className="mr-2 h-4 w-4" />
                Baixar comprovante em imagem (PNG)
              </Button>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
