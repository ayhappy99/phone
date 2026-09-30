import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "PHONE | 휴대폰 판매 상담 비교",
  description: "국내 갤럭시·아이폰의 공식 사양, 확인된 출시 가격, 전작 차이와 상담 문구를 비교합니다.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="ko"><body>{children}</body></html>;
}
