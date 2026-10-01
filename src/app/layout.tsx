import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "써니의 폰백과사전 | 공식 사양·출시가",
  description: "국내 갤럭시·아이폰의 공식 사양, 확인된 출시 가격, 전작 차이와 전화 안내 문구를 비교합니다.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="ko"><body>{children}</body></html>;
}
