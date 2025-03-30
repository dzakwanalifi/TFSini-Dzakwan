// components/account-card.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Copy, Check, HomeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Tipe Data Akun (Sama)
interface BankAccount {
    id: string;
    name: string;
    number: string;
    logo: string | null;
}

// Props (Sama)
interface AccountCardProps {
    account: BankAccount;
    ownerName: string;
    copiedId: string | null;
    onCopy: (textToCopy: string, id: string, description: string) => void;
}

// Komponen AccountCard (Sekarang adalah Card itu sendiri)
export function AccountCard({ account, ownerName, copiedId, onCopy }: AccountCardProps) {
    const isCopied = copiedId === account.id;

    // Extract bank code from name (assumes format "Bank Name (XXX)")
    const bankCodeMatch = account.name.match(/\((\d+)\)/);
    const bankCode = bankCodeMatch ? bankCodeMatch[1] : null;

    // Format name without the code
    const bankName = bankCodeMatch 
        ? account.name.replace(/\s*\(\d+\)/, '') 
        : account.name;

    return (
        <Card
            className="mb-4 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 overflow-hidden data-[copied=true]:ring-2 data-[copied=true]:ring-yellow-400 dark:data-[copied=true]:ring-yellow-600"
            data-copied={isCopied}
        >
            <CardContent className="p-4 flex items-center gap-4">
                {/* === Wadah Logo Disesuaikan untuk Dark Mode === */}
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white dark:bg-card rounded-md overflow-hidden border dark:border-slate-700">
                    {account.logo ? (
                        <Image
                            src={account.logo}
                            alt={`Logo ${account.name}`}
                            width={48} // Sama dengan lebar wadah
                            height={48} // Sama dengan tinggi wadah
                            className="max-w-full max-h-full object-contain p-1" // Contain di dalam wadah, sedikit padding
                        />
                    ) : (
                        // Placeholder jika logo null
                        <div className="w-full h-full bg-muted flex items-center justify-center rounded-md">
                           <HomeIcon className="h-6 w-6 text-muted-foreground"/>
                        </div>
                    )}
                </div>

                {/* Bagian Info Teks & Nomor */}
                <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-medium leading-tight truncate">{bankName}</p>
                        {bankCode && (
                            <Badge 
                                variant="outline" 
                                className="text-xs border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 h-5"
                                onClick={() => onCopy(bankCode, `${account.id}-code`, `Kode Bank ${bankName}`)}
                                title="Klik untuk menyalin kode bank"
                            >
                                {bankCode}
                            </Badge>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1.5">a.n. {ownerName}</p> {/* Tambah margin bawah */}
                    {/* Nomor Bisa Diklik */}
                    <span
                        id={account.id}
                        className="block text-xl font-mono font-semibold text-primary break-all cursor-pointer hover:text-primary/80 transition-colors leading-tight" // Font lebih besar
                        onClick={() => onCopy(account.number, account.id, `Nomor ${bankName}`)}
                        title="Klik untuk menyalin nomor"
                    >
                        {account.number}
                    </span>
                </div>

                {/* Bagian Tombol Salin (di ujung kanan) */}
                <div className="flex-shrink-0 self-center">
                    <Button
                        variant={isCopied ? "secondary" : "outline"}
                        size="icon"
                        onClick={() => onCopy(account.number, account.id, `Nomor ${bankName}`)}
                        disabled={isCopied}
                        title={isCopied ? "Tersalin!" : "Salin nomor"}
                        className="h-9 w-9" // Ukuran tetap
                    >
                        {isCopied ? ( <Check className="h-5 w-5 text-green-600" /> ) : ( <Copy className="h-5 w-5" /> )}
                        <span className="sr-only">{isCopied ? "Tersalin!" : "Salin"}</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}