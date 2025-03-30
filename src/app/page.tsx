"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Copy, Check, Download, HomeIcon, Share2, MessageCircle } from "lucide-react";
import { toast } from "sonner"; // Removed Toaster import as it's now in layout
import React, { useState } from 'react';
import { AccountCard } from "@/components/account-card";

// --- DATA AKUN ---
const accountOwner = "Muhammad Dzakwan Alifi";

// Simple list of bank accounts without grouping
const bankAccounts = [
  { id: 'rek-bsi', name: 'Bank Syariah Indonesia (451)', number: '7268898829', logo: '/logos/bsi.png' },
  { id: 'rek-jago1', name: 'Bank Jago (542)', number: '100537378868', logo: '/logos/jago.png' },
  { id: 'rek-sea', name: 'SeaBank (535)', number: '901163435084', logo: '/logos/seabank.png' },
  { id: 'rek-line', name: 'LINE Bank / Hana Bank (484)', number: '15752208430', logo: '/logos/linebank.png' },
  { id: 'rek-blu', name: 'Blu / BCA Digital (501)', number: '000000157351', logo: '/logos/blu.png' },
  { id: 'rek-aladin', name: 'Bank Aladin (947)', number: '50483763178', logo: '/logos/aladin.png' },
  { id: 'rek-superbank', name: 'Superbank (562)', number: '030007674168', logo: '/logos/superbank.png' },
];

const leadBank = {
  idPrefix: 'lead',
  name: 'Lead Bank',
  routing: '101019644',
  account: '215092331679',
  address: '1801 Main St., Kansas City, MO 64108',
  logo: '/logos/lead.png'
};

const eWallets = {
  id: 'ewallet-all',
  name: 'E-Wallet',
  number: '081225644468',
  logos: [
    { name: 'ShopeePay', path: '/logos/shopeepay.png' },
    { name: 'GoPay', path: '/logos/gopay.png' },
    { name: 'Dana', path: '/logos/dana.png' },
    { name: 'OVO', path: '/logos/ovo.png' },
    { name: 'LinkAja', path: '/logos/linkaja.png' },
  ]
};
// --- END DATA AKUN ---

export default function Home() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (textToCopy: string, id: string, description: string = "Nomor") => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(id);
      
      // Custom styled toast with consistent font and styling
      toast.success(
        <div className="font-sans">
          <p className="font-medium text-sm">{`${description} berhasil disalin!`}</p>
          <p className="font-mono text-xs mt-1 opacity-90">{textToCopy}</p>
        </div>,
        {
          duration: 2000,
          className: "bg-card border border-border",
          action: {
            label: "Tutup",
            onClick: () => {},
          },
        }
      );
      
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      console.error("Gagal menyalin teks: ", err);
      toast.error("Gagal menyalin nomor.", {
        description: "Silakan coba salin secara manual.",
      });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "TFSini - Info Pembayaran",
      text: "Info rekening dan e-wallet untuk transfer.",
      url: window.location.href
    };
    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link halaman disalin ke clipboard!", {
           description: window.location.href
        });
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error("Gagal berbagi: ", err);
        toast.error("Gagal membagikan halaman.");
      }
    }
  };

  // Create pre-filled WhatsApp message
  const defaultMessage = encodeURIComponent("Assalamualaikum, saya sudah transfer THR-nya yaa. Mohon dicek. Terima kasih!");
  const whatsappLink = `https://wa.me/6281225644468?text=${defaultMessage}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-4 py-12 md:px-8 md:py-16 lg:py-20 text-foreground">
      {/* Toaster moved to layout.tsx */}

      {/* Header Area */}
      <div className="w-full max-w-lg text-center mb-10 md:mb-12 relative">
        <div className="absolute top-0 right-0">
          {/* Updated Share button to be consistent with other icon buttons */}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleShare} 
            title="Bagikan Halaman Ini"
            className="h-9 w-9" // Updated to match e-wallet copy button size
          >
            <Share2 className="h-5 w-5" /> {/* Updated icon size to match */}
            <span className="sr-only">Bagikan Halaman Ini</span>
          </Button>
        </div>

        <h1 className="text-4xl font-extrabold mb-5 tracking-tight lg:text-5xl text-primary">
          TFSini
        </h1>
        
        {/* Simplified Greeting Message */}
        <div className="mb-6 text-emerald-700 dark:text-emerald-400 py-2">
          <p className="font-medium text-sm md:text-base">
            <span className="block font-semibold">
              Taqabbalallahu Minna Wa Minkum
            </span>
            <span className="block mt-2">
              Minal Aidin Wal Faidzin, Mohon Maaf Lahir dan Batin 🙏
            </span>
          </p>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="w-full max-w-lg space-y-8 md:space-y-10">

        {/* === Bagian Rekening Bank === */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
            Rekening Bank
          </h2>
          <div className="space-y-3">
            {bankAccounts.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                ownerName={accountOwner}
                copiedId={copiedId}
                onCopy={handleCopy}
              />
            ))}
          </div>
        </section>

        {/* === Bagian Rekening Internasional (Lead Bank) === */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
            Rekening Internasional
          </h2>
          <Card
            className="mb-4 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 overflow-hidden data-[copied*='lead-']:ring-2 data-[copied*='lead-']:ring-yellow-400 dark:data-[copied*='lead-']:ring-yellow-600"
            data-copied={copiedId?.startsWith(leadBank.idPrefix + '-')}
          >
            <CardContent className="p-4 flex items-start gap-4">
              {/* === Wadah Logo Lead Bank Disesuaikan === */}
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white dark:bg-card rounded-md overflow-hidden border dark:border-slate-700 mt-1">
                {leadBank.logo ? (
                  <Image
                    src={leadBank.logo}
                    alt={`Logo ${leadBank.name}`}
                    width={48}
                    height={48}
                    className="max-w-full max-h-full object-contain p-1"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center rounded-md">
                    <HomeIcon className="h-6 w-6 text-muted-foreground"/>
                  </div>
                )}
              </div>
              <div className="flex-grow min-w-0 space-y-1.5">
                <p className="text-sm font-medium leading-tight truncate">{leadBank.name}</p>
                <p className="text-xs text-muted-foreground">a.n. {accountOwner}</p>
                {/* Routing */}
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Routing: </span>
                    <span
                      id={`${leadBank.idPrefix}-routing`}
                      className="font-mono font-medium text-foreground break-all cursor-pointer hover:text-primary transition-colors"
                      onClick={() => handleCopy(leadBank.routing, `${leadBank.idPrefix}-routing`, "Routing Number")}
                      title="Klik untuk menyalin routing"
                    >
                      {leadBank.routing}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 flex-shrink-0"
                    onClick={() => handleCopy(leadBank.routing, `${leadBank.idPrefix}-routing`, "Routing Number")}
                    disabled={copiedId === `${leadBank.idPrefix}-routing`}
                  >
                    {copiedId === `${leadBank.idPrefix}-routing` ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="sr-only">Salin Routing</span>
                  </Button>
                </div>
                {/* Account */}
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Account: </span>
                    <span
                      id={`${leadBank.idPrefix}-account`}
                      className="font-mono font-medium text-foreground break-all cursor-pointer hover:text-primary transition-colors"
                      onClick={() => handleCopy(leadBank.account, `${leadBank.idPrefix}-account`, "Account Number")}
                      title="Klik untuk menyalin account"
                    >
                      {leadBank.account}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 flex-shrink-0"
                    onClick={() => handleCopy(leadBank.account, `${leadBank.idPrefix}-account`, "Account Number")}
                    disabled={copiedId === `${leadBank.idPrefix}-account`}
                  >
                    {copiedId === `${leadBank.idPrefix}-account` ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="sr-only">Salin Account</span>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground pt-1">{leadBank.address}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* === Bagian E-Wallet === */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
            E-Wallet
          </h2>
          <Card
            className="mb-4 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 overflow-hidden data-[copied=true]:ring-2 data-[copied=true]:ring-yellow-400 dark:data-[copied=true]:ring-yellow-600"
            data-copied={copiedId === eWallets.id}
          >
            <CardContent className="p-4 flex items-center gap-4">
              {/* === Wadah Logo E-Wallet Disesuaikan === */}
              <div className="flex flex-wrap gap-1.5 flex-shrink-0 w-16 justify-center">
                {eWallets.logos.map((logoInfo) => (
                  <div key={logoInfo.name} className="w-7 h-7 flex items-center justify-center bg-white dark:bg-card rounded-sm overflow-hidden border dark:border-slate-700">
                    <Image
                      src={logoInfo.path}
                      alt={logoInfo.name}
                      width={28} height={28}
                      className="max-w-full max-h-full object-contain p-0.5"
                      title={logoInfo.name}
                    />
                  </div>
                ))}
              </div>

              {/* Info Teks & Nomor E-Wallet */}
              <div className="flex-grow min-w-0">
                <p className="text-xs text-muted-foreground mb-1.5">a.n. {accountOwner}</p>
                <span
                  id={eWallets.id}
                  className="block text-xl font-mono font-semibold text-primary break-all cursor-pointer hover:text-primary/80 transition-colors leading-tight"
                  onClick={() => handleCopy(eWallets.number, eWallets.id, "Nomor E-Wallet")}
                  title="Klik untuk menyalin nomor"
                >
                  {eWallets.number}
                </span>
              </div>

              {/* Tombol Salin E-Wallet */}
              <div className="flex-shrink-0 self-center">
                <Button
                  variant={copiedId === eWallets.id ? "secondary" : "outline"}
                  size="icon"
                  onClick={() => handleCopy(eWallets.number, eWallets.id, "Nomor E-Wallet")}
                  disabled={copiedId === eWallets.id}
                  title={copiedId === eWallets.id ? "Tersalin!" : "Salin nomor"}
                  className="h-9 w-9"
                >
                  {copiedId === eWallets.id ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                  <span className="sr-only">{copiedId === eWallets.id ? "Tersalin!" : "Salin"}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* === Bagian QRIS === */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
            QRIS
          </h2>
          <Card className="shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 overflow-hidden">
            <CardContent className="pt-6 pb-5 px-4 text-center">
              {/* QRIS Logo from public folder */}
              <Image
                src="/logos/qris.svg"
                alt="QRIS Logo"
                width={80}
                height={32}
                className="mx-auto mb-3"
                priority
              />
              
              <Image
                src="/qris-dzakwan.jpg"
                alt={`QRIS ${accountOwner}`}
                width={300}
                height={300}
                className="mx-auto mb-5 border rounded-lg"
                priority
              />
              <p className="text-sm text-muted-foreground mb-5 max-w-xs mx-auto">
                Scan QRIS ini untuk pembayaran (mendukung semua e-wallet & m-banking).
              </p>
              <a href="/qris-dzakwan.jpg" download={`QRIS_${accountOwner}.jpg`}>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Unduh QRIS
                </Button>
              </a>
            </CardContent>
          </Card>
        </section>

      </div>

      {/* Thank You Message - Added between QRIS and WhatsApp button */}
      <div className="w-full max-w-lg mt-6 mb-2">
        <p className="text-sm text-emerald-600 dark:text-emerald-400 text-center italic">
          Terima kasih banyak atas perhatian dan THR-nya! Semoga rezekinya dilancarkan dan diberkahi. 🙏
        </p>
      </div>

      {/* WhatsApp Confirmation Button - Updated with pre-filled message */}
      <div className="mt-8 mb-8 w-full max-w-lg">
        <a 
          href={whatsappLink} // Using the link with pre-filled message
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block"
        >
          <Button 
            className="w-full py-6 text-base font-medium bg-green-600 hover:bg-green-700 transition-colors"
          >
            <div className="flex items-center justify-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className="w-6 h-6"
              >
                <path 
                  d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 13.5988 2.39453 15.1853 3.13379 16.5989L2.0343 21.8633C1.97331 22.1899 2.21429 22.4832 2.54474 22.4679L7.71592 22.1204C9.12505 22.8358 10.6854 23.2 12.2617 23.2C17.7847 23.2 22.2618 18.7229 22.2618 13.2C22.2618 7.67715 17.7231 2 12.001 2ZM17.0618 17C16.6118 17.45 16.0618 17.5 15.5618 17.5C15.0618 17.5 14.5118 17.35 13.9118 17.15C11.4118 16.15 9.06179 13.65 8.11179 11.2C7.51179 10.05 7.41179 9.05 7.71179 8.2C7.91179 7.65 8.31179 7.25 8.81179 7L9.31179 6.5C9.41179 6.4 9.51179 6.35 9.61179 6.35C9.71179 6.35 9.81179 6.4 9.91179 6.55L11.9118 9.05C12.0118 9.15 12.0118 9.3 11.9118 9.4L10.9118 10.9C10.8118 11.05 10.8118 11.2 10.9118 11.3C11.3118 12.05 12.0118 12.95 12.7118 13.65C13.5118 14.35 14.3118 14.85 14.9118 15.05C15.0118 15.1 15.1118 15.1 15.2118 15.05C15.3118 15 15.4118 14.95 15.5118 14.85L16.7118 13.25C16.8118 13.1 17.0118 13.1 17.1118 13.2L19.5118 15.25C19.6118 15.35 19.6118 15.55 19.5118 15.65L17.0618 17Z"
                />
              </svg>
              <span className="text-white">Konfirmasi via WhatsApp</span>
            </div>
          </Button>
        </a>
      </div>

      {/* Footer */}
      <footer className="mt-4 text-center text-muted-foreground text-xs">
        © {new Date().getFullYear()} TFSini
      </footer>
    </main>
  );
}