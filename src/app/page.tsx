"use client";

import { useEffect, useMemo, useState } from "react";

type SpecKey = "processor" | "display" | "weight" | "camera" | "special_feature";
type Brief = {
  official: string;
  vs_previous: string;
  sales_pitch: string;
  caution: string;
  sources: string[];
};
type Phone = {
  id: string;
  model_name: string;
  aliases: string[];
  brand: "Samsung" | "Apple";
  previous: string;
  summary: string;
  prices: { storage: string; krw: number | null }[];
  price_source: string;
  specs: Record<SpecKey, Brief>;
  official_url: string;
};

const phoneData: Phone[] = [
  {
    id: "galaxy-s26-ultra",
    model_name: "갤럭시 S26 울트라",
    aliases: ["Galaxy S26 Ultra", "S26U", "S26울트라", "에스26울트라", "SM-S948N"],
    brand: "Samsung",
    previous: "갤럭시 S25 울트라",
    summary: "S펜 · 프라이버시 디스플레이",
    prices: [
      { storage: "256GB", krw: 1797400 },
      { storage: "512GB", krw: 2050400 },
      { storage: "1TB", krw: 2545400 },
    ],
    price_source: "samsungPrice",
    official_url: "https://www.samsung.com/sec/smartphones/galaxy-s26-ultra/specs/",
    specs: {
      processor: {
        official: "갤럭시용 Snapdragon 8 Elite 5세대. 3nm 공정(퀄컴 플랫폼 자료). 8코어 CPU, 최대 4.74GHz.",
        vs_previous: "삼성 발표 기준 S25 울트라 대비 CPU 19%, GPU 24%, NPU 39% 향상. 베이퍼 챔버와 열 전도 물질(TIM)을 통한 방열 설계 개선.",
        sales_pitch: "게임이나 영상 편집을 자주 하시면 처리 성능과 방열 설계가 달라진 점을 보시면 좋아요. 쓰시는 앱으로 직접 비교해 드릴게요.",
        caution: "향상률은 제조사 비교 기준입니다. 앱·환경에 따라 성능과 발열이 달라지며, 발열이 없다는 뜻은 아닙니다.",
        sources: ["s26u", "s26uOverview", "qualcomm"],
      },
      display: {
        official: "174.9mm(약 6.9인치), Dynamic AMOLED 2X, 3120×1440, 최대 120Hz. 국내 공식 자료의 최대 밝기(nits) 값은 이번 조사에서 확인하지 못했습니다.",
        vs_previous: "S25 울트라 174.2mm → 174.9mm. 해상도와 최대 120Hz는 유지. 프라이버시 디스플레이가 추가됐습니다. 밝기 향상 수치는 미확인입니다.",
        sales_pitch: "화면 옆에서 내용이 보이는 게 신경 쓰이시면 프라이버시 디스플레이를 켜서 비교해 보세요. 글자 크기도 같이 맞춰 드릴게요.",
        caution: "대각선은 직각 기준이며 실제 표시 영역은 더 작습니다. 프라이버시 기능도 각도·밝기에 따라 일부 내용이 보일 수 있습니다.",
        sources: ["s26u", "s25u", "s26uOverview"],
      },
      weight: {
        official: "214g, 163.6×78.1×7.9mm. 아머 알루미늄 프레임, 전면 Gorilla Armor 2, 후면 Gorilla Glass Victus 2.",
        vs_previous: "218g → 214g으로 4g 감소. 두께 8.2mm → 7.9mm로 0.3mm 감소. 프레임은 전작 티타늄에서 알루미늄으로 변경.",
        sales_pitch: "전작보다 4g 가볍고 0.3mm 얇아졌어요. 케이스를 씌운 상태에서도 손에 편한지 직접 들어보세요.",
        caution: "무게·크기는 제품 구성에 따라 달라질 수 있습니다. 손목 건강이나 낙하 내구성을 무게만으로 보장하지 않습니다.",
        sources: ["s26u", "s25u", "s26uOverview", "s25uOverview"],
      },
      camera: {
        official: "광각 200MP F1.4, 초광각 50MP F1.9, 망원 50MP F2.9(5배)·10MP F2.4(3배). 후면 OIS. 광학 수준 2·10배, 디지털 최대 100배. 전면 12MP.",
        vs_previous: "주요 화소 구성은 유지. 광각 조리개 F1.7 → F1.4, 5배 망원 F3.4 → F2.9. 3배·5배 광학 줌은 유지됩니다.",
        sales_pitch: "망원 렌즈가 3배와 5배로 나뉘어 있어요. 멀리 있는 피사체를 주로 찍으시면 두 배율의 결과를 직접 비교해 보세요.",
        caution: "광학 줌·광학 수준 줌·디지털 줌은 구분해야 합니다. 야간 화질과 흔들림은 조명·움직임·촬영 조건에 따라 달라집니다.",
        sources: ["s26u", "s25u", "s26uOverview"],
      },
      special_feature: {
        official: "초음파 화면 지문인식, 삼성월렛 결제, 내장 S펜, Samsung DeX, UWB, IP68(담수 1.5m·30분 시험).",
        vs_previous: "전작 대비 새 프라이버시 디스플레이가 핵심 변화입니다. 지문인식 속도가 몇 초 빨라졌는지는 공식 근거를 확인하지 못했습니다.",
        sales_pitch: "메모는 내장 S펜으로, 결제는 삼성월렛으로 쓰실 수 있어요. 사용하시는 카드 지원 여부부터 같이 확인해 드릴게요.",
        caution: "결제는 지원 카드·가맹점·서비스 조건에 따릅니다. 방수 성능은 영구적이지 않으며 수중 사용 보장이 아닙니다.",
        sources: ["s26Support", "s26uOverview", "wallet"],
      },
    },
  },
  {
    id: "galaxy-s26",
    model_name: "갤럭시 S26",
    aliases: ["Galaxy S26", "에스26", "S26 기본형", "SM-S942N"],
    brand: "Samsung",
    previous: "갤럭시 S25",
    summary: "167g · 159.3mm 화면",
    prices: [{ storage: "256GB", krw: 1254000 }, { storage: "512GB", krw: 1507000 }],
    price_source: "samsungPrice",
    official_url: "https://www.samsung.com/sec/smartphones/galaxy-s26/specs/",
    specs: {
      processor: {
        official: "한국 모델: Exynos 2600, 2nm GAA 공정. 10코어 CPU, 3.8/3.26/2.76GHz.",
        vs_previous: "갤럭시용 Snapdragon 8 Elite → Exynos 2600. S26 기본형의 CPU/GPU·방열 개선율은 확인 보류입니다. S26+ 비교 수치를 대신 적용하지 않았습니다.",
        sales_pitch: "국내 S26은 엑시노스 2600을 사용해요. 칩 이름만으로 속도를 단정하기보다 자주 쓰시는 앱을 켜서 확인해 보시죠.",
        caution: "해외 모델 사양과 혼용하지 않습니다. 공정 숫자만으로 배터리 시간·발열·실사용 성능의 우열을 판단할 수 없습니다.",
        sources: ["s26", "s26Overview", "exynos"],
      },
      display: {
        official: "159.3mm(약 6.3인치), Dynamic AMOLED 2X, 2340×1080, 최대 120Hz. 국내 공식 최대 밝기(nits)는 이번 조사에서 수치 확인 보류.",
        vs_previous: "S25의 156.4mm → 159.3mm로 대각선 2.9mm 증가. 해상도·최대 주사율은 동일합니다. 야외 밝기가 더 좋아졌다고 단정하지 않습니다.",
        sales_pitch: "기본형을 찾으시면 화면 크기가 전작보다 조금 커졌어요. 메시지나 지도를 열어 글씨가 보기 편한지 확인해 보세요.",
        caution: "화면 대각선은 직각 기준입니다. 실제 보이는 면적은 모서리와 카메라 홀 때문에 더 작습니다.",
        sources: ["s26", "s25"],
      },
      weight: {
        official: "167g, 149.6×71.7×7.2mm. 아머 알루미늄 프레임, 전후면 Gorilla Glass Victus 2.",
        vs_previous: "162g → 167g으로 5g 증가. 두께는 7.2mm로 동일하며, 세로 146.9 → 149.6mm·가로 70.5 → 71.7mm로 변경.",
        sales_pitch: "무게는 167g이고, 전작보다는 5g 늘었어요. 화면 크기와 한 손으로 잡는 느낌을 함께 비교해 보시면 좋겠습니다.",
        caution: "가벼워졌다는 설명은 사실과 다릅니다. 케이스 무게와 개인의 그립감은 별도로 확인하세요.",
        sources: ["s26", "s25", "s26Overview"],
      },
      camera: {
        official: "광각 50MP F1.8, 초광각 12MP F2.2, 망원 10MP F2.4. 후면 OIS. 3배 광학·2배 광학 수준·최대 30배 디지털 줌. 전면 12MP F2.2.",
        vs_previous: "S25와 주요 화소·조리개·3배 광학 줌은 동일. 삼성은 야간 영상 노이즈 처리와 수평 고정 슈퍼스테디를 안내합니다.",
        sales_pitch: "멀리 있는 피사체는 3배 광학 줌으로 보여드릴게요. 야간 영상은 같은 장소에서 직접 찍어 보고 선택하시면 좋아요.",
        caution: "화소 구성이 같아도 모든 촬영 결과가 같다는 뜻은 아닙니다. 야간·손떨림 보정 효과는 촬영 환경에 따라 달라집니다.",
        sources: ["s26", "s25", "s26Overview"],
      },
      special_feature: {
        official: "초음파 화면 지문인식, 삼성월렛 결제, Samsung DeX, IP68(담수 1.5m·30분 시험). S펜·UWB 미지원.",
        vs_previous: "지문인식 속도 향상이나 결제 기능의 전작 대비 성능 개선은 공식 수치 미확인입니다. 울트라의 프라이버시 디스플레이와 구분하세요.",
        sales_pitch: "결제 기능이 중요하시면 삼성월렛에서 쓰시는 카드가 지원되는지 확인해 드릴게요. S펜이 필요하시면 울트라와 비교해 보시죠.",
        caution: "지문인식 시간·젖은 손 인식을 보장하지 않습니다. 결제 조건을 확인하고 방수 등급을 침수 보장으로 설명하지 마세요.",
        sources: ["s26Support", "s26Overview", "wallet"],
      },
    },
  },
  {
    id: "iphone-17-pro",
    model_name: "iPhone 17 Pro",
    aliases: ["아이폰 17 프로", "아이폰17프로", "17pro", "A3523"],
    brand: "Apple",
    previous: "iPhone 16 Pro",
    summary: "204g · 48MP 트리플 카메라",
    prices: [{ storage: "256GB", krw: 1790000 }, { storage: "512GB", krw: null }, { storage: "1TB", krw: null }],
    price_source: "appleLaunch",
    official_url: "https://support.apple.com/ko-kr/125090",
    specs: {
      processor: {
        official: "A19 Pro, 6코어 CPU·6코어 GPU·16코어 Neural Engine. 베이퍼 챔버. 공정(nm)은 확인한 Apple 공식 자료에 명시되지 않아 기재하지 않았습니다.",
        vs_previous: "A18 Pro → A19 Pro. Apple은 새 방열 구조와 함께 전작 대비 지속 성능 40% 향상을 발표했습니다. CPU·GPU 각각 40%라는 뜻은 아닙니다.",
        sales_pitch: "영상 편집이나 게임을 오래 하시면 지속 성능이 달라진 점을 보시면 좋아요. 발열이 없어지는 건 아니니 실제 쓰실 작업으로 확인해 보세요.",
        caution: "지속 성능은 제조사 발표 기준입니다. 작업 종류·주변 온도·설정에 따라 체감이 다릅니다.",
        sources: ["i17pro", "i16pro", "appleLaunch"],
      },
      display: {
        official: "159mm(15.9cm, 약 6.3인치), Super Retina XDR OLED, 2622×1206, ProMotion 최대 120Hz. 일반 1000·HDR 1600·야외 부분 최대 3000nits.",
        vs_previous: "명목 화면 크기·해상도·최대 주사율 유지. 야외 부분 최대 밝기 2000 → 3000nits, 반사 방지 코팅 추가.",
        sales_pitch: "크기는 전작과 같은 급이고 야외 최대 밝기 수치가 높아졌어요. 햇빛 아래에서 화면을 자주 보시면 비교할 포인트입니다.",
        caution: "3000nits는 야외 부분 최대값이며 항상 유지되는 밝기가 아닙니다. 직각 대각선 159.3mm, 실제 표시 영역은 더 작습니다.",
        sources: ["i17pro", "i16pro"],
      },
      weight: {
        official: "204g, 150.0×71.9×8.75mm. 알루미늄 Unibody, 전면 Ceramic Shield 2·후면 Ceramic Shield.",
        vs_previous: "199g → 204g으로 5g 증가. 두께 8.25 → 8.75mm로 0.5mm 증가. 티타늄에서 알루미늄 Unibody로 변경.",
        sales_pitch: "전작보다 5g 무거워지고 조금 두꺼워졌어요. 성능 변화와 함께 실제 손에 잡히는 느낌도 비교해 보세요.",
        caution: "소재가 바뀌었다고 더 가볍거나 더 튼튼하다고 단정하지 않습니다.",
        sources: ["i17pro", "i16pro"],
      },
      camera: {
        official: "메인 48MP F1.78·초광각 48MP F2.2·4배 망원 48MP F2.8. 메인·망원 센서 시프트 OIS. 8배는 12MP 광학 퀄리티. 전면 18MP Center Stage.",
        vs_previous: "전작 12MP 5배 망원 → 48MP 4배 망원·12MP 8배 광학 퀄리티. 전면 12MP → 18MP. 단순히 5배 광학이 8배 광학으로 바뀐 것은 아닙니다.",
        sales_pitch: "망원 구성이 바뀌었고 전면 카메라도 18MP예요. 가족 사진을 많이 찍으시면 4배와 8배 결과, 전면 구도를 직접 보여드릴게요.",
        caution: "8배 광학 퀄리티와 8배 광학 렌즈는 다릅니다. OIS도 움직이는 피사체의 흔들림까지 보장하지 않습니다.",
        sources: ["i17pro", "i16pro", "appleLaunch"],
      },
      special_feature: {
        official: "TrueDepth 기반 Face ID, Apple Pay, IP68(최대 수심 6m·30분 시험), USB 3 최대 10Gb/s, MagSafe·Qi2 최대 25W.",
        vs_previous: "Face ID·Apple Pay·IP68은 전작에도 제공됩니다. 생체인식 속도 향상 수치는 확인하지 못했습니다.",
        sales_pitch: "Face ID로 인증하고 지원되는 카드로 Apple Pay를 쓰실 수 있어요. 카드와 자주 가시는 매장의 지원 여부부터 확인해 볼게요.",
        caution: "결제는 카드·가맹점 조건에 따릅니다. USB 속도는 호환 케이블이 필요하고, 방수 성능은 영구적이지 않습니다.",
        sources: ["i17pro", "i16pro"],
      },
    },
  },
  {
    id: "iphone-17-pro-max",
    model_name: "iPhone 17 Pro Max",
    aliases: ["아이폰 17 프로 맥스", "아이폰17프로맥스", "17promax", "17프맥", "A3526"],
    brand: "Apple",
    previous: "iPhone 16 Pro Max",
    summary: "174mm 화면 · 최대 2TB",
    prices: [{ storage: "256GB", krw: 1990000 }, { storage: "512GB", krw: null }, { storage: "1TB", krw: null }, { storage: "2TB", krw: null }],
    price_source: "appleLaunch",
    official_url: "https://support.apple.com/ko-kr/125091",
    specs: {
      processor: {
        official: "A19 Pro, 6코어 CPU·6코어 GPU·16코어 Neural Engine. 베이퍼 챔버. 공정(nm)은 확인한 Apple 공식 자료에 명시되지 않아 기재하지 않았습니다.",
        vs_previous: "A18 Pro → A19 Pro. Apple은 새 방열 구조와 함께 전작 대비 지속 성능 40% 향상을 발표했습니다. CPU·GPU 개별 향상률로 사용하지 않습니다.",
        sales_pitch: "긴 영상 편집이나 게임이 중요하시면 지속 성능 개선을 비교해 보세요. Pro와 같은 A19 Pro라서 화면 크기와 무게도 함께 보시면 됩니다.",
        caution: "제조사 발표 수치이며 실제 성능·발열은 환경과 작업에 따라 다릅니다.",
        sources: ["i17max", "i16max", "appleLaunch"],
      },
      display: {
        official: "174mm(17.4cm, 약 6.9인치), Super Retina XDR OLED, 2868×1320, ProMotion 최대 120Hz. 일반 1000·HDR 1600·야외 부분 최대 3000nits.",
        vs_previous: "명목 17.4cm 화면과 해상도·최대 주사율 유지. 야외 부분 최대 밝기 2000 → 3000nits, 반사 방지 코팅 추가.",
        sales_pitch: "큰 화면으로 지도나 문서를 보시면 Pro Max도 함께 보세요. 글자 크기를 맞춰 놓고 한 손으로 다루기 괜찮은지 확인해 드릴게요.",
        caution: "3000nits는 야외 부분 최대값입니다. 직각 대각선은 174.2mm이고 실제 표시 영역은 더 작습니다.",
        sources: ["i17max", "i16max"],
      },
      weight: {
        official: "231g, 163.4×78.0×8.75mm. 알루미늄 Unibody, 전면 Ceramic Shield 2·후면 Ceramic Shield.",
        vs_previous: "227g → 231g으로 4g 증가. 두께 8.25 → 8.75mm로 0.5mm 증가. 전작 티타늄에서 알루미늄 Unibody로 변경.",
        sales_pitch: "큰 화면을 얻는 대신 무게도 보셔야 해요. 전작보다 4g 무거운 231g이니 케이스까지 고려해서 들어보세요.",
        caution: "무게만으로 손목 부담이나 건강 영향을 판단하지 않습니다.",
        sources: ["i17max", "i16max"],
      },
      camera: {
        official: "메인 48MP F1.78·초광각 48MP F2.2·4배 망원 48MP F2.8. 메인·망원 센서 시프트 OIS. 8배는 12MP 광학 퀄리티. 전면 18MP Center Stage.",
        vs_previous: "전작 12MP 5배 망원 → 48MP 4배 망원·12MP 8배 광학 퀄리티. 전면 12MP → 18MP. 17 Pro와 주요 카메라 구성은 같습니다.",
        sales_pitch: "Pro Max라고 카메라 화소가 Pro보다 높은 건 아니에요. 같은 카메라 구성을 큰 화면에서 확인하고 싶으신지 비교해 보세요.",
        caution: "광학 퀄리티 줌을 광학 렌즈 배율로 설명하지 마세요. 야간 결과는 조명·피사체 움직임에 따라 달라집니다.",
        sources: ["i17max", "i17pro", "i16max"],
      },
      special_feature: {
        official: "TrueDepth 기반 Face ID, Apple Pay, IP68(최대 수심 6m·30분 시험), USB 3 최대 10Gb/s, MagSafe·Qi2 최대 25W.",
        vs_previous: "Face ID·Apple Pay·IP68은 전작에도 제공됩니다. 최대 저장 용량이 1TB에서 2TB로 확대됐습니다.",
        sales_pitch: "사진이나 영상을 많이 보관하시면 2TB 선택지도 있어요. 먼저 지금 쓰는 저장공간을 확인하고 필요한 용량을 골라드릴게요.",
        caution: "표시 용량 전체를 사용자가 쓸 수 있는 것은 아닙니다. 결제·충전은 호환 조건에 따르며 방수는 영구적이지 않습니다.",
        sources: ["i17max", "i16max", "appleLaunch"],
      },
    },
  },
];

const sources: Record<string, { label: string; url: string }> = {
  s26u: { label: "S26 울트라 공식 사양", url: "https://www.samsung.com/sec/smartphones/galaxy-s26-ultra/specs/" },
  s26: { label: "S26 공식 사양", url: "https://www.samsung.com/sec/smartphones/galaxy-s26/specs/" },
  s25u: { label: "S25 울트라 공식 사양", url: "https://www.samsung.com/sec/smartphones/galaxy-s25-ultra/specs/" },
  s25: { label: "S25 공식 사양", url: "https://www.samsung.com/sec/smartphones/galaxy-s25/specs/" },
  s26uOverview: { label: "S26 울트라 기능·비교·조건", url: "https://www.samsung.com/sec/smartphones/galaxy-s26-ultra/" },
  s25uOverview: { label: "S25 울트라 소재", url: "https://www.samsung.com/sec/smartphones/galaxy-s25-ultra/" },
  s26Overview: { label: "S26 기능·비교·조건", url: "https://www.samsung.com/sec/smartphones/galaxy-s26/" },
  s26Support: { label: "삼성전자서비스 국내 사양", url: "https://www.samsungsvc.co.kr/solution/4613052" },
  qualcomm: { label: "퀄컴 공식 플랫폼 사양", url: "https://www.qualcomm.com/smartphones/products" },
  exynos: { label: "삼성반도체 Exynos 2600", url: "https://semiconductor.samsung.com/kr/processor/mobile-processor/exynos-2600/" },
  wallet: { label: "삼성월렛 결제 조건", url: "https://www.samsung.com/sec/apps/samsung-wallet/serviceguide-payment/" },
  samsungPrice: { label: "삼성 국내 출시 가격 발표", url: "https://news.samsung.com/kr/삼성전자-갤럭시-s26-시리즈-사전-판매-시작" },
  i17pro: { label: "iPhone 17 Pro 공식 사양", url: "https://support.apple.com/ko-kr/125090" },
  i17max: { label: "iPhone 17 Pro Max 공식 사양", url: "https://support.apple.com/ko-kr/125091" },
  i16pro: { label: "iPhone 16 Pro 공식 사양", url: "https://support.apple.com/ko-kr/121031" },
  i16max: { label: "iPhone 16 Pro Max 공식 사양", url: "https://support.apple.com/ko-kr/121032" },
  appleLaunch: { label: "Apple 한국 출시 발표", url: "https://www.apple.com/kr/newsroom/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max-the-most-powerful-and-advanced-pro-models-ever/" },
};

type DetailRow = { key: string; label: string; values: [string, string, string, string]; note?: string };
// Order: S26 Ultra, S26, iPhone 17 Pro, iPhone 17 Pro Max.
// Each value was checked against the model-specific official specification on 2026-09-30.
const detailRows: DetailRow[] = [
  { key: "battery", label: "배터리 용량 · 대표값 / 정격값", values: ["5,000 / 4,855mAh", "4,300 / 4,175mAh", "해당 공식 사양 문서에 mAh 미기재", "해당 공식 사양 문서에 mAh 미기재"], note: "대표값은 IEC 61960 기준 표본 편차를 고려한 평균입니다. mAh만으로 사용 시간을 비교하지 않습니다." },
  { key: "video", label: "동영상 재생 · 제조사 시험", values: ["최대 31시간", "최대 30시간", "최대 31시간", "최대 37시간"], note: "제조사별 시험 조건이 다릅니다. 실제 배터리 사용 시간은 설정·네트워크·사용 환경에 따라 달라집니다." },
  { key: "stream", label: "동영상 스트리밍 · 제조사 시험", values: ["이번 수집 범위에서 확인하지 못함", "이번 수집 범위에서 확인하지 못함", "최대 28시간", "최대 33시간"] },
  { key: "usb", label: "USB 단자 · 전송 규격", values: ["USB-C · USB 3.2 Gen 1", "USB-C · USB 3.2 Gen 1", "USB-C · USB 3 최대 10Gb/s · DisplayPort", "USB-C · USB 3 최대 10Gb/s · DisplayPort"], note: "아이폰의 최대 전송 속도에는 10Gb/s를 지원하는 USB 3 케이블이 필요합니다." },
  { key: "wifi", label: "Wi-Fi", values: ["Wi-Fi 7 · 2.4/5/6GHz · EHT320 · MIMO · 4096-QAM", "Wi-Fi 7 · 2.4/5/6GHz · EHT320 · MIMO · 4096-QAM", "Wi-Fi 7 · 2×2 MIMO · Apple N1", "Wi-Fi 7 · 2×2 MIMO · Apple N1"], note: "지원 지역·네트워크 환경 및 호환 공유기 조건을 확인하세요." },
  { key: "bluetooth", label: "Bluetooth", values: ["6.0", "5.4", "6", "6"] },
  { key: "uwb", label: "초광대역 · UWB", values: ["지원", "미지원", "Apple 2세대 초광대역 칩", "Apple 2세대 초광대역 칩"], note: "Apple 초광대역 기능은 국가별 이용 가능 여부가 다릅니다." },
  { key: "sim", label: "SIM 구성 · 국내 모델", values: ["SIM 1 + eSIM / 듀얼 eSIM", "SIM 1 + eSIM / 듀얼 eSIM", "nano-SIM + eSIM / 듀얼 eSIM", "nano-SIM + eSIM / 듀얼 eSIM"], note: "eSIM은 지원 통신사와 요금제가 필요합니다." },
  { key: "security", label: "보안 업데이트 지원 기한", values: ["2033-02-28", "2033-02-28", "해당 공식 사양 문서에 종료일 미기재", "해당 공식 사양 문서에 종료일 미기재"], note: "미기재는 지원 종료를 의미하지 않습니다." },
  { key: "desktop", label: "데스크톱 연결 기능", values: ["Samsung DeX · Smart Switch PC", "Samsung DeX · Smart Switch PC", "USB-C DisplayPort", "USB-C DisplayPort"], note: "서로 다른 기능이며 동일한 데스크톱 경험을 보장하지 않습니다." },
];
const detailSourceIds = ["s26u", "s26", "i17pro", "i17max"];
const detailCheckedAt = "2026-09-30";

const checkedAt = "2026-09-28";
const categories: { key: SpecKey; label: string; question: string }[] = [
  { key: "processor", label: "프로세서 · 발열", question: "어떤 앱을 오래 사용하시나요?" },
  { key: "display", label: "화면 · 밝기", question: "화면 크기와 야외 사용, 무엇이 더 중요하세요?" },
  { key: "weight", label: "무게 · 소재", question: "케이스를 씌우고 한 손으로 잡아보실까요?" },
  { key: "camera", label: "카메라 · 줌", question: "주로 가까운 사람을 찍으세요, 먼 풍경을 찍으세요?" },
  { key: "special_feature", label: "결제 · 편의 기능", question: "꼭 필요한 결제·펜·저장공간이 있나요?" },
];
const normalize = (value: string) => value.normalize("NFKC").toLowerCase().replace(/[\s._-]+/g, "");
const searchIndex = phoneData.map((phone) => ({ phone, text: normalize([phone.model_name, phone.id, ...phone.aliases].join(" ")) }));
const money = (value: number | null) => value === null ? "출시가 확인 보류" : `${value.toLocaleString("ko-KR")}원`;
const control = "min-h-12 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-bold text-slate-800 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50";

function SourceLinks({ ids }: { ids: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2 text-base">
      {[...new Set(ids)].map((id) => (
        <li key={id}><a href={sources[id].url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-blue-800 underline underline-offset-4">{sources[id].label} ↗</a></li>
      ))}
    </ul>
  );
}

function BriefCard({ phone, specKey, large }: { phone: Phone; specKey: SpecKey; large: boolean }) {
  const spec = phone.specs[specKey];
  return (
    <article aria-label={`${phone.model_name} ${categories.find((item) => item.key === specKey)?.label}`} className={`flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 leading-relaxed sm:p-6 ${large ? "text-xl" : "text-base sm:text-lg"}`}>
      <p className="text-xl font-bold text-slate-950">{phone.model_name}</p>
      <div className="rounded-xl bg-slate-100 p-4 text-slate-700">
        <h3 className="mb-2 text-base font-bold">공식 스펙</h3>
        <p>{spec.official}</p>
      </div>
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-blue-950">
        <h3 className="mb-2 inline-block rounded-lg bg-blue-700 px-3 py-1 text-base font-bold text-white">전작 대비</h3>
        <p className="mb-2 text-base font-bold">기준: {phone.previous}</p>
        <p>{spec.vs_previous}</p>
      </div>
      <div className="rounded-2xl rounded-tl-none border border-amber-200 bg-amber-50 p-4 text-amber-950">
        <h3 className="mb-2 text-base font-bold"><span aria-hidden="true">💡 </span>이렇게 설명해 보세요</h3>
        <p className="font-semibold">“{spec.sales_pitch}”</p>
      </div>
      <p className="border-l-4 border-slate-300 pl-3 text-base text-slate-700"><strong>함께 안내: </strong>{spec.caution}</p>
      <details className="mt-auto border-t border-slate-200 pt-3">
        <summary className="min-h-11 cursor-pointer py-2 text-base font-bold text-slate-700">공식 근거 확인</summary>
        <SourceLinks ids={spec.sources} />
      </details>
    </article>
  );
}

export default function Page() {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("all");
  const [selected, setSelected] = useState<[string, string]>([phoneData[0].id, phoneData[2].id]);
  const [target, setTarget] = useState<0 | 1>(0);
  const [topic, setTopic] = useState<SpecKey | "all">("all");
  const [large, setLarge] = useState(false);
  const [status, setStatus] = useState("");
  const [copyText, setCopyText] = useState("");
  const [detailQuery, setDetailQuery] = useState("");
  const [differentOnly, setDifferentOnly] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    const restore = () => {
      const params = new URLSearchParams(window.location.search);
      const a = params.get("a"), b = params.get("b");
      if (a && b && a !== b && phoneData.some(p => p.id === a) && phoneData.some(p => p.id === b)) {
        setSelected([a, b]);
      } else if (a || b) {
        setStatus("공유 주소의 모델 조합이 유효하지 않아 기본 모델을 표시합니다.");
        setSelected([phoneData[0].id, phoneData[2].id]);
      }
      setCopyText(""); setShareUrl("");
    };
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  const normalizedQuery = normalize(query.trim());
  const matches = useMemo(() => searchIndex.filter(({ phone, text }) => (brand === "all" || phone.brand === brand) && text.includes(normalizedQuery)).map(({ phone }) => phone), [brand, normalizedQuery]);
  const left = phoneData.find((phone) => phone.id === selected[0])!;
  const right = phoneData.find((phone) => phone.id === selected[1])!;
  const selectedPhones = [left, right];
  const visibleCategories = categories.filter((item) => topic === "all" || item.key === topic);

  function choose(id: string, slot: 0 | 1 = target) {
    const other = slot === 0 ? 1 : 0;
    setSelected((current) => current[other] === id ? [current[1], current[0]] : slot === 0 ? [id, current[1]] : [current[0], id]);
    setStatus(`${slot === 0 ? "A" : "B"}에 ${phoneData.find((phone) => phone.id === id)!.model_name} 선택. 반대편에 있던 모델이면 좌우를 교체했습니다.`);
    setCopyText("");
    setShareUrl("");
  }

  async function copyBrief() {
    const text = selectedPhones.map((phone) => [phone.model_name, ...visibleCategories.map(({ key, label }) => `${label}\n${phone.specs[key].sales_pitch}\n안내: ${phone.specs[key].caution}\n${phone.specs[key].sources.map((id) => sources[id].url).join("\n")}`)].join("\n\n")).join("\n\n────────\n\n") + `\n\n공식 자료 확인일: ${checkedAt}`;
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      setCopyText("");
      setStatus("상담 멘트와 적용 조건·출처를 복사했습니다.");
    } catch {
      setCopyText(text);
      setStatus("자동 복사가 제한되어 복사할 내용을 아래에 표시했습니다.");
    }
  }

  async function shareComparison() {
    const url = new URL(window.location.href);
    url.search = new URLSearchParams({ a: left.id, b: right.id }).toString();
    url.hash = "comparison";
    window.history.replaceState(null, "", url);
    setShareUrl(url.toString());
    try {
      await navigator.clipboard.writeText(url.toString());
      setStatus("현재 두 모델의 비교 주소를 복사했습니다.");
    } catch {
      setStatus("아래 비교 주소를 직접 복사하세요.");
    }
  }
  const detailIndexes = selectedPhones.map(phone => phoneData.findIndex(item => item.id === phone.id));
  const matchingDetails = detailRows.filter(row =>
    normalize(row.label + row.values[detailIndexes[0]] + row.values[detailIndexes[1]]).includes(normalize(detailQuery)) &&
    (!differentOnly || row.values[detailIndexes[0]] !== row.values[detailIndexes[1]] || row.values[detailIndexes[0]].includes("확인") || row.values[detailIndexes[0]].includes("미기재"))
  );

  return (
    <main lang="ko" className="min-h-screen bg-slate-50 text-base text-slate-900 selection:bg-blue-200">
      <a href="#comparison" className="sr-only focus:not-sr-only focus:block focus:bg-white focus:p-4">비교 내용으로 바로가기</a>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div><p className="text-base font-bold tracking-widest text-blue-700">PHONE / SALES DESK</p><h1 className="mt-1 text-2xl font-bold sm:text-3xl">두 모델, 자신 있게 설명하세요.</h1></div>
          <button type="button" aria-pressed={large} onClick={() => setLarge(!large)} className={control}>{large ? "기본 글씨" : "더 큰 글씨"}</button>
        </div>
      </header>
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 sm:py-8">
        <section aria-labelledby="search-title" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 id="search-title" className="text-xl font-bold">1. 비교할 모델을 골라주세요</h2>
          <p className="mt-2 leading-relaxed text-slate-600">국내 모델 4종 · 공식 자료 확인 {checkedAt} · 검색은 현재 등록된 모델 안에서 동작합니다.</p>
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="기기를 넣을 비교 위치">
            {([0, 1] as const).map((slot) => <button key={slot} type="button" aria-pressed={target === slot} onClick={() => setTarget(slot)} className={`${control} ${target === slot ? "!border-blue-700 !bg-blue-700 !text-white" : ""}`}>{slot === 0 ? "A 모델 선택" : "B 모델 선택"}</button>)}
            <button type="button" onClick={() => { setSelected([selected[1], selected[0]]); setCopyText(""); setShareUrl(""); setStatus("A와 B 모델을 바꿨습니다."); }} className={control}>A ↔ B 바꾸기</button>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <div className="flex-1"><label htmlFor="phone-search" className="mb-2 block font-bold">기종 이름 검색</label><input id="phone-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="예: S26, 아이폰17프로, A3523" autoComplete="off" className="min-h-14 w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-xl outline-none focus:border-blue-700" /></div>
            <div><label htmlFor="brand-filter" className="mb-2 block font-bold">제조사</label><select id="brand-filter" value={brand} onChange={(event) => setBrand(event.target.value)} className={`${control} min-h-14 w-full sm:w-40`}><option value="all">전체</option><option value="Samsung">삼성</option><option value="Apple">애플</option></select></div>
          </div>
          <p role="status" aria-live="polite" className="mt-4 text-slate-600">검색 결과 {matches.length}개 · 누르면 {target === 0 ? "A" : "B"} 모델로 선택됩니다.</p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {matches.map((phone) => <li key={phone.id}><button type="button" onClick={() => choose(phone.id)} aria-label={`${phone.model_name}, ${target === 0 ? "A" : "B"} 모델로 선택`} className={`${control} h-full w-full text-left ${selected.includes(phone.id) ? "!border-blue-500 !bg-blue-50" : ""}`}><span className="block text-base font-medium text-slate-600">{phone.brand} {selected[0] === phone.id ? "· A 선택됨" : selected[1] === phone.id ? "· B 선택됨" : ""}</span><span className="mt-1 block text-xl font-bold">{phone.model_name}</span><span className="mt-2 block text-base font-normal">{phone.summary}</span></button></li>)}
          </ul>
          {matches.length === 0 && <div className="mt-4 rounded-xl bg-slate-100 p-5"><p>일치하는 등록 모델이 없습니다. 검색어나 제조사 필터를 바꿔주세요.</p><button type="button" onClick={() => { setQuery(""); setBrand("all"); }} className={`${control} mt-3`}>검색 초기화</button></div>}
        </section>

        <section aria-labelledby="brief-title">
          <div className="flex flex-wrap items-center justify-between gap-3"><h2 id="brief-title" className="text-2xl font-bold">2. 고객의 관심사부터 비교하세요</h2><div className="flex flex-wrap gap-2"><button type="button" onClick={copyBrief} className={control}>상담 멘트 복사</button><button type="button" onClick={shareComparison} className={control}>비교 주소 복사</button><button type="button" onClick={() => window.print()} className={`${control} print:hidden`}>인쇄</button></div></div>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="비교 항목 필터">
            <button type="button" aria-pressed={topic === "all"} onClick={() => { setTopic("all"); setCopyText(""); }} className={`${control} ${topic === "all" ? "!bg-slate-900 !text-white" : ""}`}>전체 항목</button>
            {categories.map(({ key, label }) => <button key={key} type="button" aria-pressed={topic === key} onClick={() => { setTopic(key); setCopyText(""); }} className={`${control} ${topic === key ? "!bg-slate-900 !text-white" : ""}`}>{label}</button>)}
          </div>
          <p role="status" aria-live="polite" className="mt-3 min-h-6 text-blue-800">{status}</p>
          {shareUrl && <div className="mt-3"><label htmlFor="share-url" className="block font-bold">현재 비교 주소</label><input id="share-url" readOnly value={shareUrl} onFocus={event => event.target.select()} className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 p-3 text-base" /></div>}
          {copyText && <div className="mt-3"><label htmlFor="manual-copy" className="block font-bold">상담 내용 직접 복사</label><textarea id="manual-copy" readOnly value={copyText} onFocus={(event) => event.target.select()} className="mt-2 h-48 w-full rounded-xl border border-slate-300 bg-white p-4 text-base" /></div>}
          <p className="mt-3 text-base leading-relaxed text-slate-600">파란 영역은 각 모델의 <strong>자기 전작 대비 변화</strong>입니다. 왼쪽 모델과 오른쪽 모델의 차이를 뜻하지 않습니다. 좁은 화면에서는 비교 영역을 좌우로 밀어보세요.</p>
        </section>

        <div id="comparison" tabIndex={0} role="region" aria-label="두 모델 좌우 비교. 좁은 화면에서 가로 스크롤 가능" className="scroll-mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-100 p-3 focus-visible:outline-2 focus-visible:outline-blue-600 sm:p-5">
          <div className="min-w-[640px] space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {selectedPhones.map((phone, slot) => <section key={`${slot}-${phone.id}`} className="rounded-2xl bg-white p-5 shadow-sm">
                <label htmlFor={`selected-${slot}`} className="mb-3 block text-xl font-bold text-blue-800">{slot === 0 ? "A" : "B"} 모델</label>
                <select id={`selected-${slot}`} value={phone.id} onChange={(event) => choose(event.target.value, slot as 0 | 1)} className={`${control} w-full text-xl`}>{phoneData.map((item) => <option value={item.id} key={item.id}>{item.model_name}</option>)}</select>
                <h2 className="mt-5 text-xl font-bold">국내 출시 당시 가격</h2>
                <dl className="mt-3 divide-y divide-slate-200">{phone.prices.map((price) => <div key={price.storage} className="flex flex-wrap items-center justify-between gap-2 py-3"><dt className="font-bold">{price.storage}</dt><dd className={`${price.krw === null ? "text-base text-slate-600" : "text-xl font-bold"}`}>{money(price.krw)}</dd></div>)}</dl>
                <p className="mb-3 mt-2 text-base text-slate-600">할인·지원금 적용 전. 확인되지 않은 용량의 출시가는 추정하지 않았습니다.</p>
                <SourceLinks ids={[phone.price_source]} />
              </section>)}
            </div>
            {visibleCategories.map(({ key, label, question }, index) => <section key={key} aria-labelledby={`category-${key}`}>
              <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 px-1"><h2 id={`category-${key}`} className="text-2xl font-bold">{String(index + 1).padStart(2, "0")} · {label}</h2><p className="text-base text-slate-600">{question}</p></div>
              <div className="grid grid-cols-2 items-stretch gap-4"><BriefCard phone={left} specKey={key} large={large} /><BriefCard phone={right} specKey={key} large={large} /></div>
            </section>)}
          </div>
        </div>

        <section aria-labelledby="detail-title" className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <h2 id="detail-title" className="text-2xl font-bold">3. 배터리 · 연결 · 지원 사양</h2>
          <p className="mt-2 text-slate-600">공식 사양 재확인 {detailCheckedAt}. 표의 값이 같아도 시험 조건이나 실제 성능까지 같다는 뜻은 아닙니다.</p>
          <div className="my-4 flex flex-wrap items-end gap-4">
            <div className="min-w-0 flex-1"><label htmlFor="detail-search" className="mb-2 block font-bold">세부 항목 검색</label><input id="detail-search" value={detailQuery} onChange={event => setDetailQuery(event.target.value)} placeholder="예: Bluetooth, USB, 배터리" className="min-h-12 w-full rounded-xl border border-slate-300 p-3 text-base" /></div>
            <button type="button" aria-pressed={differentOnly} onClick={() => setDifferentOnly(!differentOnly)} className={control}>{differentOnly ? "모든 세부 항목" : "다른 값만 보기"}</button>
          </div>
          <p className="mb-3 text-slate-600" role="status">표시 항목 {matchingDetails.length}개 · 확인 불가 항목은 차이 필터에서도 유지합니다.</p>
          <div tabIndex={0} role="region" aria-label="세부 사양 비교 표" className="overflow-x-auto">
            <table className={`w-full min-w-[640px] border-collapse text-left leading-relaxed ${large ? "text-xl" : "text-base"}`}>
              <caption className="sr-only">선택한 두 모델의 공식 세부 사양 비교</caption>
              <thead><tr className="bg-slate-100"><th scope="col" className="p-4">항목</th>{selectedPhones.map(phone => <th scope="col" key={phone.id} className="p-4 text-xl">{phone.model_name}</th>)}</tr></thead>
              <tbody>{matchingDetails.map(row => <tr key={row.key} className="border-b border-slate-200 align-top"><th scope="row" className="w-1/4 p-4 font-bold">{row.label}{row.note && <p className="mt-2 text-base font-normal text-slate-600">{row.note}</p>}</th>{detailIndexes.map((index, slot) => <td key={slot} className="p-4">{row.values[index]}</td>)}</tr>)}</tbody>
            </table>
          </div>
          {matchingDetails.length === 0 && <p className="rounded-xl bg-slate-100 p-4">조건에 맞는 세부 항목이 없습니다.</p>}
          <div className="mt-4"><SourceLinks ids={detailIndexes.map(index => detailSourceIds[index])} /></div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 leading-relaxed sm:p-7" aria-labelledby="source-title">
          <h2 id="source-title" className="text-xl font-bold">전체 공식 사양과 조건 확인</h2>
          <p className="mb-4 mt-2 text-slate-600">이 화면은 5개 상담 항목과 추가 세부 사양을 제공합니다. 공식 전체 사양의 모든 항목·각주를 수록하는 작업은 진행 중입니다. 현재 등록하지 않은 통신 대역·전체 지원 포맷 등의 정보는 아래 공식 원문에서 확인하세요.</p>
          <div className="grid gap-3 sm:grid-cols-2">{selectedPhones.map((phone) => <a key={phone.id} href={phone.official_url} target="_blank" rel="noopener noreferrer" className={`${control} flex items-center justify-between gap-2 text-blue-800`}>{phone.model_name} 전체 공식 사양 <span aria-hidden="true">↗</span></a>)}</div>
          <p className="mt-4 text-base text-slate-600">자료 확인일 {checkedAt}. 실시간 자동 갱신 서비스가 아닙니다. 미확인 표시는 미지원이라는 뜻이 아닙니다. 구매 전 가격·지원 조건은 공식 원문에서 재확인하세요.</p>
        </section>
      </div>
    </main>
  );
}
