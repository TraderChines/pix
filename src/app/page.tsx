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
    amount: 10000,
    timestamp: new Date(),
    recipientName: 'Localpay do Brasil Serviços de Pagamentos Ltda',
    payerName: 'Localpay do Brasil Serviços de Pagamentos Ltda',
  });
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDownloadImage = async () => {
    const element = receiptRef.current;
    if (!element) return;

    // Temporarily switch to dark theme for capture if current theme is light
    const isLightTheme = document.documentElement.classList.contains('light');
    if (isLightTheme) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }

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
    } finally {
        // Switch back to light theme if it was the original theme
        if (isLightTheme) {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
    }
  };

  return (
    <SidebarProvider>
      <Sidebar className="border-secondary">
        <SidebarHeader className="border-b border-secondary">
          <h2 className="text-xl font-semibold text-foreground">Editar Comprovante</h2>
        </SidebarHeader>
        <SidebarContent>
          <EditPanel 
            receiptData={receiptData} 
            setReceiptData={setReceiptData} 
            onDownloadImage={handleDownloadImage}
          />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <main className="relative bg-background text-foreground min-h-screen flex flex-col items-center justify-center p-4">
          <div className="absolute top-4 left-4">
            <SidebarTrigger />
          </div>
          <div className="w-full max-w-md">
            <div ref={receiptRef}>
              <PixReceipt data={receiptData} />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
