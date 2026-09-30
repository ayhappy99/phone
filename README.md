# Phone — 휴대폰 판매 상담 비교 도구

Next.js App Router + Tailwind CSS 정적 웹사이트입니다. 별도 서버를 실행하지 않습니다.

## 빌드

```sh
npm ci
npm run typecheck
npm run validate:data
npm run build
```

정적 결과는 `out/`에 생성됩니다. `/phone` 하위 경로에 배포하도록 설정되어 있습니다. main 변경 시 GitHub Actions가 정적 빌드 후 Pages 배포를 시도합니다.

## 현재 구현

- 갤럭시 S26 울트라, 갤럭시 S26, 아이폰 17 프로, 아이폰 17 프로 맥스
- 브라우저 내 모델 검색, 두 모델 비교, 좌우 교체
- 공식 스펙·전작 대비 변화·상담 문구의 3단계 표시
- 용량별 확인된 출고가, 출처 링크, 큰 글씨, 상담 문구 복사
- 배터리·USB·Wi-Fi·Bluetooth·SIM·지원 기한 비교, 항목 검색, 다른 값 필터
- 비교 주소 공유 및 인쇄
- 핵심 구현과 phoneData는 `src/app/page.tsx`에 포함

## 데이터 완성도

5개 상담 분류와 10개 공통 비교 항목에 더해 제조사 상세 사양을 모델별로 검색하고 펼쳐 볼 수 있습니다. 수록 범위는 아래 한국 공식 문서의 확인 시점 스냅샷입니다. 삼성은 모델당 17개 분류, Apple은 모델당 37개 분류이며 기술 목록을 유지하고 홍보 문장·각주는 사실과 조건 중심으로 정리했습니다. 모든 제조사 문서·변경사항을 망라한다는 의미는 아닙니다. 일부 아이폰 용량의 출시가는 공식 역사 자료가 부족해 확인 보류입니다. 데이터 확인일과 커밋 날짜는 구분합니다.

기획 원본은 `docs/phone-product-design.md`입니다. 원본의 Vite 제안 이후 사용자 요청에 따라 실제 구현은 Next.js의 정적 export를 채택했습니다.

## 검증 기록

정적 빌드와 TypeScript 검사를 통과했습니다. 기존 브라우저 검증에서 검색, 16개 선택 조합, 모델 교체, 필터, 큰 글씨, 복사 및 실패 대체 동작, 모바일 페이지 넘침, 상호작용 중 네트워크 요청 여부를 확인했습니다. 이 검증은 제품 데이터의 전체 항목 완전성을 보증하지 않습니다.

## GitHub Pages 최초 설정

1. 저장소 Settings → Pages를 엽니다.
2. Build and deployment의 Source를 **GitHub Actions**로 선택합니다.
3. Actions → Deploy phone to GitHub Pages → Run workflow를 실행합니다.

공개 URL: https://ayhappy99.github.io/phone/

2026-09-30 Pages 활성화 후 Next.js 배포가 성공했고 공개 주소에서 비교 화면을 확인했습니다. Source는 GitHub Actions로 유지해야 기본 Jekyll 배포가 README를 게시하는 일을 방지할 수 있습니다. 이후 main 커밋은 자동 배포됩니다.

## 자료 확인 범위

2026-09-30 상세 사양은 Samsung 한국 S26/S26 Ultra 사양 및 Apple 지원 125090/125091 문서로 확인했습니다. 기존 5개 상담 분류의 확인일은 2026-09-28로 유지합니다. 조건·각주, 통신 대역, 언어·포맷·앱 목록과 상품정보를 상세 영역에 표시합니다. 남은 가격 검증은 iPhone 17 Pro 512GB/1TB 및 Pro Max 512GB/1TB/2TB입니다. 후일 구매 페이지의 판매 가격을 출시 당시 가격으로 대체하지 않습니다.
