import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomTabBarConditional from "@/components/BottomTabBarConditional";

export const metadata: Metadata = {
  title: "벼락치기 도우미",
  description: "한국 중·고등학생 시험 전날 AI 벼락치기 학습 앱",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FAF7F1",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="bg-paper text-ink-900 min-h-screen">
        <div className="mx-auto w-full max-w-[420px] min-h-screen relative pb-[72px]">
          {children}
          <BottomTabBarConditional />
        </div>
      </body>
    </html>
  );
}
