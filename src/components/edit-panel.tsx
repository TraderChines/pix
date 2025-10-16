'use client';

import type { Dispatch, SetStateAction } from 'react';
import React, { useTransition } from 'react';
import type { PixReceiptData } from './pix-receipt';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Save, Clock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { saveReceipt } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from './theme-toggle';

interface EditPanelProps {
    receiptData: PixReceiptData;
    setReceiptData: Dispatch<SetStateAction<PixReceiptData>>;
}

export function EditPanel({ receiptData, setReceiptData }: EditPanelProps) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const amount = value === '' ? 0 : parseFloat(value);
        if (!isNaN(amount)) {
            setReceiptData(prev => ({ ...prev, amount }));
        }
    };

    const handleDateChange = (date: Date | undefined) => {
        if (!date) return;
        const oldTimestamp = receiptData.timestamp;
        date.setHours(oldTimestamp.getHours());
        date.setMinutes(oldTimestamp.getMinutes());
        date.setSeconds(oldTimestamp.getSeconds());
        setReceiptData(prev => ({ ...prev, timestamp: date }));
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = e.target.value; 
        const [hours, minutes, seconds] = time.split(':').map(Number);
        const newTimestamp = new Date(receiptData.timestamp);
        if(!isNaN(hours)) newTimestamp.setHours(hours);
        if(!isNaN(minutes)) newTimestamp.setMinutes(minutes);
        if(!isNaN(seconds)) newTimestamp.setSeconds(seconds);
        setReceiptData(prev => ({ ...prev, timestamp: newTimestamp }));
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReceiptData(prev => ({ ...prev, payerName: e.target.value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            const result = await saveReceipt(receiptData);
            if(result.success) {
                toast({
                    title: "Sucesso!",
                    description: `Comprovante salvo com ID: ${result.id}`,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Erro ao Salvar",
                    description: result.error,
                });
            }
        });
    }

    const handleSyncDateTime = () => {
        setReceiptData(prev => ({ ...prev, timestamp: new Date() }));
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-6 h-full flex flex-col">
            <div className="flex-grow space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="amount">Valor (R$)</Label>
                    <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        value={receiptData.amount}
                        onChange={handleAmountChange}
                        placeholder="10000.00"
                        className="bg-background"
                    />
                </div>
                
                <div className="space-y-2">
                    <div className='flex justify-between items-center mb-2'>
                        <Label>Data e Hora</Label>
                        <Button variant="ghost" size="sm" type="button" onClick={handleSyncDateTime} className="text-xs">
                            <Clock className="mr-2 h-3 w-3" />
                            Sincronizar Agora
                        </Button>
                    </div>
                    <div className="flex gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start font-normal bg-background">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {format(receiptData.timestamp, 'dd/MM/yy', { locale: pt })}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={receiptData.timestamp}
                                    onSelect={handleDateChange}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        
                        <Input
                            id="time"
                            type="time"
                            step="1"
                            value={format(receiptData.timestamp, 'HH:mm:ss')}
                            onChange={handleTimeChange}
                            className="bg-background"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="payerName">Nome do Pagador</Label>
                    <Input
                        id="payerName"
                        type="text"
                        value={receiptData.payerName}
                        onChange={handleNameChange}
                        placeholder="Nome do Cliente"
                        className="bg-background"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <ThemeToggle />
                <Button type="submit" disabled={isPending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    {isPending ? 'Salvando...' : <> <Save className="mr-2 h-4 w-4" /> Salvar Alterações </>}
                </Button>
            </div>
        </form>
    );
}
