"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SpecKey = "processor" | "display" | "weight" | "camera" | "special_feature";
type Brief = {
  official: string;
  vs_previous: string;
  sales_pitch: string;
  sales_pitch_detail: string;
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
  price_basis?: "preorder-announcement";
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
        official: "갤럭시용 Snapdragon 8 Elite 5세대. 8코어 CPU, 최대 4.74GHz. 공정 수치는 확인한 삼성 공식 제품 사양에 명시되지 않아 기재하지 않았습니다.",
        vs_previous: "삼성 발표 기준 S25 울트라 대비 CPU 19%, GPU 24%, NPU 39% 향상. 베이퍼 챔버와 열 전도 물질(TIM)을 통한 방열 설계 개선.",
        sales_pitch: "처리 성능을 보신다면 갤럭시용 스냅드래곤 8 Elite 5세대가 들어간 모델이에요.",
        sales_pitch_detail: "게임이나 영상 편집을 자주 하시면 처리 성능도 살펴보셔야겠죠. 갤럭시용 스냅드래곤 8 Elite 5세대가 들어가 있어요. 다만 오래 사용했을 때의 속도나 발열은 앱과 주변 환경에 따라 달라요.",
        caution: "향상률은 제조사 비교 기준입니다. 앱·환경에 따라 성능과 발열이 달라지며, 발열이 없다는 뜻은 아닙니다.",
        sources: ["s26u", "s26uOverview"],
      },
      display: {
        official: "174.9mm(약 6.9인치), Dynamic AMOLED 2X, 3120×1440, 최대 120Hz. 국내 공식 자료의 최대 밝기(nits) 값은 이번 조사에서 확인하지 못했습니다.",
        vs_previous: "S25 울트라 174.2mm → 174.9mm. 해상도와 최대 120Hz는 유지. 프라이버시 디스플레이가 추가됐습니다. 밝기 향상 수치는 미확인입니다.",
        sales_pitch: "화면은 약 6.9인치로 큰 편이에요. 사진이나 영상을 큼직하게 보고 싶으시면 살펴보실 만해요.",
        sales_pitch_detail: "사진이나 영상 볼 때 화면이 작아서 답답하셨다면 큰 화면 쪽으로 살펴보셔도 좋아요. 이 모델은 약 6.9인치예요. 글자를 더 크게 보고 싶으시면 화면 크기와 별도로 글자 설정도 조절할 수 있어요.",
        caution: "대각선은 직각 기준이며 실제 표시 영역은 더 작습니다. 프라이버시 기능도 각도·밝기에 따라 일부 내용이 보일 수 있습니다.",
        sources: ["s26u", "s25u", "s26uOverview"],
      },
      weight: {
        official: "214g, 163.6×78.1×7.9mm. 아머 알루미늄 프레임, 전면 Gorilla Armor 2, 후면 Gorilla Glass Victus 2.",
        vs_previous: "218g → 214g으로 4g 감소. 두께 8.2mm → 7.9mm로 0.3mm 감소. 프레임은 전작 티타늄에서 알루미늄으로 변경.",
        sales_pitch: "본체는 214g이고 두께는 7.9mm예요. 케이스를 끼우시면 무게가 더해져요.",
        sales_pitch_detail: "휴대폰 무게가 신경 쓰이시면 본체가 214g이라는 점을 봐주세요. 두께는 7.9mm예요. 케이스를 끼운 뒤의 무게와 손에 느껴지는 느낌은 따로 생각하시면 좋아요.",
        caution: "무게·크기는 제품 구성에 따라 달라질 수 있습니다. 손목 건강이나 낙하 내구성을 무게만으로 보장하지 않습니다.",
        sources: ["s26u", "s25u", "s26uOverview", "s25uOverview"],
      },
      camera: {
        official: "광각 200MP F1.4, 초광각 50MP F1.9, 망원 50MP F2.9(5배)·10MP F2.4(3배). 후면 OIS. 광학 수준 2·10배, 디지털 최대 100배. 전면 12MP.",
        vs_previous: "주요 화소 구성은 유지. 광각 조리개 F1.7 → F1.4, 5배 망원 F3.4 → F2.9. 3배·5배 광학 줌은 유지됩니다.",
        sales_pitch: "멀리 있는 것도 찍으시나요? 3배와 5배 광학 망원 카메라가 있어요.",
        sales_pitch_detail: "가까운 사진뿐 아니라 멀리 있는 풍경도 찍으시면 줌 구성을 봐주세요. 3배와 5배 광학 망원 카메라가 있어요. 10배는 광학 수준 줌, 최대 100배는 디지털 줌이라 같은 방식은 아니에요.",
        caution: "광학 줌·광학 수준 줌·디지털 줌은 구분해야 합니다. 야간 화질과 흔들림은 조명·움직임·촬영 조건에 따라 달라집니다.",
        sources: ["s26u", "s25u", "s26uOverview"],
      },
      special_feature: {
        official: "초음파 화면 지문인식, 삼성월렛 결제, 내장 S펜, Samsung DeX, UWB, IP68(담수 1.5m·30분 시험).",
        vs_previous: "전작 대비 새 프라이버시 디스플레이가 핵심 변화입니다. 지문인식 속도가 몇 초 빨라졌는지는 공식 근거를 확인하지 못했습니다.",
        sales_pitch: "메모할 때 쓰는 S펜이 본체에 들어 있어요. 삼성월렛 결제와 DeX도 지원해요.",
        sales_pitch_detail: "휴대폰에서 메모하실 일이 있으시면 본체에 들어 있는 S펜을 쓸 수 있어요. 삼성월렛 결제와 DeX도 지원하고요. 결제는 쓰시는 카드와 가맹점이 지원하는지 확인해 주세요.",
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
        sales_pitch: "국내 모델에는 엑시노스 2600이 들어가 있어요. 속도나 발열은 쓰시는 앱에 따라 달라요.",
        sales_pitch_detail: "어떤 앱을 주로 쓰시는지에 따라 체감 속도도 달라지는데요. 국내 모델은 엑시노스 2600을 사용해요. 칩 이름만으로 모든 앱에서 빠르다거나 발열이 적다고 말씀드리기는 어려워요.",
        caution: "해외 모델 사양과 혼용하지 않습니다. 공정 숫자만으로 배터리 시간·발열·실사용 성능의 우열을 판단할 수 없습니다.",
        sources: ["s26", "s26Overview", "exynos"],
      },
      display: {
        official: "159.3mm(약 6.3인치), Dynamic AMOLED 2X, 2340×1080, 최대 120Hz. 국내 공식 최대 밝기(nits)는 이번 조사에서 수치 확인 보류.",
        vs_previous: "S25의 156.4mm → 159.3mm로 대각선 2.9mm 증가. 해상도·최대 주사율은 동일합니다. 야외 밝기가 더 좋아졌다고 단정하지 않습니다.",
        sales_pitch: "화면은 약 6.3인치예요. 큰 화면보다는 비교적 아담한 화면을 찾으실 때 살펴보시면 좋아요.",
        sales_pitch_detail: "휴대폰 화면이 너무 큰 건 부담스러우신가요? 이 모델은 약 6.3인치예요. 화면에 글자가 작게 느껴지시면 글자 크기를 따로 조절하는 방법도 있어요.",
        caution: "화면 대각선은 직각 기준입니다. 실제 보이는 면적은 모서리와 카메라 홀 때문에 더 작습니다.",
        sources: ["s26", "s25"],
      },
      weight: {
        official: "167g, 149.6×71.7×7.2mm. 아머 알루미늄 프레임, 전후면 Gorilla Glass Victus 2.",
        vs_previous: "162g → 167g으로 5g 증가. 두께는 7.2mm로 동일하며, 세로 146.9 → 149.6mm·가로 70.5 → 71.7mm로 변경.",
        sales_pitch: "본체는 167g이고 두께는 7.2mm예요. 케이스 무게는 포함되지 않은 수치예요.",
        sales_pitch_detail: "휴대하실 때 무게를 중요하게 보시면 본체 167g, 두께 7.2mm를 기준으로 살펴보시면 돼요. 케이스를 끼우면 무게와 두께가 더해져요. 손에 잘 맞는지는 개인마다 다를 수 있고요.",
        caution: "가벼워졌다는 설명은 사실과 다릅니다. 케이스 무게와 개인의 그립감은 별도로 확인하세요.",
        sources: ["s26", "s25", "s26Overview"],
      },
      camera: {
        official: "광각 50MP F1.8, 초광각 12MP F2.2, 망원 10MP F2.4. 후면 OIS. 3배 광학·2배 광학 수준·최대 30배 디지털 줌. 전면 12MP F2.2.",
        vs_previous: "S25와 주요 화소·조리개·3배 광학 줌은 동일. 삼성은 야간 영상 노이즈 처리와 수평 고정 슈퍼스테디를 안내합니다.",
        sales_pitch: "3배 광학 망원 카메라가 있어요. 최대 30배까지 확대할 수 있지만 30배는 디지털 줌이에요.",
        sales_pitch_detail: "멀리 있는 장면을 찍으실 때는 3배 광학 망원을 사용할 수 있어요. 최대 30배까지 확대는 되지만 그쪽은 디지털 줌이에요. 확대 배율이 높다고 사진 품질까지 같지는 않아요.",
        caution: "화소 구성이 같아도 모든 촬영 결과가 같다는 뜻은 아닙니다. 야간·손떨림 보정 효과는 촬영 환경에 따라 달라집니다.",
        sources: ["s26", "s25", "s26Overview"],
      },
      special_feature: {
        official: "초음파 화면 지문인식, 삼성월렛 결제, Samsung DeX, IP68(담수 1.5m·30분 시험). S펜·UWB 미지원.",
        vs_previous: "지문인식 속도 향상이나 결제 기능의 전작 대비 성능 개선은 공식 수치 미확인입니다. 울트라의 프라이버시 디스플레이와 구분하세요.",
        sales_pitch: "삼성월렛 결제와 DeX를 쓸 수 있어요. S펜과 UWB는 지원하지 않아요.",
        sales_pitch_detail: "휴대폰으로 결제하시면 삼성월렛 지원 여부를 보시면 되고, 화면을 연결해서 쓰실 때는 DeX도 지원해요. 다만 S펜이나 UWB가 꼭 필요하시면 이 모델은 지원하지 않아요. 삼성월렛은 카드와 가맹점도 확인해 주세요.",
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
        sales_pitch: "A19 Pro 칩과 열을 분산하는 베이퍼 챔버가 들어 있어요. 사용 중 발열이 없다는 뜻은 아니에요.",
        sales_pitch_detail: "게임이나 영상 작업을 오래 하시는 편인가요? A19 Pro 칩과 열을 분산하는 베이퍼 챔버가 들어 있어요. 실제 속도나 발열은 작업 종류와 사용 환경에 따라 달라요.",
        caution: "지속 성능은 제조사 발표 기준입니다. 작업 종류·주변 온도·설정에 따라 체감이 다릅니다.",
        sources: ["i17pro", "i16pro", "appleLaunch"],
      },
      display: {
        official: "159mm(15.9cm, 약 6.3인치), Super Retina XDR OLED, 2622×1206, ProMotion 최대 120Hz. 일반 1000·HDR 1600·야외 부분 최대 3000nits.",
        vs_previous: "명목 화면 크기·해상도·최대 주사율 유지. 야외 부분 최대 밝기 2000 → 3000nits, 반사 방지 코팅 추가.",
        sales_pitch: "화면은 약 6.3인치이고 최대 120Hz를 지원해요. 화면 움직임을 중요하게 보시면 살펴보실 만해요.",
        sales_pitch_detail: "너무 큰 화면보다는 비교적 아담한 크기를 찾으시면 약 6.3인치 화면을 봐주세요. 최대 120Hz를 지원해서 화면 움직임도 살펴보실 수 있어요. 주사율은 콘텐츠와 사용 조건에 따라 달라요.",
        caution: "3000nits는 야외 부분 최대값이며 항상 유지되는 밝기가 아닙니다. 직각 대각선 159.3mm, 실제 표시 영역은 더 작습니다.",
        sources: ["i17pro", "i16pro"],
      },
      weight: {
        official: "204g, 150.0×71.9×8.75mm. 알루미늄 Unibody, 전면 Ceramic Shield 2·후면 Ceramic Shield.",
        vs_previous: "199g → 204g으로 5g 증가. 두께 8.25 → 8.75mm로 0.5mm 증가. 티타늄에서 알루미늄 Unibody로 변경.",
        sales_pitch: "본체 무게는 204g이에요. 케이스를 끼운 무게는 이보다 더 나가요.",
        sales_pitch_detail: "가방이나 주머니에 넣고 다니실 때 무게도 중요하죠. 본체는 204g이고 두께는 8.75mm예요. 케이스까지 쓰실 예정이면 그 무게와 두께도 함께 생각해 주세요.",
        caution: "소재가 바뀌었다고 더 가볍거나 더 튼튼하다고 단정하지 않습니다.",
        sources: ["i17pro", "i16pro"],
      },
      camera: {
        official: "메인 48MP F1.78·초광각 48MP F2.2·4배 망원 48MP F2.8. 메인·망원 센서 시프트 OIS. 8배는 12MP 광학 퀄리티. 전면 18MP Center Stage.",
        vs_previous: "전작 12MP 5배 망원 → 48MP 4배 망원·12MP 8배 광학 퀄리티. 전면 12MP → 18MP. 단순히 5배 광학이 8배 광학으로 바뀐 것은 아닙니다.",
        sales_pitch: "4배 광학 망원 카메라와 18MP 전면 카메라가 있어요. 8배는 광학 퀄리티 줌이에요.",
        sales_pitch_detail: "멀리 있는 장면을 찍으시면 4배 광학 망원 카메라를 쓸 수 있어요. 전면 카메라는 18MP고요. 8배도 제공하지만 별도 8배 광학 렌즈가 아니라 광학 퀄리티 줌이라는 점은 구분해 주세요.",
        caution: "8배 광학 퀄리티와 8배 광학 렌즈는 다릅니다. OIS도 움직이는 피사체의 흔들림까지 보장하지 않습니다.",
        sources: ["i17pro", "i16pro", "appleLaunch"],
      },
      special_feature: {
        official: "TrueDepth 기반 Face ID, Apple Pay, IP68(최대 수심 6m·30분 시험), USB 3 최대 10Gb/s, MagSafe·Qi2 최대 25W.",
        vs_previous: "Face ID·Apple Pay·IP68은 전작에도 제공됩니다. 생체인식 속도 향상 수치는 확인하지 못했습니다.",
        sales_pitch: "얼굴로 잠금을 푸는 Face ID와 Apple Pay를 지원해요. 결제는 카드와 가맹점 지원 여부를 확인해 주세요.",
        sales_pitch_detail: "잠금은 Face ID로 풀 수 있고, 결제는 Apple Pay를 지원해요. 지금 쓰시는 카드로 휴대폰 결제를 하실 생각이면 카드와 가맹점의 지원 여부를 먼저 확인해 주세요. 모든 카드에서 되는 건 아니에요.",
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
        sales_pitch: "A19 Pro 칩과 베이퍼 챔버가 들어 있어요. 실제 속도나 발열은 사용 환경에 따라 달라요.",
        sales_pitch_detail: "게임이나 영상 작업을 자주 하신다면 A19 Pro 칩이 들어간 모델로 살펴보시면 돼요. 열을 분산하는 베이퍼 챔버도 적용돼 있어요. 다만 어떤 작업을 얼마나 오래 하시는지에 따라 체감은 달라요.",
        caution: "제조사 발표 수치이며 실제 성능·발열은 환경과 작업에 따라 다릅니다.",
        sources: ["i17max", "i16max", "appleLaunch"],
      },
      display: {
        official: "174mm(17.4cm, 약 6.9인치), Super Retina XDR OLED, 2868×1320, ProMotion 최대 120Hz. 일반 1000·HDR 1600·야외 부분 최대 3000nits.",
        vs_previous: "명목 17.4cm 화면과 해상도·최대 주사율 유지. 야외 부분 최대 밝기 2000 → 3000nits, 반사 방지 코팅 추가.",
        sales_pitch: "화면은 약 6.9인치로 큰 편이에요. 사진이나 영상을 큼직하게 보고 싶으실 때 살펴보시면 좋아요.",
        sales_pitch_detail: "화면이 작아서 사진이나 영상을 볼 때 답답하셨나요? 이 모델은 약 6.9인치로 큰 화면 쪽이에요. 글자 크기는 설정에 따라 달라서, 글씨가 중요하시면 글자 설정도 함께 봐주세요.",
        caution: "3000nits는 야외 부분 최대값입니다. 직각 대각선은 174.2mm이고 실제 표시 영역은 더 작습니다.",
        sources: ["i17max", "i16max"],
      },
      weight: {
        official: "231g, 163.4×78.0×8.75mm. 알루미늄 Unibody, 전면 Ceramic Shield 2·후면 Ceramic Shield.",
        vs_previous: "227g → 231g으로 4g 증가. 두께 8.25 → 8.75mm로 0.5mm 증가. 전작 티타늄에서 알루미늄 Unibody로 변경.",
        sales_pitch: "본체 무게는 231g이에요. 큰 화면과 함께 무게도 살펴보시면 좋아요.",
        sales_pitch_detail: "큰 화면을 원하셔도 무게는 함께 보셔야겠죠. 본체는 231g이고 두께는 8.75mm예요. 케이스를 끼우시면 무게가 더해지니 휴대하시는 방식도 생각해 주세요.",
        caution: "무게만으로 손목 부담이나 건강 영향을 판단하지 않습니다.",
        sources: ["i17max", "i16max"],
      },
      camera: {
        official: "메인 48MP F1.78·초광각 48MP F2.2·4배 망원 48MP F2.8. 메인·망원 센서 시프트 OIS. 8배는 12MP 광학 퀄리티. 전면 18MP Center Stage.",
        vs_previous: "전작 12MP 5배 망원 → 48MP 4배 망원·12MP 8배 광학 퀄리티. 전면 12MP → 18MP. 17 Pro와 주요 카메라 구성은 같습니다.",
        sales_pitch: "4배 광학 망원 카메라가 있어요. 8배는 광학 퀄리티 줌이라 별도 8배 렌즈와는 달라요.",
        sales_pitch_detail: "멀리 있는 장면을 찍을 때 쓸 수 있는 4배 광학 망원 카메라가 있어요. 전면 카메라는 18MP예요. 8배는 광학 퀄리티 줌이어서 광학 렌즈 배율과는 구분해서 보시면 돼요.",
        caution: "광학 퀄리티 줌을 광학 렌즈 배율로 설명하지 마세요. 야간 결과는 조명·피사체 움직임에 따라 달라집니다.",
        sources: ["i17max", "i17pro", "i16max"],
      },
      special_feature: {
        official: "TrueDepth 기반 Face ID, Apple Pay, IP68(최대 수심 6m·30분 시험), USB 3 최대 10Gb/s, MagSafe·Qi2 최대 25W.",
        vs_previous: "Face ID·Apple Pay·IP68은 전작에도 제공됩니다. 최대 저장 용량이 1TB에서 2TB로 확대됐습니다.",
        sales_pitch: "저장 용량은 최대 2TB까지 선택할 수 있어요. Face ID와 Apple Pay도 지원해요.",
        sales_pitch_detail: "사진이나 영상을 많이 저장하시면 최대 2TB까지 선택할 수 있어요. 얼굴로 잠금을 푸는 Face ID와 Apple Pay도 지원하고요. 결제는 카드와 가맹점 지원 여부를 확인해 주세요.",
        caution: "표시 용량 전체를 사용자가 쓸 수 있는 것은 아닙니다. 결제·충전은 호환 조건에 따르며 방수는 영구적이지 않습니다.",
        sources: ["i17max", "i16max", "appleLaunch"],
      },
    },
  },
{
    "id": "galaxy-s26-fe",
    "model_name": "갤럭시 S26 FE",
    "brand": "Samsung",
    "aliases": [
      "갤럭시S26FE",
      "Galaxy S26 FE"
    ],
    "previous": "갤럭시 S25 FE",
    "summary": "6.7형 · 3배 광학 줌",
    "prices": [
      {
        "storage": "256GB",
        "krw": 1045000
      }
    ],
    "price_source": "feLaunch",
    "official_url": "https://www.samsung.com/sec/smartphones/galaxy-s26/buy/?modelCode=SM-S741NZKWKOO",
    "specs": {
      "processor": {
        "official": "Exynos 2500 / 3nm. 10코어 CPU, 3.3·2.74·2.36·1.8GHz. RAM 8GB.",
        "vs_previous": "삼성 국내 제품 페이지 기준 S25 FE 대비 CPU 최대 11%, GPU 최대 24%, NPU 최대 51% 향상. 각 지표는 제조사 측정 조건의 결과입니다.",
        "sales_pitch": "엑시노스 2500과 RAM 8GB가 들어 있어요. 쓰시는 앱에 따라 체감 속도는 달라요.",
        "sales_pitch_detail": "처리 성능을 보시면 엑시노스 2500과 RAM 8GB 구성이에요. 게임이나 앱을 쓰실 때의 속도는 설정과 사용 환경에 따라 달라요. 자주 쓰시는 앱을 기준으로 살펴보시면 좋아요.",
        "caution": "실제 성능은 설정·앱·사용 환경에 따라 다릅니다. 제조사 시험값과 적용 조건을 확인하세요.",
        "sources": [
          "galaxy-s26-fe", "feSpecs", "feOverview", "feProduct"
        ]
      },
      "display": {
        "official": "171.1mm(6.7형), FHD+ Dynamic AMOLED 2X, 최대 120Hz·1,900nits.",
        "vs_previous": "전작 대비 밝기 향상 수치는 이번 공식 조사에서 확인하지 못했습니다.",
        "sales_pitch": "화면은 약 6.7인치이고 최대 120Hz를 지원해요. 큰 화면을 찾으시면 살펴보실 만해요.",
        "sales_pitch_detail": "사진이나 영상을 큰 화면으로 보고 싶으시면 약 6.7인치 화면을 봐주세요. 최대 120Hz를 지원해요. 글자가 크게 보이는지는 화면 크기뿐 아니라 글자 설정도 영향을 줘요.",
        "caution": "실제 성능은 설정·앱·사용 환경에 따라 다릅니다. 제조사 시험값과 적용 조건을 확인하세요.",
        "sources": [
          "galaxy-s26-fe", "feSpecs", "feOverview", "feProduct"
        ]
      },
      "weight": {
        "official": "193g / 161.6 × 76.9 × 7.4mm. 알루미늄 합금 프레임, 전후면 Gorilla Glass Victus+.",
        "vs_previous": "전작 대비 무게·두께 차이는 공식 비교 근거 추가 확인이 필요합니다.",
        "sales_pitch": "본체는 193g이고 두께는 7.4mm예요. 케이스를 끼우면 무게와 두께가 더해져요.",
        "sales_pitch_detail": "휴대하실 때 무게가 신경 쓰이시면 본체 193g을 기준으로 살펴보시면 돼요. 두께는 7.4mm예요. 케이스까지 쓰실 예정이면 그 무게도 함께 생각해 주세요.",
        "caution": "실제 성능은 설정·앱·사용 환경에 따라 다릅니다. 제조사 시험값과 적용 조건을 확인하세요.",
        "sources": [
          "galaxy-s26-fe", "feSpecs", "feOverview", "feProduct"
        ]
      },
      "camera": {
        "official": "광각 50MP F1.8 OIS / 초광각 12MP F2.2 / 망원 8MP F2.4 OIS·광학 3배 / 전면 12MP F2.2.",
        "vs_previous": "공식 발표에서 S25 FE 대비 전면 카메라 개선을 언급합니다. 마이 팬캠과 슈퍼 스테디 수평 고정 지원.",
        "sales_pitch": "3배 광학 망원 카메라가 있어요. 전면 카메라는 12MP예요.",
        "sales_pitch_detail": "멀리 있는 장면도 찍으시면 3배 광학 망원 카메라를 사용할 수 있어요. 전면 카메라는 12MP예요. 화소나 줌 배율만으로 사진 결과가 정해지는 건 아니라 촬영 환경도 영향을 줘요.",
        "caution": "광학·디지털 줌을 구분하세요. 촬영·AI 편집 결과는 조건에 따라 달라집니다.",
        "sources": [
          "galaxy-s26-fe", "feSpecs", "feOverview", "feProduct"
        ]
      },
      "special_feature": {
        "official": "IP68(담수 1.5m·30분 시험), 지문 센서·NFC·Samsung DeX 지원. Android 17·One UI 9, OS 업그레이드 최대 7세대. 국내 공식 상세 표의 보안 업데이트 기한은 2033년 9월 30일.",
        "vs_previous": "이번 공식 조사에서 생체인식 속도 개선 수치는 확인되지 않았습니다.",
        "sales_pitch": "DeX를 지원하고, OS 업그레이드는 최대 7세대예요. 보안 업데이트 기한은 2033년 9월 30일로 안내돼 있어요.",
        "sales_pitch_detail": "오래 쓰실 생각이면 업데이트 지원도 살펴보시면 좋아요. OS 업그레이드는 최대 7세대, 보안 업데이트 기한은 2033년 9월 30일로 안내돼 있어요. 화면을 연결해서 쓰는 DeX도 지원해요.",
        "caution": "AI는 계정·언어·지역 조건에 따릅니다. 방수 성능은 영구적이지 않습니다.",
        "sources": [
          "galaxy-s26-fe", "feSpecs", "feOverview", "feProduct"
        ]
      }
    }
  },
  {
    "id": "galaxy-z-fold8-ultra",
    "model_name": "갤럭시 Z 폴드8 울트라",
    "brand": "Samsung",
    "aliases": [
      "갤럭시Z폴드8울트라",
      "Galaxy Z Fold8 Ultra",
      "Fold8 Ultra"
    ],
    "previous": "갤럭시 Z 폴드7",
    "summary": "8.0형 펼친 화면 · 200MP",
    "prices": [
      {
        "storage": "256GB",
        "krw": 2577300
      },
      {
        "storage": "512GB",
        "krw": 2830300
      },
      {
        "storage": "1TB",
        "krw": 3451800
      }
    ],
    "price_source": "z8Launch",
    "official_url": "https://www.samsung.com/sec/smartphones/galaxy-z-fold8-ultra/specs/",
    "specs": {
      "processor": {
        "official": "갤럭시용 Snapdragon 8 Elite 5세대. Octa-Core / 4.74·3.6GHz.",
        "vs_previous": "신형 AP와 방열 설계 적용. CPU·GPU 개별 전작 대비 향상률은 이번 조사에서 확인하지 못했습니다.",
        "sales_pitch": "갤럭시용 스냅드래곤 8 Elite 5세대가 들어 있어요. 실제 속도는 쓰시는 앱에 따라 달라요.",
        "sales_pitch_detail": "접는 화면뿐 아니라 처리 성능도 보시면 갤럭시용 스냅드래곤 8 Elite 5세대가 들어간 모델이에요. 게임이나 앱을 얼마나 오래 쓰시는지에 따라 속도와 발열은 달라요.",
        "caution": "실제 성능은 설정·앱·사용 환경에 따라 다릅니다. 제조사 시험값과 적용 조건을 확인하세요.",
        "sources": [
          "galaxy-z-fold8-ultra",
          "z8Overview"
        ]
      },
      "display": {
        "official": "메인 203.1mm(8.0형) / 2504×2256. 커버 164.8mm(6.5형) / 2520×1080. Dynamic AMOLED 2X·최대 120Hz.",
        "vs_previous": "삼성 발표 기준 폴드7 대비 메인 최대 밝기 약 15% 개선, 최대 3,000nits.",
        "sales_pitch": "펼치면 약 8.0인치, 접으면 바깥 화면은 약 6.5인치예요. 큰 화면이 필요할 때 펼쳐 쓰는 방식이에요.",
        "sales_pitch_detail": "평소에는 접은 상태의 약 6.5인치 화면을 쓰고, 넓게 보고 싶을 때 약 8.0인치로 펼칠 수 있어요. 사진이나 문서를 큰 화면으로 보실 때 이런 구성을 살펴보시면 좋아요. 두 화면의 비율은 서로 달라요.",
        "caution": "두 화면의 크기·비율을 구분하세요. 3,000nits는 최대 밝기이며 항상 유지되는 밝기가 아닙니다.",
        "sources": [
          "galaxy-z-fold8-ultra",
          "z8Overview"
        ]
      },
      "weight": {
        "official": "215g / 펼침 158.4×143.2×4.1mm / 접힘 158.4×72.8×8.9mm.",
        "vs_previous": "폴드7 215g → 215g. 펼친 두께 4.2 → 4.1mm로 0.1mm 감소.",
        "sales_pitch": "본체는 215g이에요. 두께는 접으면 8.9mm, 펼치면 4.1mm예요.",
        "sales_pitch_detail": "접어서 가지고 다닐 때의 두께는 8.9mm이고, 펼치면 4.1mm예요. 본체 무게는 215g이에요. 케이스를 쓰시면 무게와 두께가 더해져요.",
        "caution": "폴더블은 접힘·펼침 치수를 구분합니다. 낙하·마모 내구성을 무게만으로 보장하지 않습니다.",
        "sources": [
          "galaxy-z-fold8-ultra",
          "fold7"
        ]
      },
      "camera": {
        "official": "광각 200MP F1.7 / 초광각 50MP F1.9 / 3배 망원 10MP F2.4. 후면 OIS. 전면·커버 각 10MP.",
        "vs_previous": "폴드 시리즈 최초 50MP 초광각. 200MP 모드 HDR와 APV 기반 8K 촬영을 공식 발표했습니다.",
        "sales_pitch": "200MP 메인 카메라와 3배 광학 망원이 있어요. 넓은 장면을 찍는 초광각은 50MP예요.",
        "sales_pitch_detail": "가까운 사진, 넓은 풍경, 멀리 있는 장면을 모두 찍으시면 카메라 구성을 봐주세요. 200MP 메인, 50MP 초광각, 3배 광학 망원이 있어요. 사진 품질은 촬영 조건에 따라서도 달라요.",
        "caution": "광학 렌즈 배율·광학 수준 줌·디지털 줌은 다릅니다. 촬영 결과를 보장하지 않습니다.",
        "sources": [
          "galaxy-z-fold8-ultra",
          "z8Overview"
        ]
      },
      "special_feature": {
        "official": "IP48, Samsung DeX·UWB 지원, 지문 센서. RAM 12GB(256·512GB) / 16GB(1TB).",
        "vs_previous": "Flex Titanium 디스플레이 설계와 One UI 9 적용. 지문인식 속도 개선 수치는 미확인입니다.",
        "sales_pitch": "DeX를 지원해요. RAM은 256GB·512GB 모델이 12GB, 1TB 모델이 16GB예요.",
        "sales_pitch_detail": "용량을 고르실 때 RAM도 함께 달라져요. 256GB와 512GB 모델은 RAM 12GB, 1TB 모델은 RAM 16GB예요. 화면을 연결해서 쓰는 DeX도 지원해요.",
        "caution": "IP48은 IP68과 다릅니다. 완전 방진으로 안내하지 않으며 방수·AI 서비스 조건은 원문을 확인하세요.",
        "sources": [
          "galaxy-z-fold8-ultra",
          "z8Overview"
        ]
      }
    }
  },
  {
    "id": "galaxy-z-fold8",
    "model_name": "갤럭시 Z 폴드8",
    "brand": "Samsung",
    "aliases": [
      "갤럭시Z폴드8",
      "Galaxy Z Fold8",
      "Fold8"
    ],
    "previous": "직접 전작이 없는 신규 와이드 폼팩터",
    "summary": "7.6형 와이드 화면 · 201g",
    "prices": [
      {
        "storage": "256GB",
        "krw": 2278100
      },
      {
        "storage": "512GB",
        "krw": 2531100
      },
      {
        "storage": "1TB",
        "krw": 3152600
      }
    ],
    "price_source": "z8Launch",
    "official_url": "https://www.samsung.com/sec/smartphones/galaxy-z-fold8/specs/",
    "specs": {
      "processor": {
        "official": "갤럭시용 Snapdragon 8 Elite 5세대. Octa-Core / 4.74·3.6GHz.",
        "vs_previous": "신형 AP와 방열 설계 적용. CPU·GPU 개별 전작 대비 향상률은 이번 조사에서 확인하지 못했습니다.",
        "sales_pitch": "갤럭시용 스냅드래곤 8 Elite 5세대가 들어 있어요. 앱 사용 속도는 사용 환경에 따라 달라요.",
        "sales_pitch_detail": "접는 모델을 찾으시면서 처리 성능도 중요하게 보시면 스냅드래곤 8 Elite 5세대 구성을 봐주세요. 실제 속도와 발열은 앱이나 사용 시간에 따라 달라요.",
        "caution": "실제 성능은 설정·앱·사용 환경에 따라 다릅니다. 제조사 시험값과 적용 조건을 확인하세요.",
        "sources": [
          "galaxy-z-fold8",
          "z8Overview"
        ]
      },
      "display": {
        "official": "메인 193.2mm(7.6형) / 1848×2448. 커버 138.4mm(5.5형) / 1972×1248. Dynamic AMOLED 2X·최대 120Hz.",
        "vs_previous": "신규 4:3 메인 화면 폼팩터입니다. 삼성 발표상 메인 최대 밝기 3,000nits.",
        "sales_pitch": "펼친 화면은 약 7.6인치, 바깥 화면은 약 5.5인치예요. 안쪽은 4:3 비율의 화면이에요.",
        "sales_pitch_detail": "사진이나 문서를 넓게 보고 싶으시면 펼친 약 7.6인치 화면을 살펴보시면 좋아요. 안쪽 화면은 4:3 비율이고, 접었을 때 쓰는 바깥 화면은 약 5.5인치예요. 두 화면은 크기와 비율이 달라요.",
        "caution": "두 화면의 크기·비율을 구분하세요. 3,000nits는 최대 밝기이며 항상 유지되는 밝기가 아닙니다.",
        "sources": [
          "galaxy-z-fold8",
          "z8Overview"
        ]
      },
      "weight": {
        "official": "201g / 펼침 123.9×161.4×4.5mm / 접힘 123.9×81.9×9.7mm.",
        "vs_previous": "직접 전작이 없는 폼팩터이므로 전작 대비 경량화 수치로 안내하지 않습니다.",
        "sales_pitch": "본체 무게는 201g이에요. 두께는 접으면 9.7mm, 펼치면 4.5mm예요.",
        "sales_pitch_detail": "휴대하실 때는 접은 두께 9.7mm와 본체 무게 201g을 함께 봐주세요. 펼치면 두께는 4.5mm예요. 케이스 무게는 포함되지 않은 수치예요.",
        "caution": "폴더블은 접힘·펼침 치수를 구분합니다. 낙하·마모 내구성을 무게만으로 보장하지 않습니다.",
        "sources": [
          "galaxy-z-fold8"
        ]
      },
      "camera": {
        "official": "광각 50MP F1.8 / 초광각 50MP F1.9. 후면 OIS. 광학 수준 2배·디지털 최대 10배. 전면·커버 각 10MP.",
        "vs_previous": "직접 전작과의 카메라 향상률을 안내하지 않습니다. 전용 망원 렌즈는 공식 사양 표에 없습니다.",
        "sales_pitch": "메인과 초광각 카메라는 각각 50MP예요. 별도 망원 렌즈는 없고, 2배는 광학 수준 줌이에요.",
        "sales_pitch_detail": "넓은 풍경을 찍을 수 있는 초광각과 메인 카메라가 각각 50MP예요. 2배 촬영도 되지만 별도 망원 렌즈가 있는 구성은 아니에요. 멀리 있는 장면을 많이 찍으시면 이 부분을 꼭 봐주세요.",
        "caution": "광학 렌즈 배율·광학 수준 줌·디지털 줌은 다릅니다. 촬영 결과를 보장하지 않습니다.",
        "sources": [
          "galaxy-z-fold8",
          "z8Overview"
        ]
      },
      "special_feature": {
        "official": "IP48, Samsung DeX·UWB 지원, 지문 센서. RAM 12GB(256·512GB) / 16GB(1TB).",
        "vs_previous": "Flex Titanium 디스플레이 설계와 One UI 9 적용. 지문인식 속도 개선 수치는 미확인입니다.",
        "sales_pitch": "DeX를 쓸 수 있어요. RAM은 256GB·512GB 모델이 12GB, 1TB 모델이 16GB예요.",
        "sales_pitch_detail": "저장 용량은 256GB, 512GB, 1TB 중에서 고를 수 있어요. RAM은 앞의 두 용량이 12GB, 1TB가 16GB라 용량과 함께 살펴보시면 돼요. DeX도 지원해요.",
        "caution": "IP48은 IP68과 다릅니다. 완전 방진으로 안내하지 않으며 방수·AI 서비스 조건은 원문을 확인하세요.",
        "sources": [
          "galaxy-z-fold8",
          "z8Overview"
        ]
      }
    }
  },
  {
    "id": "galaxy-z-flip8",
    "model_name": "갤럭시 Z 플립8",
    "brand": "Samsung",
    "aliases": [
      "갤럭시Z플립8",
      "Galaxy Z Flip8",
      "Flip8"
    ],
    "previous": "갤럭시 Z 플립7",
    "summary": "접어서 휴대 · 180g",
    "prices": [
      {
        "storage": "256GB",
        "krw": 1683000
      },
      {
        "storage": "512GB",
        "krw": 1936000
      }
    ],
    "price_source": "z8Launch",
    "official_url": "https://www.samsung.com/sec/smartphones/galaxy-z-flip8/specs/",
    "specs": {
      "processor": {
        "official": "Deca-Core / 3.8·3.26·2.76GHz. 정확한 AP 명칭·공정은 이번 공식 조사 범위에서 미확인.",
        "vs_previous": "CPU·GPU 향상률과 발열 개선 수치는 미확인입니다.",
        "sales_pitch": "10코어 프로세서와 RAM 12GB 구성이에요. 정확한 칩 이름은 확인한 국내 공식 표에 나와 있지 않아요.",
        "sales_pitch_detail": "성능 쪽으로는 10코어 프로세서와 RAM 12GB가 확인돼요. 정확한 칩 이름은 확인한 국내 공식 사양표에 기재되지 않아 단정해서 안내드리기 어려워요. 실제 속도나 발열은 쓰시는 앱에 따라 달라요.",
        "caution": "실제 성능은 설정·앱·사용 환경에 따라 다릅니다. 제조사 시험값과 적용 조건을 확인하세요.",
        "sources": [
          "galaxy-z-flip8"
        ]
      },
      "display": {
        "official": "메인 174.1mm(6.9형) Dynamic AMOLED 2X / 2520×1080·최대 120Hz. 커버 104.8mm(4.1형) Super AMOLED / 1048×948.",
        "vs_previous": "커버 화면의 AI 인터페이스와 미러뷰 기능이 공식 발표됐습니다.",
        "sales_pitch": "펼치면 약 6.9인치, 접었을 때 바깥 화면은 약 4.1인치예요. 접은 상태에서도 화면을 쓸 수 있어요.",
        "sales_pitch_detail": "접었을 때는 약 4.1인치 바깥 화면을 사용하고, 펼치면 약 6.9인치 화면으로 볼 수 있어요. 작은 크기로 휴대하면서 필요할 때 큰 화면을 쓰는 방식을 원하시면 살펴보시면 좋아요.",
        "caution": "실제 성능은 설정·앱·사용 환경에 따라 다릅니다. 제조사 시험값과 적용 조건을 확인하세요.",
        "sources": [
          "galaxy-z-flip8",
          "z8Overview"
        ]
      },
      "weight": {
        "official": "180g / 펼침 166.9×75.4×6.1mm / 접힘 85.7×75.4×13.1mm.",
        "vs_previous": "플립7 188g → 180g으로 8g 감소. 펼친 두께 6.5 → 6.1mm로 0.4mm 감소.",
        "sales_pitch": "본체는 180g이에요. 접은 상태의 두께는 13.1mm예요.",
        "sales_pitch_detail": "접어서 가지고 다니실 때는 두께도 함께 봐주세요. 접은 두께는 13.1mm이고 본체 무게는 180g이에요. 케이스를 끼우시면 무게와 두께가 더해져요.",
        "caution": "케이스·액세서리 무게는 별도입니다. 손목 건강 효과를 보장하지 않습니다.",
        "sources": [
          "galaxy-z-flip8",
          "flip7"
        ]
      },
      "camera": {
        "official": "광각 50MP F1.8 + 초광각 12MP F2.2. 후면 OIS. 전면 10MP F2.2. 광학 수준 2배 / 디지털 최대 10배.",
        "vs_previous": "미러뷰와 슈퍼 스테디 수평 고정 기능을 공식 발표했습니다. 화질 향상률은 미확인입니다.",
        "sales_pitch": "50MP 메인과 12MP 초광각 카메라가 있어요. 2배는 광학 수준 줌, 최대 10배는 디지털 줌이에요.",
        "sales_pitch_detail": "일반 사진은 메인 카메라로, 넓은 장면은 초광각으로 찍을 수 있어요. 각각 50MP와 12MP예요. 2배와 최대 10배는 줌 방식이 달라서 같은 화질로 보시면 안 돼요.",
        "caution": "촬영 안정성은 각도·설치 표면·움직임에 따라 다릅니다.",
        "sources": [
          "galaxy-z-flip8",
          "z8Overview"
        ]
      },
      "special_feature": {
        "official": "IP48, Samsung DeX·UWB, 지문 센서. RAM 12GB / 256·512GB.",
        "vs_previous": "보안 업데이트 공식 지원 기한 2033-07-31. 플립7은 2032-07-31.",
        "sales_pitch": "DeX와 UWB를 지원해요. 저장 용량은 256GB·512GB이고 RAM은 모두 12GB예요.",
        "sales_pitch_detail": "저장할 사진이나 앱이 얼마나 되는지에 따라 256GB와 512GB 중에서 고르시면 돼요. RAM은 두 용량 모두 12GB예요. DeX와 UWB도 지원해요.",
        "caution": "IP48은 완전 방진을 뜻하지 않습니다. 생체인식 속도 수치는 미확인입니다.",
        "sources": [
          "galaxy-z-flip8",
          "flip7",
          "z8Overview"
        ]
      }
    }
  },
  {
    "id": "galaxy-a37",
    "model_name": "갤럭시 A37 5G",
    "brand": "Samsung",
    "aliases": [
      "갤럭시A375G",
      "Galaxy A37 5G"
    ],
    "previous": "갤럭시 A36 5G",
    "summary": "6.7형 · 5,000mAh",
    "prices": [
      {
        "storage": "128GB",
        "krw": 598400
      }
    ],
    "price_source": "a37Launch",
    "official_url": "https://www.samsung.com/sec/support/model/SM-A376NZAAKOO/",
    "specs": {
      "processor": {
        "official": "Octa-Core / 2.75·2.0GHz. RAM 6GB. 공식 국내 지원 표에 AP 명칭·공정 미기재.",
        "vs_previous": "공식 국내 발표에서 CPU·GPU 향상률은 확인하지 못했습니다.",
        "sales_pitch": "RAM 6GB와 8코어 프로세서 구성이에요. 정확한 칩 이름은 확인한 국내 공식 표에 기재되지 않았어요.",
        "sales_pitch_detail": "앱 사용 성능을 살펴보시면 RAM 6GB와 8코어 프로세서가 확인돼요. 정확한 칩 이름은 확인한 국내 공식 표에 나와 있지 않아요. 실제 속도는 앱과 설정에 따라 달라요.",
        "caution": "실제 성능은 설정·앱·사용 환경에 따라 다릅니다. 제조사 시험값과 적용 조건을 확인하세요.",
        "sources": [
          "galaxy-a37"
        ]
      },
      "display": {
        "official": "170.1mm(6.7형), Super AMOLED / 1080×2340 FHD+ / 최대 120Hz. nits 값은 이번 조사에서 미확인.",
        "vs_previous": "전작 대비 최대 밝기 향상 수치는 확인하지 못했습니다.",
        "sales_pitch": "화면은 약 6.7인치이고 최대 120Hz를 지원해요. 해상도는 FHD+예요.",
        "sales_pitch_detail": "사진이나 영상을 큰 화면으로 보고 싶으시면 약 6.7인치 화면을 봐주세요. FHD+ 해상도와 최대 120Hz를 지원해요. 글자가 크게 보이는지는 글자 설정도 함께 영향을 줘요.",
        "caution": "실제 성능은 설정·앱·사용 환경에 따라 다릅니다. 제조사 시험값과 적용 조건을 확인하세요.",
        "sources": [
          "galaxy-a37"
        ]
      },
      "weight": {
        "official": "196g / 162.9×78.2×7.4mm. 전·후면 Gorilla Glass Victus+.",
        "vs_previous": "공식 비교 근거가 부족해 전작 대비 무게·두께 변화는 표시하지 않습니다.",
        "sales_pitch": "본체는 196g이고 두께는 7.4mm예요. 케이스 무게는 별도예요.",
        "sales_pitch_detail": "가지고 다니실 때의 무게도 보시면 본체는 196g이에요. 두께는 7.4mm이고, 케이스를 쓰시면 무게와 두께가 더해져요. 손에 잘 맞는지는 개인마다 다를 수 있어요.",
        "caution": "외관 소재는 한국 제품 페이지 기준입니다. 낙하 내구성·건강 효과를 보장하지 않습니다.",
        "sources": [
          "galaxy-a37",
          "a37Product"
        ]
      },
      "camera": {
        "official": "광각 50MP F1.8 OIS / 초광각 8MP F2.2 / 접사 5MP F2.4 / 전면 12MP F2.2. 디지털 최대 10배.",
        "vs_previous": "국내 공식 발표상 광각 1.0μm 픽셀과 저조도 촬영 개선을 설명합니다.",
        "sales_pitch": "50MP 메인에 초광각과 접사 카메라가 있어요. 최대 10배 확대는 디지털 줌이에요.",
        "sales_pitch_detail": "풍경을 넓게 찍는 초광각은 8MP, 가까운 작은 대상을 찍는 접사는 5MP예요. 메인 카메라는 50MP고요. 최대 10배는 디지털 줌이라 광학 망원이 있는 모델과는 달라요.",
        "caution": "광학식 망원 렌즈가 있는 모델로 설명하지 않습니다. 야간 화질은 조건에 따라 달라집니다.",
        "sources": [
          "galaxy-a37",
          "a37Launch"
        ]
      },
      "special_feature": {
        "official": "IP68(담수 1.5m·30분), Samsung Knox, 지문 센서. OS 업그레이드 최대 6회·보안 최대 6년.",
        "vs_previous": "전작 대비 방수·방진 등급이 IP68로 강화됐다는 공식 발표입니다.",
        "sales_pitch": "OS 업그레이드는 최대 6회, 보안 업데이트는 최대 6년 지원해요. 방수 기능이 있어도 물속 사용을 권하지는 않아요.",
        "sales_pitch_detail": "오래 쓰실 생각이면 OS 업그레이드 최대 6회와 보안 업데이트 최대 6년 지원을 살펴보시면 좋아요. IP68 방수·방진 등급도 있어요. 다만 방수는 시험 조건 기준이고 시간이 지나면서 달라질 수 있어요.",
        "caution": "방수는 영구적이지 않습니다. DeX는 공식 지원 표에서 미지원입니다.",
        "sources": [
          "galaxy-a37",
          "a37Launch",
          "a37Product"
        ]
      }
    }
  },
  {
    "id": "iphone-18-pro",
    "model_name": "iPhone 18 Pro",
    "brand": "Apple",
    "aliases": [
      "iPhone18Pro",
      "iPhone 18 Pro",
      "아이폰 18 프로"
    ],
    "previous": "iPhone 17 Pro",
    "summary": "6.3형 · 가변 조리개",
    "prices": [
      {
        "storage": "256GB",
        "krw": 1990000
      },
      {
        "storage": "512GB",
        "krw": 2290000
      },
      {
        "storage": "1TB",
        "krw": 2890000
      },
      {
        "storage": "2TB",
        "krw": 3790000
      }
    ],
    "price_source": "i18Preorder",
    "price_basis": "preorder-announcement",
    "official_url": "https://www.apple.com/kr/iphone-18-pro/specs/",
    "specs": {
      "processor": {
        "official": "A20 Pro / 2nm / 6코어 CPU·7코어 GPU·듀얼 16코어 Neural Engine. 베이퍼 챔버.",
        "vs_previous": "Apple 발표 기준 A19 Pro 대비 GPU 최대 40% 빠름·메모리 대역폭 50% 증가. 베이퍼 챔버 표면적 3배, 지속 성능 최대 40% 개선.",
        "sales_pitch": "A20 Pro 칩과 열을 분산하는 베이퍼 챔버가 들어 있어요. 사용 중 발열이 없다는 뜻은 아니에요.",
        "sales_pitch_detail": "게임이나 영상 작업을 자주 하시면 A20 Pro 칩이 들어간 구성을 살펴보시면 좋아요. 열을 분산하는 베이퍼 챔버도 적용돼 있어요. 실제 속도와 발열은 작업이나 주변 환경에 따라 달라요.",
        "caution": "GPU·지속 성능·메모리 대역폭은 서로 다른 지표입니다. 제조사 조건의 최대값이며 발열이 없다는 뜻은 아닙니다.",
        "sources": [
          "iphone-18-pro",
          "i18Launch"
        ]
      },
      "display": {
        "official": "15.9cm(약 6.3형), OLED Super Retina XDR / 2622×1206 / ProMotion 최대 120Hz. 일반 1000·HDR 1600·야외 부분 최대 3000nits.",
        "vs_previous": "17 Pro 계열과 화면 크기·해상도·최대 주사율 유지. Dynamic Island 디자인 변경.",
        "sales_pitch": "화면은 약 6.3인치이고 최대 120Hz를 지원해요. 너무 큰 화면이 부담스러우시면 살펴보실 만해요.",
        "sales_pitch_detail": "화면 크기가 너무 큰 건 부담스러우신가요? 이 모델은 약 6.3인치예요. 최대 120Hz를 지원하고, 화면 움직임은 콘텐츠와 설정에 따라 달라요.",
        "caution": "실제 표시 영역은 직각 대각선보다 작습니다. 부분 최대 밝기를 상시 밝기로 안내하지 않습니다.",
        "sources": [
          "iphone-18-pro",
          "i17pro",
          "i18Launch"
        ]
      },
      "weight": {
        "official": "211g / 150.0×71.9×8.75mm. 알루미늄 Unibody·전면 Ceramic Shield 2·후면 Ceramic Shield.",
        "vs_previous": "17 Pro 204g → 211g으로 7g 증가. 치수는 공식 표상 유지.",
        "sales_pitch": "본체 무게는 211g이고 두께는 8.75mm예요. 케이스를 끼우시면 무게가 더해져요.",
        "sales_pitch_detail": "휴대하실 때 무게를 중요하게 보시면 본체 211g을 기준으로 살펴보시면 돼요. 두께는 8.75mm예요. 케이스까지 쓰실 예정이면 그 무게와 두께도 함께 생각해 주세요.",
        "caution": "무게·크기로 건강 효과나 내구성을 보장하지 않습니다.",
        "sources": [
          "iphone-18-pro",
          "i17pro"
        ]
      },
      "camera": {
        "official": "48MP 메인 가변 조리개 F1.48·1.8·2.8·4.0 / 초광각 48MP F2.2 / 4배 망원 48MP F2.8. 메인·망원 센서 시프트 OIS. 전면 18MP.",
        "vs_previous": "17 Pro 계열의 고정 F1.78 메인 조리개에서 4단 가변 조리개로 변경. Pro용 촬영 제어·사진 스타일 3 추가.",
        "sales_pitch": "메인 카메라는 조리개를 바꿀 수 있어요. 48MP 초광각과 4배 광학 망원 카메라도 있어요.",
        "sales_pitch_detail": "사진 설정을 직접 조절해서 찍으시는 편인가요? 48MP 메인 카메라의 조리개를 바꿀 수 있어요. 48MP 초광각과 4배 광학 망원도 있고, 사진 결과는 빛이나 움직임에 따라 달라요.",
        "caution": "8배는 광학 퀄리티 줌입니다. 전용 렌즈의 광학 4배와 구분하며 촬영 결과는 조건에 따라 달라집니다.",
        "sources": [
          "iphone-18-pro",
          "i17pro",
          "i18Launch"
        ]
      },
      "special_feature": {
        "official": "Face ID·Apple Pay·IP68(최대 6m·30분). nano-SIM + eSIM / 듀얼 eSIM. USB 3 최대 10Gb/s·MagSafe/Qi2 최대 25W.",
        "vs_previous": "최대 저장공간이 두 모델 모두 2TB입니다. 17 Pro의 최대 1TB 대비 선택지 확대, 17 Pro Max는 2TB 유지.",
        "sales_pitch": "저장 용량은 최대 2TB까지 선택할 수 있어요. 국내 모델은 실물 유심과 eSIM을 지원해요.",
        "sales_pitch_detail": "사진이나 영상을 많이 저장하시면 최대 2TB까지 선택할 수 있어요. 국내 모델은 실물 유심과 eSIM을 지원해요. eSIM으로 개통하실 때는 통신사와 요금제의 지원 여부를 확인해 주세요.",
        "caution": "eSIM 전용 모델의 배터리 시험 시간을 국내 nano-SIM 모델의 보장값으로 사용하지 않습니다. Siri AI 한국어는 공식 발표상 10월 지원 예정입니다.",
        "sources": [
          "iphone-18-pro",
          "i17pro",
          "i18Launch"
        ]
      }
    }
  },
  {
    "id": "iphone-18-pro-max",
    "model_name": "iPhone 18 Pro Max",
    "brand": "Apple",
    "aliases": [
      "iPhone18ProMax",
      "iPhone 18 Pro Max",
      "아이폰 18 프로 맥스"
    ],
    "previous": "iPhone 17 Pro Max",
    "summary": "6.9형 · 가변 조리개",
    "prices": [
      {
        "storage": "256GB",
        "krw": 2190000
      },
      {
        "storage": "512GB",
        "krw": 2490000
      },
      {
        "storage": "1TB",
        "krw": 3090000
      },
      {
        "storage": "2TB",
        "krw": 3990000
      }
    ],
    "price_source": "i18Preorder",
    "price_basis": "preorder-announcement",
    "official_url": "https://www.apple.com/kr/iphone-18-pro/specs/",
    "specs": {
      "processor": {
        "official": "A20 Pro / 2nm / 6코어 CPU·7코어 GPU·듀얼 16코어 Neural Engine. 베이퍼 챔버.",
        "vs_previous": "Apple 발표 기준 A19 Pro 대비 GPU 최대 40% 빠름·메모리 대역폭 50% 증가. 베이퍼 챔버 표면적 3배, 지속 성능 최대 40% 개선.",
        "sales_pitch": "A20 Pro 칩과 베이퍼 챔버가 들어 있어요. 실제 속도나 발열은 쓰시는 앱에 따라 달라요.",
        "sales_pitch_detail": "게임이나 영상 작업을 자주 하시면 A20 Pro 칩 구성을 봐주세요. 열을 분산하는 베이퍼 챔버도 들어 있어요. 오래 사용하실 때의 성능과 발열은 작업 종류와 사용 환경에 따라 달라요.",
        "caution": "GPU·지속 성능·메모리 대역폭은 서로 다른 지표입니다. 제조사 조건의 최대값이며 발열이 없다는 뜻은 아닙니다.",
        "sources": [
          "iphone-18-pro-max",
          "i18Launch"
        ]
      },
      "display": {
        "official": "17.4cm(약 6.9형), OLED Super Retina XDR / 2868×1320 / ProMotion 최대 120Hz. 일반 1000·HDR 1600·야외 부분 최대 3000nits.",
        "vs_previous": "17 Pro 계열과 화면 크기·해상도·최대 주사율 유지. Dynamic Island 디자인 변경.",
        "sales_pitch": "화면은 약 6.9인치이고 최대 120Hz를 지원해요. 큰 화면을 원하시면 살펴보실 만해요.",
        "sales_pitch_detail": "사진이나 영상을 큼직하게 보고 싶으시면 약 6.9인치 화면을 살펴보시면 좋아요. 최대 120Hz도 지원해요. 글자를 더 크게 보고 싶으시면 글자 크기 설정도 함께 조절하시면 돼요.",
        "caution": "실제 표시 영역은 직각 대각선보다 작습니다. 부분 최대 밝기를 상시 밝기로 안내하지 않습니다.",
        "sources": [
          "iphone-18-pro-max",
          "i17max",
          "i18Launch"
        ]
      },
      "weight": {
        "official": "249g / 163.4×78.0×8.75mm. 알루미늄 Unibody·전면 Ceramic Shield 2·후면 Ceramic Shield.",
        "vs_previous": "17 Pro Max 231g → 249g으로 18g 증가. 치수는 공식 표상 유지.",
        "sales_pitch": "본체 무게는 249g이에요. 큰 화면만큼 무게도 함께 살펴보시면 좋아요.",
        "sales_pitch_detail": "큰 화면을 원하셔도 들고 다닐 무게는 함께 보셔야겠죠. 본체는 249g이고 두께는 8.75mm예요. 케이스를 끼우시면 무게가 더해져요.",
        "caution": "무게·크기로 건강 효과나 내구성을 보장하지 않습니다.",
        "sources": [
          "iphone-18-pro-max",
          "i17max"
        ]
      },
      "camera": {
        "official": "48MP 메인 가변 조리개 F1.48·1.8·2.8·4.0 / 초광각 48MP F2.2 / 4배 망원 48MP F2.8. 메인·망원 센서 시프트 OIS. 전면 18MP.",
        "vs_previous": "17 Pro 계열의 고정 F1.78 메인 조리개에서 4단 가변 조리개로 변경. Pro용 촬영 제어·사진 스타일 3 추가.",
        "sales_pitch": "조리개를 바꿀 수 있는 메인 카메라와 4배 광학 망원이 있어요. 메인과 초광각은 각각 48MP예요.",
        "sales_pitch_detail": "가까운 사진부터 먼 풍경까지 찍으시면 메인·초광각·망원 구성을 봐주세요. 메인 카메라는 조리개를 바꿀 수 있고, 망원은 4배 광학이에요. 8배는 광학 퀄리티 줌이라 별도 8배 렌즈는 아니에요.",
        "caution": "8배는 광학 퀄리티 줌입니다. 전용 렌즈의 광학 4배와 구분하며 촬영 결과는 조건에 따라 달라집니다.",
        "sources": [
          "iphone-18-pro-max",
          "i17max",
          "i18Launch"
        ]
      },
      "special_feature": {
        "official": "Face ID·Apple Pay·IP68(최대 6m·30분). nano-SIM + eSIM / 듀얼 eSIM. USB 3 최대 10Gb/s·MagSafe/Qi2 최대 25W.",
        "vs_previous": "최대 저장공간이 두 모델 모두 2TB입니다. 17 Pro의 최대 1TB 대비 선택지 확대, 17 Pro Max는 2TB 유지.",
        "sales_pitch": "저장 용량은 최대 2TB까지 고를 수 있어요. 국내 모델은 실물 유심과 eSIM을 지원해요.",
        "sales_pitch_detail": "저장할 사진이나 영상이 많으시면 최대 2TB까지 선택할 수 있어요. 국내 모델은 실물 유심과 eSIM을 지원하고요. eSIM 개통은 통신사와 요금제의 지원 여부를 확인해 주세요.",
        "caution": "eSIM 전용 모델의 배터리 시험 시간을 국내 nano-SIM 모델의 보장값으로 사용하지 않습니다. Siri AI 한국어는 공식 발표상 10월 지원 예정입니다.",
        "sources": [
          "iphone-18-pro-max",
          "i17max",
          "i18Launch"
        ]
      }
    }
  },
  {
    "id": "iphone-duo",
    "model_name": "iPhone Duo",
    "brand": "Apple",
    "aliases": [
      "iPhoneDuo",
      "iPhone Duo",
      "아이폰 듀오"
    ],
    "previous": "직접 전작이 없는 첫 폴더블 iPhone",
    "summary": "7.6형 폴딩 · 출시 예정",
    "prices": [
      {
        "storage": "256GB",
        "krw": 3290000
      },
      {
        "storage": "512GB",
        "krw": 3590000
      },
      {
        "storage": "1TB",
        "krw": 4190000
      },
      {
        "storage": "2TB",
        "krw": 5090000
      }
    ],
    "price_source": "duoPrices",
    "official_url": "https://www.apple.com/kr/iphone-duo/specs/",
    "specs": {
      "processor": {
        "official": "A20 Pro / 2nm / 6코어 CPU·7코어 GPU·듀얼 16코어 Neural Engine. 베이퍼 챔버.",
        "vs_previous": "직접 전작은 없습니다. Apple은 A19 Pro 대비 CPU 최대 20%·GPU 최대 40% 향상을 발표했습니다.",
        "sales_pitch": "A20 Pro 칩을 쓰는 출시 예정 모델이에요. 아직은 제조사가 발표한 사양으로 안내드려요.",
        "sales_pitch_detail": "접는 아이폰을 기다리고 계시면 A20 Pro 칩이 들어간 모델로 발표돼 있어요. 아직 출시 전이라 실제 사용 성능을 확정해서 말씀드리기는 어려워요. 지금은 제조사 발표 사양을 기준으로 보시면 돼요.",
        "caution": "2026-10-23 출시 예정. 성능 수치는 제조사 비교 조건 기준입니다.",
        "sources": [
          "iphone-duo",
          "duoLaunch"
        ]
      },
      "display": {
        "official": "내부 19.3cm(약 7.6형) OLED·1878×2670. 외부 13.6cm(약 5.4형) OLED·1398×2034. 최대 120Hz·야외 부분 최대 3000nits.",
        "vs_previous": "첫 폴더블 폼팩터. 내부 Nano-texture 마감·와이드 앵글 OLED. Apple Pencil(USB-C) 지원.",
        "sales_pitch": "발표된 화면 크기는 안쪽 약 7.6인치, 바깥쪽 약 5.4인치예요. 아직 출시 전이에요.",
        "sales_pitch_detail": "접었을 때는 약 5.4인치, 펼치면 안쪽 약 7.6인치 화면을 쓰는 구성으로 발표됐어요. 큰 화면을 펼쳐 쓰는 방식에 관심 있으시면 살펴보실 만해요. 아직 출시 전이라 실제 사용감은 별도로 확인해야 해요.",
        "caution": "실제 표시 영역은 더 작습니다. Apple Pencil은 별매이며 지원 조건을 확인하세요.",
        "sources": [
          "iphone-duo"
        ]
      },
      "weight": {
        "official": "254g / 펼침 117.8×164.6×5.2mm / 접힘 117.8×84.1×11.3mm. 티타늄 폴더블 디자인.",
        "vs_previous": "직접 전작이 없어 경량화 향상 수치를 표시하지 않습니다.",
        "sales_pitch": "발표된 본체 무게는 254g이에요. 접은 두께는 11.3mm, 펼친 두께는 5.2mm예요.",
        "sales_pitch_detail": "휴대하실 때의 크기가 궁금하시면 발표된 무게와 두께를 봐주세요. 본체는 254g이고, 접으면 11.3mm, 펼치면 5.2mm예요. 아직 출시 전이라 실제 손에 느껴지는 무게는 단정하기 어려워요.",
        "caution": "출시 전 제품입니다. 실사용·휴대성·내구성 평가를 공식 치수만으로 확정하지 않습니다.",
        "sources": [
          "iphone-duo"
        ]
      },
      "camera": {
        "official": "광각 48MP F1.6 센서 시프트 OIS / 초광각 48MP F2.2. 광학 퀄리티 2배·디지털 최대 10배. 내부·외부 전면 18MP.",
        "vs_previous": "첫 폴더블 모델의 듀얼 Fusion 구성입니다. 전용 망원 렌즈는 공식 사양에 없습니다.",
        "sales_pitch": "발표된 메인과 초광각 카메라는 각각 48MP예요. 별도 망원 렌즈는 없어요.",
        "sales_pitch_detail": "발표 사양에는 48MP 메인과 48MP 초광각 카메라가 있어요. 2배는 광학 퀄리티 줌이고 별도 망원 렌즈는 없어요. 출시 전 제품이라 실제 촬영 결과를 미리 보장해 드릴 수는 없어요.",
        "caution": "광학 퀄리티 2배를 별도 망원 렌즈로 설명하지 않습니다.",
        "sources": [
          "iphone-duo"
        ]
      },
      "special_feature": {
        "official": "측면 Touch ID·Apple Pay·듀얼 eSIM 전용. IP68(6m·30분 시험). USB 3 최대 10Gb/s·MagSafe/Qi2 최대 25W.",
        "vs_previous": "직접 전작 없음. Face ID 대신 측면 지문 센서를 쓰며 실물 SIM은 지원하지 않습니다.",
        "sales_pitch": "측면 지문 인식인 Touch ID를 쓰는 모델로 발표됐어요. 실물 유심 없이 eSIM으로 개통해요.",
        "sales_pitch_detail": "얼굴 인식 대신 옆면의 Touch ID로 지문 인증을 하는 구성으로 발표됐어요. 실물 유심은 지원하지 않아 eSIM 개통이 필요해요. 아직 출시 전이니 개통 시 통신사와 요금제의 지원 여부도 확인해 주세요.",
        "caution": "10월 16일 사전 주문·10월 23일 출시 예정입니다. 지원 통신사·요금제가 필요하며 방수 성능은 영구적이지 않습니다.",
        "sources": [
          "iphone-duo",
          "duoLaunch"
        ]
      }
    }
  },
  {
    "id": "iphone-17e",
    "model_name": "iPhone 17e",
    "brand": "Apple",
    "aliases": [
      "iPhone17e",
      "iPhone 17e",
      "아이폰 17e"
    ],
    "previous": "iPhone 16e",
    "summary": "A19 · MagSafe · 256GB부터",
    "prices": [
      {
        "storage": "256GB",
        "krw": 990000
      },
      {
        "storage": "512GB",
        "krw": null
      }
    ],
    "price_source": "eLaunch",
    "official_url": "https://www.apple.com/kr/iphone-17e/specs/",
    "specs": {
      "processor": {
        "official": "A19 / 3nm / 6코어 CPU·4코어 GPU·16코어 Neural Engine. Apple C1X 모뎀.",
        "vs_previous": "A19·C1X 적용. Apple 발표상 C1X는 16e의 C1 대비 최대 2배 빠른 모뎀입니다. CPU 향상률과는 다릅니다.",
        "sales_pitch": "A19 칩과 C1X 모뎀이 들어 있어요. 앱 속도와 통신 속도는 서로 다른 부분이에요.",
        "sales_pitch_detail": "앱을 처리하는 A19 칩과 통신을 담당하는 C1X 모뎀이 들어 있어요. 앱이 얼마나 빠른지와 인터넷 속도는 따로 봐야 해요. 실제 속도는 쓰시는 앱과 통신 환경에 따라 달라요.",
        "caution": "모뎀 속도 향상과 앱 처리 속도를 혼동하지 않습니다. 네트워크 속도는 통신 환경에 따라 다릅니다.",
        "sources": [
          "iphone-17e",
          "eLaunch"
        ]
      },
      "display": {
        "official": "15.4cm(약 6.1형), Super Retina XDR OLED / 2532×1170 / 일반 800·HDR 부분 최대 1200nits. 공식 페이지에 최대 주사율 수치 미기재.",
        "vs_previous": "Ceramic Shield 2 전면 적용. 주사율·밝기 향상 수치는 이번 공식 조사에서 확인하지 못했습니다.",
        "sales_pitch": "화면은 약 6.1인치예요. 비교적 아담한 화면을 찾으시면 살펴보시면 좋아요.",
        "sales_pitch_detail": "화면이 너무 큰 건 부담스러우시면 약 6.1인치 크기를 봐주세요. 글자 크기는 따로 조절할 수 있어요. 최대 주사율 수치는 확인한 공식 페이지에 기재되지 않아 단정해서 안내드리기는 어려워요.",
        "caution": "실제 성능은 설정·앱·사용 환경에 따라 다릅니다. 제조사 시험값과 적용 조건을 확인하세요.",
        "sources": [
          "iphone-17e"
        ]
      },
      "weight": {
        "official": "170g / 146.7×71.5×7.80mm. 알루미늄·Ceramic Shield 2 전면·글래스 후면.",
        "vs_previous": "공식 비교 근거가 부족해 무게 감소 수치를 표시하지 않습니다.",
        "sales_pitch": "본체 무게는 170g이고 두께는 7.8mm예요. 케이스를 끼우면 무게가 더해져요.",
        "sales_pitch_detail": "휴대폰 무게도 중요하게 보시면 본체 170g을 기준으로 살펴보시면 돼요. 두께는 7.8mm예요. 케이스를 쓰시면 무게와 두께가 더해져요.",
        "caution": "실제 성능은 설정·앱·사용 환경에 따라 다릅니다. 제조사 시험값과 적용 조건을 확인하세요.",
        "sources": [
          "iphone-17e"
        ]
      },
      "camera": {
        "official": "광각 48MP F1.6 OIS / 센서 기반 12MP 2배 / 디지털 최대 10배. 전면 12MP TrueDepth.",
        "vs_previous": "한 차원 높은 인물 사진과 자동 심도 정보 저장을 공식 발표했습니다.",
        "sales_pitch": "후면 카메라는 48MP 메인 한 개예요. 2배 촬영은 되지만 별도 망원 렌즈가 있는 건 아니에요.",
        "sales_pitch_detail": "후면은 48MP 메인 카메라 한 개로 구성돼 있어요. 2배 촬영은 센서를 이용하는 방식이고 별도 망원 렌즈는 없어요. 초광각이나 망원 렌즈가 꼭 필요하시면 이 부분을 살펴봐 주세요.",
        "caution": "초광각·별도 광학 망원 렌즈가 있는 구성으로 설명하지 않습니다.",
        "sources": [
          "iphone-17e",
          "eLaunch"
        ]
      },
      "special_feature": {
        "official": "Face ID·Apple Pay·IP68(6m·30분). MagSafe/Qi2 최대 15W. nano-SIM + eSIM / 듀얼 eSIM.",
        "vs_previous": "기본 저장 용량 128 → 256GB. 16e Qi 7.5W에서 MagSafe/Qi2 15W 지원으로 확대.",
        "sales_pitch": "저장 용량은 256GB부터이고 MagSafe를 지원해요. 실물 유심과 eSIM도 쓸 수 있어요.",
        "sales_pitch_detail": "사진과 앱을 저장하는 용량은 256GB부터 선택할 수 있어요. MagSafe 충전도 지원하지만 충전기와 어댑터는 별매예요. 실물 유심과 eSIM을 지원하며 eSIM 개통은 통신사 지원 여부를 확인해 주세요.",
        "caution": "충전기·어댑터는 별매입니다. 충전 속도·결제·eSIM은 지원 조건에 따릅니다.",
        "sources": [
          "iphone-17e",
          "eLaunch"
        ]
      }
    }
  },
  {
    "id": "iphone-air",
    "model_name": "iPhone Air",
    "brand": "Apple",
    "aliases": [
      "iPhoneAir",
      "iPhone Air",
      "아이폰 에어"
    ],
    "previous": "직접 전작이 없는 Air 모델",
    "summary": "165g · 5.64mm · eSIM 전용",
    "prices": [
      {
        "storage": "256GB",
        "krw": 1590000
      },
      {
        "storage": "512GB",
        "krw": null
      },
      {
        "storage": "1TB",
        "krw": null
      }
    ],
    "price_source": "airLaunch",
    "official_url": "https://www.apple.com/kr/iphone-air/specs/",
    "specs": {
      "processor": {
        "official": "A19 Pro / 6코어 CPU·5코어 GPU·16코어 Neural Engine. C1X 모뎀·N1 네트워킹 칩. 공정 수치는 이번 공식 조사에서 미확인.",
        "vs_previous": "직접 전작 없음. 17 Pro의 6코어 GPU와 Air의 5코어 GPU를 구분합니다.",
        "sales_pitch": "A19 Pro 칩과 5코어 GPU 구성이에요. 실제 성능은 쓰시는 앱에 따라 달라요.",
        "sales_pitch_detail": "얇은 디자인과 함께 처리 성능도 살펴보시면 A19 Pro 칩이 들어 있어요. GPU는 5코어 구성이에요. 칩 이름만으로 다른 모델과 모든 작업 성능이 같다고 보시면 안 돼요.",
        "caution": "실제 성능은 설정·앱·사용 환경에 따라 다릅니다. 제조사 시험값과 적용 조건을 확인하세요.",
        "sources": [
          "iphone-air"
        ]
      },
      "display": {
        "official": "16.6cm(약 6.5형), Super Retina XDR OLED / 2736×1260 / ProMotion 최대 120Hz. 일반 1000·HDR 1600·야외 부분 최대 3000nits.",
        "vs_previous": "직접 전작 없는 폼팩터. 상시표시형 디스플레이·반사 방지 코팅 지원.",
        "sales_pitch": "화면은 약 6.5인치이고 최대 120Hz를 지원해요. 화면 크기와 본체 무게를 함께 보시면 좋아요.",
        "sales_pitch_detail": "사진이나 영상을 보실 화면은 약 6.5인치예요. 최대 120Hz를 지원하고 본체 무게는 165g이에요. 화면 크기를 원하시면서 무게도 중요하게 보시면 함께 살펴보실 만해요.",
        "caution": "실제 성능은 설정·앱·사용 환경에 따라 다릅니다. 제조사 시험값과 적용 조건을 확인하세요.",
        "sources": [
          "iphone-air"
        ]
      },
      "weight": {
        "official": "165g / 156.2×74.7×5.64mm. 티타늄·전면 Ceramic Shield 2·후면 Ceramic Shield.",
        "vs_previous": "직접 전작 없음. 두께·무게를 임의의 Plus 모델 대비 개선으로 안내하지 않습니다.",
        "sales_pitch": "본체는 165g이고 두께는 5.64mm예요. 얇은 모델을 찾으시면 살펴보실 만해요.",
        "sales_pitch_detail": "얇은 휴대폰을 찾고 계시면 두께 5.64mm를 봐주세요. 본체 무게는 165g이에요. 이 수치는 케이스를 제외한 것이어서 케이스를 끼우시면 무게와 두께가 더해져요.",
        "caution": "무게·두께는 케이스·액세서리를 제외합니다. 손목 건강 효과를 보장하지 않습니다.",
        "sources": [
          "iphone-air"
        ]
      },
      "camera": {
        "official": "광각 48MP F1.6 센서 시프트 OIS / 광학 퀄리티 2배 / 디지털 최대 10배. 전면 18MP Center Stage.",
        "vs_previous": "직접 전작 없음. 단일 후면 카메라 구성이며 별도 초광각·망원 렌즈는 없습니다.",
        "sales_pitch": "후면은 48MP 메인 카메라 한 개예요. 별도 초광각과 망원 렌즈는 없어요.",
        "sales_pitch_detail": "후면 카메라는 48MP 메인 한 개예요. 2배는 광학 퀄리티 줌이고, 별도 초광각이나 망원 렌즈가 있는 구성은 아니에요. 넓은 풍경이나 먼 장면을 자주 찍으시면 이 부분도 봐주세요.",
        "caution": "실제 성능은 설정·앱·사용 환경에 따라 다릅니다. 제조사 시험값과 적용 조건을 확인하세요.",
        "sources": [
          "iphone-air"
        ]
      },
      "special_feature": {
        "official": "Face ID·Apple Pay·IP68(6m·30분). 듀얼 eSIM 전용, 실물 SIM 미지원. USB 2 최대 480Mb/s·MagSafe/Qi2 최대 20W.",
        "vs_previous": "직접 전작 없음. eSIM 전용 구성과 USB 2 전송 규격을 확인하세요.",
        "sales_pitch": "실물 유심 없이 eSIM으로 개통하는 모델이에요. 쓰시는 통신사의 eSIM 지원 여부를 확인해 주세요.",
        "sales_pitch_detail": "지금 쓰시는 실물 유심을 그대로 넣는 방식은 아니고 eSIM으로 개통해야 해요. 통신사와 요금제의 지원 여부를 먼저 확인해 주세요. 파일을 케이블로 옮기실 때는 USB 2, 최대 480Mb/s 규격이에요.",
        "caution": "통신사 eSIM 지원이 필요합니다. MagSafe 배터리 사용 시간은 별매 액세서리를 사용한 시험값입니다.",
        "sources": [
          "iphone-air"
        ]
      }
    }
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

Object.assign(sources, {
  i18Preorder: { label: "iPhone 18 Pro 한국 사전 주문 발표 가격", url: "https://www.apple.com/kr/shop/buy-iphone/iphone-18-pro/15.9cm-디스플레이-512gb-블랙" },
  feSpecs: { label: "S26 FE 국내 공식 상세 사양", url: "https://www.samsung.com/sec/cxhr/goods/getGoodsSpecList?goodsId=G002993512&goodsTpCd=10" },
  feOverview: { label: "S26 FE 국내 기능·소재·시험 조건", url: "https://www.samsung.com/sec/smartphones/galaxy-s26-fe/" },
  feProduct: { label: "S26 FE 국내 제품·전작 성능 비교", url: "https://www.samsung.com/sec/smartphones/galaxy-s26/buy/?modelCode=SM-S741NZKWKOO" },
  duoPrices: { label: "Duo 한국 출시 예정 용량별 발표 가격", url: "https://www.apple.com/kr/shop/buy-iphone/iphone-duo" },
  "galaxy-z-fold8-ultra": {
    "label": "갤럭시 Z 폴드8 울트라 공식 사양",
    "url": "https://www.samsung.com/sec/smartphones/galaxy-z-fold8-ultra/specs/"
  },
  "galaxy-z-fold8": {
    "label": "갤럭시 Z 폴드8 공식 사양",
    "url": "https://www.samsung.com/sec/smartphones/galaxy-z-fold8/specs/"
  },
  "galaxy-z-flip8": {
    "label": "갤럭시 Z 플립8 공식 사양",
    "url": "https://www.samsung.com/sec/smartphones/galaxy-z-flip8/specs/"
  },
  "galaxy-a37": {
    "label": "갤럭시 A37 5G 공식 사양",
    "url": "https://www.samsung.com/sec/support/model/SM-A376NZAAKOO/"
  },
  "iphone-18-pro": {
    "label": "iPhone 18 Pro 공식 사양",
    "url": "https://www.apple.com/kr/iphone-18-pro/specs/"
  },
  "iphone-18-pro-max": {
    "label": "iPhone 18 Pro Max 공식 사양",
    "url": "https://www.apple.com/kr/iphone-18-pro/specs/"
  },
  "iphone-duo": {
    "label": "iPhone Duo 공식 사양",
    "url": "https://www.apple.com/kr/iphone-duo/specs/"
  },
  "iphone-17e": {
    "label": "iPhone 17e 공식 사양",
    "url": "https://www.apple.com/kr/iphone-17e/specs/"
  },
  "iphone-air": {
    "label": "iPhone Air 공식 사양",
    "url": "https://www.apple.com/kr/iphone-air/specs/"
  },
  "galaxy-s26-fe": {
    "label": "갤럭시 S26 FE 공식 사양",
    "url": "https://news.samsung.com/kr/삼성전자-갤럭시-프리미엄-기능을-담은-갤럭시-s26-fe-공"
  },
  "z8Launch": {
    "label": "삼성 Z8 국내 출시가",
    "url": "https://news.samsung.com/kr/삼성전자-갤럭시-z-폴드8-울트라·폴드8·플립8-갤럭시"
  },
  "z8Overview": {
    "label": "삼성 Z8 기능·국내 사양",
    "url": "https://news.samsung.com/kr/삼성전자-갤럭시-z-폴드8-울트라·폴드8·플립8-등-폴더"
  },
  "feLaunch": {
    "label": "S26 FE 국내 출시가",
    "url": "https://news.samsung.com/kr/삼성전자-갤럭시-s26-fe-국내-출시"
  },
  "a37Launch": {
    "label": "A37 국내 출시·변화",
    "url": "https://news.samsung.com/kr/삼성전자-갤럭시-a37-5g-국내-출시"
  },
  "i18Launch": {
    "label": "iPhone 18 Pro 한국 출시",
    "url": "https://www.apple.com/kr/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/"
  },
  "duoLaunch": {
    "label": "Duo 발표·출시 일정",
    "url": "https://www.apple.com/kr/newsroom/2026/09/apple-unveils-iphone-duo/"
  },
  "eLaunch": {
    "label": "17e 한국 출시·전작 변화",
    "url": "https://www.apple.com/kr/newsroom/2026/03/apple-introduces-iphone-17e/"
  },
  "airLaunch": {
    "label": "Air 한국 출시",
    "url": "https://www.apple.com/kr/newsroom/2025/09/introducing-iphone-air-a-powerful-new-iphone-with-a-breakthrough-design/"
  },
  "fold7": {
    "label": "Z 폴드7 공식 사양",
    "url": "https://www.samsung.com/sec/smartphones/galaxy-z-fold7/specs/"
  },
  "flip7": {
    "label": "Z 플립7 공식 사양",
    "url": "https://www.samsung.com/sec/smartphones/galaxy-z-flip7/specs/"
  },
  "a37Product": {
    "label": "A37 한국 제품·소재",
    "url": "https://www.samsung.com/sec/smartphones/galaxy-a37-5g-a376/SM-A376NLVAKOO/"
  }
});

type OfficialCatalog = { source: string; checkedAt: string; scope: string; sections: { title: string; items: string[] }[]; conditions: string[] };
const fullSpecCatalog: Record<string, OfficialCatalog> = {
  "iphone-17-pro": {
    "source": "i17pro",
    "checkedAt": "2026-09-30",
    "scope": "한국 Apple 지원 모델별 기술 사양 문서의 분류·기술 항목. 홍보 문장은 사실 중심으로 정리하고 조건은 아래에 함께 표시합니다.",
    "sections": [
      {
        "title": "마감",
        "items": [
          "실버",
          "코스믹 오렌지",
          "딥 블루",
          "알루미늄 Unibody 디자인, Ceramic Shield 2 소재 전면, Ceramic Shield 소재 후면"
        ]
      },
      {
        "title": "저장 용량 [주 1]",
        "items": [
          "256GB",
          "512GB",
          "1TB"
        ]
      },
      {
        "title": "크기 및 무게 [주 2]",
        "items": [
          "가로: 71.9mm",
          "세로: 150.0mm",
          "두께: 8.75mm",
          "무게: 204g"
        ]
      },
      {
        "title": "디스플레이",
        "items": [
          "Super Retina XDR 디스플레이",
          "15.9cm(대각선) 전면 화면 OLED 디스플레이",
          "2622 x 1206 픽셀 해상도(460ppi)",
          "Dynamic Island",
          "상시표시형 디스플레이",
          "최대 120Hz 가변 재생률을 제공하는 ProMotion 기술",
          "HDR 디스플레이",
          "True Tone",
          "넓은 색영역(P3)",
          "햅틱 터치",
          "2,000,000:1 명암비(일반)",
          "1000 니트 전체 최대 밝기(일반); 1600 니트 부분 최대 밝기(HDR); 3000 니트 부분 최대 밝기(야외); 1 니트 최소 밝기",
          "지문 및 유분 방지 코팅",
          "반사 방지 코팅",
          "여러 언어 및 문자 동시 표시 지원",
          "직사각형 기준 대각선 15.93cm; 곡면·모서리로 실제 표시 영역은 더 작음."
        ]
      },
      {
        "title": "방수 및 방진 [주 3]",
        "items": [
          "IEC 규격 60529하의 IP68 등급 획득(최대 수심 6m, 최대 30분)"
        ]
      },
      {
        "title": "Apple Intelligence",
        "items": [
          "Apple Intelligence 지원. 언어·지역·시스템 요건에 따른 제한 [주 4]"
        ]
      },
      {
        "title": "칩",
        "items": [
          "A19 Pro 칩",
          "6코어 CPU(성능 코어 2개 및 효율 코어 4개)",
          "6코어 GPU(Neural Accelerators 탑재)",
          "16코어 Neural Engine",
          "하드웨어 가속형 레이 트레이싱"
        ]
      },
      {
        "title": "카메라",
        "items": [
          "48MP 프로 Fusion 카메라 시스템",
          "48MP Fusion 메인: 24mm, ƒ/1.78 조리개, 2세대 센서 시프트 광학 이미지 흔들림 보정(OIS), 100% Focus Pixels, 초고해상도 사진 지원(24MP 및 48MP)",
          "12MP 광학 퀄리티 2배 망원도 가능: 48mm, ƒ/1.78 조리개, 2세대 센서 시프트 광학 이미지 흔들림 보정(OIS), 100% Focus Pixels",
          "48MP Fusion 울트라 와이드: 13mm, ƒ/2.2 조리개 및 120° 시야각, 하이브리드 Focus Pixels, 초고해상도 사진(48MP)",
          "48MP Fusion 망원: 100mm(4배), ƒ/2.8 조리개, 하이브리드 Focus Pixels, 3D 센서 시프트 광학 이미지 흔들림 보정(OIS) 및 오토포커스, 테트라프리즘 디자인",
          "12MP 광학 퀄리티 8배 망원도 가능: 200mm, ƒ/2.8 조리개, 하이브리드 Focus Pixels, 3D 센서 시프트 광학 이미지 흔들림 보정(OIS) 및 오토포커스, 테트라프리즘 디자인",
          "8배 광학 퀄리티 줌인, 2배 광학 줌아웃, 16배 광학 퀄리티 줌 범위",
          "최대 40배 디지털 줌",
          "맞춤 설정 가능한 기본 렌즈(Fusion 메인)",
          "사파이어 크리스털 렌즈 커버",
          "적응형 True Tone 플래시",
          "Photonic Engine",
          "Deep Fusion",
          "스마트 HDR 5",
          "초점 및 심도 제어 기능을 지원하는 한 차원 높은 인물 사진",
          "6가지 효과의 인물 사진 조명",
          "야간 모드",
          "파노라마(최대 63MP)",
          "최신 세대 사진 스타일",
          "공간 사진",
          "48MP 접사 사진",
          "ProRAW",
          "사진 및 Live Photo 촬영 시 넓은 색영역 포착",
          "렌즈 보정(Fusion 울트라 와이드)",
          "첨단 적목 보정",
          "자동 흔들림 보정",
          "고속 연사 모드",
          "사진 위치 표시 기능",
          "촬영 이미지 포맷: HEIF, JPEG, DNG"
        ]
      },
      {
        "title": "동영상 촬영",
        "items": [
          "4K Dolby Vision 동영상 촬영(초당 24, 25, 30, 60, 100 또는 120 프레임, 100 또는 120 프레임은 Fusion 메인 전용)",
          "1080p Dolby Vision 동영상 촬영(초당 25, 30, 60 또는 120 프레임, 120 프레임은 Fusion 메인 전용)",
          "720p Dolby Vision 동영상 촬영(초당 30 프레임)",
          "시네마틱 모드(최대 4K Dolby Vision, 초당 30 프레임)",
          "액션 모드(최대 2.8K Dolby Vision, 초당 60 프레임)",
          "1080p 공간 비디오 촬영(초당 30 프레임)",
          "외부 저장 매체 활용 시 최대 4K ProRes 동영상 촬영(초당 120 프레임)",
          "ProRes RAW [주 5]",
          "ACES(Academy Color Encoding System)",
          "Apple Log 2",
          "Genlock 지원 [주 6]",
          "접사 동영상 촬영(슬로 모션 및 타임랩스 포함)",
          "1080p 슬로 모션 동영상 지원(초당 최대 240 프레임) 및 4K Dolby Vision 슬로 모션 동영상 지원(초당 최대 120 프레임, Fusion 메인)",
          "듀얼 캡처(최대 4K Dolby Vision, 초당 30 프레임)",
          "타임랩스 동영상(동영상 흔들림 보정 포함)",
          "야간 모드 타임랩스",
          "QuickTake 동영상(최대 4K Dolby Vision, 초당 60 프레임)",
          "동영상을 위한 2세대 센서 시프트 광학 이미지 흔들림 보정(OIS)(Fusion 메인)",
          "동영상을 위한 3D 센서 시프트 광학 이미지 흔들림 보정(OIS) 및 오토포커스(Fusion 망원)",
          "최대 15배 디지털 줌",
          "오디오 줌",
          "True Tone 플래시",
          "시네마틱 동영상 흔들림 보정(4K, 1080p 및 720p)",
          "연속 오토포커스 동영상",
          "4K 동영상 촬영 중 8MP 사진 촬영",
          "재생 중 줌",
          "녹화 동영상 포맷: HEVC, H.264, ProRes, ProRes RAW",
          "공간 음향 및 스테레오 녹음",
          "4개의 스튜디오급 마이크",
          "바람 소리 감소",
          "오디오 믹스"
        ]
      },
      {
        "title": "전면 카메라",
        "items": [
          "18MP Center Stage 카메라",
          "ƒ/1.9 조리개",
          "Focus Pixels 방식 오토포커스",
          "Retina Flash",
          "탭하여 줌 및 회전",
          "사진을 위한 센터 스테이지",
          "초강력 흔들림 보정 동영상",
          "듀얼 캡처",
          "영상 통화를 위한 센터 스테이지",
          "Photonic Engine",
          "Deep Fusion",
          "스마트 HDR 5",
          "초점 및 심도 제어 기능을 지원하는 한 차원 높은 인물 사진",
          "6가지 효과의 인물 사진 조명",
          "애니모티콘과 미모티콘",
          "야간 모드",
          "최신 세대 사진 스타일",
          "ProRAW",
          "사진 및 Live Photo 촬영 시 넓은 색영역 포착",
          "렌즈 보정",
          "자동 흔들림 보정",
          "고속 연사 모드",
          "4K Dolby Vision 동영상 촬영(초당 24, 25, 30 또는 60 프레임)",
          "1080p Dolby Vision 동영상 촬영(초당 25, 30 또는 60 프레임)",
          "시네마틱 모드(최대 4K Dolby Vision, 초당 30 프레임)",
          "외부 저장 매체 활용 시 최대 4K ProRes 동영상 촬영(초당 60 프레임)",
          "ProRes RAW [주 5]",
          "ACES(Academy Color Encoding System)",
          "Apple Log 2",
          "1080p 슬로 모션 동영상 지원(초당 120 프레임)",
          "타임랩스 동영상(동영상 흔들림 보정 포함)",
          "야간 모드 타임랩스",
          "QuickTake 동영상(최대 4K Dolby Vision, 초당 60 프레임)",
          "시네마틱 동영상 흔들림 보정(4K, 1080p 및 720p)",
          "공간 음향 및 스테레오 녹음",
          "바람 소리 감소",
          "오디오 믹스"
        ]
      },
      {
        "title": "전원 및 배터리 [주 7]",
        "items": [
          "동영상 재생: 최대 31시간",
          "동영상 재생(스트리밍): 최대 28시간",
          "충전식 리튬 이온 배터리 내장",
          "급속 충전 가능:",
          "USB‑C 충전 케이블과 함께 40W 이상 규격의 어댑터 사용 시 20분에 최대 50% 충전(어댑터 별매) [주 8]",
          "MagSafe 충전기와 함께 30W 이상 규격의 어댑터 사용 시 30분에 최대 50% 충전(충전기 및 어댑터 별매) [주 8]"
        ]
      },
      {
        "title": "Face ID",
        "items": [
          "Center Stage 전면 카메라의 TrueDepth 기술을 통해 지원"
        ]
      },
      {
        "title": "안심 기능",
        "items": [
          "긴급 구조 요청 [주 9]",
          "충돌 감지 [주 10]"
        ]
      },
      {
        "title": "셀룰러 및 무선 기술",
        "items": [
          "모델 A3523 및 A3526*",
          "FDD-5G NR(대역 n1, n2, n3, n5, n7, n8, n12, n20, n25, n26, n28, n30, n66, n70, n75)",
          "TDD-5G NR(대역 n38, n40, n41, n48, n53, n77, n78, n79)",
          "FDD-LTE(대역 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 66)",
          "TDD-LTE(대역 34, 38, 39, 40, 41, 42, 48, 53)",
          "UMTS/HSPA+/DC-HSDPA(850, 900, 1700/2100, 1900, 2100MHz)",
          "GSM/EDGE(850, 900, 1800, 1900MHz)",
          "4x4 MIMO 방식을 지원하는 5G(sub-6 GHz) [주 11]",
          "4x4 MIMO 방식을 지원하는 Gigabit LTE [주 11]",
          "Apple N1 무선 네트워킹 칩",
          "2x2 MIMO 방식을 지원하는 Wi‑Fi 7(802.11be) [주 12]",
          "Bluetooth 6",
          "Thread 네트워킹 기술",
          "Apple 2세대 초광대역 칩 [주 13]",
          "리더 모드를 지원하는 NFC",
          "예비 전력으로 작동하는 익스프레스 카드 기능"
        ]
      },
      {
        "title": "위치",
        "items": [
          "정밀 이중 주파수 GPS(GPS, GLONASS, Galileo, QZSS, BeiDou, NavIC)",
          "디지털 나침반",
          "Wi-Fi",
          "셀룰러",
          "iBeacon 위치 정밀 감지 기능"
        ]
      },
      {
        "title": "외부 버튼 및 커넥터",
        "items": [
          "음량 올리기/내리기",
          "동작 버튼",
          "카메라 컨트롤",
          "측면 버튼",
          "USB‑C 커넥터",
          "내장 마이크",
          "내장 스테레오 스피커",
          "동작 버튼 기능",
          "무음 모드, 집중 모드, 카메라, 비주얼 인텔리전스, [주 14] 손전등, 음성 메모, 음악 인식, 번역, 확대기, 제어 항목, 단축어, 손쉬운 사용",
          "카메라 컨트롤",
          "노출, 심도, 확대/축소, 카메라, 스타일, 색조"
        ]
      },
      {
        "title": "충전 및 확장",
        "items": [
          "다음을 지원하는 USB‑C 커넥터:",
          "충전",
          "DisplayPort",
          "USB 3(최대 10Gb/s) [주 15]"
        ]
      },
      {
        "title": "MagSafe 및 무선 충전",
        "items": [
          "최대 25W MagSafe 무선 충전 [주 8]",
          "최대 25W Qi2 무선 충전 [주 8]",
          "자석 어레이",
          "정렬 자석",
          "액세서리 식별용 NFC",
          "자력계"
        ]
      },
      {
        "title": "센서",
        "items": [
          "Face ID",
          "LiDAR 스캐너",
          "기압계",
          "하이 다이내믹 레인지 자이로",
          "고중력 가속도계",
          "근접 센서",
          "듀얼 주변광 센서"
        ]
      },
      {
        "title": "SIM 카드",
        "items": [
          "듀얼 SIM(nano-SIM 및 eSIM) [주 16]",
          "듀얼 eSIM 지원 [주 16]"
        ]
      },
      {
        "title": "Apple Pay",
        "items": [
          "매장, 앱, 웹사이트에서 Face ID를 이용해 iPhone으로 결제",
          "Mac에서 Apple Pay 사용 시 iPhone으로 결제 완료",
          "익스프레스 교통카드로 대중교통 요금 결제 [주 17]"
        ]
      },
      {
        "title": "영상 통화 [주 18]",
        "items": [
          "셀룰러 또는 Wi‑Fi 네트워크에서 FaceTime 영상 통화",
          "5G 또는 Wi‑Fi 네트워크에서 FaceTime HD(1080p) 영상 통화",
          "영상 통화를 위한 센터 스테이지",
          "SharePlay",
          "화면 공유",
          "FaceTime 영상 통화 시 인물 사진 모드 지원",
          "공간 음향",
          "음성 분리 및 와이드 스펙트럼 마이크 모드",
          "후면 카메라를 이용한 광학 줌"
        ]
      },
      {
        "title": "음성 통화 [주 18]",
        "items": [
          "FaceTime 음성 통화",
          "LTE 음성 통화(VoLTE) [주 11]",
          "SharePlay",
          "화면 공유",
          "공간 음향",
          "음성 분리 및 와이드 스펙트럼 마이크 모드"
        ]
      },
      {
        "title": "오디오 재생",
        "items": [
          "지원되는 포맷: AAC, APAC, MP3, Apple Lossless, FLAC, Dolby Digital, Dolby Digital Plus, Dolby Atmos",
          "공간 음향 재생",
          "최대 음량 제한 설정 가능"
        ]
      },
      {
        "title": "동영상 재생",
        "items": [
          "지원되는 포맷: HEVC, H.264, AV1, ProRes",
          "Dolby Vision, HDR10+/HDR10, HLG를 지원하는 HDR",
          "최대 4K HDR AirPlay 미러링, 사진, 동영상을 Apple TV(2세대 이후 모델) 또는 AirPlay 지원 스마트 TV로 출력",
          "동영상 미러링 및 동영상 출력 지원: USB-C 또는 USB-C Digital AV 어댑터 사용 시 기본 DisplayPort 출력을 통해 최대 4K HDR(모델 A2119, 어댑터 별매) [주 19]"
        ]
      },
      {
        "title": "Siri [주 20]",
        "items": [
          "메시지 전송, 미리 알림 설정 등 다양한 일상 작업들을 손쉽게 처리 가능",
          "“Siri야”라고 불러 음성만으로 핸즈프리 활성화, 또는 타이핑으로 Siri 사용",
          "그 어떤 지능형 개인 비서보다 강력한 개인정보 보호 기능",
          "Apple Intelligence로 구동되기 때문에 더욱 자연스럽게 작동하고 유용한 도움 제공 [주 4]"
        ]
      },
      {
        "title": "운영체제",
        "items": [
          "iOS"
        ]
      },
      {
        "title": "개인정보 보호",
        "items": [
          "Face ID 안면 인증; 타사 앱·웹사이트 추적 시 사용자 승인; iMessage 및 FaceTime 영상 통화 종단간 암호화."
        ]
      },
      {
        "title": "손쉬운 사용",
        "items": [
          "VoiceOver",
          "확대/축소",
          "확대기",
          "음성 명령",
          "스위치 제어",
          "AssistiveTouch",
          "눈 추적",
          "청각 장애인용 자막",
          "실시간 자막",
          "개인 음성",
          "실시간 말하기",
          "타이핑으로 Siri 사용",
          "음성 단축어",
          "콘텐츠 말하기"
        ]
      },
      {
        "title": "내장 앱",
        "items": [
          "App Store",
          "도서",
          "계산기",
          "캘린더",
          "카메라",
          "시계",
          "나침반",
          "연락처",
          "FaceTime",
          "파일",
          "나의 찾기",
          "피트니스",
          "Freeform",
          "Games",
          "GarageBand",
          "건강",
          "홈",
          "iMovie",
          "iTunes Store",
          "일기",
          "Keynote",
          "확대기",
          "Mail",
          "지도",
          "측정",
          "메시지",
          "음악",
          "메모",
          "Numbers",
          "Pages",
          "암호",
          "전화",
          "사진",
          "팟캐스트",
          "미리보기",
          "미리 알림",
          "Safari",
          "설정",
          "단축어",
          "주식",
          "팁",
          "번역",
          "TV",
          "음성 메모",
          "지갑",
          "Watch",
          "날씨"
        ]
      },
      {
        "title": "보청기 호환 등급",
        "items": [
          "미국 HAC(보청기 호환성) 등급 보유"
        ]
      },
      {
        "title": "시스템 요구 사양",
        "items": [
          "Apple 계정(일부 기능에서 필요)",
          "인터넷 연결 [주 21]",
          "Mac 또는 PC에서 동기화 시 요구 사양:",
          "macOS Catalina 10.15 이후 버전: Finder 사용",
          "macOS High Sierra 10.13부터 macOS Mojave 10.14.6까지: iTunes 12.8 이후 버전 사용",
          "Windows 10 이후 버전: iTunes 12.12.10 이후 버전 사용(apple.com/kr/itunes/download에서 무료 다운로드)"
        ]
      },
      {
        "title": "사용 환경",
        "items": [
          "작동 온도: 0°C~35°C",
          "보관 가능(비작동) 온도: −20°C~45°C",
          "상대 습도: 5%~95% 미응결",
          "작동 고도: 3,000m까지 테스트"
        ]
      },
      {
        "title": "언어",
        "items": [
          "언어 지원",
          "한국어, 영어(오스트레일리아, 영국, 미국), 중국어(간체, 번체, 홍콩 번체), 프랑스어(캐나다, 프랑스), 독일어, 이탈리아어, 일본어, 스페인어(라틴 아메리카, 스페인), 아랍어, 불가리아어, 카탈로니아어, 크로아티아어, 체코어, 덴마크어, 네덜란드어, 핀란드어, 그리스어, 히브리어, 힌디어, 헝가리어, 인도네시아어, 카자흐어, 말레이어, 노르웨이어, 폴란드어, 포르투갈어(브라질, 포르투갈), 루마니아어, 러시아어, 슬로바키아어, 스웨덴어, 태국어, 튀르키예어, 우크라이나어, 베트남어"
        ]
      },
      {
        "title": "제품 구성",
        "items": [
          "iPhone 17 Pro",
          "USB-C 충전 케이블(1m)",
          "설명서",
          "전원 어댑터·EarPods 별매. 포함 USB-C 케이블은 호환 어댑터·컴퓨터 포트에서 사용."
        ]
      },
      {
        "title": "상품정보표시",
        "items": [
          "제품명: 스마트폰",
          "모델명: A3523, A3526",
          "수입자: 애플코리아 유한회사",
          "인증정보: R-C-APA-A3523, R-C-APA-A3526",
          "제조자: Apple Inc.",
          "동일모델의 출시년월: 2025년 9월",
          "제조국: 중국",
          "품질보증기준: https://www.apple.com/kr/legal/warranty/",
          "서비스 연락처: 080​-333​-4000"
        ]
      },
      {
        "title": "iPhone 그리고 환경",
        "items": [
          "Apple 2030 계획을 향한 경과",
          "소재",
          "기기 재활용 소재 30%. [주 23]",
          "외장에 50% 재활용 알루미늄 사용",
          "배터리에 100% 재활용 코발트 및 95% 재활용 리튬 사용",
          "Apple이 설계한 모든 인쇄 회로 기판의 도금과 솔더에 각각 100% 재활용 금과 주석 사용",
          "모든 카메라의 와이어 및 모든 커넥터의 도금에 100% 재활용 금 사용",
          "Taptic Engine에 100% 재활용 텅스텐 및 구리 와이어 사용",
          "베이퍼 챔버 외장에 100% 재활용 구리 사용",
          "100% 희토류 원소로 만든 재활용 자석만 사용",
          "에너지",
          "iPhone 17 Pro 및 iPhone 17 Pro Max 생산에 사용되는 전력의 40%를 재생 가능 전력으로 조달 [주 24]",
          "배터리 충전기 시스템에 관한 미 에너지부 요건 초과 충족 [주 25]",
          "포장",
          "섬유 기반 소재가 100% 쓰인 포장재 [주 26]",
          "운송 1회당 25% 더 많은 기기 수를 실을 수 있도록 iPhone 16 Pro 상자보다 더욱 효율적으로 제작된 iPhone 17 Pro 및 iPhone 17 Pro Max 포장 [주 27]",
          "폐기물",
          "Apple의 ‘제로 폐기물 프로그램’에 따라 기존의 모든 최종 조립 시설에서 매립 폐기물 근절 [주 28]",
          "더 스마트한 화학물질 사용 [주 29]",
          "Apple 2030: 소재·전력·운송 배출 저감 목표. 규제 물질 명세 적용 [주 29]."
        ]
      }
    ],
    "conditions": [
      "모델 번호 및 통신사 네트워크 구성에 따라 셀룰러 지원이 달라집니다.",
      "1. 실제 여유 공간은 표시 용량보다 작습니다. iOS 26·기본 앱은 약 12~24GB, Apple Intelligence 모델은 약 7GB, 삭제 가능한 앱은 약 4.5GB를 사용합니다. 설정·버전·기종에 따라 달라지며 AI를 다시 켜면 모델을 다시 내려받습니다.",
      "2. 제조 및 구성 차이로 크기·무게에 편차가 생길 수 있습니다.",
      "3. IP68은 통제된 실험실 시험(6m·30분) 기준입니다. 마모에 따라 보호 성능이 약해지며 젖은 상태로 충전하지 마세요. 액체 손상은 보증에서 제외됩니다.",
      "4. Apple Intelligence는 사양 문서 기준 베타이며 일부 기능은 한국어를 지원하지 않습니다. 지원 언어·기능·시스템 요건은 Apple 지원 121115를 확인하세요.",
      "5. ProRes RAW 사용에는 호환 앱이 필요합니다.",
      "6. Genlock은 호환되는 타사 하드웨어·소프트웨어가 필요합니다.",
      "7. 배터리 시간과 수명은 네트워크·설정·사용 방식에 따라 다르며 충전 사이클에 따른 교체가 필요할 수 있습니다.",
      "8. MagSafe 최대 25W에는 30W 이상 어댑터가 필요합니다. 2025년 7월 Apple 시제품 시험: USB-C와 A3351 어댑터, 또는 A3502/A3503 MagSafe와 A2164/A3351 어댑터 사용. 완전 방전 상태에서 시작하고 화면에 Apple 로고가 뜰 때부터 시간을 측정했습니다. 충전 속도는 환경·설정·어댑터에 따라 다릅니다.",
      "9. 긴급 구조 요청은 셀룰러 연결이 필요합니다.",
      "10. 심각한 자동차 충돌을 감지해 구조 요청을 지원하며 셀룰러 연결이 필요합니다.",
      "11. 5G·Gigabit LTE·VoLTE는 지원 국가·통신사와 데이터 요금제가 필요합니다. 속도는 이론값으로 환경별 차이가 있습니다.",
      "12. Wi-Fi 7은 지원 국가·지역에서 사용할 수 있습니다.",
      "13. 초광대역 기능은 국가에 따라 제한됩니다.",
      "14. 비주얼 인텔리전스는 Apple Intelligence 활성화가 필요하고 언어·지역 제한이 있습니다.",
      "15. 최대 10Gb/s 전송에는 해당 속도를 지원하는 USB 3 케이블이 필요합니다.",
      "16. eSIM은 지원 통신사와 무선 요금제가 필요합니다.",
      "17. 교통카드는 지원 도시·교통 시스템·기기·OS에서 사용할 수 있습니다.",
      "18. FaceTime은 양쪽의 호환 기기 및 네트워크가 필요합니다. 셀룰러 이용 가능 여부는 통신사별로 다르며 데이터 요금이 발생할 수 있습니다.",
      "19. 해당 영상 출력 조건은 SDR 콘텐츠에 적용됩니다.",
      "20. Siri는 국가·언어별 기능 차이가 있고 인터넷 연결 및 셀룰러 이용 시 데이터 요금이 필요할 수 있습니다.",
      "21. 광대역 무선 연결을 권장하며 연결 비용이 발생할 수 있습니다.",
      "22. 환경 정보는 출시 시점 기준입니다.",
      "23. 재활용 소재 비율은 인증된 재활용 소재 질량/기기 질량으로 계산하며 포장·기본 액세서리를 제외합니다.",
      "24. 제조 전력 관련 추정은 출시 시 협력업체 제조 배분과 전 회계연도의 Apple 탄소 모델 저탄소 에너지에 근거합니다. Apple 협력업체 청정 에너지 프로그램에 따른 조달만 포함됩니다.",
      "25. 에너지 효율은 미국 에너지부 배터리 충전기 기준과 비교했습니다.",
      "26. 포장 수치는 Apple 출고 미국 소매 포장 명세 무게 기준이며 접착제·잉크·코팅을 제외합니다.",
      "27. 운송 효율은 기기 10대가 든 상자의 팰릿 적재 수를 iPhone 16 Pro와 비교했습니다. 한국·안도라·캐나다·키프로스·그리스·이탈리아·포르투갈·스페인·스위스·미국은 팰릿 구성이 달라 절감 비율에 차이가 있습니다.",
      "28. 1년 이상 협력한 기존 최종 조립 시설은 UL 2799 인증 대상입니다. 에너지화를 제외한 폐기물 전환율 기준은 실버 90~94%, 골드 95~99%, 플래티넘 100%입니다.",
      "29. 규제 물질 명세는 제품·액세서리·제조·운송 포장을 대상으로 합니다. 한국 및 일부 국가 AC 코드의 PVC·프탈레이트에는 승인 관련 예외가 있습니다. EU 2011/65/EU와 개정안 및 고온 솔더 등 예외 규정을 따릅니다.",
      "기능은 변경될 수 있으며 국가·언어·하드웨어·소프트웨어에 따른 제한이 있습니다."
    ]
  },
  "iphone-17-pro-max": {
    "source": "i17max",
    "checkedAt": "2026-09-30",
    "scope": "한국 Apple 지원 모델별 기술 사양 문서의 분류·기술 항목. 홍보 문장은 사실 중심으로 정리하고 조건은 아래에 함께 표시합니다.",
    "sections": [
      {
        "title": "마감",
        "items": [
          "실버",
          "코스믹 오렌지",
          "딥 블루",
          "알루미늄 Unibody 디자인, Ceramic Shield 2 소재 전면, Ceramic Shield 소재 후면"
        ]
      },
      {
        "title": "저장 용량 [주 1]",
        "items": [
          "256GB",
          "512GB",
          "1TB",
          "2TB"
        ]
      },
      {
        "title": "크기 및 무게 [주 2]",
        "items": [
          "가로: 78.0mm",
          "세로: 163.4mm",
          "두께: 8.75mm",
          "무게: 231g"
        ]
      },
      {
        "title": "디스플레이",
        "items": [
          "Super Retina XDR 디스플레이",
          "17.4cm(대각선) 전면 화면 OLED 디스플레이",
          "2868 x 1320 픽셀 해상도(460ppi)",
          "Dynamic Island",
          "상시표시형 디스플레이",
          "최대 120Hz 가변 재생률을 제공하는 ProMotion 기술",
          "HDR 디스플레이",
          "True Tone",
          "넓은 색영역(P3)",
          "햅틱 터치",
          "2,000,000:1 명암비(일반)",
          "1000 니트 전체 최대 밝기(일반); 1600 니트 부분 최대 밝기(HDR); 3000 니트 부분 최대 밝기(야외); 1 니트 최소 밝기",
          "지문 및 유분 방지 코팅",
          "반사 방지 코팅",
          "여러 언어 및 문자 동시 표시 지원",
          "직사각형 기준 대각선 17.42cm; 곡면·모서리로 실제 표시 영역은 더 작음."
        ]
      },
      {
        "title": "방수 및 방진 [주 3]",
        "items": [
          "IEC 규격 60529하의 IP68 등급 획득(최대 수심 6m, 최대 30분)"
        ]
      },
      {
        "title": "Apple Intelligence",
        "items": [
          "Apple Intelligence 지원. 언어·지역·시스템 요건에 따른 제한 [주 4]"
        ]
      },
      {
        "title": "칩",
        "items": [
          "A19 Pro 칩",
          "6코어 CPU(성능 코어 2개 및 효율 코어 4개)",
          "6코어 GPU(Neural Accelerators 탑재)",
          "16코어 Neural Engine",
          "하드웨어 가속형 레이 트레이싱"
        ]
      },
      {
        "title": "카메라",
        "items": [
          "48MP 프로 Fusion 카메라 시스템",
          "48MP Fusion 메인: 24mm, ƒ/1.78 조리개, 2세대 센서 시프트 광학 이미지 흔들림 보정(OIS), 100% Focus Pixels, 초고해상도 사진 지원(24MP 및 48MP)",
          "12MP 광학 퀄리티 2배 망원도 가능: 48mm, ƒ/1.78 조리개, 2세대 센서 시프트 광학 이미지 흔들림 보정(OIS), 100% Focus Pixels",
          "48MP Fusion 울트라 와이드: 13mm, ƒ/2.2 조리개 및 120° 시야각, 하이브리드 Focus Pixels, 초고해상도 사진(48MP)",
          "48MP Fusion 망원: 100mm(4배), ƒ/2.8 조리개, 하이브리드 Focus Pixels, 3D 센서 시프트 광학 이미지 흔들림 보정(OIS) 및 오토포커스, 테트라프리즘 디자인",
          "12MP 광학 퀄리티 8배 망원도 가능: 200mm, ƒ/2.8 조리개, 하이브리드 Focus Pixels, 3D 센서 시프트 광학 이미지 흔들림 보정(OIS) 및 오토포커스, 테트라프리즘 디자인",
          "8배 광학 퀄리티 줌인, 2배 광학 줌아웃, 16배 광학 퀄리티 줌 범위",
          "최대 40배 디지털 줌",
          "맞춤 설정 가능한 기본 렌즈(Fusion 메인)",
          "사파이어 크리스털 렌즈 커버",
          "적응형 True Tone 플래시",
          "Photonic Engine",
          "Deep Fusion",
          "스마트 HDR 5",
          "초점 및 심도 제어 기능을 지원하는 한 차원 높은 인물 사진",
          "6가지 효과의 인물 사진 조명",
          "야간 모드",
          "파노라마(최대 63MP)",
          "최신 세대 사진 스타일",
          "공간 사진",
          "48MP 접사 사진",
          "ProRAW",
          "사진 및 Live Photo 촬영 시 넓은 색영역 포착",
          "렌즈 보정(Fusion 울트라 와이드)",
          "첨단 적목 보정",
          "자동 흔들림 보정",
          "고속 연사 모드",
          "사진 위치 표시 기능",
          "촬영 이미지 포맷: HEIF, JPEG, DNG"
        ]
      },
      {
        "title": "동영상 촬영",
        "items": [
          "4K Dolby Vision 동영상 촬영(초당 24, 25, 30, 60, 100 또는 120 프레임, 100 또는 120 프레임은 Fusion 메인 전용)",
          "1080p Dolby Vision 동영상 촬영(초당 25, 30, 60 또는 120 프레임, 120 프레임은 Fusion 메인 전용)",
          "720p Dolby Vision 동영상 촬영(초당 30 프레임)",
          "시네마틱 모드(최대 4K Dolby Vision, 초당 30 프레임)",
          "액션 모드(최대 2.8K Dolby Vision, 초당 60 프레임)",
          "1080p 공간 비디오 촬영(초당 30 프레임)",
          "외부 저장 매체 활용 시 최대 4K ProRes 동영상 촬영(초당 120 프레임)",
          "ProRes RAW [주 5]",
          "ACES(Academy Color Encoding System)",
          "Apple Log 2",
          "Genlock 지원 [주 6]",
          "접사 동영상 촬영(슬로 모션 및 타임랩스 포함)",
          "1080p 슬로 모션 동영상 지원(초당 최대 240 프레임) 및 4K Dolby Vision 슬로 모션 동영상 지원(초당 최대 120 프레임, Fusion 메인)",
          "듀얼 캡처(최대 4K Dolby Vision, 초당 30 프레임)",
          "타임랩스 동영상(동영상 흔들림 보정 포함)",
          "야간 모드 타임랩스",
          "QuickTake 동영상(최대 4K Dolby Vision, 초당 60 프레임)",
          "동영상을 위한 2세대 센서 시프트 광학 이미지 흔들림 보정(OIS)(Fusion 메인)",
          "동영상을 위한 3D 센서 시프트 광학 이미지 흔들림 보정(OIS) 및 오토포커스(Fusion 망원)",
          "최대 15배 디지털 줌",
          "오디오 줌",
          "True Tone 플래시",
          "시네마틱 동영상 흔들림 보정(4K, 1080p 및 720p)",
          "연속 오토포커스 동영상",
          "4K 동영상 촬영 중 8MP 사진 촬영",
          "재생 중 줌",
          "녹화 동영상 포맷: HEVC, H.264, ProRes, ProRes RAW",
          "공간 음향 및 스테레오 녹음",
          "4개의 스튜디오급 마이크",
          "바람 소리 감소",
          "오디오 믹스"
        ]
      },
      {
        "title": "전면 카메라",
        "items": [
          "18MP Center Stage 카메라",
          "ƒ/1.9 조리개",
          "Focus Pixels 방식 오토포커스",
          "Retina Flash",
          "탭하여 줌 및 회전",
          "사진을 위한 센터 스테이지",
          "초강력 흔들림 보정 동영상",
          "듀얼 캡처",
          "영상 통화를 위한 센터 스테이지",
          "Photonic Engine",
          "Deep Fusion",
          "스마트 HDR 5",
          "초점 및 심도 제어 기능을 지원하는 한 차원 높은 인물 사진",
          "6가지 효과의 인물 사진 조명",
          "애니모티콘과 미모티콘",
          "야간 모드",
          "최신 세대 사진 스타일",
          "ProRAW",
          "사진 및 Live Photo 촬영 시 넓은 색영역 포착",
          "렌즈 보정",
          "자동 흔들림 보정",
          "고속 연사 모드",
          "4K Dolby Vision 동영상 촬영(초당 24, 25, 30 또는 60 프레임)",
          "1080p Dolby Vision 동영상 촬영(초당 25, 30 또는 60 프레임)",
          "시네마틱 모드(최대 4K Dolby Vision, 초당 30 프레임)",
          "외부 저장 매체 활용 시 최대 4K ProRes 동영상 촬영(초당 60 프레임)",
          "ProRes RAW [주 5]",
          "ACES(Academy Color Encoding System)",
          "Apple Log 2",
          "1080p 슬로 모션 동영상 지원(초당 120 프레임)",
          "타임랩스 동영상(동영상 흔들림 보정 포함)",
          "야간 모드 타임랩스",
          "QuickTake 동영상(최대 4K Dolby Vision, 초당 60 프레임)",
          "시네마틱 동영상 흔들림 보정(4K, 1080p 및 720p)",
          "공간 음향 및 스테레오 녹음",
          "바람 소리 감소",
          "오디오 믹스"
        ]
      },
      {
        "title": "전원 및 배터리 [주 7]",
        "items": [
          "동영상 재생: 최대 37시간",
          "동영상 재생(스트리밍): 최대 33시간",
          "충전식 리튬 이온 배터리 내장",
          "급속 충전 가능:",
          "USB‑C 충전 케이블과 함께 40W 이상 규격의 어댑터 사용 시 20분에 최대 50% 충전(어댑터 별매) [주 8]",
          "MagSafe 충전기와 함께 30W 이상 규격의 어댑터 사용 시 30분에 최대 50% 충전(충전기 및 어댑터 별매) [주 8]"
        ]
      },
      {
        "title": "Face ID",
        "items": [
          "Center Stage 전면 카메라의 TrueDepth 기술을 통해 지원"
        ]
      },
      {
        "title": "안심 기능",
        "items": [
          "긴급 구조 요청 [주 9]",
          "충돌 감지 [주 10]"
        ]
      },
      {
        "title": "셀룰러 및 무선 기술",
        "items": [
          "모델 A3523 및 A3526*",
          "FDD-5G NR(대역 n1, n2, n3, n5, n7, n8, n12, n20, n25, n26, n28, n30, n66, n70, n75)",
          "TDD-5G NR(대역 n38, n40, n41, n48, n53, n77, n78, n79)",
          "FDD-LTE(대역 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 66)",
          "TDD-LTE(대역 34, 38, 39, 40, 41, 42, 48, 53)",
          "UMTS/HSPA+/DC-HSDPA(850, 900, 1700/2100, 1900, 2100MHz)",
          "GSM/EDGE(850, 900, 1800, 1900MHz)",
          "4x4 MIMO 방식을 지원하는 5G(sub-6 GHz) [주 11]",
          "4x4 MIMO 방식을 지원하는 Gigabit LTE [주 11]",
          "Apple N1 무선 네트워킹 칩",
          "2x2 MIMO 방식을 지원하는 Wi‑Fi 7(802.11be) [주 12]",
          "Bluetooth 6",
          "Thread 네트워킹 기술",
          "Apple 2세대 초광대역 칩 [주 13]",
          "리더 모드를 지원하는 NFC",
          "예비 전력으로 작동하는 익스프레스 카드 기능"
        ]
      },
      {
        "title": "위치",
        "items": [
          "정밀 이중 주파수 GPS(GPS, GLONASS, Galileo, QZSS, BeiDou, NavIC)",
          "디지털 나침반",
          "Wi-Fi",
          "셀룰러",
          "iBeacon 위치 정밀 감지 기능"
        ]
      },
      {
        "title": "외부 버튼 및 커넥터",
        "items": [
          "음량 올리기/내리기",
          "동작 버튼",
          "카메라 컨트롤",
          "측면 버튼",
          "USB‑C 커넥터",
          "내장 마이크",
          "내장 스테레오 스피커",
          "동작 버튼 기능",
          "무음 모드, 집중 모드, 카메라, 비주얼 인텔리전스, [주 14] 손전등, 음성 메모, 음악 인식, 번역, 확대기, 제어 항목, 단축어, 손쉬운 사용",
          "카메라 컨트롤",
          "노출, 심도, 확대/축소, 카메라, 스타일, 색조"
        ]
      },
      {
        "title": "충전 및 확장",
        "items": [
          "다음을 지원하는 USB‑C 커넥터:",
          "충전",
          "DisplayPort",
          "USB 3(최대 10Gb/s) [주 15]"
        ]
      },
      {
        "title": "MagSafe 및 무선 충전",
        "items": [
          "최대 25W MagSafe 무선 충전 [주 8]",
          "최대 25W Qi2 무선 충전 [주 8]",
          "자석 어레이",
          "정렬 자석",
          "액세서리 식별용 NFC",
          "자력계"
        ]
      },
      {
        "title": "센서",
        "items": [
          "Face ID",
          "LiDAR 스캐너",
          "기압계",
          "하이 다이내믹 레인지 자이로",
          "고중력 가속도계",
          "근접 센서",
          "듀얼 주변광 센서"
        ]
      },
      {
        "title": "SIM 카드",
        "items": [
          "듀얼 SIM(nano-SIM 및 eSIM) [주 16]",
          "듀얼 eSIM 지원 [주 16]"
        ]
      },
      {
        "title": "Apple Pay",
        "items": [
          "매장, 앱, 웹사이트에서 Face ID를 이용해 iPhone으로 결제",
          "Mac에서 Apple Pay 사용 시 iPhone으로 결제 완료",
          "익스프레스 교통카드로 대중교통 요금 결제 [주 17]"
        ]
      },
      {
        "title": "영상 통화 [주 18]",
        "items": [
          "셀룰러 또는 Wi‑Fi 네트워크에서 FaceTime 영상 통화",
          "5G 또는 Wi‑Fi 네트워크에서 FaceTime HD(1080p) 영상 통화",
          "영상 통화를 위한 센터 스테이지",
          "SharePlay",
          "화면 공유",
          "FaceTime 영상 통화 시 인물 사진 모드 지원",
          "공간 음향",
          "음성 분리 및 와이드 스펙트럼 마이크 모드",
          "후면 카메라를 이용한 광학 줌"
        ]
      },
      {
        "title": "음성 통화 [주 18]",
        "items": [
          "FaceTime 음성 통화",
          "LTE 음성 통화(VoLTE) [주 11]",
          "SharePlay",
          "화면 공유",
          "공간 음향",
          "음성 분리 및 와이드 스펙트럼 마이크 모드"
        ]
      },
      {
        "title": "오디오 재생",
        "items": [
          "지원되는 포맷: AAC, APAC, MP3, Apple Lossless, FLAC, Dolby Digital, Dolby Digital Plus, Dolby Atmos",
          "공간 음향 재생",
          "최대 음량 제한 설정 가능"
        ]
      },
      {
        "title": "동영상 재생",
        "items": [
          "지원되는 포맷: HEVC, H.264, AV1, ProRes",
          "Dolby Vision, HDR10+/HDR10, HLG를 지원하는 HDR",
          "최대 4K HDR AirPlay 미러링, 사진, 동영상을 Apple TV(2세대 이후 모델) 또는 AirPlay 지원 스마트 TV로 출력",
          "동영상 미러링 및 동영상 출력 지원: USB-C 또는 USB-C Digital AV 어댑터 사용 시 기본 DisplayPort 출력을 통해 최대 4K HDR(모델 A2119, 어댑터 별매) [주 19]"
        ]
      },
      {
        "title": "Siri [주 20]",
        "items": [
          "메시지 전송, 미리 알림 설정 등 다양한 일상 작업들을 손쉽게 처리 가능",
          "“Siri야”라고 불러 음성만으로 핸즈프리 활성화, 또는 타이핑으로 Siri 사용",
          "그 어떤 지능형 개인 비서보다 강력한 개인정보 보호 기능",
          "Apple Intelligence로 구동되기 때문에 더욱 자연스럽게 작동하고 유용한 도움 제공 [주 4]"
        ]
      },
      {
        "title": "운영체제",
        "items": [
          "iOS"
        ]
      },
      {
        "title": "개인정보 보호",
        "items": [
          "Face ID 안면 인증; 타사 앱·웹사이트 추적 시 사용자 승인; iMessage 및 FaceTime 영상 통화 종단간 암호화."
        ]
      },
      {
        "title": "손쉬운 사용",
        "items": [
          "VoiceOver",
          "확대/축소",
          "확대기",
          "음성 명령",
          "스위치 제어",
          "AssistiveTouch",
          "눈 추적",
          "청각 장애인용 자막",
          "실시간 자막",
          "개인 음성",
          "실시간 말하기",
          "타이핑으로 Siri 사용",
          "음성 단축어",
          "콘텐츠 말하기"
        ]
      },
      {
        "title": "내장 앱",
        "items": [
          "App Store",
          "도서",
          "계산기",
          "캘린더",
          "카메라",
          "시계",
          "나침반",
          "연락처",
          "FaceTime",
          "파일",
          "나의 찾기",
          "피트니스",
          "Freeform",
          "Games",
          "GarageBand",
          "건강",
          "홈",
          "iMovie",
          "iTunes Store",
          "일기",
          "Keynote",
          "확대기",
          "Mail",
          "지도",
          "측정",
          "메시지",
          "음악",
          "메모",
          "Numbers",
          "Pages",
          "암호",
          "전화",
          "사진",
          "팟캐스트",
          "미리보기",
          "미리 알림",
          "Safari",
          "설정",
          "단축어",
          "주식",
          "팁",
          "번역",
          "TV",
          "음성 메모",
          "지갑",
          "Watch",
          "날씨"
        ]
      },
      {
        "title": "보청기 호환 등급",
        "items": [
          "미국 HAC(보청기 호환성) 등급 보유"
        ]
      },
      {
        "title": "시스템 요구 사양",
        "items": [
          "Apple 계정(일부 기능에서 필요)",
          "인터넷 연결 [주 21]",
          "Mac 또는 PC에서 동기화 시 요구 사양:",
          "macOS Catalina 10.15 이후 버전: Finder 사용",
          "macOS High Sierra 10.13부터 macOS Mojave 10.14.6까지: iTunes 12.8 이후 버전 사용",
          "Windows 10 이후 버전: iTunes 12.12.10 이후 버전 사용 (apple.com/kr/itunes/download에서 무료 다운로드)"
        ]
      },
      {
        "title": "사용 환경",
        "items": [
          "작동 온도: 0°C~35°C",
          "보관 가능(비작동) 온도: −20°C~45°C",
          "상대 습도: 5%~95% 미응결",
          "작동 고도: 3,000m까지 테스트"
        ]
      },
      {
        "title": "언어",
        "items": [
          "언어 지원",
          "한국어, 영어(오스트레일리아, 영국, 미국), 중국어(간체, 번체, 홍콩 번체), 프랑스어(캐나다, 프랑스), 독일어, 이탈리아어, 일본어, 스페인어(라틴 아메리카, 스페인), 아랍어, 불가리아어, 카탈로니아어, 크로아티아어, 체코어, 덴마크어, 네덜란드어, 핀란드어, 그리스어, 히브리어, 힌디어, 헝가리어, 인도네시아어, 카자흐어, 말레이어, 노르웨이어, 폴란드어, 포르투갈어(브라질, 포르투갈), 루마니아어, 러시아어, 슬로바키아어, 스웨덴어, 태국어, 튀르키예어, 우크라이나어, 베트남어"
        ]
      },
      {
        "title": "제품 구성",
        "items": [
          "iPhone 17 Pro Max",
          "USB-C 충전 케이블(1m)",
          "설명서",
          "전원 어댑터·EarPods 별매. 포함 USB-C 케이블은 호환 어댑터·컴퓨터 포트에서 사용."
        ]
      },
      {
        "title": "상품정보표시",
        "items": [
          "제품명: 스마트폰",
          "모델명: A3523, A3526",
          "수입자: 애플코리아 유한회사",
          "인증정보: R-C-APA-A3523, R-C-APA-A3526",
          "제조자: Apple Inc.",
          "동일모델의 출시년월: 2025년 9월",
          "제조국: 중국",
          "품질보증기준: https://www.apple.com/kr/legal/warranty/",
          "서비스 연락처: 080​-333​-4000"
        ]
      },
      {
        "title": "iPhone 그리고 환경",
        "items": [
          "Apple 2030 계획을 향한 경과",
          "소재",
          "기기 재활용 소재 30%. [주 23]",
          "외장에 50% 재활용 알루미늄 사용",
          "배터리에 100% 재활용 코발트 및 95% 재활용 리튬 사용",
          "Apple이 설계한 모든 인쇄 회로 기판의 도금과 솔더에 각각 100% 재활용 금과 주석 사용",
          "모든 카메라의 와이어 및 모든 커넥터의 도금에 100% 재활용 금 사용",
          "Taptic Engine에 100% 재활용 텅스텐 및 구리 와이어 사용",
          "베이퍼 챔버 외장에 100% 재활용 구리 사용",
          "100% 희토류 원소로 만든 재활용 자석만 사용",
          "에너지",
          "iPhone 17 Pro 및 iPhone 17 Pro Max 생산에 사용되는 전력의 40%를 재생 가능 전력으로 조달 [주 24]",
          "배터리 충전기 시스템에 관한 미 에너지부 요건 초과 충족 [주 25]",
          "포장",
          "섬유 기반 소재가 100% 쓰인 포장재 [주 26]",
          "운송 1회당 25% 더 많은 기기 수를 실을 수 있도록 iPhone 16 Pro 상자보다 더욱 효율적으로 제작된 iPhone 17 Pro 및 iPhone 17 Pro Max 포장 [주 27]",
          "폐기물",
          "Apple의 ‘제로 폐기물 프로그램’에 따라 기존의 모든 최종 조립 시설에서 매립 폐기물 근절 [주 28]",
          "더 스마트한 화학물질 사용 [주 29]",
          "Apple 2030: 소재·전력·운송 배출 저감 목표. 규제 물질 명세 적용 [주 29]."
        ]
      }
    ],
    "conditions": [
      "모델 번호 및 통신사 네트워크 구성에 따라 셀룰러 지원이 달라집니다.",
      "1. 실제 여유 공간은 표시 용량보다 작습니다. iOS 26·기본 앱은 약 12~24GB, Apple Intelligence 모델은 약 7GB, 삭제 가능한 앱은 약 4.5GB를 사용합니다. 설정·버전·기종에 따라 달라지며 AI를 다시 켜면 모델을 다시 내려받습니다.",
      "2. 제조 및 구성 차이로 크기·무게에 편차가 생길 수 있습니다.",
      "3. IP68은 통제된 실험실 시험(6m·30분) 기준입니다. 마모에 따라 보호 성능이 약해지며 젖은 상태로 충전하지 마세요. 액체 손상은 보증에서 제외됩니다.",
      "4. Apple Intelligence는 사양 문서 기준 베타이며 일부 기능은 한국어를 지원하지 않습니다. 지원 언어·기능·시스템 요건은 Apple 지원 121115를 확인하세요.",
      "5. ProRes RAW 사용에는 호환 앱이 필요합니다.",
      "6. Genlock은 호환되는 타사 하드웨어·소프트웨어가 필요합니다.",
      "7. 배터리 시간과 수명은 네트워크·설정·사용 방식에 따라 다르며 충전 사이클에 따른 교체가 필요할 수 있습니다.",
      "8. MagSafe 최대 25W에는 30W 이상 어댑터가 필요합니다. 2025년 7월 Apple 시제품 시험: USB-C와 A3351 어댑터, 또는 A3502/A3503 MagSafe와 A2164/A3351 어댑터 사용. 완전 방전 상태에서 시작하고 화면에 Apple 로고가 뜰 때부터 시간을 측정했습니다. 충전 속도는 환경·설정·어댑터에 따라 다릅니다.",
      "9. 긴급 구조 요청은 셀룰러 연결이 필요합니다.",
      "10. 심각한 자동차 충돌을 감지해 구조 요청을 지원하며 셀룰러 연결이 필요합니다.",
      "11. 5G·Gigabit LTE·VoLTE는 지원 국가·통신사와 데이터 요금제가 필요합니다. 속도는 이론값으로 환경별 차이가 있습니다.",
      "12. Wi-Fi 7은 지원 국가·지역에서 사용할 수 있습니다.",
      "13. 초광대역 기능은 국가에 따라 제한됩니다.",
      "14. 비주얼 인텔리전스는 Apple Intelligence 활성화가 필요하고 언어·지역 제한이 있습니다.",
      "15. 최대 10Gb/s 전송에는 해당 속도를 지원하는 USB 3 케이블이 필요합니다.",
      "16. eSIM은 지원 통신사와 무선 요금제가 필요합니다.",
      "17. 교통카드는 지원 도시·교통 시스템·기기·OS에서 사용할 수 있습니다.",
      "18. FaceTime은 양쪽의 호환 기기 및 네트워크가 필요합니다. 셀룰러 이용 가능 여부는 통신사별로 다르며 데이터 요금이 발생할 수 있습니다.",
      "19. 해당 영상 출력 조건은 SDR 콘텐츠에 적용됩니다.",
      "20. Siri는 국가·언어별 기능 차이가 있고 인터넷 연결 및 셀룰러 이용 시 데이터 요금이 필요할 수 있습니다.",
      "21. 광대역 무선 연결을 권장하며 연결 비용이 발생할 수 있습니다.",
      "22. 환경 정보는 출시 시점 기준입니다.",
      "23. 재활용 소재 비율은 인증된 재활용 소재 질량/기기 질량으로 계산하며 포장·기본 액세서리를 제외합니다.",
      "24. 제조 전력 관련 추정은 출시 시 협력업체 제조 배분과 전 회계연도의 Apple 탄소 모델 저탄소 에너지에 근거합니다. Apple 협력업체 청정 에너지 프로그램에 따른 조달만 포함됩니다.",
      "25. 에너지 효율은 미국 에너지부 배터리 충전기 기준과 비교했습니다.",
      "26. 포장 수치는 Apple 출고 미국 소매 포장 명세 무게 기준이며 접착제·잉크·코팅을 제외합니다.",
      "27. 운송 효율은 기기 10대가 든 상자의 팰릿 적재 수를 iPhone 16 Pro와 비교했습니다. 한국·안도라·캐나다·키프로스·그리스·이탈리아·포르투갈·스페인·스위스·미국은 팰릿 구성이 달라 절감 비율에 차이가 있습니다.",
      "28. 1년 이상 협력한 기존 최종 조립 시설은 UL 2799 인증 대상입니다. 에너지화를 제외한 폐기물 전환율 기준은 실버 90~94%, 골드 95~99%, 플래티넘 100%입니다.",
      "29. 규제 물질 명세는 제품·액세서리·제조·운송 포장을 대상으로 합니다. 한국 및 일부 국가 AC 코드의 PVC·프탈레이트에는 승인 관련 예외가 있습니다. EU 2011/65/EU와 개정안 및 고온 솔더 등 예외 규정을 따릅니다.",
      "기능은 변경될 수 있으며 국가·언어·하드웨어·소프트웨어에 따른 제한이 있습니다."
    ]
  },
  "galaxy-s26": {
    "source": "s26",
    "checkedAt": "2026-09-30",
    "scope": "한국 삼성 공식 상세 스펙의 국내 자급제/통신사폰 항목. 용량별 메모리·여유 저장공간과 전용색상은 따로 표시합니다.",
    "sections": [
      {
        "title": "프로세서",
        "items": [
          "CPU 속도: 3.8GHz,3.26GHz,2.76GHz",
          "CPU 종류: Deca-Core"
        ]
      },
      {
        "title": "디스플레이",
        "items": [
          "크기 (Main Display): 159.3mm",
          "해상도 (Main Display): 2340 x 1080 (FHD+)",
          "종류 (Main Display): Dynamic AMOLED 2X",
          "색심도 (Main Display): 16M",
          "최대 주사율 (Main Display): 120Hz"
        ]
      },
      {
        "title": "S펜 지원",
        "items": [
          "미지원"
        ]
      },
      {
        "title": "카메라",
        "items": [
          "후면 카메라 - 화소 (Multiple): 50.0MP + 10.0MP + 12.0MP",
          "후면 카메라 - 조리개 값 (Multiple): F1.8, F2.4, F2.2",
          "후면 카메라 - 오토 포커스: 예",
          "후면 카메라 - OIS: 예",
          "후면 카메라 - 줌: 3배 광학 줌, 광학 줌 수준의 2배 줌(적응형 픽셀 센서 활용), 최대 30배 디지털 줌",
          "후면 카메라 - 플래쉬: 예",
          "후면 카메라 - Laser AF 센서: 아니오",
          "전면 카메라 - 화소: 12.0MP",
          "전면 카메라 - 조리개 값: F2.2",
          "전면 카메라 - 오토 포커스: 예",
          "동영상 녹화 해상도: UHD 8K (7680 x 4320) | @30fps",
          "슬로우 모션: 240fps @FHD,120fps @FHD,120fps @UHD"
        ]
      },
      {
        "title": "메모리/스토리지",
        "items": [
          "256GB: RAM 12GB / 사용 가능 224.8GB",
          "512GB: RAM 12GB / 사용 가능 481.0GB"
        ]
      },
      {
        "title": "네트워크",
        "items": [
          "SIM 개수: Dual-SIM",
          "SIM 슬롯 타입: SIM 1 + eSIM / Dual eSIM"
        ]
      },
      {
        "title": "네트워크 (S/W 사용)",
        "items": [
          "2G GSM: GSM850,GSM900,DCS1800,PCS1900",
          "3G UMTS: B1(2100),B2(1900),B4(AWS),B5(850),B8(900)",
          "4G FDD LTE: B1(2100),B2(1900),B3(1800),B4(AWS),B5(850),B7(2600),B8(900),B12(700),B13(700),B17(700),B18(800),B19(800),B20(800),B25(1900),B26(850),B28(700),B66(AWS-3)",
          "4G TDD LTE: B38(2600),B39(1900),B40(2300),B41(2500)",
          "5G FDD Sub6: N1(2100),N2(1900),N3(1800),N5(850),N7(2600),N8(900),N12(700),N20(800),N25(1900),N26(850),N28(700),N66(AWS-3)",
          "5G TDD Sub6: N38(2600),N40(2300),N41(2500),N77(3700),N78(3500)"
        ]
      },
      {
        "title": "연결",
        "items": [
          "USB 인터페이스: USB Type-C",
          "USB 버전: USB 3.2 Gen 1",
          "위치 기술: GPS,Glonass,Beidou,Galileo,QZSS",
          "이어잭: USB Type-C",
          "MHL: 아니오",
          "Wi-Fi: 802.11a/b/g/n/ac/ax/be 2.4GHz+5GHz+6GHz, EHT320, MIMO, 4096-QAM",
          "Wi-Fi Direct: 예",
          "블루투스 버전: Bluetooth v5.4",
          "NFC: 예",
          "UWB (Ultra-Wideband): 아니오",
          "PC 싱크: Smart Switch (PC version)"
        ]
      },
      {
        "title": "운영체제",
        "items": [
          "Android"
        ]
      },
      {
        "title": "기본 사양",
        "items": [
          "색상: 코발트 바이올렛, 스카이 블루, 블랙, 화이트",
          "형태: 터치 바",
          "삼성닷컴·삼성 강남 전용색상: 핑크 골드, 실버 쉐도우"
        ]
      },
      {
        "title": "센서",
        "items": [
          "가속도 센서,기압 센서,지문 센서,자이로 센서,지자기 센서,홀 센서,조도 센서,근접 센서"
        ]
      },
      {
        "title": "외관 사양",
        "items": [
          "크기(세로x가로x두께, mm): 149.6 x 71.7 x 7.2",
          "무게(g): 167g"
        ]
      },
      {
        "title": "배터리",
        "items": [
          "비디오 재생 시간 (Hours): 최대 30",
          "배터리 용량 (mAh, Typical): 4,300",
          "교체 가능: 아니오"
        ]
      },
      {
        "title": "오디오/비디오",
        "items": [
          "스테레오 지원: 예",
          "동영상 지원 포맷: MP4,M4V,3GP,3G2,AVI,FLV,MKV,WEBM",
          "동영상 지원 해상도: UHD 8K (7680 x 4320) | @60fps",
          "오디오 지원 포맷: MP3,M4A,3GA,AAC,OGG,OGA,WAV,AMR,AWB,FLAC,MID,MIDI,XMF,MXMF,IMY,RTTTL,RTX,OTA,DFF,DSF,APE"
        ]
      },
      {
        "title": "서비스",
        "items": [
          "Gear 서포트: 갤럭시 링, 갤럭시 버즈 코어, 갤럭시 버즈4 프로, 갤럭시 버즈3 프로, 갤럭시 버즈2 프로, 갤럭시 버즈 프로, 갤럭시 버즈 라이브, 갤럭시 버즈+, 갤럭시 버즈4, 갤럭시 버즈3, 갤럭시 버즈2, 갤럭시 버즈, 갤럭시 버즈3 FE, 갤럭시 버즈 FE, 갤럭시 핏3, 갤럭시 핏2, 갤럭시 워치 FE, 갤럭시 워치 울트라, 갤럭시 워치8, 갤럭시 워치7, 갤럭시 워치6, 갤럭시 워치5, 갤럭시 워치4, 갤럭시 워치3, 갤럭시 워치, 갤럭시 워치 액티브2, 갤럭시 워치 액티브",
          "삼성 덱스 서포트: 지원",
          "모바일 TV: 아니오",
          "블루투스 보청기 지원: 보청기용 안드로이드 오디오 스트리밍 프로토콜 (ASHA)",
          "SmartThings 지원: 지원"
        ]
      },
      {
        "title": "소프트웨어 지원",
        "items": [
          "보안 업데이트 지원 기한: 2033년 2월 28일까지"
        ]
      },
      {
        "title": "상품 기본정보",
        "items": [
          "제품명: 5G NR 이동통신용 무선설비의 기기(3.5 GHz)(육상이동국의 송수신장치)",
          "제조자/수입자: 삼성전자㈜",
          "제조국가: 한국, 베트남",
          "KC 인증 필 유무: R-C-SEC-SMS942",
          "동일모델의 출시년월: 26년 2월",
          "A/S 책임자와 전화번호: 삼성전자서비스센터/1588-3366",
          "품질보증기준: 소비자기본법 제16조의 소비자분쟁해결기준에 따른 결함·하자 피해 보상"
        ]
      }
    ],
    "conditions": [
      "색상과 판매 여부는 국가·통신사에 따라 다릅니다. 핑크 골드·실버 쉐도우는 삼성닷컴/삼성 강남 전용입니다.",
      "대표 배터리 용량은 외부 실험실 IEC 61960 표본 편차를 고려한 평균입니다. 정격 용량: 4,175mAh.",
      "화면 대각선: 직각 기준 159.3mm / 곡면 반영 155.9mm. 카메라 홀·둥근 모서리로 실제 표시 영역은 더 작습니다.",
      "Wi-Fi 7은 호환 공유기 및 적합한 연결 환경이 필요하며 국가·사업자·환경에 따라 가용성이 다릅니다.",
      "여유 저장공간은 소프트웨어·기본 앱 등에 따라 달라집니다. 상세 스펙의 업데이트 종료일·호환 기기 목록은 확인일 기준입니다."
    ]
  },
  "galaxy-s26-ultra": {
    "source": "s26u",
    "checkedAt": "2026-09-30",
    "scope": "한국 삼성 공식 상세 스펙의 국내 자급제/통신사폰 항목. 용량별 메모리·여유 저장공간과 전용색상은 따로 표시합니다.",
    "sections": [
      {
        "title": "프로세서",
        "items": [
          "CPU 속도: 4.74GHz,3.6GHz",
          "CPU 종류: Octa-Core"
        ]
      },
      {
        "title": "디스플레이",
        "items": [
          "크기 (Main Display): 174.9mm",
          "해상도 (Main Display): 3120 x 1440 (QHD+)",
          "종류 (Main Display): Dynamic AMOLED 2X",
          "색심도 (Main Display): 16M",
          "최대 주사율 (Main Display): 120Hz"
        ]
      },
      {
        "title": "S펜 지원",
        "items": [
          "예"
        ]
      },
      {
        "title": "카메라",
        "items": [
          "후면 카메라 - 화소 (Multiple): 200.0MP + 50.0MP + 50.0MP + 10.0MP",
          "후면 카메라 - 조리개 값 (Multiple): F1.4, F2.9, F1.9, F2.4",
          "후면 카메라 - 오토 포커스: 예",
          "후면 카메라 - OIS: 예",
          "후면 카메라 - 줌: 3배 및 5배 광학 줌, 광학 줌 수준의 2배 및 10배 줌(적응형 픽셀 센서 활용), 최대 100배 디지털 줌",
          "후면 카메라 - 플래쉬: 예",
          "후면 카메라 - Laser AF 센서: 예",
          "전면 카메라 - 화소: 12.0MP",
          "전면 카메라 - 조리개 값: F2.2",
          "전면 카메라 - 오토 포커스: 예",
          "동영상 녹화 해상도: UHD 8K (7680 x 4320) | @30fps",
          "슬로우 모션: 240fps @FHD,120fps @FHD,120fps @UHD"
        ]
      },
      {
        "title": "메모리/스토리지",
        "items": [
          "256GB: RAM 12GB / 사용 가능 224.3GB",
          "512GB: RAM 12GB / 사용 가능 479.8GB",
          "1TB: RAM 16GB / 사용 가능 990.2GB"
        ]
      },
      {
        "title": "네트워크",
        "items": [
          "SIM 개수: Dual-SIM",
          "SIM 슬롯 타입: SIM 1 + eSIM / Dual eSIM"
        ]
      },
      {
        "title": "네트워크 (S/W 사용)",
        "items": [
          "2G GSM: GSM850,GSM900,DCS1800,PCS1900",
          "3G UMTS: B1(2100),B2(1900),B4(AWS),B5(850),B8(900)",
          "4G FDD LTE: B1(2100),B2(1900),B3(1800),B4(AWS),B5(850),B7(2600),B8(900),B12(700),B13(700),B17(700),B18(800),B19(800),B20(800),B25(1900),B26(850),B28(700),B66(AWS-3)",
          "4G TDD LTE: B38(2600),B39(1900),B40(2300),B41(2500)",
          "5G FDD Sub6: N1(2100),N2(1900),N3(1800),N5(850),N7(2600),N8(900),N12(700),N20(800),N25(1900),N26(850),N28(700),N66(AWS-3)",
          "5G TDD Sub6: N38(2600),N40(2300),N41(2500),N77(3700),N78(3500)"
        ]
      },
      {
        "title": "연결",
        "items": [
          "USB 인터페이스: USB Type-C",
          "USB 버전: USB 3.2 Gen 1",
          "위치 기술: GPS,Glonass,Beidou,Galileo,QZSS",
          "이어잭: USB Type-C",
          "MHL: 아니오",
          "Wi-Fi: 802.11a/b/g/n/ac/ax/be 2.4GHz+5GHz+6GHz, EHT320, MIMO, 4096-QAM",
          "Wi-Fi Direct: 예",
          "블루투스 버전: Bluetooth v6.0",
          "NFC: 예",
          "UWB (Ultra-Wideband): 예",
          "PC 싱크: Smart Switch (PC version)"
        ]
      },
      {
        "title": "운영체제",
        "items": [
          "Android"
        ]
      },
      {
        "title": "기본 사양",
        "items": [
          "색상: 코발트 바이올렛, 스카이 블루, 블랙, 화이트",
          "형태: 터치 바",
          "삼성닷컴·삼성 강남 전용색상: 핑크 골드, 실버 쉐도우"
        ]
      },
      {
        "title": "센서",
        "items": [
          "가속도 센서,기압 센서,지문 센서,자이로 센서,지자기 센서,홀 센서,조도 센서,근접 센서"
        ]
      },
      {
        "title": "외관 사양",
        "items": [
          "크기(세로x가로x두께, mm): 163.6 x 78.1 x 7.9",
          "무게(g): 214g"
        ]
      },
      {
        "title": "배터리",
        "items": [
          "비디오 재생 시간 (Hours): 최대 31",
          "배터리 용량 (mAh, Typical): 5,000",
          "교체 가능: 아니오"
        ]
      },
      {
        "title": "오디오/비디오",
        "items": [
          "스테레오 지원: 예",
          "동영상 지원 포맷: MP4,M4V,3GP,3G2,AVI,FLV,MKV,WEBM",
          "동영상 지원 해상도: UHD 8K (7680 x 4320) | @60fps",
          "오디오 지원 포맷: MP3,M4A,3GA,AAC,OGG,OGA,WAV,AMR,AWB,FLAC,MID,MIDI,XMF,MXMF,IMY,RTTTL,RTX,OTA,DFF,DSF,APE"
        ]
      },
      {
        "title": "서비스",
        "items": [
          "Gear 서포트: 갤럭시 링, 갤럭시 버즈 코어, 갤럭시 버즈4 프로, 갤럭시 버즈3 프로, 갤럭시 버즈2 프로, 갤럭시 버즈 프로, 갤럭시 버즈 라이브, 갤럭시 버즈+, 갤럭시 버즈4, 갤럭시 버즈3, 갤럭시 버즈2, 갤럭시 버즈, 갤럭시 버즈3 FE, 갤럭시 버즈 FE, 갤럭시 핏3, 갤럭시 핏2, 갤럭시 워치 FE, 갤럭시 워치 울트라, 갤럭시 워치8, 갤럭시 워치7, 갤럭시 워치6, 갤럭시 워치5, 갤럭시 워치4, 갤럭시 워치3, 갤럭시 워치, 갤럭시 워치 액티브2, 갤럭시 워치 액티브",
          "삼성 덱스 서포트: 지원",
          "모바일 TV: 아니오",
          "블루투스 보청기 지원: 보청기용 안드로이드 오디오 스트리밍 프로토콜 (ASHA)",
          "SmartThings 지원: 지원"
        ]
      },
      {
        "title": "소프트웨어 지원",
        "items": [
          "보안 업데이트 지원 기한: 2033년 2월 28일까지"
        ]
      },
      {
        "title": "상품 기본정보",
        "items": [
          "제품명: 5G NR 이동통신용 무선설비의 기기(3.5 GHz)(육상이동국의 송수신장치)",
          "제조자/수입자: 삼성전자㈜",
          "제조국가: 한국, 베트남",
          "KC 인증 필 유무: R-C-SEC-SMS948",
          "동일모델의 출시년월: 26년 2월",
          "A/S 책임자와 전화번호: 삼성전자서비스센터/1588-3366",
          "품질보증기준: 소비자기본법 제16조의 소비자분쟁해결기준에 따른 결함·하자 피해 보상"
        ]
      }
    ],
    "conditions": [
      "색상과 판매 여부는 국가·통신사에 따라 다릅니다. 핑크 골드·실버 쉐도우는 삼성닷컴/삼성 강남 전용입니다.",
      "대표 배터리 용량은 외부 실험실 IEC 61960 표본 편차를 고려한 평균입니다. 정격 용량: 4,855mAh.",
      "화면 대각선: 직각 기준 174.9mm / 곡면 반영 171.4mm. 카메라 홀·둥근 모서리로 실제 표시 영역은 더 작습니다.",
      "Wi-Fi 7은 호환 공유기 및 적합한 연결 환경이 필요하며 국가·사업자·환경에 따라 가용성이 다릅니다.",
      "여유 저장공간은 소프트웨어·기본 앱 등에 따라 달라집니다. 상세 스펙의 업데이트 종료일·호환 기기 목록은 확인일 기준입니다."
    ]
  }
};

Object.assign(fullSpecCatalog, {
  "galaxy-z-fold8-ultra": {
    "source": "galaxy-z-fold8-ultra",
    "checkedAt": "2026-09-30",
    "scope": "한국 공식 상세 사양 표. 256GB 기준 공통 항목과 용량별 메모리 차이를 정리했습니다.",
    "sections": [
      {
        "title": "프로세서",
        "items": [
          "CPU 속도: 4.74GHz,3.6GHz",
          "CPU 종류: Octa-Core"
        ]
      },
      {
        "title": "디스플레이",
        "items": [
          "크기 (Main Display): 203.1mm",
          "해상도 (Main Display): 2504 x 2256 (QXGA+)",
          "종류 (Main Display): Dynamic AMOLED 2X",
          "색심도 (Main Display): 16M",
          "최대 주사율 (Main Display): 120Hz",
          "크기 (Sub Display): 164.8mm",
          "해상도 (Sub Display): 2520 x 1080 (FHD+)",
          "종류 (Sub Display): Dynamic AMOLED 2X",
          "색심도 (Sub Display): 16M"
        ]
      },
      {
        "title": "카메라",
        "items": [
          "후면 카메라 - 화소 (Multiple): 200.0MP + 50.0MP + 10.0MP",
          "후면 카메라 - 조리개 값 (Multiple): F1.7, F1.9, F2.4",
          "후면 카메라 - 오토 포커스: 예",
          "후면 카메라 - OIS: 예",
          "후면 카메라 - 줌: 3배 광학 줌, 광학 줌 수준의 2배 줌(적응형 픽셀 센서 활용), 최대 30배 디지털 줌",
          "후면 카메라 - 플래쉬: 예",
          "전면 카메라 - 화소: 10.0MP",
          "전면 카메라 - 조리개 값: F2.2",
          "전면 카메라 - 오토 포커스: 아니오",
          "커버 카메라 - 화소: 10.0 MP",
          "커버 카메라 - 조리개 값: F2.2",
          "커버 카메라 - 오토 포커스: 아니오",
          "동영상 녹화 해상도: UHD 8K (7680 x 4320) | @30fps",
          "슬로우 모션: 240fps @FHD,120fps @FHD,120fps @UHD"
        ]
      },
      {
        "title": "메모리/스토리지",
        "items": [
          "메모리: 12GB",
          "스토리지(저장 용량): 256GB",
          "사용 가능한 스토리지(저장 용량): 225.9GB",
          "512GB: RAM 12GB / 사용 가능 480.9GB",
          "1TB: RAM 16GB / 사용 가능 991.4GB"
        ]
      },
      {
        "title": "네트워크",
        "items": [
          "SIM 개수: Dual-SIM",
          "SIM 슬롯 타입: SIM 1 + eSIM / Dual eSIM"
        ]
      },
      {
        "title": "네트워크 (S/W 사용)",
        "items": [
          "2G GSM: GSM850,GSM900,DCS1800,PCS1900",
          "3G UMTS: B1(2100),B2(1900),B4(AWS),B5(850),B8(900)",
          "4G FDD LTE: B1(2100),B2(1900),B3(1800),B4(AWS),B5(850),B7(2600),B8(900),B12(700),B13(700),B17(700),B18(800),B19(800),B20(800),B25(1900),B26(850),B28(700),B66(AWS-3)",
          "4G TDD LTE: B38(2600),B39(1900),B40(2300),B41(2500)",
          "5G FDD Sub6: N1(2100),N2(1900),N3(1800),N5(850),N7(2600),N8(900),N12(700),N20(800),N25(1900),N26(850),N28(700),N66(AWS-3)",
          "5G TDD Sub6: N38(2600),N40(2300),N41(2500),N77(3700),N78(3500)"
        ]
      },
      {
        "title": "연결",
        "items": [
          "USB 인터페이스: USB Type-C",
          "USB 버전: USB 3.2 Gen 1",
          "위치 기술: GPS,Glonass,Beidou,Galileo,QZSS",
          "이어잭: USB Type-C",
          "MHL: 아니오",
          "Wi-Fi: 802.11a/b/g/n/ac/ax/be 2.4GHz+5GHz+6GHz, EHT320, MIMO, 4096-QAM",
          "Wi-Fi Direct: 예",
          "블루투스 버전: Bluetooth v6.0",
          "NFC: 예",
          "UWB (Ultra-Wideband): 예",
          "PC 싱크: Smart Switch (PC version)"
        ]
      },
      {
        "title": "운영체제",
        "items": [
          "Android"
        ]
      },
      {
        "title": "기본 사양",
        "items": [
          "색상: 그린 쉐도우",
          "형태: 폴더"
        ]
      },
      {
        "title": "센서",
        "items": [
          "가속도 센서,기압 센서,지문 센서,자이로 센서,지자기 센서,홀 센서,조도 센서,근접 센서"
        ]
      },
      {
        "title": "외관 사양",
        "items": [
          "크기(세로x가로x두께, mm): 158.4 x 143.2 x 4.1",
          "접힌 상태 시 크기(세로x가로x두께, mm): 158.4 x 72.8 x 8.9",
          "무게(g): 215g"
        ]
      },
      {
        "title": "배터리",
        "items": [
          "비디오 재생 시간 (Hours, Wireless): 최대 27",
          "배터리 용량 (mAh, Typical): 5,000",
          "교체 가능: 아니오"
        ]
      },
      {
        "title": "오디오/비디오",
        "items": [
          "스테레오 지원: 예",
          "동영상 지원 포맷: MP4,M4V,3GP,3G2,AVI,FLV,MKV,WEBM",
          "동영상 지원 해상도: UHD 8K (7680 x 4320) | @60fps",
          "오디오 지원 포맷: MP3,M4A,3GA,AAC,OGG,OGA,WAV,AMR,AWB,FLAC,MID,MIDI,XMF,MXMF,IMY,RTTTL,RTX,OTA,DFF,DSF,APE"
        ]
      },
      {
        "title": "서비스",
        "items": [
          "Gear 서포트: 갤럭시 링,갤럭시 버즈 코어,갤럭시 버즈4 프로,갤럭시 버즈3 프로,갤럭시 버즈2 프로,갤럭시 버즈 프로,갤럭시 버즈 라이브,갤럭시 버즈+,갤럭시 버즈4,갤럭시 버즈3,갤럭시 버즈2,갤럭시 버즈,갤럭시 버즈3 FE,갤럭시 버즈 FE,갤럭시 핏3,갤럭시 핏2,갤럭시 워치 FE,갤럭시 워치 울트라2,갤럭시 워치 울트라,갤럭시 워치9,갤럭시 워치8,갤럭시 워치7,갤럭시 워치6,갤럭시 워치5,갤럭시 워치4,갤럭시 워치3,갤럭시 워치,갤럭시 워치 액티브2,갤럭시 워치 액티브",
          "삼성 덱스 서포트: 지원",
          "SmartThings 지원: 지원",
          "블루투스 보청기 지원: 보청기용 안드로이드 오디오 스트리밍 프로토콜 (ASHA)",
          "모바일 TV: 아니오"
        ]
      },
      {
        "title": "소프트웨어 지원",
        "items": [
          "보안 업데이트 지원 기한: 2033년 07월 31일"
        ]
      },
      {
        "title": "상품 기본정보",
        "items": [
          "제품명(기자재명칭): 5G NR 이동통신용 무선설비의 기기(3.5 GHz)(육상이동국의 송수신장치)",
          "제조자/수입자: 삼성전자㈜",
          "제조국가: 한국, 베트남",
          "KC 인증 필 유무: R-C-SEC-SMF976",
          "동일모델의 출시년월: 26년 7월",
          "A/S 책임자와 전화번호: 삼성전자서비스센터/1588-3366",
          "품질보증기준: 결함·하자 등에 따른 소비자 피해에 대해서는 소비자분쟁해결기준(소비자기본법 제16조)에 따라 보상 가능"
        ]
      }
    ],
    "conditions": [
      "화면 크기는 대각선 기준이며 실제 표시 영역은 더 작습니다.",
      "표시 용량과 사용 가능한 저장 공간은 다릅니다. 설치 소프트웨어와 설정에 따라 달라집니다.",
      "배터리 시험값은 제조사 시험 조건 기준입니다. 실제 사용 시간과 충전 시간은 환경에 따라 달라집니다.",
      "방수 성능은 영구적이지 않습니다. 시험 조건·액체 종류·마모 상태를 확인하세요.",
      "AI·결제·eSIM·네트워크 기능에는 지역·통신사·언어·계정·서비스별 조건이 적용됩니다."
    ]
  },
  "galaxy-z-fold8": {
    "source": "galaxy-z-fold8",
    "checkedAt": "2026-09-30",
    "scope": "한국 공식 상세 사양 표. 256GB 기준 공통 항목과 용량별 메모리 차이를 정리했습니다.",
    "sections": [
      {
        "title": "프로세서",
        "items": [
          "CPU 속도: 4.74GHz,3.6GHz",
          "CPU 종류: Octa-Core"
        ]
      },
      {
        "title": "디스플레이",
        "items": [
          "크기 (Main Display): 193.2mm",
          "해상도 (Main Display): 1848 x 2448 (QXGA+)",
          "종류 (Main Display): Dynamic AMOLED 2X",
          "색심도 (Main Display): 16M",
          "최대 주사율 (Main Display): 120Hz",
          "크기 (Sub Display): 138.4mm",
          "해상도 (Sub Display): 1972 x 1248 (WUXGA+)",
          "종류 (Sub Display): Dynamic AMOLED 2X",
          "색심도 (Sub Display): 16M"
        ]
      },
      {
        "title": "카메라",
        "items": [
          "후면 카메라 - 화소 (Multiple): 50.0MP + 50.0MP",
          "후면 카메라 - 조리개 값 (Multiple): F1.8, F1.9",
          "후면 카메라 - 오토 포커스: 예",
          "후면 카메라 - OIS: 예",
          "후면 카메라 - 줌: 광학 줌 수준의 2배 줌(적응형 픽셀 센서 활용), 최대 10배 디지털 줌",
          "후면 카메라 - 플래쉬: 예",
          "전면 카메라 - 화소: 10.0MP",
          "전면 카메라 - 조리개 값: F2.2",
          "전면 카메라 - 오토 포커스: 아니오",
          "커버 카메라 - 화소: 10.0 MP",
          "커버 카메라 - 조리개 값: F2.2",
          "커버 카메라 - 오토 포커스: 아니오",
          "동영상 녹화 해상도: UHD 8K (7680 x 4320) | @30fps",
          "슬로우 모션: 240fps @FHD,120fps @FHD,120fps @UHD"
        ]
      },
      {
        "title": "메모리/스토리지",
        "items": [
          "메모리: 12GB",
          "스토리지(저장 용량): 256GB",
          "사용 가능한 스토리지(저장 용량): 225.9GB",
          "512GB: RAM 12GB / 사용 가능 480.9GB",
          "1TB: RAM 16GB / 사용 가능 991.4GB"
        ]
      },
      {
        "title": "네트워크",
        "items": [
          "SIM 개수: Dual-SIM",
          "SIM 슬롯 타입: SIM 1 + eSIM / Dual eSIM"
        ]
      },
      {
        "title": "네트워크 (S/W 사용)",
        "items": [
          "2G GSM: GSM850,GSM900,DCS1800,PCS1900",
          "3G UMTS: B1(2100),B2(1900),B4(AWS),B5(850),B8(900)",
          "4G FDD LTE: B1(2100),B2(1900),B3(1800),B4(AWS),B5(850),B7(2600),B8(900),B12(700),B13(700),B17(700),B18(800),B19(800),B20(800),B25(1900),B26(850),B28(700),B66(AWS-3)",
          "4G TDD LTE: B38(2600),B39(1900),B40(2300),B41(2500)",
          "5G FDD Sub6: N1(2100),N2(1900),N3(1800),N5(850),N7(2600),N8(900),N12(700),N20(800),N25(1900),N26(850),N28(700),N66(AWS-3)",
          "5G TDD Sub6: N38(2600),N40(2300),N41(2500),N77(3700),N78(3500)"
        ]
      },
      {
        "title": "연결",
        "items": [
          "USB 인터페이스: USB Type-C",
          "USB 버전: USB 3.2 Gen 1",
          "위치 기술: GPS,Glonass,Beidou,Galileo,QZSS",
          "이어잭: USB Type-C",
          "MHL: 아니오",
          "Wi-Fi: 802.11a/b/g/n/ac/ax/be 2.4GHz+5GHz+6GHz, EHT320, MIMO, 4096-QAM",
          "Wi-Fi Direct: 예",
          "블루투스 버전: Bluetooth v6.0",
          "NFC: 예",
          "UWB (Ultra-Wideband): 예",
          "PC 싱크: Smart Switch (PC version)"
        ]
      },
      {
        "title": "운영체제",
        "items": [
          "Android"
        ]
      },
      {
        "title": "기본 사양",
        "items": [
          "색상: 피스타치오",
          "형태: 폴더"
        ]
      },
      {
        "title": "센서",
        "items": [
          "가속도 센서,기압 센서,지문 센서,자이로 센서,지자기 센서,홀 센서,조도 센서,근접 센서"
        ]
      },
      {
        "title": "외관 사양",
        "items": [
          "크기(세로x가로x두께, mm): 123.9 x 161.4 x 4.5",
          "접힌 상태 시 크기(세로x가로x두께, mm): 123.9 x 81.9 x 9.7",
          "무게(g): 201g"
        ]
      },
      {
        "title": "배터리",
        "items": [
          "비디오 재생 시간 (Hours, Wireless): 최대 26",
          "배터리 용량 (mAh, Typical): 4,800",
          "교체 가능: 아니오"
        ]
      },
      {
        "title": "오디오/비디오",
        "items": [
          "스테레오 지원: 예",
          "동영상 지원 포맷: MP4,M4V,3GP,3G2,AVI,FLV,MKV,WEBM",
          "동영상 지원 해상도: UHD 8K (7680 x 4320) | @60fps",
          "오디오 지원 포맷: MP3,M4A,3GA,AAC,OGG,OGA,WAV,AMR,AWB,FLAC,MID,MIDI,XMF,MXMF,IMY,RTTTL,RTX,OTA,DFF,DSF,APE"
        ]
      },
      {
        "title": "서비스",
        "items": [
          "Gear 서포트: 갤럭시 링,갤럭시 버즈 코어,갤럭시 버즈4 프로,갤럭시 버즈3 프로,갤럭시 버즈2 프로,갤럭시 버즈 프로,갤럭시 버즈 라이브,갤럭시 버즈+,갤럭시 버즈4,갤럭시 버즈3,갤럭시 버즈2,갤럭시 버즈,갤럭시 버즈3 FE,갤럭시 버즈 FE,갤럭시 핏3,갤럭시 핏2,갤럭시 워치 FE,갤럭시 워치 울트라2,갤럭시 워치 울트라,갤럭시 워치9,갤럭시 워치8,갤럭시 워치7,갤럭시 워치6,갤럭시 워치5,갤럭시 워치4,갤럭시 워치3,갤럭시 워치,갤럭시 워치 액티브2,갤럭시 워치 액티브",
          "삼성 덱스 서포트: 지원",
          "SmartThings 지원: 지원",
          "블루투스 보청기 지원: 보청기용 안드로이드 오디오 스트리밍 프로토콜 (ASHA)",
          "모바일 TV: 아니오"
        ]
      },
      {
        "title": "소프트웨어 지원",
        "items": [
          "보안 업데이트 지원 기한: 2033년 07월 31일"
        ]
      },
      {
        "title": "상품 기본정보",
        "items": [
          "제품명(기자재명칭): 5G NR 이동통신용 무선설비의 기기(3.5 GHz)(육상이동국의 송수신장치)",
          "제조자/수입자: 삼성전자㈜",
          "제조국가: 한국, 베트남",
          "KC 인증 필 유무: R-C-SEC-SMF971",
          "동일모델의 출시년월: 26년 7월",
          "A/S 책임자와 전화번호: 삼성전자서비스센터/1588-3366",
          "품질보증기준: 결함·하자 등에 따른 소비자 피해에 대해서는 소비자분쟁해결기준(소비자기본법 제16조)에 따라 보상 가능"
        ]
      }
    ],
    "conditions": [
      "화면 크기는 대각선 기준이며 실제 표시 영역은 더 작습니다.",
      "표시 용량과 사용 가능한 저장 공간은 다릅니다. 설치 소프트웨어와 설정에 따라 달라집니다.",
      "배터리 시험값은 제조사 시험 조건 기준입니다. 실제 사용 시간과 충전 시간은 환경에 따라 달라집니다.",
      "방수 성능은 영구적이지 않습니다. 시험 조건·액체 종류·마모 상태를 확인하세요.",
      "AI·결제·eSIM·네트워크 기능에는 지역·통신사·언어·계정·서비스별 조건이 적용됩니다."
    ]
  },
  "galaxy-z-flip8": {
    "source": "galaxy-z-flip8",
    "checkedAt": "2026-09-30",
    "scope": "한국 공식 상세 사양 표. 256GB 기준 공통 항목과 용량별 메모리 차이를 정리했습니다.",
    "sections": [
      {
        "title": "프로세서",
        "items": [
          "CPU 속도: 3.8GHz,3.26GHz,2.76GHz",
          "CPU 종류: Deca-Core"
        ]
      },
      {
        "title": "디스플레이",
        "items": [
          "크기(Main): 174.1mm",
          "해상도(Main): 2520 × 1080 (FHD+)",
          "패널(Main): Dynamic AMOLED 2X",
          "색심도(Main): 16M",
          "최대 주사율(Main): 120Hz",
          "크기(Sub): 104.8mm",
          "해상도(Sub): 1048 × 948",
          "패널(Sub): Super AMOLED",
          "색심도(Sub): 16M"
        ]
      },
      {
        "title": "카메라",
        "items": [
          "후면 화소: 50.0MP + 12.0MP",
          "후면 조리개: F1.8, F2.2",
          "후면 AF: 예",
          "후면 OIS: 예",
          "줌: 광학 줌 수준 2배 / 디지털 최대 10배",
          "후면 플래시: 예",
          "전면 화소: 10.0MP",
          "전면 조리개: F2.2",
          "전면 AF: 아니오",
          "동영상 녹화: UHD 4K(3840 × 2160) @60fps",
          "슬로 모션: 240fps @FHD, 120fps @FHD"
        ]
      },
      {
        "title": "메모리/스토리지",
        "items": [
          "메모리: 12GB",
          "스토리지(저장 용량): 256GB",
          "사용 가능한 스토리지(저장 용량): 226.6GB",
          "512GB: RAM 12GB / 사용 가능 481.0GB"
        ]
      },
      {
        "title": "네트워크",
        "items": [
          "SIM 개수: Dual-SIM",
          "SIM 슬롯 타입: SIM 1 + eSIM / Dual eSIM"
        ]
      },
      {
        "title": "네트워크 (S/W 사용)",
        "items": [
          "2G GSM: GSM850,GSM900,DCS1800,PCS1900",
          "3G UMTS: B1(2100),B2(1900),B4(AWS),B5(850),B8(900)",
          "4G FDD LTE: B1(2100),B2(1900),B3(1800),B4(AWS),B5(850),B7(2600),B8(900),B12(700),B13(700),B17(700),B18(800),B19(800),B20(800),B25(1900),B26(850),B28(700),B66(AWS-3)",
          "4G TDD LTE: B38(2600),B39(1900),B40(2300),B41(2500)",
          "5G FDD Sub6: N1(2100),N2(1900),N3(1800),N5(850),N7(2600),N8(900),N12(700),N20(800),N25(1900),N26(850),N28(700),N66(AWS-3)",
          "5G TDD Sub6: N38(2600),N40(2300),N41(2500),N77(3700),N78(3500)"
        ]
      },
      {
        "title": "연결",
        "items": [
          "USB 인터페이스: USB Type-C",
          "USB 버전: USB 3.2 Gen 1",
          "위치 기술: GPS,Glonass,Beidou,Galileo,QZSS",
          "이어잭: USB Type-C",
          "MHL: 아니오",
          "Wi-Fi: 802.11a/b/g/n/ac/ax/be 2.4GHz+5GHz+6GHz, EHT320, MIMO, 4096-QAM",
          "Wi-Fi Direct: 예",
          "블루투스 버전: Bluetooth v5.4",
          "NFC: 예",
          "UWB (Ultra-Wideband): 예",
          "PC 싱크: Smart Switch (PC version)"
        ]
      },
      {
        "title": "운영체제",
        "items": [
          "Android"
        ]
      },
      {
        "title": "기본 사양",
        "items": [
          "색상: 핑크, 그라파이트, 크림",
          "형태: 플립"
        ]
      },
      {
        "title": "센서",
        "items": [
          "가속도 센서,기압 센서,지문 센서,자이로 센서,지자기 센서,홀 센서,조도 센서,근접 센서"
        ]
      },
      {
        "title": "외관 사양",
        "items": [
          "크기(세로x가로x두께, mm): 166.9 x 75.4 x 6.1",
          "접힌 상태 시 크기(세로x가로x두께, mm): 85.7 x 75.4 x 13.1",
          "무게(g): 180g"
        ]
      },
      {
        "title": "배터리",
        "items": [
          "비디오 재생 시간 (Hours, Wireless): 최대 31",
          "배터리 용량 (mAh, Typical): 4,300",
          "교체 가능: 아니오"
        ]
      },
      {
        "title": "오디오/비디오",
        "items": [
          "스테레오 지원: 예",
          "동영상 지원 포맷: MP4,M4V,3GP,3G2,AVI,FLV,MKV,WEBM",
          "동영상 지원 해상도: UHD 8K (7680 x 4320) | @60fps",
          "오디오 지원 포맷: MP3,M4A,3GA,AAC,OGG,OGA,WAV,AMR,AWB,FLAC,MID,MIDI,XMF,MXMF,IMY,RTTTL,RTX,OTA,DFF,DSF,APE"
        ]
      },
      {
        "title": "서비스",
        "items": [
          "Gear 서포트: 갤럭시 링,갤럭시 버즈 코어,갤럭시 버즈4 프로,갤럭시 버즈3 프로,갤럭시 버즈2 프로,갤럭시 버즈 프로,갤럭시 버즈 라이브,갤럭시 버즈+,갤럭시 버즈4,갤럭시 버즈3,갤럭시 버즈2,갤럭시 버즈,갤럭시 버즈3 FE,갤럭시 버즈 FE,갤럭시 핏3,갤럭시 핏2,갤럭시 워치 FE,갤럭시 워치 울트라2,갤럭시 워치 울트라,갤럭시 워치9,갤럭시 워치8,갤럭시 워치7,갤럭시 워치6,갤럭시 워치5,갤럭시 워치4,갤럭시 워치3,갤럭시 워치,갤럭시 워치 액티브2,갤럭시 워치 액티브",
          "삼성 덱스 서포트: 지원",
          "SmartThings 지원: 지원",
          "블루투스 보청기 지원: 보청기용 안드로이드 오디오 스트리밍 프로토콜 (ASHA)",
          "모바일 TV: 아니오"
        ]
      },
      {
        "title": "소프트웨어 지원",
        "items": [
          "보안 업데이트 지원 기한: 2033년 07월 31일"
        ]
      },
      {
        "title": "상품 기본정보",
        "items": [
          "제품명(기자재명칭): 5G NR 이동통신용 무선설비의 기기(3.5 GHz)(육상이동국의 송수신장치)",
          "제조자/수입자: 삼성전자㈜",
          "제조국가: 한국, 베트남",
          "KC 인증 필 유무: R-C-SEC-SMF776",
          "동일모델의 출시년월: 26년 7월",
          "A/S 책임자와 전화번호: 삼성전자서비스센터/1588-3366",
          "품질보증기준: 결함·하자 등에 따른 소비자 피해에 대해서는 소비자분쟁해결기준(소비자기본법 제16조)에 따라 보상 가능"
        ]
      }
    ],
    "conditions": [
      "화면 크기는 대각선 기준이며 실제 표시 영역은 더 작습니다.",
      "표시 용량과 사용 가능한 저장 공간은 다릅니다. 설치 소프트웨어와 설정에 따라 달라집니다.",
      "배터리 시험값은 제조사 시험 조건 기준입니다. 실제 사용 시간과 충전 시간은 환경에 따라 달라집니다.",
      "방수 성능은 영구적이지 않습니다. 시험 조건·액체 종류·마모 상태를 확인하세요.",
      "AI·결제·eSIM·네트워크 기능에는 지역·통신사·언어·계정·서비스별 조건이 적용됩니다."
    ]
  },
  "galaxy-a37": {
    "source": "galaxy-a37",
    "checkedAt": "2026-09-30",
    "scope": "한국 공식 지원 문서 SM-A376N, 6GB / 128GB 사양 표. 출시 발표의 색상·방수 조건을 보완했습니다.",
    "sections": [
      {
        "title": "프로세서",
        "items": [
          "CPU 속도: 2.75GHz,2 GHz",
          "CPU 종류: Octa-Core"
        ]
      },
      {
        "title": "디스플레이",
        "items": [
          "크기 (Main Display): 170.1 mm",
          "해상도 (Main Display): 1080 x 2340 (FHD+)",
          "종류 (Main Display): Super AMOLED",
          "색심도 (Main Display): 16 M",
          "최대 주사율 (Main Display): 120 Hz"
        ]
      },
      {
        "title": "카메라",
        "items": [
          "후면 카메라 - 화소 (Multiple): 50.0 MP + 8.0 MP + 5.0 MP",
          "후면 카메라 - 조리개 값 (Multiple): F1.8 , F2.2 , F2.4",
          "후면 카메라 - 오토 포커스: 예",
          "후면 카메라 - OIS: 예",
          "후면 카메라 줌: 최대 10배 디지털줌",
          "전면 카메라 - 화소: 12.0 MP",
          "전면 카메라 - 조리개 값: F2.2",
          "전면 카메라 - 오토 포커스: 아니오",
          "전면 카메라 - OIS: 아니오",
          "후면 카메라 - 플래쉬: 예",
          "전면 카메라 - 플래쉬: 아니오",
          "동영상 녹화 해상도: UHD 4K (3840 x 2160) @30fps",
          "슬로우 모션: 240fps @HD"
        ]
      },
      {
        "title": "메모리/스토리지",
        "items": [
          "메모리 (GB): 6 GB",
          "스토리지(저장 용량) (GB): 128 GB",
          "사용 가능한 스토리지(저장 용량) (GB): 107.5GB"
        ]
      },
      {
        "title": "네트워크",
        "items": [
          "SIM 개수: Dual-SIM",
          "SIM 슬롯 타입: SIM 1 + eSIM / Dual eSIM"
        ]
      },
      {
        "title": "네트워크 (S/W 사용)",
        "items": [
          "2G GSM: GSM850,GSM900,DCS1800,PCS1900",
          "3G UMTS: B1(2100),B2(1900),B4(AWS),B5(850),B8(900)",
          "4G FDD LTE: B1(2100),B2(1900),B3(1800),B4(AWS),B5(850),B7(2600),B8(900),B12(700),B17(700),B20(800),B26(850),B28(700),B66(AWS-3)",
          "4G TDD LTE: B38(2600),B40(2300),B41(2500)",
          "5G FDD Sub6: N1(2100),N3(1800),N5(850),N7(2600),N8(900),N20(800),N28(700),N66(AWS-3)",
          "5G TDD Sub6: N38(2600),N40(2300),N41(2500),N77(3700),N78(3500)"
        ]
      },
      {
        "title": "연결",
        "items": [
          "USB 인터페이스: USB Type-C",
          "USB 버전: USB 2.0",
          "위치 기술: GPS,Glonass,Beidou,Galileo,QZSS",
          "이어잭: USB Type-C",
          "MHL: 아니오",
          "Wi-Fi: 802.11a/b/g/n/ac/ax 2.4GHz+5GHz, HE80, MIMO, 1024-QAM",
          "Wi-Fi Direct: 예",
          "블루투스 버전: Bluetooth v5.3",
          "NFC: 예",
          "PC 싱크: Smart Switch (PC version)"
        ]
      },
      {
        "title": "운영체제",
        "items": [
          "OS Android"
        ]
      },
      {
        "title": "기본 사양",
        "items": [
          "색상: 어썸 차콜",
          "형태: 터치 바",
          "국내 출시 색상: 어썸 라벤더·어썸 화이트·어썸 차콜"
        ]
      },
      {
        "title": "센서",
        "items": [
          "Sensors: 가속도 센서,지문 센서,자이로 센서,지자기 센서,조도 센서,가상근접 센싱"
        ]
      },
      {
        "title": "외관 사양",
        "items": [
          "크기(세로x가로x두께, mm): 162.9 x 78.2 x 7.4",
          "무게 (g): 196"
        ]
      },
      {
        "title": "배터리",
        "items": [
          "비디오 재생 시간 (Hours, Wireless): 최대 29",
          "배터리 용량 (mAh, Typical): 5000",
          "교체 가능: 아니오"
        ]
      },
      {
        "title": "오디오/비디오",
        "items": [
          "스테레오 지원: 예",
          "동영상 지원 포맷: MP4,M4V,3GP,3G2,AVI,FLV,MKV,WEBM",
          "동영상 지원 해상도: UHD 4K (3840 x 2160) @60fps",
          "오디오 지원 포맷: MP3,M4A,3GA,AAC,OGG,OGA,WAV,AMR,AWB,FLAC,MID,MIDI,XMF,MXMF,IMY,RTTTL,RTX,OTA"
        ]
      },
      {
        "title": "서비스",
        "items": [
          "Gear 서포트: 갤럭시 링,갤럭시 버즈 코어,갤럭시 버즈4 프로,갤럭시 버즈3 프로,갤럭시 버즈2 프로,갤럭시 버즈 프로,갤럭시 버즈 라이브,갤럭시 버즈+,갤럭시 버즈4,갤럭시 버즈3,갤럭시 버즈2,갤럭시 버즈,갤럭시 버즈3 FE,갤럭시 버즈 FE,갤럭시 핏3,갤럭시 핏2,갤럭시 워치 FE,갤럭시 워치 울트라,갤럭시 워치8,갤럭시 워치7,갤럭시 워치6,갤럭시 워치5,갤럭시 워치4,갤럭시 워치3,갤럭시 워치,갤럭시 워치 액티브2,갤럭시 워치 액티브",
          "삼성 덱스 서포트: 미지원",
          "SmartThings 지원: 지원",
          "블루투스 보청기 지원: 보청기용 안드로이드 오디오 스트리밍(ASHA)",
          "모바일 TV: 아니오"
        ]
      },
      {
        "title": "소프트웨어 지원",
        "items": [
          "보안 업데이트 지원 기한: 2032년 3월 31일"
        ]
      }
    ],
    "conditions": [
      "화면 크기는 대각선 기준이며 실제 표시 영역은 더 작습니다.",
      "표시 용량과 사용 가능한 저장 공간은 다릅니다. 설치 소프트웨어와 설정에 따라 달라집니다.",
      "배터리 시험값은 제조사 시험 조건 기준입니다. 실제 사용 시간과 충전 시간은 환경에 따라 달라집니다.",
      "방수 성능은 영구적이지 않습니다. 시험 조건·액체 종류·마모 상태를 확인하세요.",
      "AI·결제·eSIM·네트워크 기능에는 지역·통신사·언어·계정·서비스별 조건이 적용됩니다."
    ]
  },
  "iphone-18-pro": {
    "source": "iphone-18-pro",
    "checkedAt": "2026-09-30",
    "scope": "Apple 한국 제품 사양 페이지의 기술 항목·목록. 홍보 문장은 사실 중심으로 요약했습니다. 각주별 상세 시험·지원 조건은 원문도 확인하세요.",
    "sections": [
      {
        "title": "마감",
        "items": [
          "블랙, 실버, 글레이셔, 버건디",
          "알루미늄 Unibody 디자인",
          "Ceramic Shield 2 전면",
          "Ceramic Shield 후면"
        ]
      },
      {
        "title": "저장 용량",
        "items": [
          "256GB",
          "512GB",
          "1TB",
          "2TB"
        ]
      },
      {
        "title": "크기 및 무게",
        "items": [
          "150.0 × 71.9 × 8.75mm / 211g"
        ]
      },
      {
        "title": "디스플레이",
        "items": [
          "Super Retina XDR OLED / 15.9cm(6.3형) / 직각 대각선 15.93cm",
          "2622 × 1206 / 460ppi",
          "Dynamic Island",
          "상시표시형 디스플레이",
          "최대 120Hz 가변 재생률을 제공하는 ProMotion 기술",
          "HDR 디스플레이",
          "True Tone",
          "넓은 색영역(P3)",
          "햅틱 터치",
          "2,000,000:1 명암비(일반)",
          "1000 니트 전체 최대 밝기(일반); 1600 니트 부분 최대 밝기(HDR); 3000 니트 부분 최대 밝기(야외); 1 니트 최소 밝기",
          "지문 및 유분 방지 코팅",
          "반사 방지 코팅",
          "여러 언어 및 문자 동시 표시 지원"
        ]
      },
      {
        "title": "방수 및 방진",
        "items": [
          "IEC 규격 60529하의 IP68 등급 획득(최대 수심 6m, 최대 30분)"
        ]
      },
      {
        "title": "Apple Intelligence 그리고 Siri AI",
        "items": [
          "Apple Intelligence 및 Siri AI 지원. 기능·언어·지역별 제공 조건을 확인하세요."
        ]
      },
      {
        "title": "칩",
        "items": [
          "A20 Pro 칩",
          "6코어 CPU(슈퍼 코어 2개 및 효율 코어 4개)",
          "7코어 GPU(Neural Accelerators 탑재)",
          "듀얼 16코어 Neural Engine",
          "하드웨어 가속형 레이 트레이싱"
        ]
      },
      {
        "title": "카메라",
        "items": [
          "48MP 프로 Fusion 카메라 시스템",
          "48MP Fusion 메인(가변 조리개 ƒ/1.48, ƒ/1.8, ƒ/2.8, ƒ/4.0 탑재): 24mm, 2세대 센서 시프트 광학 이미지 흔들림 보정(OIS), 100% Focus Pixels, 초고해상도 사진 지원(24MP 및 48MP)",
          "12MP 광학 퀄리티 2배 망원도 가능: 48mm, 2세대 센서 시프트 광학 이미지 흔들림 보정(OIS), 100% Focus Pixels",
          "48MP Fusion 울트라 와이드: 13mm, ƒ/2.2 조리개 및 120° 시야각, 하이브리드 Focus Pixels, 초고해상도 사진 지원(24MP 및 48MP)",
          "48MP Fusion 망원: 100mm(4배), ƒ/2.8 조리개, 하이브리드 Focus Pixels, 3D 센서 시프트 광학 이미지 흔들림 보정(OIS) 및 오토포커스, 테트라프리즘 디자인, 초고해상도 사진 지원(24MP 및 48MP)",
          "12MP 광학 퀄리티 8배 망원도 가능: 200mm, ƒ/2.8 조리개, 하이브리드 Focus Pixels, 3D 센서 시프트 광학 이미지 흔들림 보정(OIS) 및 오토포커스, 테트라프리즘 디자인",
          "8배 광학 퀄리티 줌인, 2배 광학 줌아웃, 16배 광학 퀄리티 줌 범위",
          "최대 40배 디지털 줌",
          "맞춤 설정 가능한 기본 렌즈(Fusion 메인)",
          "렌즈 조리개, 셔터 속도, 화이트 밸런스, 히스토그램 보기를 지원하는 Pro용 제어 기능",
          "Apple 레퍼런스 이미지(Fusion 메인)",
          "사파이어 크리스털 렌즈 커버",
          "적응형 True Tone 플래시",
          "Photonic Engine",
          "Deep Fusion",
          "스마트 HDR 5",
          "초점 및 심도 제어 기능을 지원하는 한 차원 높은 인물 사진",
          "6가지 효과의 인물 사진 조명",
          "야간 모드",
          "파노라마(최대 63MP)",
          "사진 스타일 3",
          "공간 사진",
          "48MP 접사 사진",
          "ProRAW",
          "사진 및 Live Photo 촬영 시 넓은 색영역 포착",
          "렌즈 보정(Fusion 울트라 와이드)",
          "첨단 적목 보정",
          "자동 흔들림 보정",
          "고속 연사 모드",
          "사진 위치 표시 기능",
          "촬영 이미지 포맷: HEIF, JPEG, DNG"
        ]
      },
      {
        "title": "동영상 촬영",
        "items": [
          "4K Dolby Vision 동영상 촬영(초당 24, 25, 30, 60, 100 또는 120 프레임, 100 또는 120 프레임은 Fusion 메인 전용)",
          "1080p Dolby Vision 동영상 촬영(초당 25, 30, 60 또는 120 프레임, 120 프레임은 Fusion 메인 전용)",
          "720p Dolby Vision 동영상 촬영(초당 30 프레임)",
          "시네마틱 모드(최대 4K Dolby Vision, 초당 60 프레임)",
          "동영상의 시네마틱 모드 효과(Fusion 메인)",
          "렌즈 조리개, 셔터 속도, 화이트 밸런스, 히스토그램 보기를 지원하는 Pro용 제어 기능",
          "스마트 초점 추적",
          "향상된 저조도 동영상 촬영(1080p)",
          "액션 모드(최대 2.8K Dolby Vision, 초당 60 프레임)",
          "1080p 공간 비디오 촬영(초당 30 프레임)",
          "외부 저장 매체 활용 시 최대 4K ProRes 동영상 촬영(초당 120 프레임)",
          "ProRes RAW",
          "ACES(Academy Color Encoding System)",
          "Apple Log 2",
          "Genlock 지원",
          "접사 동영상 촬영(슬로 모션 및 타임랩스 포함)",
          "1080p 슬로 모션 동영상 지원(초당 최대 240 프레임) 및 4K Dolby Vision 슬로 모션 동영상 지원(초당 최대 120 프레임, Fusion 메인)",
          "듀얼 캡처(최대 4K Dolby Vision, 초당 30 프레임)",
          "타임랩스 동영상(동영상 흔들림 보정 포함, 최대 4K Dolby Vision)",
          "야간 모드 타임랩스",
          "QuickTake 동영상(최대 4K Dolby Vision, 초당 60 프레임)",
          "동영상을 위한 2세대 센서 시프트 광학 이미지 흔들림 보정(OIS)(Fusion 메인)",
          "동영상을 위한 3D 센서 시프트 광학 이미지 흔들림 보정(OIS) 및 오토포커스(Fusion 망원)",
          "최대 24배 디지털 줌",
          "오디오 줌",
          "True Tone 플래시",
          "시네마틱 동영상 흔들림 보정(4K, 1080p 및 720p)",
          "연속 오토포커스 동영상",
          "4K 동영상 촬영 중 8MP 사진 촬영",
          "재생 중 줌",
          "녹화 동영상 포맷: HEVC, H.264, ProRes, ProRes RAW",
          "공간 음향 및 스테레오 녹음",
          "4개의 스튜디오급 마이크",
          "바람 소리 감소",
          "오디오 믹스"
        ]
      },
      {
        "title": "전면 카메라",
        "items": [
          "18MP Center Stage 카메라",
          "ƒ/1.9 조리개",
          "Focus Pixels 방식 오토포커스",
          "Retina Flash",
          "탭해서 줌 및 회전",
          "사진을 위한 센터 스테이지",
          "초강력 흔들림 보정 동영상",
          "듀얼 캡처",
          "영상 통화를 위한 센터 스테이지",
          "셔터 속도, 화이트 밸런스, 히스토그램 보기를 지원하는 Pro용 제어 기능",
          "Photonic Engine",
          "Deep Fusion",
          "스마트 HDR 5",
          "초점 및 심도 제어 기능을 지원하는 한 차원 높은 인물 사진",
          "6가지 효과의 인물 사진 조명",
          "애니모지와 미모지",
          "야간 모드",
          "사진 스타일 3",
          "향상된 저조도 동영상 촬영(1080p)",
          "ProRAW",
          "사진 및 Live Photo 촬영 시 넓은 색영역 포착",
          "렌즈 보정",
          "자동 흔들림 보정",
          "고속 연사 모드",
          "4K Dolby Vision 동영상 촬영(초당 24, 25, 30 또는 60 프레임)",
          "1080p Dolby Vision 동영상 촬영(초당 25, 30 또는 60 프레임)",
          "시네마틱 모드(최대 4K Dolby Vision, 초당 30 프레임)",
          "동영상의 시네마틱 모드 효과",
          "외부 저장 매체 활용 ProRes 동영상 촬영(최대 4K, 초당 60 프레임)",
          "ProRes RAW",
          "ACES(Academy Color Encoding System)",
          "Apple Log 2",
          "1080p 슬로 모션 동영상 지원(초당 120 프레임)",
          "타임랩스 동영상(동영상 흔들림 보정 포함, 최대 4K Dolby Vision)",
          "야간 모드 타임랩스",
          "QuickTake 동영상(최대 4K Dolby Vision, 초당 60 프레임)",
          "시네마틱 동영상 흔들림 보정(4K, 1080p 및 720p)",
          "공간 음향 및 스테레오 녹음",
          "바람 소리 감소",
          "오디오 믹스"
        ]
      },
      {
        "title": "전원 및 배터리",
        "items": [
          "동영상 최대 34시간 / 스트리밍 최대 31시간 (eSIM 전용 모델 시험)",
          "충전식 리튬 이온 배터리 내장",
          "* 급속 충전 가능: USB‑C 충전 케이블과 함께 가변 전압 공급 기술(AVS)을 지원하는 60W 이상 규격의 어댑터 사용 시 약 15분에 최대 50% 충전(어댑터 별매)",
          "MagSafe 충전기와 함께 35W 이상 규격의 어댑터 사용 시 30분에 최대 50% 충전(충전기 및 어댑터 별매)"
        ]
      },
      {
        "title": "Face ID",
        "items": [
          "Center Stage 전면 카메라의 TrueDepth 기술을 통해 지원"
        ]
      },
      {
        "title": "안심 기능",
        "items": [
          "긴급 구조 요청",
          "충돌 감지"
        ]
      },
      {
        "title": "셀룰러 및 무선 기술",
        "items": [
          "모델 A3714 및 A3717*",
          "FDD-5G NR (대역 n1, n2, n3, n5, n7, n8, n12, n20, n25, n26, n28, n30, n66, n70, n75)",
          "TDD-5G NR (대역 n38, n40, n41, n48, n53, n77, n78, n79)",
          "FDD-LTE (대역 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 66, 106)",
          "TDD-LTE (대역 34, 38, 39, 40, 41, 42, 48, 53)",
          "UMTS/HSPA+ (850, 900, 1700/2100, 1900, 2100MHz)",
          "GSM/EDGE (850, 900, 1800, 1900MHz)",
          "4x4 MIMO 방식을 지원하는 5G(sub-6 GHz)",
          "4x4 MIMO 방식을 지원하는 Gigabit LTE",
          "Apple N1 무선 네트워킹 칩",
          "2x2 MIMO 방식을 지원하는 Wi‑Fi 7(802.11be)",
          "Bluetooth 6",
          "Thread 네트워킹 기술",
          "Apple 2세대 초광대역 칩",
          "리더 모드를 지원하는 NFC",
          "예비 전력으로 작동하는 익스프레스 카드 기능",
          "Apple C2 셀룰러 모뎀"
        ]
      },
      {
        "title": "위치",
        "items": [
          "정밀 이중 주파수 GPS(GPS, GLONASS, Galileo, QZSS, BeiDou, NavIC)",
          "디지털 나침반",
          "Wi‑Fi",
          "셀룰러",
          "iBeacon 위치 정밀 감지 기능"
        ]
      },
      {
        "title": "외부 버튼 및 커넥터",
        "items": [
          "음량 올리기/내리기",
          "동작 버튼",
          "카메라 컨트롤",
          "측면 버튼",
          "내장 스테레오 스피커",
          "내장 마이크",
          "USB‑C 커넥터"
        ]
      },
      {
        "title": "동작 버튼 기능",
        "items": [
          "무음 모드, 집중 모드, 카메라, 비주얼 인텔리전스, 손전등, 음성 메모, 음악 인식, 번역, 확대기, 제어 항목, 단축어, 손쉬운 사용"
        ]
      },
      {
        "title": "카메라 컨트롤",
        "items": [
          "노출, 심도, 확대/축소, 카메라, 스타일, 색조"
        ]
      },
      {
        "title": "충전 및 확장",
        "items": [
          "* 다음을 지원하는 USB‑C 커넥터: 충전",
          "DisplayPort",
          "USB 3(최대 10Gb/s)",
          "MagSafe 및",
          "무선 충전",
          "최대 25W MagSafe 무선 충전",
          "최대 25W Qi2 무선 충전",
          "자석 어레이",
          "정렬 자석",
          "액세서리 식별용 NFC",
          "자력계"
        ]
      },
      {
        "title": "센서",
        "items": [
          "Face ID",
          "LiDAR 스캐너",
          "기압계",
          "하이 다이내믹 레인지 자이로",
          "고중력 가속도계",
          "근접 센서",
          "듀얼 주변광 센서"
        ]
      },
      {
        "title": "SIM 카드",
        "items": [
          "듀얼 SIM(nano-SIM 및 eSIM)",
          "듀얼 eSIM 지원"
        ]
      },
      {
        "title": "Apple Pay",
        "items": [
          "매장, 앱, 웹사이트에서 Face ID를 이용해 iPhone으로 결제",
          "Mac에서 Apple Pay 사용 시 iPhone으로 결제 완료",
          "익스프레스 교통카드로 대중교통 요금 결제"
        ]
      },
      {
        "title": "영상 통화",
        "items": [
          "셀룰러 또는 Wi‑Fi 네트워크에서 FaceTime 영상 통화",
          "5G 또는 Wi‑Fi 네트워크에서 FaceTime HD(1080p) 영상 통화",
          "영상 통화를 위한 센터 스테이지",
          "SharePlay",
          "화면 공유",
          "FaceTime 영상 통화 시 인물 사진 모드 지원",
          "공간 음향",
          "음성 분리 및 와이드 스펙트럼 마이크 모드",
          "후면 카메라를 이용한 광학 줌"
        ]
      },
      {
        "title": "음성 통화",
        "items": [
          "FaceTime 음성 통화",
          "LTE 음성 통화(VoLTE)",
          "SharePlay",
          "화면 공유",
          "공간 음향",
          "음성 분리 및 와이드 스펙트럼 마이크 모드"
        ]
      },
      {
        "title": "오디오 재생",
        "items": [
          "지원되는 포맷: AAC, APAC, MP3, Apple Lossless, FLAC, Dolby Digital, Dolby Digital Plus, Dolby Atmos",
          "공간 음향 재생",
          "최대 음량 제한 설정 가능"
        ]
      },
      {
        "title": "동영상 재생",
        "items": [
          "지원되는 포맷: HEVC, H.264, AV1, ProRes",
          "Dolby Vision, HDR10+/HDR10, HLG를 지원하는 HDR",
          "최대 4K HDR AirPlay 미러링, 사진, 동영상을 Apple TV(2세대 이후 모델) 또는 AirPlay 지원 스마트 TV로 출력",
          "동영상 미러링 및 동영상 출력 지원: USB‑C 또는 USB‑C Digital AV 어댑터 사용 시 기본 DisplayPort 출력을 통해 최대 4K HDR(모델 A2119, 어댑터 별매)"
        ]
      },
      {
        "title": "Siri",
        "items": [
          "메시지 전송, 미리 알림 설정 등 다양한 일상 작업들을 손쉽게 처리 가능",
          "“Siri야”라고 불러 음성만으로 핸즈프리 활성화, 또는 타이핑으로 Siri 사용"
        ]
      },
      {
        "title": "운영체제",
        "items": [
          "iOS 27"
        ]
      },
      {
        "title": "개인정보 보호",
        "items": [
          "앱 추적 승인·iMessage 및 FaceTime 종단간 암호화 지원."
        ]
      },
      {
        "title": "손쉬운 사용",
        "items": [
          "보조 접근",
          "VoiceOver",
          "확대/축소",
          "확대기",
          "음성 명령",
          "스위치 제어",
          "AssistiveTouch",
          "눈 추적",
          "청각 장애인용 자막",
          "실시간 자막",
          "개인 음성",
          "실시간 말하기",
          "타이핑으로 Siri 사용",
          "음성 단축어",
          "콘텐츠 말하기"
        ]
      },
      {
        "title": "내장 앱",
        "items": [
          "App Store",
          "도서",
          "계산기",
          "캘린더",
          "카메라",
          "시계",
          "나침반",
          "연락처",
          "FaceTime",
          "파일",
          "나의 찾기",
          "피트니스",
          "Freeform",
          "Games",
          "GarageBand",
          "건강",
          "홈",
          "iMovie",
          "iTunes Store",
          "일기",
          "Keynote",
          "확대기",
          "Mail",
          "지도",
          "측정",
          "메시지",
          "음악",
          "메모",
          "Numbers",
          "Pages",
          "암호",
          "전화",
          "사진",
          "팟캐스트",
          "미리보기",
          "미리 알림",
          "Safari",
          "설정",
          "단축어",
          "주식",
          "팁",
          "번역",
          "TV",
          "음성 메모",
          "지갑",
          "Watch",
          "날씨"
        ]
      },
      {
        "title": "보청기 호환 등급",
        "items": [
          "미국 HAC(보청기 호환성) 등급 보유"
        ]
      },
      {
        "title": "시스템 요구 사양",
        "items": [
          "Apple 계정(일부 기능에서 필요)",
          "인터넷 연결",
          "* Mac 또는 PC에서 동기화 시 요구 사양: macOS Catalina 10.15 이후 버전: Finder 사용",
          "macOS High Sierra 10.13부터 macOS Mojave 10.14.6까지: iTunes 12.8 이후 버전 사용"
        ]
      },
      {
        "title": "사용 환경",
        "items": [
          "작동 온도: 0°C~35°C",
          "보관 가능(비작동) 온도: −20°C~45°C",
          "상대 습도: 5%~95% 미응결",
          "작동 고도: 3,000m까지 테스트"
        ]
      },
      {
        "title": "언어",
        "items": [
          "언어 지원"
        ]
      },
      {
        "title": "제품 구성",
        "items": [
          "iOS 27이 설치된 iPhone",
          "USB‑C 충전 케이블(1m)"
        ]
      },
      {
        "title": "상품정보표시",
        "items": [
          "제품명: 스마트폰",
          "모델명: A3714, A3717",
          "수입자: 애플코리아 유한회사",
          "인증정보:  R-C-APA-A3714,",
          "R-C-APA-A3717",
          "제조자: Apple Inc.",
          "동일모델의 출시년월: 2026년 9월",
          "제조국: 중국",
          "* 품질보증기준: https://www.apple.com/kr/legal/warranty/",
          "서비스 연락처: 080-333-4000",
          "Apple 2030은 우리의 가치 사슬 전반에서 탄소 중립을 달성하겠다는 우리의 목표입니다. 우리는 탄소 집약도가 더 낮은 제품을 디자인하기 위해 재활용 및 재생 가능 원료와 저탄소 소재를 우선적으로 사용하는 동시에, 소프트웨어와 하드웨어의 에너지 효율성에 중점을 둡니다."
        ]
      },
      {
        "title": "소재",
        "items": [
          "iPhone 18 Pro 및 iPhone 18 Pro Max는 아래의 사항을 포함해 40%의 재활용 소재로 제작되었습니다.",
          "외장에 85% 재활용 알루미늄 사용",
          "배터리에 100% 재활용 코발트 사용",
          "Apple이 설계한 모든 인쇄 회로 기판의 도금과 솔더에 각각 100% 재활용 금과 주석 사용",
          "배터리에 95% 재활용 리튬 사용",
          "모든 자석에 100% 재활용 희토류 원소 사용",
          "배터리 외장 및 베이퍼 챔버 섀시를 비롯한 각종 부품에 80% 재활용 강철 사용",
          "Taptic Engine에 100% 재활용 텅스텐 사용"
        ]
      },
      {
        "title": "포장",
        "items": [
          "섬유 기반 소재가 100% 쓰인 포장재"
        ]
      },
      {
        "title": "에너지",
        "items": [
          "iPhone 18 Pro 및 iPhone 18 Pro Max 생산에 사용되는 전력의 50%를 재생 가능 전력으로 조달",
          "배터리 충전기 시스템에 관한 미 에너지부 요건 초과 충족"
        ]
      },
      {
        "title": "폐기물",
        "items": [
          "Apple의 ‘제로 폐기물 프로그램’에 따라 기존의 모든 최종 조립 시설에서 매립 폐기물 근절"
        ]
      },
      {
        "title": "더 스마트한 화학물질 사용",
        "items": [
          "Apple 규제 물질 명세서 적용."
        ]
      }
    ],
    "conditions": [
      "화면 크기는 대각선 기준이며 실제 표시 영역은 더 작습니다.",
      "표시 용량과 사용 가능한 저장 공간은 다릅니다. 설치 소프트웨어와 설정에 따라 달라집니다.",
      "배터리 시험값은 제조사 시험 조건 기준입니다. 실제 사용 시간과 충전 시간은 환경에 따라 달라집니다.",
      "방수 성능은 영구적이지 않습니다. 시험 조건·액체 종류·마모 상태를 확인하세요.",
      "AI·결제·eSIM·네트워크 기능에는 지역·통신사·언어·계정·서비스별 조건이 적용됩니다.",
      "동영상 재생 시험값은 eSIM 전용 모델 기준입니다. nano-SIM 모델의 배터리 시간으로 단정하지 않습니다.",
      "Siri AI 한국어는 공식 발표상 2026년 10월 지원 예정입니다. 지원 상태를 다시 확인하세요."
    ]
  },
  "iphone-18-pro-max": {
    "source": "iphone-18-pro-max",
    "checkedAt": "2026-09-30",
    "scope": "Apple 한국 제품 사양 페이지의 기술 항목·목록. 홍보 문장은 사실 중심으로 요약했습니다. 각주별 상세 시험·지원 조건은 원문도 확인하세요.",
    "sections": [
      {
        "title": "마감",
        "items": [
          "블랙, 실버, 글레이셔, 버건디",
          "알루미늄 Unibody 디자인",
          "Ceramic Shield 2 전면",
          "Ceramic Shield 후면"
        ]
      },
      {
        "title": "저장 용량",
        "items": [
          "256GB",
          "512GB",
          "1TB",
          "2TB"
        ]
      },
      {
        "title": "크기 및 무게",
        "items": [
          "163.4 × 78.0 × 8.75mm / 249g"
        ]
      },
      {
        "title": "디스플레이",
        "items": [
          "Super Retina XDR OLED / 17.4cm(6.9형) / 직각 대각선 17.42cm",
          "2868 × 1320 / 460ppi",
          "Dynamic Island",
          "상시표시형 디스플레이",
          "최대 120Hz 가변 재생률을 제공하는 ProMotion 기술",
          "HDR 디스플레이",
          "True Tone",
          "넓은 색영역(P3)",
          "햅틱 터치",
          "2,000,000:1 명암비(일반)",
          "1000 니트 전체 최대 밝기(일반); 1600 니트 부분 최대 밝기(HDR); 3000 니트 부분 최대 밝기(야외); 1 니트 최소 밝기",
          "지문 및 유분 방지 코팅",
          "반사 방지 코팅",
          "여러 언어 및 문자 동시 표시 지원"
        ]
      },
      {
        "title": "방수 및 방진",
        "items": [
          "IEC 규격 60529하의 IP68 등급 획득(최대 수심 6m, 최대 30분)"
        ]
      },
      {
        "title": "Apple Intelligence 그리고 Siri AI",
        "items": [
          "Apple Intelligence 및 Siri AI 지원. 기능·언어·지역별 제공 조건을 확인하세요."
        ]
      },
      {
        "title": "칩",
        "items": [
          "A20 Pro 칩",
          "6코어 CPU(슈퍼 코어 2개 및 효율 코어 4개)",
          "7코어 GPU(Neural Accelerators 탑재)",
          "듀얼 16코어 Neural Engine",
          "하드웨어 가속형 레이 트레이싱"
        ]
      },
      {
        "title": "카메라",
        "items": [
          "48MP 프로 Fusion 카메라 시스템",
          "48MP Fusion 메인(가변 조리개 ƒ/1.48, ƒ/1.8, ƒ/2.8, ƒ/4.0 탑재): 24mm, 2세대 센서 시프트 광학 이미지 흔들림 보정(OIS), 100% Focus Pixels, 초고해상도 사진 지원(24MP 및 48MP)",
          "12MP 광학 퀄리티 2배 망원도 가능: 48mm, 2세대 센서 시프트 광학 이미지 흔들림 보정(OIS), 100% Focus Pixels",
          "48MP Fusion 울트라 와이드: 13mm, ƒ/2.2 조리개 및 120° 시야각, 하이브리드 Focus Pixels, 초고해상도 사진 지원(24MP 및 48MP)",
          "48MP Fusion 망원: 100mm(4배), ƒ/2.8 조리개, 하이브리드 Focus Pixels, 3D 센서 시프트 광학 이미지 흔들림 보정(OIS) 및 오토포커스, 테트라프리즘 디자인, 초고해상도 사진 지원(24MP 및 48MP)",
          "12MP 광학 퀄리티 8배 망원도 가능: 200mm, ƒ/2.8 조리개, 하이브리드 Focus Pixels, 3D 센서 시프트 광학 이미지 흔들림 보정(OIS) 및 오토포커스, 테트라프리즘 디자인",
          "8배 광학 퀄리티 줌인, 2배 광학 줌아웃, 16배 광학 퀄리티 줌 범위",
          "최대 40배 디지털 줌",
          "맞춤 설정 가능한 기본 렌즈(Fusion 메인)",
          "렌즈 조리개, 셔터 속도, 화이트 밸런스, 히스토그램 보기를 지원하는 Pro용 제어 기능",
          "Apple 레퍼런스 이미지(Fusion 메인)",
          "사파이어 크리스털 렌즈 커버",
          "적응형 True Tone 플래시",
          "Photonic Engine",
          "Deep Fusion",
          "스마트 HDR 5",
          "초점 및 심도 제어 기능을 지원하는 한 차원 높은 인물 사진",
          "6가지 효과의 인물 사진 조명",
          "야간 모드",
          "파노라마(최대 63MP)",
          "사진 스타일 3",
          "공간 사진",
          "48MP 접사 사진",
          "ProRAW",
          "사진 및 Live Photo 촬영 시 넓은 색영역 포착",
          "렌즈 보정(Fusion 울트라 와이드)",
          "첨단 적목 보정",
          "자동 흔들림 보정",
          "고속 연사 모드",
          "사진 위치 표시 기능",
          "촬영 이미지 포맷: HEIF, JPEG, DNG"
        ]
      },
      {
        "title": "동영상 촬영",
        "items": [
          "4K Dolby Vision 동영상 촬영(초당 24, 25, 30, 60, 100 또는 120 프레임, 100 또는 120 프레임은 Fusion 메인 전용)",
          "1080p Dolby Vision 동영상 촬영(초당 25, 30, 60 또는 120 프레임, 120 프레임은 Fusion 메인 전용)",
          "720p Dolby Vision 동영상 촬영(초당 30 프레임)",
          "시네마틱 모드(최대 4K Dolby Vision, 초당 60 프레임)",
          "동영상의 시네마틱 모드 효과(Fusion 메인)",
          "렌즈 조리개, 셔터 속도, 화이트 밸런스, 히스토그램 보기를 지원하는 Pro용 제어 기능",
          "스마트 초점 추적",
          "향상된 저조도 동영상 촬영(1080p)",
          "액션 모드(최대 2.8K Dolby Vision, 초당 60 프레임)",
          "1080p 공간 비디오 촬영(초당 30 프레임)",
          "외부 저장 매체 활용 시 최대 4K ProRes 동영상 촬영(초당 120 프레임)",
          "ProRes RAW",
          "ACES(Academy Color Encoding System)",
          "Apple Log 2",
          "Genlock 지원",
          "접사 동영상 촬영(슬로 모션 및 타임랩스 포함)",
          "1080p 슬로 모션 동영상 지원(초당 최대 240 프레임) 및 4K Dolby Vision 슬로 모션 동영상 지원(초당 최대 120 프레임, Fusion 메인)",
          "듀얼 캡처(최대 4K Dolby Vision, 초당 30 프레임)",
          "타임랩스 동영상(동영상 흔들림 보정 포함, 최대 4K Dolby Vision)",
          "야간 모드 타임랩스",
          "QuickTake 동영상(최대 4K Dolby Vision, 초당 60 프레임)",
          "동영상을 위한 2세대 센서 시프트 광학 이미지 흔들림 보정(OIS)(Fusion 메인)",
          "동영상을 위한 3D 센서 시프트 광학 이미지 흔들림 보정(OIS) 및 오토포커스(Fusion 망원)",
          "최대 24배 디지털 줌",
          "오디오 줌",
          "True Tone 플래시",
          "시네마틱 동영상 흔들림 보정(4K, 1080p 및 720p)",
          "연속 오토포커스 동영상",
          "4K 동영상 촬영 중 8MP 사진 촬영",
          "재생 중 줌",
          "녹화 동영상 포맷: HEVC, H.264, ProRes, ProRes RAW",
          "공간 음향 및 스테레오 녹음",
          "4개의 스튜디오급 마이크",
          "바람 소리 감소",
          "오디오 믹스"
        ]
      },
      {
        "title": "전면 카메라",
        "items": [
          "18MP Center Stage 카메라",
          "ƒ/1.9 조리개",
          "Focus Pixels 방식 오토포커스",
          "Retina Flash",
          "탭해서 줌 및 회전",
          "사진을 위한 센터 스테이지",
          "초강력 흔들림 보정 동영상",
          "듀얼 캡처",
          "영상 통화를 위한 센터 스테이지",
          "셔터 속도, 화이트 밸런스, 히스토그램 보기를 지원하는 Pro용 제어 기능",
          "Photonic Engine",
          "Deep Fusion",
          "스마트 HDR 5",
          "초점 및 심도 제어 기능을 지원하는 한 차원 높은 인물 사진",
          "6가지 효과의 인물 사진 조명",
          "애니모지와 미모지",
          "야간 모드",
          "사진 스타일 3",
          "향상된 저조도 동영상 촬영(1080p)",
          "ProRAW",
          "사진 및 Live Photo 촬영 시 넓은 색영역 포착",
          "렌즈 보정",
          "자동 흔들림 보정",
          "고속 연사 모드",
          "4K Dolby Vision 동영상 촬영(초당 24, 25, 30 또는 60 프레임)",
          "1080p Dolby Vision 동영상 촬영(초당 25, 30 또는 60 프레임)",
          "시네마틱 모드(최대 4K Dolby Vision, 초당 30 프레임)",
          "동영상의 시네마틱 모드 효과",
          "외부 저장 매체 활용 ProRes 동영상 촬영(최대 4K, 초당 60 프레임)",
          "ProRes RAW",
          "ACES(Academy Color Encoding System)",
          "Apple Log 2",
          "1080p 슬로 모션 동영상 지원(초당 120 프레임)",
          "타임랩스 동영상(동영상 흔들림 보정 포함, 최대 4K Dolby Vision)",
          "야간 모드 타임랩스",
          "QuickTake 동영상(최대 4K Dolby Vision, 초당 60 프레임)",
          "시네마틱 동영상 흔들림 보정(4K, 1080p 및 720p)",
          "공간 음향 및 스테레오 녹음",
          "바람 소리 감소",
          "오디오 믹스"
        ]
      },
      {
        "title": "전원 및 배터리",
        "items": [
          "동영상 최대 43시간 / 스트리밍 최대 38시간 (eSIM 전용 모델 시험)",
          "충전식 리튬 이온 배터리 내장",
          "* 급속 충전 가능: USB‑C 충전 케이블과 함께 가변 전압 공급 기술(AVS)을 지원하는 60W 이상 규격의 어댑터 사용 시 약 15분에 최대 50% 충전(어댑터 별매)",
          "MagSafe 충전기와 함께 35W 이상 규격의 어댑터 사용 시 30분에 최대 50% 충전(충전기 및 어댑터 별매)"
        ]
      },
      {
        "title": "Face ID",
        "items": [
          "Center Stage 전면 카메라의 TrueDepth 기술을 통해 지원"
        ]
      },
      {
        "title": "안심 기능",
        "items": [
          "긴급 구조 요청",
          "충돌 감지"
        ]
      },
      {
        "title": "셀룰러 및 무선 기술",
        "items": [
          "모델 A3714 및 A3717*",
          "FDD-5G NR (대역 n1, n2, n3, n5, n7, n8, n12, n20, n25, n26, n28, n30, n66, n70, n75)",
          "TDD-5G NR (대역 n38, n40, n41, n48, n53, n77, n78, n79)",
          "FDD-LTE (대역 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 66, 106)",
          "TDD-LTE (대역 34, 38, 39, 40, 41, 42, 48, 53)",
          "UMTS/HSPA+ (850, 900, 1700/2100, 1900, 2100MHz)",
          "GSM/EDGE (850, 900, 1800, 1900MHz)",
          "4x4 MIMO 방식을 지원하는 5G(sub-6 GHz)",
          "4x4 MIMO 방식을 지원하는 Gigabit LTE",
          "Apple N1 무선 네트워킹 칩",
          "2x2 MIMO 방식을 지원하는 Wi‑Fi 7(802.11be)",
          "Bluetooth 6",
          "Thread 네트워킹 기술",
          "Apple 2세대 초광대역 칩",
          "리더 모드를 지원하는 NFC",
          "예비 전력으로 작동하는 익스프레스 카드 기능",
          "Apple C2 셀룰러 모뎀"
        ]
      },
      {
        "title": "위치",
        "items": [
          "정밀 이중 주파수 GPS(GPS, GLONASS, Galileo, QZSS, BeiDou, NavIC)",
          "디지털 나침반",
          "Wi‑Fi",
          "셀룰러",
          "iBeacon 위치 정밀 감지 기능"
        ]
      },
      {
        "title": "외부 버튼 및 커넥터",
        "items": [
          "음량 올리기/내리기",
          "동작 버튼",
          "카메라 컨트롤",
          "측면 버튼",
          "내장 스테레오 스피커",
          "내장 마이크",
          "USB‑C 커넥터"
        ]
      },
      {
        "title": "동작 버튼 기능",
        "items": [
          "무음 모드, 집중 모드, 카메라, 비주얼 인텔리전스, 손전등, 음성 메모, 음악 인식, 번역, 확대기, 제어 항목, 단축어, 손쉬운 사용"
        ]
      },
      {
        "title": "카메라 컨트롤",
        "items": [
          "노출, 심도, 확대/축소, 카메라, 스타일, 색조"
        ]
      },
      {
        "title": "충전 및 확장",
        "items": [
          "* 다음을 지원하는 USB‑C 커넥터: 충전",
          "DisplayPort",
          "USB 3(최대 10Gb/s)",
          "MagSafe 및",
          "무선 충전",
          "최대 25W MagSafe 무선 충전",
          "최대 25W Qi2 무선 충전",
          "자석 어레이",
          "정렬 자석",
          "액세서리 식별용 NFC",
          "자력계"
        ]
      },
      {
        "title": "센서",
        "items": [
          "Face ID",
          "LiDAR 스캐너",
          "기압계",
          "하이 다이내믹 레인지 자이로",
          "고중력 가속도계",
          "근접 센서",
          "듀얼 주변광 센서"
        ]
      },
      {
        "title": "SIM 카드",
        "items": [
          "듀얼 SIM(nano-SIM 및 eSIM)",
          "듀얼 eSIM 지원"
        ]
      },
      {
        "title": "Apple Pay",
        "items": [
          "매장, 앱, 웹사이트에서 Face ID를 이용해 iPhone으로 결제",
          "Mac에서 Apple Pay 사용 시 iPhone으로 결제 완료",
          "익스프레스 교통카드로 대중교통 요금 결제"
        ]
      },
      {
        "title": "영상 통화",
        "items": [
          "셀룰러 또는 Wi‑Fi 네트워크에서 FaceTime 영상 통화",
          "5G 또는 Wi‑Fi 네트워크에서 FaceTime HD(1080p) 영상 통화",
          "영상 통화를 위한 센터 스테이지",
          "SharePlay",
          "화면 공유",
          "FaceTime 영상 통화 시 인물 사진 모드 지원",
          "공간 음향",
          "음성 분리 및 와이드 스펙트럼 마이크 모드",
          "후면 카메라를 이용한 광학 줌"
        ]
      },
      {
        "title": "음성 통화",
        "items": [
          "FaceTime 음성 통화",
          "LTE 음성 통화(VoLTE)",
          "SharePlay",
          "화면 공유",
          "공간 음향",
          "음성 분리 및 와이드 스펙트럼 마이크 모드"
        ]
      },
      {
        "title": "오디오 재생",
        "items": [
          "지원되는 포맷: AAC, APAC, MP3, Apple Lossless, FLAC, Dolby Digital, Dolby Digital Plus, Dolby Atmos",
          "공간 음향 재생",
          "최대 음량 제한 설정 가능"
        ]
      },
      {
        "title": "동영상 재생",
        "items": [
          "지원되는 포맷: HEVC, H.264, AV1, ProRes",
          "Dolby Vision, HDR10+/HDR10, HLG를 지원하는 HDR",
          "최대 4K HDR AirPlay 미러링, 사진, 동영상을 Apple TV(2세대 이후 모델) 또는 AirPlay 지원 스마트 TV로 출력",
          "동영상 미러링 및 동영상 출력 지원: USB‑C 또는 USB‑C Digital AV 어댑터 사용 시 기본 DisplayPort 출력을 통해 최대 4K HDR(모델 A2119, 어댑터 별매)"
        ]
      },
      {
        "title": "Siri",
        "items": [
          "메시지 전송, 미리 알림 설정 등 다양한 일상 작업들을 손쉽게 처리 가능",
          "“Siri야”라고 불러 음성만으로 핸즈프리 활성화, 또는 타이핑으로 Siri 사용"
        ]
      },
      {
        "title": "운영체제",
        "items": [
          "iOS 27"
        ]
      },
      {
        "title": "개인정보 보호",
        "items": [
          "앱 추적 승인·iMessage 및 FaceTime 종단간 암호화 지원."
        ]
      },
      {
        "title": "손쉬운 사용",
        "items": [
          "보조 접근",
          "VoiceOver",
          "확대/축소",
          "확대기",
          "음성 명령",
          "스위치 제어",
          "AssistiveTouch",
          "눈 추적",
          "청각 장애인용 자막",
          "실시간 자막",
          "개인 음성",
          "실시간 말하기",
          "타이핑으로 Siri 사용",
          "음성 단축어",
          "콘텐츠 말하기"
        ]
      },
      {
        "title": "내장 앱",
        "items": [
          "App Store",
          "도서",
          "계산기",
          "캘린더",
          "카메라",
          "시계",
          "나침반",
          "연락처",
          "FaceTime",
          "파일",
          "나의 찾기",
          "피트니스",
          "Freeform",
          "Games",
          "GarageBand",
          "건강",
          "홈",
          "iMovie",
          "iTunes Store",
          "일기",
          "Keynote",
          "확대기",
          "Mail",
          "지도",
          "측정",
          "메시지",
          "음악",
          "메모",
          "Numbers",
          "Pages",
          "암호",
          "전화",
          "사진",
          "팟캐스트",
          "미리보기",
          "미리 알림",
          "Safari",
          "설정",
          "단축어",
          "주식",
          "팁",
          "번역",
          "TV",
          "음성 메모",
          "지갑",
          "Watch",
          "날씨"
        ]
      },
      {
        "title": "보청기 호환 등급",
        "items": [
          "미국 HAC(보청기 호환성) 등급 보유"
        ]
      },
      {
        "title": "시스템 요구 사양",
        "items": [
          "Apple 계정(일부 기능에서 필요)",
          "인터넷 연결",
          "* Mac 또는 PC에서 동기화 시 요구 사양: macOS Catalina 10.15 이후 버전: Finder 사용",
          "macOS High Sierra 10.13부터 macOS Mojave 10.14.6까지: iTunes 12.8 이후 버전 사용"
        ]
      },
      {
        "title": "사용 환경",
        "items": [
          "작동 온도: 0°C~35°C",
          "보관 가능(비작동) 온도: −20°C~45°C",
          "상대 습도: 5%~95% 미응결",
          "작동 고도: 3,000m까지 테스트"
        ]
      },
      {
        "title": "언어",
        "items": [
          "언어 지원"
        ]
      },
      {
        "title": "제품 구성",
        "items": [
          "iOS 27이 설치된 iPhone",
          "USB‑C 충전 케이블(1m)"
        ]
      },
      {
        "title": "상품정보표시",
        "items": [
          "제품명: 스마트폰",
          "모델명: A3714, A3717",
          "수입자: 애플코리아 유한회사",
          "인증정보:  R-C-APA-A3714,",
          "R-C-APA-A3717",
          "제조자: Apple Inc.",
          "동일모델의 출시년월: 2026년 9월",
          "제조국: 중국",
          "* 품질보증기준: https://www.apple.com/kr/legal/warranty/",
          "서비스 연락처: 080-333-4000",
          "Apple 2030은 우리의 가치 사슬 전반에서 탄소 중립을 달성하겠다는 우리의 목표입니다. 우리는 탄소 집약도가 더 낮은 제품을 디자인하기 위해 재활용 및 재생 가능 원료와 저탄소 소재를 우선적으로 사용하는 동시에, 소프트웨어와 하드웨어의 에너지 효율성에 중점을 둡니다."
        ]
      },
      {
        "title": "소재",
        "items": [
          "iPhone 18 Pro 및 iPhone 18 Pro Max는 아래의 사항을 포함해 40%의 재활용 소재로 제작되었습니다.",
          "외장에 85% 재활용 알루미늄 사용",
          "배터리에 100% 재활용 코발트 사용",
          "Apple이 설계한 모든 인쇄 회로 기판의 도금과 솔더에 각각 100% 재활용 금과 주석 사용",
          "배터리에 95% 재활용 리튬 사용",
          "모든 자석에 100% 재활용 희토류 원소 사용",
          "배터리 외장 및 베이퍼 챔버 섀시를 비롯한 각종 부품에 80% 재활용 강철 사용",
          "Taptic Engine에 100% 재활용 텅스텐 사용"
        ]
      },
      {
        "title": "포장",
        "items": [
          "섬유 기반 소재가 100% 쓰인 포장재"
        ]
      },
      {
        "title": "에너지",
        "items": [
          "iPhone 18 Pro 및 iPhone 18 Pro Max 생산에 사용되는 전력의 50%를 재생 가능 전력으로 조달",
          "배터리 충전기 시스템에 관한 미 에너지부 요건 초과 충족"
        ]
      },
      {
        "title": "폐기물",
        "items": [
          "Apple의 ‘제로 폐기물 프로그램’에 따라 기존의 모든 최종 조립 시설에서 매립 폐기물 근절"
        ]
      },
      {
        "title": "더 스마트한 화학물질 사용",
        "items": [
          "Apple 규제 물질 명세서 적용."
        ]
      }
    ],
    "conditions": [
      "화면 크기는 대각선 기준이며 실제 표시 영역은 더 작습니다.",
      "표시 용량과 사용 가능한 저장 공간은 다릅니다. 설치 소프트웨어와 설정에 따라 달라집니다.",
      "배터리 시험값은 제조사 시험 조건 기준입니다. 실제 사용 시간과 충전 시간은 환경에 따라 달라집니다.",
      "방수 성능은 영구적이지 않습니다. 시험 조건·액체 종류·마모 상태를 확인하세요.",
      "AI·결제·eSIM·네트워크 기능에는 지역·통신사·언어·계정·서비스별 조건이 적용됩니다.",
      "동영상 재생 시험값은 eSIM 전용 모델 기준입니다. nano-SIM 모델의 배터리 시간으로 단정하지 않습니다.",
      "Siri AI 한국어는 공식 발표상 2026년 10월 지원 예정입니다. 지원 상태를 다시 확인하세요."
    ]
  },
  "iphone-duo": {
    "source": "iphone-duo",
    "checkedAt": "2026-09-30",
    "scope": "Apple 한국 제품 사양 페이지의 기술 항목·목록. 홍보 문장은 사실 중심으로 요약했습니다. 각주별 상세 시험·지원 조건은 원문도 확인하세요.",
    "sections": [
      {
        "title": "마감",
        "items": [
          "나이트 스카이, 스타 화이트",
          "티타늄 폴더블 디자인",
          "Ceramic Shield 2 소재 전면",
          "Ceramic Shield 소재 후면"
        ]
      },
      {
        "title": "저장 용량",
        "items": [
          "256GB",
          "512GB",
          "1TB",
          "2TB"
        ]
      },
      {
        "title": "크기 및 무게",
        "items": [
          "펼침(세로 × 가로 × 두께): 117.8 × 164.6 × 5.2mm",
          "접힘(세로 × 가로 × 두께): 117.8 × 84.1 × 11.3mm",
          "무게: 254g"
        ]
      },
      {
        "title": "디스플레이",
        "items": [
          "내부 디스플레이",
          "Super Retina XDR 디스플레이",
          "19.3cm(대각선) 전면 화면 OLED 폴딩 디스플레이",
          "1878 x 2670 픽셀 해상도(430ppi)",
          "Nano‑texture 마감",
          "와이드 앵글 OLED",
          "외부 디스플레이",
          "13.6cm(대각선) 전면 화면 OLED 디스플레이",
          "1398 x 2034 픽셀 해상도(460ppi)",
          "Dynamic Island",
          "상시표시형 디스플레이",
          "최대 120Hz 가변 재생률을 제공하는 ProMotion 기술",
          "HDR 디스플레이",
          "True Tone",
          "넓은 색영역(P3)",
          "햅틱 터치",
          "2,000,000:1 명암비(일반)",
          "1000 니트 전체 최대 밝기(일반); 1600 니트 부분 최대 밝기(HDR); 3000 니트 부분 최대 밝기(야외); 1 니트 최소 밝기",
          "지문 및 유분 방지 코팅",
          "반사 방지 코팅",
          "여러 언어 및 문자 동시 표시 지원",
          "Apple Pencil(USB-C) 지원",
          "화면 대각선은 직사각형 기준. 실제 표시 영역은 더 작음."
        ]
      },
      {
        "title": "방수 및 방진",
        "items": [
          "IEC 규격 60529하의 IP68 등급 획득(최대 수심 6m, 최대 30분)"
        ]
      },
      {
        "title": "Apple Intelligence 및 Siri AI",
        "items": [
          "Apple Intelligence 및 Siri AI 지원. 기능·언어·지역별 제공 조건을 확인하세요."
        ]
      },
      {
        "title": "칩",
        "items": [
          "A20 Pro 칩",
          "6코어 CPU(슈퍼 코어 2개 및 효율 코어 4개)",
          "7코어 GPU(Neural Accelerators 탑재)",
          "듀얼 16코어 Neural Engine",
          "하드웨어 가속형 레이 트레이싱"
        ]
      },
      {
        "title": "카메라",
        "items": [
          "48MP 듀얼 Fusion 카메라 시스템",
          "48MP Fusion 메인: 26mm, ƒ/1.6 조리개, 센서 시프트 광학 이미지 흔들림 보정(OIS), 하이브리드 Focus Pixels, 초고해상도 사진(24MP 및 48MP)",
          "12MP 광학 퀄리티 2배 망원도 가능: 52mm, ƒ/1.6 조리개, 센서 시프트 광학 이미지 흔들림 보정(OIS), 하이브리드 Focus Pixels",
          "48MP Fusion 울트라 와이드: 13mm, ƒ/2.2 조리개 및 120° 시야각, 하이브리드 Focus Pixels, 초고해상도 사진(24MP 및 48MP)",
          "2배 광학 퀄리티 줌인, 2배 광학 줌아웃, 4배 광학 퀄리티 줌 범위",
          "최대 10배 디지털 줌",
          "스마트 포착",
          "Duo Preview",
          "사진 스타일 3",
          "스마트 초점 추적",
          "맞춤 설정 가능한 기본 렌즈(Fusion 메인)",
          "사파이어 크리스털 렌즈 커버",
          "True Tone 플래시",
          "Photonic Engine",
          "Deep Fusion",
          "스마트 HDR 5",
          "초점 및 심도 제어 기능을 지원하는 한 차원 높은 인물 사진",
          "6가지 효과의 인물 사진 조명",
          "야간 모드",
          "파노라마(최대 63MP)",
          "48MP 접사 사진",
          "사진 및 Live Photo 촬영 시 넓은 색영역 포착",
          "렌즈 보정(Fusion 울트라 와이드)",
          "첨단 적목 보정",
          "자동 흔들림 보정",
          "고속 연사 모드",
          "사진 위치 표시 기능",
          "촬영 이미지 포맷: HEIF 및 JPEG"
        ]
      },
      {
        "title": "동영상 촬영",
        "items": [
          "4K Dolby Vision 동영상 촬영(초당 24, 25, 30, 60, 100 또는 120 프레임, 100 또는 120 프레임은 Fusion 메인 전용)",
          "1080p Dolby Vision 동영상 촬영(초당 25, 30, 60 또는 120 프레임, 120 프레임은 Fusion 메인 전용)",
          "720p Dolby Vision 동영상 촬영(초당 30 프레임)",
          "시네마틱 모드(최대 4K Dolby Vision, 초당 60 프레임)",
          "동영상의 시네마틱 모드 효과(Fusion 메인)",
          "Duo Preview",
          "스마트 초점 추적",
          "향상된 저조도 동영상 촬영(1080p)",
          "액션 모드(최대 2.8K Dolby Vision, 초당 60 프레임)",
          "접사 동영상 촬영(슬로 모션 및 타임랩스 포함)",
          "1080p 슬로 모션 동영상 지원(초당 최대 240 프레임) 및 4K Dolby Vision 슬로 모션 동영상 지원(초당 최대 120 프레임, Fusion 메인)",
          "듀얼 캡처(최대 4K Dolby Vision, 초당 30 프레임)",
          "타임랩스 동영상(동영상 흔들림 보정 포함, 최대 4K Dolby Vision)",
          "야간 모드 타임랩스",
          "QuickTake 동영상(최대 4K Dolby Vision, 초당 60 프레임)",
          "동영상을 위한 센서 시프트 광학 이미지 흔들림 보정(OIS)(Fusion 메인)",
          "최대 6배 디지털 줌",
          "오디오 줌",
          "True Tone 플래시",
          "시네마틱 동영상 흔들림 보정(4K, 1080p 및 720p)",
          "연속 오토포커스 동영상",
          "4K 동영상 촬영 중 8MP 사진 촬영",
          "재생 중 줌",
          "녹화 동영상 포맷: HEVC 및 H.264",
          "공간 음향 및 스테레오 녹음",
          "바람 소리 감소",
          "오디오 믹스"
        ]
      },
      {
        "title": "전면 카메라",
        "items": [
          "외부",
          "12MP Center Stage 카메라",
          "ƒ/2.2 조리개",
          "Retina Flash",
          "스마트 포착",
          "아이 시선",
          "사진 스타일 3",
          "향상된 저조도 동영상 촬영(1080p)",
          "탭해서 줌 및 회전",
          "사진을 위한 센터 스테이지",
          "초강력 흔들림 보정 동영상",
          "듀얼 캡처",
          "영상 통화를 위한 센터 스테이지",
          "Photonic Engine",
          "Deep Fusion",
          "스마트 HDR 5",
          "초점 및 심도 제어 기능을 지원하는 한 차원 높은 인물 사진",
          "6가지 효과의 인물 사진 조명",
          "애니모지와 미모지",
          "야간 모드",
          "사진 및 Live Photo 촬영 시 넓은 색영역 포착",
          "렌즈 보정",
          "자동 흔들림 보정",
          "고속 연사 모드",
          "4K Dolby Vision 동영상 촬영(초당 24, 25, 30 또는 60 프레임)",
          "1080p Dolby Vision 동영상 촬영(초당 25, 30 또는 60 프레임)",
          "시네마틱 모드(최대 4K Dolby Vision, 초당 30 프레임)",
          "동영상의 시네마틱 모드 효과",
          "1080p 슬로 모션 동영상 지원(초당 120 프레임)",
          "타임랩스 동영상(동영상 흔들림 보정 포함, 최대 4K Dolby Vision)",
          "야간 모드 타임랩스",
          "QuickTake 동영상(최대 4K Dolby Vision, 초당 60 프레임)",
          "시네마틱 동영상 흔들림 보정(4K, 1080p 및 720p)",
          "공간 음향 및 스테레오 녹음",
          "바람 소리 감소",
          "오디오 믹스",
          "내부",
          "언더 디스플레이 FaceTime 카메라",
          "ƒ/1.8 조리개",
          "1080p 동영상 촬영(초당 30 또는 60 프레임)",
          "FaceTime에서의 애니모지와 미모지",
          "QuickTake 동영상(1080p, 초당 30 및 60 프레임)"
        ]
      },
      {
        "title": "전원 및 배터리",
        "items": [
          "일반 사용",
          "최대 24시간",
          "동영상 재생",
          "외부 디스플레이 사용 시 최대 44시간",
          "내부 디스플레이 사용 시 최대 31시간",
          "동영상 재생(스트리밍)",
          "외부 디스플레이 사용 시 최대 37시간",
          "내부 디스플레이 사용 시 최대 26시간",
          "충전식 리튬 이온 듀얼 배터리 내장",
          "급속 충전 가능: USB-C 충전 케이블과 함께 60W 이상 규격의 어댑터 사용 시(어댑터 별매) 약 20분에 최대 50% 충전",
          "MagSafe 충전기와 함께 35W 이상 규격의 어댑터 사용 시 약 30분에 최대 50% 충전(충전기 및 어댑터 별매)"
        ]
      },
      {
        "title": "Touch ID",
        "items": [
          "측면 버튼에 내장된 지문 인식 센서"
        ]
      },
      {
        "title": "안심 기능",
        "items": [
          "긴급 구조 요청",
          "충돌 감지"
        ]
      },
      {
        "title": "셀룰러 및 무선 기술",
        "items": [
          "모델 A3720*",
          "FDD-5G NR (Bands n1, n2, n3, n5, n7, n8, n12, n20, n25, n26, n28, n30, n66, n70, n75)",
          "TDD-5G NR (Bands n38, n40, n41, n48, n53, n77, n78, n79)",
          "FDD-LTE (Bands 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 66, 106)",
          "TDD-LTE (Bands 34, 38, 39, 40, 41, 42, 48, 53)",
          "UMTS/HSPA+(850, 900, 1700/2100, 1900, 2100MHz)",
          "GSM/EDGE(850, 900, 1800, 1900MHz)",
          "Apple C2 셀룰러 모뎀",
          "4x4 MIMO 방식을 지원하는 5G(sub-6 GHz)",
          "4x4 MIMO 방식을 지원하는 Gigabit LTE",
          "Apple N1 무선 네트워킹 칩",
          "2x2 MIMO 방식을 지원하는 Wi‑Fi 7(802.11be)",
          "Bluetooth 6",
          "Thread 네트워킹 기술",
          "Apple 2세대 초광대역 칩",
          "리더 모드를 지원하는 NFC",
          "예비 전력으로 작동하는 익스프레스 카드 기능"
        ]
      },
      {
        "title": "위치",
        "items": [
          "정밀 이중 주파수 GPS(GPS, GLONASS, Galileo, QZSS, BeiDou, NavIC)",
          "디지털 나침반",
          "Wi-Fi",
          "셀룰러",
          "iBeacon 위치 정밀 감지 기능"
        ]
      },
      {
        "title": "외부 버튼 및 커넥터",
        "items": [
          "음량 올리기/내리기",
          "카메라",
          "컨트롤",
          "내장 스테레오 스피커 내장 마이크",
          "내장 스테레오 스피커",
          "내장 마이크",
          "USB-C 커넥터",
          "측면 버튼",
          "카메라 컨트롤",
          "노출, 심도, 확대/축소, 카메라, 스타일, 색조"
        ]
      },
      {
        "title": "충전 및 확장",
        "items": [
          "* 다음을 지원하는 USB-C 커넥터: 충전",
          "DisplayPort",
          "USB 3(최대 10Gb/s)"
        ]
      },
      {
        "title": "MagSafe 및 무선 충전",
        "items": [
          "최대 25W MagSafe 무선 충전",
          "최대 25W Qi2 무선 충전",
          "자석 어레이",
          "정렬 자석",
          "액세서리 식별용 NFC",
          "자력계"
        ]
      },
      {
        "title": "센서",
        "items": [
          "Touch ID 지문 센서",
          "기압계",
          "하이 다이내믹 레인지 자이로",
          "고중력 가속도계",
          "근접 센서",
          "주변광 센서 4개"
        ]
      },
      {
        "title": "SIM 카드",
        "items": [
          "듀얼 eSIM(2개의 활성 eSIM, 8개 이상의 eSIM 저장)",
          "iPhone Duo는 편의성 및 보안 향상을 위해 첨단 eSIM 기술을 사용합니다(실물 SIM 카드와 호환되지 않음)."
        ]
      },
      {
        "title": "Apple Pay",
        "items": [
          "매장, 앱, 웹사이트에서 Touch ID를 이용해 iPhone으로 결제",
          "Mac에서 Apple Pay 사용 시 iPhone으로 결제 완료",
          "익스프레스 교통카드로 대중교통 요금 결제"
        ]
      },
      {
        "title": "영상 통화",
        "items": [
          "셀룰러 또는 Wi-Fi 네트워크에서 FaceTime 영상 통화",
          "5G 또는 Wi-Fi 네트워크에서 FaceTime HD(1080p) 영상 통화",
          "영상 통화를 위한 센터 스테이지",
          "Duo FaceTime",
          "SharePlay",
          "화면 공유",
          "FaceTime 영상 통화 시 인물 사진 모드 지원",
          "공간 음향",
          "음성 분리 및 와이드 스펙트럼 마이크 모드",
          "후면 카메라를 이용한 줌"
        ]
      },
      {
        "title": "음성 통화",
        "items": [
          "FaceTime 음성 통화",
          "LTE 음성 통화(VoLTE)",
          "SharePlay",
          "화면 공유",
          "공간 음향",
          "음성 분리 및 와이드 스펙트럼 마이크 모드"
        ]
      },
      {
        "title": "오디오 재생",
        "items": [
          "지원되는 포맷: AAC, APAC, MP3, Apple Lossless, FLAC, Dolby Digital, Dolby Digital Plus, Dolby Atmos",
          "공간 음향 재생",
          "최대 음량 제한 설정 가능"
        ]
      },
      {
        "title": "동영상 재생",
        "items": [
          "지원되는 포맷: HEVC, H.264, AV1",
          "Dolby Vision, HDR10+/HDR10, HLG를 지원하는 HDR",
          "최대 4K HDR AirPlay 미러링, 사진, 동영상을 Apple TV(2세대 이후 모델) 또는 AirPlay 지원 스마트 TV로 출력",
          "동영상 미러링 및 동영상 출력 지원: USB-C 또는 USB-C Digital AV 어댑터 사용 시 기본 DisplayPort 출력을 통해 최대 4K HDR(모델 A2119, 어댑터 별매)"
        ]
      },
      {
        "title": "Siri",
        "items": [
          "메시지 전송, 미리 알림 설정 등 다양한 일상 작업들을 손쉽게 처리 가능",
          "“Siri야”라고 불러 음성만으로 핸즈프리 활성화, 또는 타이핑으로 Siri 사용"
        ]
      },
      {
        "title": "운영체제",
        "items": [
          "iOS 27"
        ]
      },
      {
        "title": "개인정보 보호",
        "items": [
          "앱 추적 승인·iMessage 및 FaceTime 종단간 암호화 지원."
        ]
      },
      {
        "title": "손쉬운 사용",
        "items": [
          "보조 접근",
          "VoiceOver",
          "확대/축소",
          "확대기",
          "음성 명령",
          "스위치 제어",
          "AssistiveTouch",
          "눈 추적",
          "청각 장애인용 자막",
          "실시간 자막",
          "개인 음성",
          "실시간 말하기",
          "타이핑으로 Siri 사용",
          "음성 단축어",
          "콘텐츠 말하기"
        ]
      },
      {
        "title": "내장 앱",
        "items": [
          "App Store",
          "도서",
          "계산기",
          "캘린더",
          "카메라",
          "시계",
          "나침반",
          "연락처",
          "FaceTime",
          "파일",
          "나의 찾기",
          "피트니스",
          "Freeform",
          "Games",
          "GarageBand",
          "건강",
          "홈",
          "iMovie",
          "iTunes Store",
          "일기",
          "Keynote",
          "확대기",
          "Mail",
          "지도",
          "측정",
          "메시지",
          "음악",
          "메모",
          "Numbers",
          "Pages",
          "암호",
          "전화",
          "사진",
          "팟캐스트",
          "미리보기",
          "미리 알림",
          "Safari",
          "설정",
          "단축어",
          "주식",
          "팁",
          "번역",
          "TV",
          "음성 메모",
          "지갑",
          "Watch",
          "날씨"
        ]
      },
      {
        "title": "보청기 호환 등급",
        "items": [
          "미국 HAC(보청기 호환성) 등급 보유"
        ]
      },
      {
        "title": "시스템 요구 사양",
        "items": [
          "Apple 계정(일부 기능에서 필요)",
          "인터넷 연결",
          "* Mac 또는 PC에서 동기화 시 요구 사양: macOS Catalina 10.15 이후 버전: Finder 사용",
          "macOS High Sierra 10.13부터 macOS Mojave 10.14.6까지: iTunes 12.8 이후 버전 사용"
        ]
      },
      {
        "title": "사용 환경",
        "items": [
          "작동 온도: 0°C~35°C",
          "보관 가능(비작동) 온도: −20°C~45°C",
          "상대 습도: 5%~95% 미응결",
          "작동 고도: 3,000m까지 테스트"
        ]
      },
      {
        "title": "언어",
        "items": [
          "언어 지원"
        ]
      },
      {
        "title": "제품 구성",
        "items": [
          "iOS 27이 설치된 iPhone",
          "USB-C 충전 케이블(1m)",
          "설명서",
          "그리고 환경",
          "Apple 2030은 우리의 가치 사슬 전반에서 탄소 중립을 달성하겠다는 우리의 목표입니다. 우리는 탄소 집약도가 더 낮은 제품을 디자인하기 위해 재활용 및 재생 가능 원료와 저탄소 소재를 우선적으로 사용하는 동시에, 소프트웨어와 하드웨어의 에너지 효율성에 중점을 둡니다."
        ]
      },
      {
        "title": "소재",
        "items": [
          "iPhone Duo는 아래의 사항을 포함해 35%의 재활용 소재로 제작되었습니다.",
          "내부 구조 프레임에 100% 재활용 알루미늄 사용",
          "배터리에 100% 재활용 코발트 사용",
          "Apple이 설계한 모든 인쇄 회로 기판의 도금과 솔더에 각각 100% 재활용 금과 주석 사용",
          "배터리에 95% 재활용 리튬 사용",
          "외장에 85% 재활용 티타늄 사용",
          "3D 프린터로 출력한 힌지 커버에 100% 재활용 티타늄 사용"
        ]
      },
      {
        "title": "포장",
        "items": [
          "섬유 기반 소재가 100% 쓰인 포장재"
        ]
      },
      {
        "title": "에너지",
        "items": [
          "iPhone Duo 생산에 사용되는 전력의 60%를 재생 가능 전력으로 조달",
          "배터리 충전기 시스템에 관한 미 에너지부 요건 초과 충족"
        ]
      },
      {
        "title": "폐기물",
        "items": [
          "Apple의 ‘제로 폐기물 프로그램’에 따라 기존의 모든 최종 조립 시설에서 매립 폐기물 근절"
        ]
      },
      {
        "title": "더 스마트한 화학물질 사용",
        "items": [
          "Apple 규제 물질 명세서 적용."
        ]
      }
    ],
    "conditions": [
      "화면 크기는 대각선 기준이며 실제 표시 영역은 더 작습니다.",
      "표시 용량과 사용 가능한 저장 공간은 다릅니다. 설치 소프트웨어와 설정에 따라 달라집니다.",
      "배터리 시험값은 제조사 시험 조건 기준입니다. 실제 사용 시간과 충전 시간은 환경에 따라 달라집니다.",
      "방수 성능은 영구적이지 않습니다. 시험 조건·액체 종류·마모 상태를 확인하세요.",
      "AI·결제·eSIM·네트워크 기능에는 지역·통신사·언어·계정·서비스별 조건이 적용됩니다."
    ]
  },
  "iphone-17e": {
    "source": "iphone-17e",
    "checkedAt": "2026-09-30",
    "scope": "Apple 한국 제품 사양 페이지의 기술 항목·목록. 홍보 문장은 사실 중심으로 요약했습니다. 각주별 상세 시험·지원 조건은 원문도 확인하세요.",
    "sections": [
      {
        "title": "마감",
        "items": [
          "블랙, 화이트, 소프트 핑크",
          "알루미늄 디자인",
          "Ceramic Shield 2 소재 전면",
          "글래스 소재 후면"
        ]
      },
      {
        "title": "저장 용량",
        "items": [
          "256GB",
          "512GB"
        ]
      },
      {
        "title": "크기 및 무게",
        "items": [
          "가로: 71.5mm",
          "세로: 146.7mm",
          "두께: 7.80mm",
          "무게: 170g"
        ]
      },
      {
        "title": "디스플레이",
        "items": [
          "Super Retina XDR 디스플레이",
          "15.4cm(대각선) 전면 화면 OLED 디스플레이",
          "2532 x 1170 픽셀 해상도(460ppi)",
          "HDR 디스플레이",
          "True Tone",
          "넓은 색영역(P3)",
          "햅틱 터치",
          "2,000,000:1 명암비(일반)",
          "800 니트 전체 최대 밝기(일반), 1200 니트 부분 최대 밝기(HDR)",
          "지문 및 유분 방지 코팅",
          "반사 방지 코팅",
          "여러 언어 및 문자 동시 표시 지원",
          "화면 대각선은 직사각형 기준. 실제 표시 영역은 더 작음."
        ]
      },
      {
        "title": "방수 및 방진",
        "items": [
          "IEC 규격 60529하의 IP68 등급 획득(최대 수심 6m, 최대 30분)"
        ]
      },
      {
        "title": "Apple Intelligence 및 Siri AI",
        "items": [
          "Apple Intelligence 및 Siri AI 지원. 기능·언어·지역별 제공 조건을 확인하세요."
        ]
      },
      {
        "title": "칩",
        "items": [
          "A19 칩",
          "6코어 CPU(성능 코어 2개 및 효율 코어 4개)",
          "4코어 GPU(Neural Accelerators 탑재)",
          "16코어 Neural Engine",
          "하드웨어 가속형 레이 트레이싱"
        ]
      },
      {
        "title": "카메라",
        "items": [
          "48MP Fusion 카메라 시스템",
          "48MP Fusion 메인: 26mm, ƒ/1.6 조리개, 광학 이미지 흔들림 보정(OIS), 하이브리드 Focus Pixels, 초고해상도 사진(24MP 및 48MP)",
          "12MP 2배 망원도 가능: 52mm, ƒ/1.6 조리개, 광학 이미지 흔들림 보정(OIS), 하이브리드 Focus Pixels",
          "최대 10배 디지털 줌",
          "사파이어 크리스털 렌즈 커버",
          "True Tone 플래시",
          "Photonic Engine",
          "Deep Fusion",
          "스마트 HDR 5",
          "초점 및 심도 제어 기능을 지원하는 한 차원 높은 인물 사진",
          "6가지 효과의 인물 사진 조명",
          "야간 모드",
          "파노라마(최대 63MP)",
          "사진 스타일",
          "사진 및 Live Photo 촬영 시 넓은 색영역 포착",
          "첨단 적목 보정",
          "자동 흔들림 보정",
          "고속 연사 모드",
          "사진 위치 표시 기능",
          "촬영 이미지 포맷: HEIF 및 JPEG"
        ]
      },
      {
        "title": "동영상 촬영",
        "items": [
          "4K Dolby Vision 동영상 촬영(초당 24, 25, 30 또는 60 프레임)",
          "1080p Dolby Vision 동영상 촬영(초당 25, 30 또는 60 프레임)",
          "720p Dolby Vision 동영상 촬영(초당 30 프레임)",
          "1080p 슬로 모션 동영상 지원(초당 120 또는 240 프레임)",
          "타임랩스 동영상(동영상 흔들림 보정 포함)",
          "야간 모드 타임랩스",
          "QuickTake 동영상",
          "동영상을 위한 광학 이미지 흔들림 보정(OIS)",
          "최대 6배 디지털 줌",
          "오디오 줌",
          "True Tone 플래시",
          "시네마틱 동영상 흔들림 보정(4K, 1080p 및 720p)",
          "연속 오토포커스 동영상",
          "4K 동영상 촬영 중 8MP 사진 촬영",
          "재생 중 줌",
          "녹화 동영상 포맷: HEVC 및 H.264",
          "공간 음향 및 스테레오 녹음",
          "바람 소리 감소",
          "오디오 믹스"
        ]
      },
      {
        "title": "전면 카메라",
        "items": [
          "12MP TrueDepth 카메라",
          "ƒ/1.9 조리개",
          "Focus Pixels 방식 오토포커스",
          "Retina Flash",
          "Photonic Engine",
          "Deep Fusion",
          "스마트 HDR 5",
          "초점 및 심도 제어 기능을 지원하는 한 차원 높은 인물 사진",
          "6가지 효과의 인물 사진 조명",
          "애니모지와 미모지",
          "야간 모드",
          "사진 스타일",
          "사진 및 Live Photo 촬영 시 넓은 색영역 포착",
          "렌즈 보정",
          "자동 흔들림 보정",
          "고속 연사 모드",
          "4K Dolby Vision 동영상 촬영(초당 24, 25, 30 또는 60 프레임)",
          "1080p Dolby Vision 동영상 촬영(초당 25, 30 또는 60 프레임)",
          "1080p 슬로 모션 동영상 지원(초당 120 프레임)",
          "타임랩스 동영상(동영상 흔들림 보정 포함)",
          "야간 모드 타임랩스",
          "QuickTake 동영상",
          "시네마틱 동영상 흔들림 보정(4K, 1080p 및 720p)",
          "공간 음향 및 스테레오 녹음",
          "바람 소리 감소",
          "오디오 믹스"
        ]
      },
      {
        "title": "전원 및 배터리",
        "items": [
          "동영상 재생",
          "최대 26시간",
          "동영상 재생(스트리밍)",
          "최대 21시간",
          "급속 충전 가능",
          "USB‑C 충전 케이블과 함께 20W 이상 규격의 어댑터 사용 시 30분에 최대 50% 충전(어댑터 별매)",
          "충전식 리튬 이온 배터리 내장"
        ]
      },
      {
        "title": "Face ID",
        "items": [
          "얼굴 인식용 TrueDepth 카메라를 통해 지원"
        ]
      },
      {
        "title": "안심 기능",
        "items": [
          "긴급 구조 요청",
          "충돌 감지"
        ]
      },
      {
        "title": "셀룰러 및 무선 기술",
        "items": [
          "모델 A3634*",
          "FDD‑5G NR(대역 n1, n2, n3, n5, n7, n8, n12, n20, n25, n26, n28, n30, n66, n70, n75)",
          "TDD‑5G NR(대역 n38, n40, n41, n48, n53, n77, n78, n79)",
          "FDD‑LTE(대역 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 66)",
          "TDD‑LTE(대역 34, 38, 39, 40, 41, 42, 48, 53)",
          "UMTS/HSPA+(850, 900, 1700/2100, 1900, 2100MHz)",
          "GSM/EDGE(850, 900, 1800, 1900MHz)",
          "Apple C1X 셀룰러 모뎀",
          "4x4 MIMO 방식을 지원하는 5G(sub-6 GHz)",
          "4x4 MIMO 방식을 지원하는 Gigabit LTE",
          "2x2 MIMO 방식을 지원하는 Wi‑Fi 6(802.11ax)",
          "Bluetooth 5.3",
          "리더 모드를 지원하는 NFC",
          "예비 전력으로 작동하는 익스프레스 카드 기능"
        ]
      },
      {
        "title": "위치",
        "items": [
          "GPS, GLONASS, Galileo, QZSS, BeiDou, NavIC",
          "디지털 나침반",
          "Wi‑Fi",
          "셀룰러",
          "iBeacon 위치 정밀 감지 기능"
        ]
      },
      {
        "title": "외부 버튼 및 커넥터",
        "items": [
          "음량 올리기/내리기",
          "동작 버튼",
          "측면 버튼",
          "내장 스테레오 스피커",
          "내장 마이크",
          "USB-C 커넥터",
          "내장",
          "스테레오 스피커"
        ]
      },
      {
        "title": "동작 버튼 기능",
        "items": [
          "무음 모드, 집중 모드, 카메라, 비주얼 인텔리전스, 손전등, 음성 메모, 음악 인식, 번역, 확대기, 제어 항목, 단축어, 손쉬운 사용"
        ]
      },
      {
        "title": "충전 및 확장",
        "items": [
          "* 다음을 지원하는 USB-C 커넥터: 충전",
          "USB 2(최대 480Mb/s)"
        ]
      },
      {
        "title": "MagSafe 및 무선 충전",
        "items": [
          "최대 15W MagSafe 무선 충전",
          "최대 15W Qi2 무선 충전",
          "자석 어레이",
          "정렬 자석",
          "액세서리 식별용 NFC",
          "자력계"
        ]
      },
      {
        "title": "센서",
        "items": [
          "Face ID",
          "기압계",
          "하이 다이내믹 레인지 자이로",
          "고중력 가속도계",
          "근접 센서",
          "듀얼 주변광 센서"
        ]
      },
      {
        "title": "SIM 카드",
        "items": [
          "듀얼 SIM(nano-SIM 및 eSIM)",
          "듀얼 eSIM 지원"
        ]
      },
      {
        "title": "Apple Pay",
        "items": [
          "매장, 앱, 웹사이트에서 Face ID를 이용해 iPhone으로 결제",
          "Mac에서 Apple Pay 사용 시 iPhone으로 결제 완료",
          "익스프레스 교통카드로 대중교통 요금 결제"
        ]
      },
      {
        "title": "영상 통화",
        "items": [
          "셀룰러 또는 Wi-Fi 네트워크에서 FaceTime 영상 통화",
          "5G 또는 Wi-Fi 네트워크에서 FaceTime HD(1080p) 영상 통화",
          "SharePlay",
          "화면 공유",
          "FaceTime 영상 통화 시 인물 사진 모드 지원",
          "공간 음향",
          "음성 분리 및 와이드 스펙트럼 마이크 모드",
          "후면 카메라를 이용한 줌"
        ]
      },
      {
        "title": "음성 통화",
        "items": [
          "FaceTime 음성 통화",
          "LTE 음성 통화(VoLTE)",
          "SharePlay",
          "화면 공유",
          "공간 음향",
          "음성 분리 및 와이드 스펙트럼 마이크 모드"
        ]
      },
      {
        "title": "오디오 재생",
        "items": [
          "지원되는 포맷: AAC, MP3, Apple Lossless, FLAC, Dolby Digital, Dolby Digital Plus, Dolby Atmos",
          "공간 음향 재생",
          "최대 음량 제한 설정 가능"
        ]
      },
      {
        "title": "동영상 재생",
        "items": [
          "지원되는 포맷: HEVC, H.264, AV1",
          "Dolby Vision, HDR10+/HDR10, HLG 지원",
          "최대 4K HDR AirPlay 미러링, 사진, 동영상을 Apple TV(2세대 이후 모델) 또는 AirPlay 지원 스마트 TV로 출력"
        ]
      },
      {
        "title": "Siri",
        "items": [
          "메시지 전송, 미리 알림 설정 등 다양한 일상 작업들을 손쉽게 처리 가능",
          "“Siri야”라고 불러 음성만으로 핸즈프리 활성화, 또는 타이핑으로 Siri 사용"
        ]
      },
      {
        "title": "운영체제",
        "items": [
          "iOS"
        ]
      },
      {
        "title": "개인정보 보호",
        "items": [
          "앱 추적 승인·iMessage 및 FaceTime 종단간 암호화 지원."
        ]
      },
      {
        "title": "손쉬운 사용",
        "items": [
          "VoiceOver",
          "확대/축소",
          "확대기",
          "음성 명령",
          "스위치 제어",
          "AssistiveTouch",
          "눈 추적",
          "청각 장애인용 자막",
          "실시간 자막",
          "개인 음성",
          "실시간 말하기",
          "타이핑으로 Siri 사용",
          "음성 단축어",
          "콘텐츠 말하기"
        ]
      },
      {
        "title": "내장 앱",
        "items": [
          "App Store",
          "도서",
          "계산기",
          "캘린더",
          "카메라",
          "시계",
          "나침반",
          "연락처",
          "FaceTime",
          "파일",
          "나의 찾기",
          "피트니스",
          "Freeform",
          "Games",
          "GarageBand",
          "건강",
          "홈",
          "iMovie",
          "iTunes Store",
          "일기",
          "Keynote",
          "확대기",
          "Mail",
          "지도",
          "측정",
          "메시지",
          "음악",
          "메모",
          "Numbers",
          "Pages",
          "암호",
          "전화",
          "사진",
          "팟캐스트",
          "미리보기",
          "미리 알림",
          "Safari",
          "설정",
          "단축어",
          "주식",
          "팁",
          "번역",
          "TV",
          "음성 메모",
          "지갑",
          "Watch",
          "날씨"
        ]
      },
      {
        "title": "보청기 호환 등급",
        "items": [
          "미국 HAC(보청기 호환성) 등급 보유"
        ]
      },
      {
        "title": "시스템 요구 사양",
        "items": [
          "Apple 계정(일부 기능에서 필요)",
          "인터넷 연결",
          "* Mac 또는 PC에서 동기화 시 요구 사양: macOS Catalina 10.15 이후 버전: Finder 사용",
          "macOS High Sierra 10.13부터 macOS Mojave 10.14.6까지: iTunes 12.8 이후 버전 사용",
          "Windows 10 이후 버전: iTunes 12.12.10 이후 버전 사용"
        ]
      },
      {
        "title": "사용 환경",
        "items": [
          "작동 온도: 0°C~35°C",
          "보관 가능(비작동) 온도: −20°C~45°C",
          "상대 습도: 5%~95% 미응결",
          "작동 고도: 3,000m까지 테스트"
        ]
      },
      {
        "title": "언어",
        "items": [
          "언어 지원"
        ]
      },
      {
        "title": "제품 구성",
        "items": [
          "iOS 27이 설치된 iPhone",
          "USB-C 충전 케이블(1m)",
          "설명서"
        ]
      },
      {
        "title": "상품정보표시",
        "items": [
          "제품명: 스마트폰",
          "모델명: A3634",
          "수입자: 애플코리아 유한회사",
          "인증정보:  R-C-APA-A3634",
          "제조자: Apple Inc.",
          "동일모델의 출시년월: 2026년 3월",
          "제조국: 중국",
          "* 품질보증기준: https://www.apple.com/kr/legal/warranty/",
          "서비스 연락처: 080-333-4000",
          "환경",
          "iPhone 17e는 환경에 미치는 영향을 줄이도록 디자인되었습니다."
        ]
      },
      {
        "title": "소재",
        "items": [
          "iPhone 17e는 30%의 재활용 소재로 제작, 다음을 포함: 외장에 85% 재활용 알루미늄 사용",
          "배터리에 100% 재활용 코발트 및 95% 재활용 리튬 사용",
          "유도성 충전기에 100% 재활용 구리 포일 및 와이어 사용",
          "Apple이 설계한 모든 인쇄 회로 기판의 도금과 솔더에 각각 100% 재활용 금과 주석 사용",
          "모든 자석에 100% 재활용 희토류 원소 사용",
          "후면 글래스 지지판, 스피커, 수신기에 80% 재활용 강철 사용",
          "Taptic Engine에 100% 재활용 텅스텐 사용"
        ]
      },
      {
        "title": "에너지",
        "items": [
          "iPhone 17e 생산에 사용되는 전력의 55%를 재생 가능 전력으로 조달"
        ]
      },
      {
        "title": "포장",
        "items": [
          "섬유 기반 소재가 100% 쓰인 포장재"
        ]
      },
      {
        "title": "폐기물",
        "items": [
          "Apple의 ‘제로 폐기물 프로그램’에 따라 기존의 모든 최종 조립 시설에서 매립 폐기물 근절"
        ]
      },
      {
        "title": "더 스마트한 화학물질 사용",
        "items": [
          "Apple 규제 물질 명세서 적용."
        ]
      }
    ],
    "conditions": [
      "화면 크기는 대각선 기준이며 실제 표시 영역은 더 작습니다.",
      "표시 용량과 사용 가능한 저장 공간은 다릅니다. 설치 소프트웨어와 설정에 따라 달라집니다.",
      "배터리 시험값은 제조사 시험 조건 기준입니다. 실제 사용 시간과 충전 시간은 환경에 따라 달라집니다.",
      "방수 성능은 영구적이지 않습니다. 시험 조건·액체 종류·마모 상태를 확인하세요.",
      "AI·결제·eSIM·네트워크 기능에는 지역·통신사·언어·계정·서비스별 조건이 적용됩니다."
    ]
  },
  "iphone-air": {
    "source": "iphone-air",
    "checkedAt": "2026-09-30",
    "scope": "Apple 한국 제품 사양 페이지의 기술 항목·목록. 홍보 문장은 사실 중심으로 요약했습니다. 각주별 상세 시험·지원 조건은 원문도 확인하세요.",
    "sections": [
      {
        "title": "마감",
        "items": [
          "스페이스 블랙, 클라우드 화이트, 라이트 골드, 스카이 블루",
          "티타늄 디자인",
          "Ceramic Shield 2 소재 전면",
          "Ceramic Shield 소재 후면"
        ]
      },
      {
        "title": "저장 용량",
        "items": [
          "256GB",
          "512GB",
          "1TB"
        ]
      },
      {
        "title": "크기 및 무게",
        "items": [
          "가로: 74.7mm",
          "세로: 156.2mm",
          "두께: 5.64mm",
          "무게: 165g"
        ]
      },
      {
        "title": "디스플레이",
        "items": [
          "Super Retina XDR 디스플레이",
          "16.6cm(대각선) 전면 화면 OLED 디스플레이",
          "2736 x 1260 픽셀 해상도(460ppi)",
          "Dynamic Island",
          "상시표시형 디스플레이",
          "최대 120Hz 가변 재생률을 제공하는 ProMotion 기술",
          "HDR 디스플레이",
          "True Tone",
          "넓은 색영역(P3)",
          "햅틱 터치",
          "2,000,000:1 명암비(일반)",
          "1000 니트 전체 최대 밝기(일반); 1600 니트 부분 최대 밝기(HDR); 3000 니트 부분 최대 밝기(야외); 1 니트 최소 밝기",
          "지문 및 유분 방지 코팅",
          "반사 방지 코팅",
          "여러 언어 및 문자 동시 표시 지원",
          "화면 대각선은 직사각형 기준. 실제 표시 영역은 더 작음."
        ]
      },
      {
        "title": "방수 및 방진",
        "items": [
          "IEC 규격 60529하의 IP68 등급 획득(최대 수심 6m, 최대 30분)"
        ]
      },
      {
        "title": "Apple Intelligence 및 Siri AI",
        "items": [
          "Apple Intelligence 및 Siri AI 지원. 기능·언어·지역별 제공 조건을 확인하세요."
        ]
      },
      {
        "title": "칩",
        "items": [
          "A19 Pro 칩",
          "6코어 CPU(성능 코어 2개 및 효율 코어 4개)",
          "5코어 GPU(Neural Accelerators 탑재)",
          "16코어 Neural Engine",
          "하드웨어 가속형 레이 트레이싱"
        ]
      },
      {
        "title": "카메라",
        "items": [
          "48MP Fusion 카메라 시스템",
          "48MP Fusion 메인: 26mm, ƒ/1.6 조리개, 센서 시프트 광학 이미지 흔들림 보정(OIS), 100% Focus Pixels, 초고해상도 사진 지원(24MP 및 48MP)",
          "12MP 광학 퀄리티 2배 망원도 가능: 52mm, ƒ/1.6 조리개, 센서 시프트 광학 이미지 흔들림 보정(OIS), 100% Focus Pixels",
          "최대 10배 디지털 줌",
          "맞춤 설정 가능한 기본 렌즈(Fusion 메인)",
          "사파이어 크리스털 렌즈 커버",
          "True Tone 플래시",
          "Photonic Engine",
          "Deep Fusion",
          "스마트 HDR 5",
          "초점 및 심도 제어 기능을 지원하는 한 차원 높은 인물 사진",
          "6가지 효과의 인물 사진 조명",
          "야간 모드",
          "파노라마(최대 63MP)",
          "최신 세대 사진 스타일",
          "사진 및 Live Photo 촬영 시 넓은 색영역 포착",
          "첨단 적목 보정",
          "자동 흔들림 보정",
          "고속 연사 모드",
          "사진 위치 표시 기능",
          "촬영 이미지 포맷: HEIF 및 JPEG"
        ]
      },
      {
        "title": "동영상 촬영",
        "items": [
          "4K Dolby Vision 동영상 촬영(초당 24, 25, 30 또는 60 프레임)",
          "1080p Dolby Vision 동영상 촬영(초당 25, 30 또는 60 프레임)",
          "720p Dolby Vision 동영상 촬영(초당 30 프레임)",
          "액션 모드(최대 2.8K Dolby Vision, 초당 60 프레임)",
          "1080p 슬로 모션 동영상 지원(초당 120 또는 240 프레임)",
          "듀얼 캡처(최대 4K Dolby Vision, 초당 30 프레임)",
          "타임랩스 동영상(동영상 흔들림 보정 포함)",
          "야간 모드 타임랩스",
          "QuickTake 동영상(최대 4K Dolby Vision, 초당 60 프레임)",
          "동영상을 위한 센서 시프트 광학 이미지 흔들림 보정(OIS)",
          "최대 6배 디지털 줌",
          "오디오 줌",
          "True Tone 플래시",
          "시네마틱 동영상 흔들림 보정(4K, 1080p 및 720p)",
          "연속 오토포커스 동영상",
          "4K 동영상 촬영 중 8MP 사진 촬영",
          "재생 중 줌",
          "녹화 동영상 포맷: HEVC 및 H.264",
          "공간 음향 및 스테레오 녹음",
          "바람 소리 감소",
          "오디오 믹스"
        ]
      },
      {
        "title": "전면 카메라",
        "items": [
          "18MP Center Stage 카메라",
          "ƒ/1.9 조리개",
          "Focus Pixels 방식 오토포커스",
          "Retina Flash",
          "탭해서 줌 및 회전",
          "사진을 위한 센터 스테이지",
          "초강력 흔들림 보정 동영상",
          "듀얼 캡처",
          "영상 통화를 위한 센터 스테이지",
          "Photonic Engine",
          "Deep Fusion",
          "스마트 HDR 5",
          "초점 및 심도 제어 기능을 지원하는 한 차원 높은 인물 사진",
          "6가지 효과의 인물 사진 조명",
          "애니모티콘과 미모티콘",
          "야간 모드",
          "최신 세대 사진 스타일",
          "사진 및 Live Photo 촬영 시 넓은 색영역 포착",
          "렌즈 보정",
          "자동 흔들림 보정",
          "고속 연사 모드",
          "4K Dolby Vision 동영상 촬영(초당 24, 25, 30 또는 60 프레임)",
          "1080p Dolby Vision 동영상 촬영(초당 25, 30 또는 60 프레임)",
          "1080p 슬로 모션 동영상 지원(초당 120 프레임)",
          "타임랩스 동영상(동영상 흔들림 보정 포함)",
          "야간 모드 타임랩스",
          "QuickTake 동영상(최대 4K Dolby Vision, 초당 60 프레임)",
          "시네마틱 동영상 흔들림 보정(4K, 1080p 및 720p)",
          "공간 음향 및 스테레오 녹음",
          "바람 소리 감소",
          "오디오 믹스"
        ]
      },
      {
        "title": "전원 및 배터리",
        "items": [
          "동영상: 최대 27시간 / 스트리밍: 최대 22시간",
          "별매 iPhone Air MagSafe 배터리 사용: 동영상 최대 40시간 / 스트리밍 최대 35시간",
          "충전식 리튬 이온 배터리 내장",
          "급속 충전 가능: USB‑C 충전 케이블과 함께 20W 이상 규격의 어댑터 사용 시(어댑터 별매) 또는 MagSafe 충전기와 함께 30W 이상 규격의 어댑터 사용 시 30분에 최대 50% 충전(충전기 및 어댑터 별매)"
        ]
      },
      {
        "title": "Face ID",
        "items": [
          "Center Stage 전면 카메라의 TrueDepth 기술을 통해 지원"
        ]
      },
      {
        "title": "안심 기능",
        "items": [
          "긴급 구조 요청",
          "충돌 감지"
        ]
      },
      {
        "title": "셀룰러 및 무선 기술",
        "items": [
          "모델 A3517*",
          "FDD‑5G NR(대역 n1, n2, n3, n5, n7, n8, n12, n20, n25, n26, n28, n30, n66, n70, n75)",
          "TDD‑5G NR(대역 n38, n40, n41, n48, n53, n77, n78, n79)",
          "FDD‑LTE(대역 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 66)",
          "TDD‑LTE(대역 34, 38, 39, 40, 41, 42, 48, 53)",
          "UMTS/HSPA+(850, 900, 1700/2100, 1900, 2100MHz)",
          "GSM/EDGE(850, 900, 1800, 1900MHz)",
          "Apple C1X 셀룰러 모뎀",
          "4x4 MIMO 방식을 지원하는 5G(sub-6 GHz)",
          "4x4 MIMO 방식을 지원하는 Gigabit LTE",
          "Apple N1 무선 네트워킹 칩",
          "2x2 MIMO 방식을 지원하는 Wi‑Fi 7(802.11be)",
          "Bluetooth 6",
          "Thread 네트워킹 기술",
          "Apple 2세대 초광대역 칩",
          "리더 모드를 지원하는 NFC",
          "예비 전력으로 작동하는 익스프레스 카드 기능"
        ]
      },
      {
        "title": "위치",
        "items": [
          "정밀 이중 주파수 GPS(GPS, GLONASS, Galileo, QZSS, BeiDou, NavIC)",
          "디지털 나침반",
          "Wi‑Fi",
          "셀룰러",
          "iBeacon 위치 정밀 감지 기능"
        ]
      },
      {
        "title": "외부 버튼 및 커넥터",
        "items": [
          "음량 올리기/내리기",
          "동작 버튼",
          "카메라 컨트롤",
          "측면 버튼",
          "내장 스피커",
          "내장 마이크",
          "USB-C 커넥터"
        ]
      },
      {
        "title": "동작 버튼 기능",
        "items": [
          "무음 모드, 집중 모드, 카메라, 비주얼 인텔리전스, 손전등, 음성 메모, 음악 인식, 번역, 확대기, 제어 항목, 단축어, 손쉬운 사용"
        ]
      },
      {
        "title": "카메라 컨트롤",
        "items": [
          "노출, 심도, 확대/축소, 카메라, 스타일, 색조"
        ]
      },
      {
        "title": "충전 및 확장",
        "items": [
          "* 다음을 지원하는 USB-C 커넥터: 충전",
          "USB 2(최대 480Mb/s)"
        ]
      },
      {
        "title": "MagSafe 및 무선 충전",
        "items": [
          "최대 20W MagSafe 무선 충전",
          "최대 20W Qi2 무선 충전",
          "자석 어레이",
          "정렬 자석",
          "액세서리 식별용 NFC",
          "자력계"
        ]
      },
      {
        "title": "센서",
        "items": [
          "Face ID",
          "기압계",
          "하이 다이내믹 레인지 자이로",
          "고중력 가속도계",
          "근접 센서",
          "듀얼 주변광 센서"
        ]
      },
      {
        "title": "SIM 카드",
        "items": [
          "듀얼 eSIM(2개의 활성 eSIM, 8개 이상의 eSIM 저장)",
          "iPhone Air는 편의성 및 보안 향상을 위해 첨단 eSIM 기술을 사용합니다(실물 SIM 카드와 호환되지 않음)."
        ]
      },
      {
        "title": "Apple Pay",
        "items": [
          "매장, 앱, 웹사이트에서 Face ID를 이용해 iPhone으로 결제",
          "Mac에서 Apple Pay 사용 시 iPhone으로 결제 완료",
          "익스프레스 교통카드로 대중교통 요금 결제"
        ]
      },
      {
        "title": "영상 통화",
        "items": [
          "셀룰러 또는 Wi-Fi 네트워크에서 FaceTime 영상 통화",
          "5G 또는 Wi-Fi 네트워크에서 FaceTime HD(1080p) 영상 통화",
          "영상 통화를 위한 센터 스테이지",
          "SharePlay",
          "화면 공유",
          "FaceTime 영상 통화 시 인물 사진 모드 지원",
          "공간 음향",
          "음성 분리 및 와이드 스펙트럼 마이크 모드",
          "후면 카메라를 이용한 줌"
        ]
      },
      {
        "title": "음성 통화",
        "items": [
          "FaceTime 음성 통화",
          "LTE 음성 통화(VoLTE)",
          "SharePlay",
          "화면 공유",
          "공간 음향",
          "음성 분리 및 와이드 스펙트럼 마이크 모드"
        ]
      },
      {
        "title": "오디오 재생",
        "items": [
          "지원되는 포맷: AAC, APAC, MP3, Apple Lossless, FLAC, Dolby Digital, Dolby Digital Plus, Dolby Atmos",
          "호환되는 AirPods에서 공간 음향 재생",
          "최대 음량 제한 설정 가능"
        ]
      },
      {
        "title": "동영상 재생",
        "items": [
          "지원되는 포맷: HEVC, H.264, AV1",
          "Dolby Vision, HDR10+/HDR10, HLG를 지원하는 HDR",
          "최대 4K HDR AirPlay 미러링, 사진, 동영상을 Apple TV(2세대 이후 모델) 또는 AirPlay 지원 스마트 TV로 출력"
        ]
      },
      {
        "title": "Siri",
        "items": [
          "메시지 전송, 미리 알림 설정 등 다양한 일상 작업들을 손쉽게 처리 가능",
          "“Siri야”라고 불러 음성만으로 핸즈프리 활성화, 또는 타이핑으로 Siri 사용"
        ]
      },
      {
        "title": "운영체제",
        "items": [
          "iOS"
        ]
      },
      {
        "title": "개인정보 보호",
        "items": [
          "앱 추적 승인·iMessage 및 FaceTime 종단간 암호화 지원."
        ]
      },
      {
        "title": "손쉬운 사용",
        "items": [
          "VoiceOver",
          "확대/축소",
          "확대기",
          "음성 명령",
          "스위치 제어",
          "AssistiveTouch",
          "눈 추적",
          "청각 장애인용 자막",
          "실시간 자막",
          "개인 음성",
          "실시간 말하기",
          "타이핑으로 Siri 사용",
          "음성 단축어",
          "콘텐츠 말하기"
        ]
      },
      {
        "title": "내장 앱",
        "items": [
          "App Store",
          "도서",
          "계산기",
          "캘린더",
          "카메라",
          "시계",
          "나침반",
          "연락처",
          "FaceTime",
          "파일",
          "나의 찾기",
          "피트니스",
          "Freeform",
          "Games",
          "GarageBand",
          "건강",
          "홈",
          "iMovie",
          "iTunes Store",
          "일기",
          "Keynote",
          "확대기",
          "Mail",
          "지도",
          "측정",
          "메시지",
          "음악",
          "메모",
          "Numbers",
          "Pages",
          "암호",
          "전화",
          "사진",
          "팟캐스트",
          "미리보기",
          "미리 알림",
          "Safari",
          "설정",
          "단축어",
          "주식",
          "팁",
          "번역",
          "TV",
          "음성 메모",
          "지갑",
          "Watch",
          "날씨"
        ]
      },
      {
        "title": "보청기 호환 등급",
        "items": [
          "미국 HAC(보청기 호환성) 등급 보유"
        ]
      },
      {
        "title": "시스템 요구 사양",
        "items": [
          "Apple 계정(일부 기능에서 필요)",
          "인터넷 연결",
          "* Mac 또는 PC에서 동기화 시 요구 사양: macOS Catalina 10.15 이후 버전: Finder 사용",
          "macOS High Sierra 10.13부터 macOS Mojave 10.14.6까지: iTunes 12.8 이후 버전 사용",
          "Windows 10 이후 버전: iTunes 12.12.10 이후 버전 사용"
        ]
      },
      {
        "title": "사용 환경",
        "items": [
          "작동 온도: 0°C~35°C",
          "보관 가능(비작동) 온도: −20°C~45°C",
          "상대 습도: 5%~95% 미응결",
          "작동 고도: 3,000m까지 테스트"
        ]
      },
      {
        "title": "언어",
        "items": [
          "언어 지원"
        ]
      },
      {
        "title": "제품 구성",
        "items": [
          "iOS 27이 설치된 iPhone",
          "USB-C 충전 케이블(1m)",
          "설명서"
        ]
      },
      {
        "title": "상품정보표시",
        "items": [
          "제품명: 스마트폰",
          "모델명: A3517",
          "수입자: 애플코리아 유한회사",
          "인증정보:  R-C-APA-A3517",
          "제조자: Apple Inc.",
          "동일모델의 출시년월: 2025년 9월",
          "제조국: 중국",
          "* 품질보증기준: https://www.apple.com/kr/legal/warranty/",
          "서비스 연락처: 080-333-4000",
          "iPhone Air는 환경에 미치는 영향을 줄이도록 디자인되었습니다."
        ]
      },
      {
        "title": "소재",
        "items": [
          "iPhone Air는 아래의 사항을 포함해 35%의 재활용 소재로 제작되었습니다.",
          "80% 재활용 티타늄",
          "배터리에 100% 재활용 코발트 및 95% 재활용 리튬 사용",
          "Apple이 설계한 모든 인쇄 회로 기판의 도금과 솔더에 각각 100% 재활용 금과 주석 사용",
          "모든 카메라의 와이어 및 모든 커넥터의 도금에 100% 재활용 금 사용",
          "100% 희토류 원소로 만든 자석만 사용",
          "배터리 외장에 80% 재활용 강철 사용"
        ]
      },
      {
        "title": "에너지",
        "items": [
          "iPhone Air 생산에 사용되는 전력의 45%를 재생 가능 전력으로 조달",
          "배터리 충전기 시스템에 관한 미 에너지부 요건 초과 충족"
        ]
      },
      {
        "title": "포장",
        "items": [
          "섬유 기반 소재가 100% 쓰인 포장재",
          "운송 1회당 10% 더 많은 iPhone Air 제품을 실을 수 있도록 콤팩트한 포장 사용"
        ]
      },
      {
        "title": "폐기물",
        "items": [
          "Apple의 ‘제로 폐기물 프로그램’에 따라 기존의 모든 최종 조립 시설에서 매립 폐기물 근절"
        ]
      },
      {
        "title": "더 스마트한 화학물질 사용",
        "items": [
          "Apple 규제 물질 명세서 적용."
        ]
      }
    ],
    "conditions": [
      "화면 크기는 대각선 기준이며 실제 표시 영역은 더 작습니다.",
      "표시 용량과 사용 가능한 저장 공간은 다릅니다. 설치 소프트웨어와 설정에 따라 달라집니다.",
      "배터리 시험값은 제조사 시험 조건 기준입니다. 실제 사용 시간과 충전 시간은 환경에 따라 달라집니다.",
      "방수 성능은 영구적이지 않습니다. 시험 조건·액체 종류·마모 상태를 확인하세요.",
      "AI·결제·eSIM·네트워크 기능에는 지역·통신사·언어·계정·서비스별 조건이 적용됩니다."
    ]
  },
  "galaxy-s26-fe": {
    "source": "feSpecs",
    "checkedAt": "2026-09-30",
    "scope": "한국 삼성닷컴 SM-S741NZKWKOO(8GB RAM·256GB) 공식 상세 사양표의 16개 분류·66개 항목을 모두 수록했습니다. 기존 국내 발표·제품 소개의 확인된 보충 항목도 보존합니다. 다른 지역 모델의 사양은 대입하지 않았습니다.",
    "sections": [
        {
            "title": "프로세서",
            "items": [
                "CPU 속도: 3.3GHz,2.74GHz,2.36GHz,1.8 GHz",
                "CPU 종류: Deca-Core",
                "CPU: 삼성 엑시노스 2500",
                "Exynos 2500 / 3nm"
            ]
        },
        {
            "title": "디스플레이",
            "items": [
                "크기 (Main Display): 171.1mm",
                "해상도 (Main Display): 1080 x 2340 (FHD+)",
                "종류 (Main Display): Dynamic AMOLED 2X",
                "색심도 (Main Display): 16 M",
                "최대 주사율 (Main Display): 120 Hz",
                "171.1mm(6.7형) / FHD+ / Dynamic AMOLED 2X",
                "최대 120Hz / 최대 밝기 1,900nits"
            ]
        },
        {
            "title": "카메라",
            "items": [
                "후면 카메라 - 화소 (Multiple): 50.0 MP + 12.0 MP + 8.0 MP",
                "후면 카메라 - 조리개 값 (Multiple): F1.8 , F2.2 , F2.4",
                "후면 카메라 - 오토 포커스: 예",
                "후면 카메라 - OIS: 예",
                "후면 카메라 - 줌: 3배 광학 줌, 광학 줌 수준의 2배 줌(적응형 픽셀 센서 활용), 최대 30배 디지털 줌",
                "전면 카메라 - 화소: 12.0 MP",
                "전면 카메라 - 조리개 값: F2.2",
                "전면 카메라 - 오토 포커스: 아니오",
                "후면 카메라 - 플래쉬: 예",
                "동영상 녹화 해상도: UHD 8K (7680 x 4320) @30fps",
                "슬로우 모션: 240fps @FHD,120fps @FHD,120fps @UHD",
                "광각: 50MP / F1.8 / OIS / 화각 84°",
                "초광각: 12MP / F2.2 / 화각 123°",
                "망원: 8MP / F2.4 / OIS / 화각 32° / 3배 광학 줌",
                "디지털 줌 최대 30배",
                "전면: 12MP / F2.2",
                "마이 팬캠 / 슈퍼 스테디 수평 고정 / 나이토그래피 / 포토 어시스트"
            ]
        },
        {
            "title": "메모리/스토리지",
            "items": [
                "메모리 (GB): 8 GB",
                "스토리지(저장 용량) (GB): 256 GB",
                "사용 가능한 스토리지(저장 용량) (GB): 230.8GB",
                "국내 모델: RAM 8GB / 256GB"
            ]
        },
        {
            "title": "네트워크",
            "items": [
                "SIM 개수: Dual-SIM",
                "SIM 슬롯 타입: SIM 1 + eSIM / Dual eSIM"
            ]
        },
        {
            "title": "네트워크 (S/W 사용)",
            "items": [
                "2G GSM: GSM850,GSM900,DCS1800,PCS1900",
                "3G UMTS: B1(2100),B2(1900),B4(AWS),B5(850),B8(900)",
                "4G FDD LTE: B1(2100),B2(1900),B3(1800),B4(AWS),B5(850),B7(2600),B8(900),B12(700),B13(700),B17(700),B18(800),B19(800),B20(800),B25(1900),B26(850),B28(700),B66(AWS-3)",
                "4G TDD LTE: B38(2600),B40(2300),B41(2500)",
                "5G FDD Sub6: N1(2100),N2(1900),N3(1800),N5(850),N7(2600),N8(900),N12(700),N20(800),N25(1900),N26(850),N28(700),N66(AWS-3)",
                "5G TDD Sub6: N38(2600),N40(2300),N41(2500),N77(3700),N78(3500)"
            ]
        },
        {
            "title": "연결",
            "items": [
                "USB 인터페이스: USB Type-C",
                "USB 버전: USB 2.0",
                "위치 기술: GPS,Glonass,Beidou,Galileo,QZSS",
                "이어잭: USB Type-C",
                "MHL: 아니오",
                "Wi-Fi: 802.11a/b/g/n/ac/ax 2.4GHz+5GHz+6GHz, HE160, MIMO, 1024-QAM",
                "Wi-Fi Direct: 예",
                "블루투스 버전: Bluetooth v5.4",
                "NFC: 예",
                "PC 싱크: Smart Switch (PC version)",
                "5G / LTE / Wi-Fi 6E / Wi-Fi Direct / Bluetooth 5.4"
            ]
        },
        {
            "title": "운영체제",
            "items": [
                "Android",
                "Android 17 / One UI 9"
            ]
        },
        {
            "title": "기본 사양",
            "items": [
                "색상: 그라파이트",
                "형태: 터치 바"
            ]
        },
        {
            "title": "센서",
            "items": [
                "가속도 센서,기압 센서,지문 센서,자이로 센서,지자기 센서,홀 센서,조도 센서,근접 센서"
            ]
        },
        {
            "title": "외관 사양",
            "items": [
                "크기(세로x가로x두께, mm): 161.6 x 76.9 x 7.4",
                "무게 (g): 193",
                "161.6 × 76.9 × 7.4mm / 193g"
            ]
        },
        {
            "title": "배터리",
            "items": [
                "비디오 재생 시간 (Hours): 최대 29",
                "배터리 용량 (mAh, Typical): 4900",
                "교체 가능: 아니오",
                "대표 용량 4,900mAh / 정격 4,755mAh",
                "제조사 조건에서 30분에 최대 69% 충전"
            ]
        },
        {
            "title": "오디오/비디오",
            "items": [
                "스테레오 지원: 예",
                "동영상 지원 포맷: MP4,M4V,3GP,3G2,AVI,FLV,MKV,WEBM",
                "동영상 지원 해상도: UHD 8K (7680 x 4320) @60fps",
                "오디오 지원 포맷: MP3,M4A,3GA,AAC,OGG,OGA,WAV,AMR,AWB,FLAC,MID,MIDI,XMF,MXMF,IMY,RTTTL,RTX,OTA,DFF,DSF,APE"
            ]
        },
        {
            "title": "서비스",
            "items": [
                "Gear 서포트: 갤럭시 링,갤럭시 버즈 코어,갤럭시 버즈4 프로,갤럭시 버즈3 프로,갤럭시 버즈2 프로,갤럭시 버즈 프로,갤럭시 버즈 라이브,갤럭시 버즈+,갤럭시 버즈4,갤럭시 버즈3,갤럭시 버즈2,갤럭시 버즈,갤럭시 버즈3 FE,갤럭시 버즈 FE,갤럭시 핏3,갤럭시 핏2,갤럭시 워치 FE,갤럭시 워치 울트라2,갤럭시 워치 울트라,갤럭시 워치9,갤럭시 워치8,갤럭시 워치7,갤럭시 워치6,갤럭시 워치5,갤럭시 워치4,갤럭시 워치3,갤럭시 워치,갤럭시 워치 액티브2,갤럭시 워치 액티브",
                "삼성 덱스 서포트: 지원",
                "SmartThings 지원: 지원",
                "블루투스 보청기 지원: 보청기용 안드로이드 오디오 스트리밍(ASHA)",
                "모바일 TV: 아니오"
            ]
        },
        {
            "title": "소프트웨어 지원",
            "items": [
                "보안 업데이트 지원 기한: 2033년 9월 30일",
                "OS 업그레이드 최대 7세대 / 보안 업데이트 7년"
            ]
        },
        {
            "title": "상품 기본정보",
            "items": [
                "제품명: 5G NR 이동통신용 무선설비의 기기(3.5 GHz)(육상이동국의 송수신장치)",
                "제조자/수입자: 삼성전자㈜",
                "제조국가: 베트남",
                "KC 인증 필 유무: R-C-SEC-SMS741",
                "동일모델의 출시년월: 26년 9월",
                "A/S 책임자와 전화번호: 삼성전자서비스센터/1588-3366",
                "품질보증기준: 결함·하자 등에 따른 소비자 피해에 대해서는 소비자분쟁해결기준(소비자기본법 제16조)에 따라 보상 가능"
            ]
        },
        {
            "title": "방수방진",
            "items": [
                "IP68 / 담수 최대 1.5m·30분 시험"
            ]
        },
        {
            "title": "색상",
            "items": [
                "블루베리 / 그라파이트 / 피스타치오"
            ]
        },
        {
            "title": "국내 출시",
            "items": [
                "2026-09-04 / 256GB 1,045,000원"
            ]
        }
    ],
    "conditions": [
        "화면 크기는 대각선 기준이며 실제 표시 영역은 더 작습니다.",
        "표시 용량과 사용 가능한 저장 공간은 다릅니다. 설치 소프트웨어와 설정에 따라 달라집니다.",
        "배터리 시험값은 제조사 시험 조건 기준입니다. 실제 사용 시간과 충전 시간은 환경에 따라 달라집니다.",
        "방수 성능은 영구적이지 않습니다. 시험 조건·액체 종류·마모 상태를 확인하세요.",
        "AI·결제·eSIM·네트워크 기능에는 지역·통신사·언어·계정·서비스별 조건이 적용됩니다.",
        "공식 상세 표의 UWB 항목은 미기재입니다. 미기재를 미지원으로 해석하지 않습니다.",
        "비디오 재생 최대 29시간은 제조사 시험값이며, 실제 사용 시간은 네트워크·설정·화면 밝기·배터리 상태 등에 따라 달라집니다. 녹화 8K @30fps와 재생 8K @60fps는 다른 항목입니다.",
        "프레임은 알루미늄 합금이고 전후면은 Gorilla Glass Victus+입니다. 프레임 소재 설명에서 볼륨 버튼·사이드 키·SIM 트레이·카메라 렌즈 배럴은 제외됩니다."
    ]
}
});

type DetailRow = { key: string; label: string; values: string[]; note?: string };
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
const extraDetailValues: Record<string, string[]> = {
  "galaxy-s26-fe": [
    "4,900 / 4,755mAh",
    "최대 29시간",
    "해당 공식 사양 문서에 스트리밍 시간 미기재",
    "USB-C · USB 2.0",
    "Wi-Fi 6E · 2.4/5/6GHz · HE160 · MIMO · 1024-QAM",
    "5.4",
    "해당 공식 상세 표에 UWB 미기재",
    "SIM 1 + eSIM / 듀얼 eSIM",
    "2033-09-30",
    "Samsung DeX · Smart Switch PC"
  ],
  "galaxy-z-fold8-ultra": [
    "5,000mAh 대표값 · 정격 미확인",
    "최대 27시간",
    "이번 공식 조사에서 미확인",
    "USB-C · USB 3.2 Gen 1",
    "Wi-Fi 7 · 2.4/5/6GHz · EHT320 · MIMO · 4096-QAM",
    "6.0",
    "지원",
    "SIM 1 + eSIM / 듀얼 eSIM",
    "2033-07-31",
    "Samsung DeX · Smart Switch PC"
  ],
  "galaxy-z-fold8": [
    "4,800mAh 대표값 · 정격 미확인",
    "최대 26시간",
    "이번 공식 조사에서 미확인",
    "USB-C · USB 3.2 Gen 1",
    "Wi-Fi 7 · 2.4/5/6GHz · EHT320 · MIMO · 4096-QAM",
    "6.0",
    "지원",
    "SIM 1 + eSIM / 듀얼 eSIM",
    "2033-07-31",
    "Samsung DeX · Smart Switch PC"
  ],
  "galaxy-z-flip8": [
    "4,300mAh 대표값 · 정격 미확인",
    "최대 31시간",
    "이번 공식 조사에서 미확인",
    "USB-C · USB 3.2 Gen 1",
    "Wi-Fi 7 · 2.4/5/6GHz · EHT320 · MIMO · 4096-QAM",
    "5.4",
    "지원",
    "SIM 1 + eSIM / 듀얼 eSIM",
    "2033-07-31",
    "Samsung DeX · Smart Switch PC"
  ],
  "galaxy-a37": [
    "5,000mAh 대표값 · 정격 원문 표기 재확인 필요",
    "최대 29시간",
    "이번 공식 조사에서 미확인",
    "USB-C · USB 2.0",
    "Wi-Fi 6 · 2.4/5GHz · HE80 · MIMO · 1024-QAM",
    "5.3",
    "해당 공식 지원 표에 미기재",
    "SIM 1 + eSIM / 듀얼 eSIM",
    "2032-03-31",
    "DeX 미지원 · Smart Switch PC"
  ],
  "iphone-18-pro": [
    "해당 공식 사양 문서에 mAh 미기재",
    "최대 34시간 · eSIM 전용 모델 시험",
    "최대 31시간 · eSIM 전용 모델 시험",
    "USB-C · USB 3 최대 10Gb/s · DisplayPort",
    "Wi-Fi 7 · 2×2 MIMO · Apple N1",
    "6",
    "Apple 2세대 초광대역 칩",
    "nano-SIM + eSIM / 듀얼 eSIM",
    "해당 공식 사양 문서에 종료일 미기재",
    "USB-C DisplayPort"
  ],
  "iphone-18-pro-max": [
    "해당 공식 사양 문서에 mAh 미기재",
    "최대 43시간 · eSIM 전용 모델 시험",
    "최대 38시간 · eSIM 전용 모델 시험",
    "USB-C · USB 3 최대 10Gb/s · DisplayPort",
    "Wi-Fi 7 · 2×2 MIMO · Apple N1",
    "6",
    "Apple 2세대 초광대역 칩",
    "nano-SIM + eSIM / 듀얼 eSIM",
    "해당 공식 사양 문서에 종료일 미기재",
    "USB-C DisplayPort"
  ],
  "iphone-duo": [
    "해당 공식 사양 문서에 mAh 미기재",
    "외부 최대 44시간 / 내부 최대 31시간 · 동일 시험 아님",
    "외부 최대 37시간 / 내부 최대 26시간",
    "USB-C · USB 3 최대 10Gb/s · DisplayPort",
    "Wi-Fi 7 · 2×2 MIMO · Apple N1",
    "6",
    "Apple 2세대 초광대역 칩",
    "듀얼 eSIM 전용 · 실물 SIM 미지원",
    "해당 공식 사양 문서에 종료일 미기재",
    "USB-C DisplayPort"
  ],
  "iphone-17e": [
    "해당 공식 사양 문서에 mAh 미기재",
    "최대 26시간",
    "최대 21시간",
    "USB-C · USB 2 최대 480Mb/s",
    "Wi-Fi 6 · 2×2 MIMO",
    "5.3",
    "해당 공식 사양 문서에 미기재",
    "nano-SIM + eSIM / 듀얼 eSIM",
    "해당 공식 사양 문서에 종료일 미기재",
    "해당 공식 사양 문서에 DisplayPort 미기재"
  ],
  "iphone-air": [
    "해당 공식 사양 문서에 mAh 미기재",
    "최대 27시간 · 별매 MagSafe 배터리 제외",
    "최대 22시간 · 별매 MagSafe 배터리 제외",
    "USB-C · USB 2 최대 480Mb/s",
    "Wi-Fi 7 · 2×2 MIMO · Apple N1",
    "6",
    "Apple 2세대 초광대역 칩",
    "듀얼 eSIM 전용 · 실물 SIM 미지원",
    "해당 공식 사양 문서에 종료일 미기재",
    "해당 공식 사양 문서에 DisplayPort 미기재"
  ]
};
for (const [rowIndex, row] of detailRows.entries()) {
  row.values.push(...phoneData.slice(4).map(phone => extraDetailValues[phone.id][rowIndex]));
}
const detailSourceIds = phoneData.map(phone => phone.id === "galaxy-s26-fe" ? "feSpecs" : phone.specs.processor.sources[0]);
const detailCheckedAt = "2026-09-30";

const checkedAt = "2026-09-28";
type ModelInfo = { family: string; screen: string; weight: string; camera: string; date: string; upcoming?: boolean };
const modelInfo: Record<string, ModelInfo> = {
  "galaxy-s26-ultra": {
    "family": "S 시리즈",
    "screen": "6.9형",
    "weight": "214g",
    "camera": "200MP · 광학 3·5배",
    "date": "2026년 S 시리즈"
  },
  "galaxy-s26": {
    "family": "S 시리즈",
    "screen": "6.3형",
    "weight": "167g",
    "camera": "50MP · 광학 3배",
    "date": "2026년 S 시리즈"
  },
  "iphone-17-pro": {
    "family": "Pro",
    "screen": "6.3형",
    "weight": "204g",
    "camera": "48MP · 광학 4배",
    "date": "2025년 Pro 시리즈"
  },
  "iphone-17-pro-max": {
    "family": "Pro",
    "screen": "6.9형",
    "weight": "231g",
    "camera": "48MP · 광학 4배",
    "date": "2025년 Pro 시리즈"
  },
  "galaxy-s26-fe": {
    "family": "S 시리즈",
    "screen": "6.7형",
    "weight": "193g",
    "camera": "50MP · 광학 3배",
    "date": "2026.09 출시"
  },
  "galaxy-z-fold8-ultra": {
    "family": "폴더블",
    "screen": "8.0형 · 펼침",
    "weight": "215g",
    "camera": "200MP · 광학 3배",
    "date": "2026.08 출시"
  },
  "galaxy-z-fold8": {
    "family": "폴더블",
    "screen": "7.6형 · 펼침",
    "weight": "201g",
    "camera": "50MP · 광학 수준 2배",
    "date": "2026.08 출시"
  },
  "galaxy-z-flip8": {
    "family": "폴더블",
    "screen": "6.9형 · 펼침",
    "weight": "180g",
    "camera": "50MP · 광학 수준 2배",
    "date": "2026.08 출시"
  },
  "galaxy-a37": {
    "family": "A 시리즈",
    "screen": "6.7형",
    "weight": "196g",
    "camera": "50MP · 초광각·접사",
    "date": "2026.06 출시"
  },
  "iphone-18-pro": {
    "family": "Pro",
    "screen": "6.3형",
    "weight": "211g",
    "camera": "48MP · 가변 조리개",
    "date": "2026.09 출시"
  },
  "iphone-18-pro-max": {
    "family": "Pro",
    "screen": "6.9형",
    "weight": "249g",
    "camera": "48MP · 가변 조리개",
    "date": "2026.09 출시"
  },
  "iphone-duo": {
    "family": "폴더블",
    "screen": "7.6형 · 펼침",
    "weight": "254g",
    "camera": "48MP · 듀얼 Fusion",
    "date": "10.23 출시 예정",
    "upcoming": true
  },
  "iphone-17e": {
    "family": "e",
    "screen": "6.1형",
    "weight": "170g",
    "camera": "48MP · 단일 후면",
    "date": "2026.03 출시"
  },
  "iphone-air": {
    "family": "Air",
    "screen": "6.5형",
    "weight": "165g",
    "camera": "48MP · 단일 후면",
    "date": "2025.09 출시"
  }
};

const categories: { key: SpecKey; label: string; question: string }[] = [
  { key: "processor", label: "프로세서 · 발열", question: "지금 쓰시는 폰에서 느리거나 불편한 앱이 있나요?" },
  { key: "display", label: "화면 · 밝기", question: "화면 크기와 야외 사용, 무엇이 더 중요하세요?" },
  { key: "weight", label: "무게 · 소재", question: "무게 · 두께 · 소재" },
  { key: "camera", label: "카메라 · 줌", question: "주로 가까운 사람을 찍으세요, 먼 풍경을 찍으세요?" },
  { key: "special_feature", label: "결제 · 편의 기능", question: "꼭 필요한 결제·펜·저장공간이 있나요?" },
];
const normalize = (value: string) => value.normalize("NFKC").toLowerCase().replace(/[\s._-]+/g, "");
// Normalize equivalent version labels only; retain meaningful wording and unknown values.
const comparableDetail = (key: string, value: string) => key === "bluetooth"
  ? value.replace(/(\d+)\.0\b/g, "$1").trim()
  : value.trim();
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

function BriefCard({ phone, specKey, version, slot }: { phone: Phone; specKey: SpecKey; version: "short" | "detail"; slot: number }) {
  const spec = phone.specs[specKey];
  return (
    <article aria-label={`${phone.model_name} ${categories.find((item) => item.key === specKey)?.label}`} className={`flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 leading-relaxed sm:p-5 text-base`}>
      <p className="brief-model text-lg font-bold text-slate-950"><span className="text-blue-800">{slot === 0 ? "A" : "B"} · </span>{phone.model_name}</p>
      <div className="rounded-xl border-l-4 border-blue-700 bg-blue-50 p-4 text-blue-950">
        <h3 className="mb-2 text-base font-bold">{version === "short" ? "짧게 안내" : "풀어서 안내"}</h3>
        <p className="font-semibold">“{version === "short" ? spec.sales_pitch : spec.sales_pitch_detail}”</p>
      </div>
      <details className="rounded-xl border border-slate-200 p-3">
        <summary className="min-h-11 cursor-pointer py-2 text-base font-bold">공식 스펙·전작 대비·유의사항</summary>
        <div className="mt-2 space-y-3">
      <div className="rounded-xl bg-slate-100 p-4 text-slate-700">
        <h3 className="mb-2 text-base font-bold">공식 스펙</h3>
        <p>{spec.official}</p>
      </div>
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-blue-950">
        <h3 className="mb-2 inline-block rounded-lg bg-blue-700 px-3 py-1 text-base font-bold text-white">전작 대비</h3>
        <p className="mb-2 text-base font-bold">기준: {phone.previous}</p>
        <p>{spec.vs_previous}</p>
      </div>
      <p className="border-l-4 border-slate-300 pl-3 text-base text-slate-700"><strong>안내 시 유의: </strong>{spec.caution}</p>
        </div>
      </details>
      <details className="mt-auto border-t border-slate-200 pt-3">
        <summary className="min-h-11 cursor-pointer py-2 text-base font-bold text-slate-700">공식 근거 확인</summary>
        <SourceLinks ids={spec.sources} />
      </details>
    </article>
  );
}

function OfficialSpecs({ phone }: { phone: Phone }) {
  const data = fullSpecCatalog[phone.id];
  const [filter, setFilter] = useState("");
  const [opened, setOpened] = useState<string[]>([]);
  const keyword = normalize(filter);
  const groups = data.sections.filter(section => normalize(section.title + " " + section.items.join(" ")).includes(keyword));
  return <section className={`min-w-0 rounded-2xl border border-slate-200 bg-white p-4 leading-relaxed sm:p-6 text-base`} aria-label={`${phone.model_name} 공식 상세 사양`}>
    <h3 className="text-xl font-bold">{phone.model_name}</h3>
    <p className="mt-2 text-base text-slate-600">{data.scope}</p>
    <p className="mt-2 text-base text-slate-600">확인 {data.checkedAt} · {data.sections.length}개 분류 · {data.sections.reduce((sum, section) => sum + section.items.length, 0)}개 표시 항목</p>
    <label htmlFor={`full-search-${phone.id}`} className="mb-2 mt-4 block font-bold">이 모델의 사양 검색</label>
    <input id={`full-search-${phone.id}`} value={filter} onChange={event => setFilter(event.target.value)} placeholder="예: 통신, 카메라, 언어, NFC" className="min-h-12 w-full rounded-xl border border-slate-300 p-3 text-base" />
    <div className="my-3 flex flex-wrap gap-2"><button type="button" onClick={() => setOpened(data.sections.map(section => section.title))} className={control}>모두 펼치기</button><button type="button" onClick={() => { setOpened([]); setFilter(""); }} className={control}>모두 접기</button></div>
    <p className="my-3 text-base text-slate-600" role="status">검색된 분류 {groups.length}개</p>
    {groups.map(section => <details key={section.title} open={Boolean(keyword) || opened.includes(section.title)} className="border-t border-slate-200 py-2">
      <summary onClick={event => { event.preventDefault(); if (!keyword) setOpened(current => current.includes(section.title) ? current.filter(title => title !== section.title) : [...current, section.title]); }} className="min-h-12 cursor-pointer py-3 font-bold">{section.title}</summary>
      <ul className="list-disc space-y-2 break-words pl-5 pb-4 [overflow-wrap:anywhere]">{section.items.map((item, index) => <li key={index}>{item}</li>)}</ul>
    </details>)}
    {groups.length === 0 && <p className="rounded-xl bg-slate-100 p-4">일치하는 사양이 없습니다.</p>}
    <details className="mt-4 rounded-xl bg-amber-50 p-4" open={Boolean(keyword) && data.conditions.some(item => normalize(item).includes(keyword))}>
      <summary className="min-h-12 cursor-pointer py-2 font-bold">적용 조건·각주 ({data.conditions.length}개)</summary>
      <ul className="mt-3 space-y-3 break-words text-base">{data.conditions.map((condition, index) => <li key={index}>{condition}</li>)}</ul>
    </details>
    <div className="mt-4"><SourceLinks ids={phone.id === "galaxy-s26-fe" ? [data.source, "feProduct", "feOverview", "galaxy-s26-fe"] : [data.source]} /></div>
  </section>;
}

export default function Page() {
  const locationSearch = useRef<string | null>(null);
  const [query, setQuery] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [fontControlsOpen, setFontControlsOpen] = useState(false);
  const [brand, setBrand] = useState("all");
  const [family, setFamily] = useState("all");
  const [showAllModels, setShowAllModels] = useState(false);
  const [selected, setSelected] = useState<[string, string]>([phoneData[0].id, phoneData[2].id]);
  const [target, setTarget] = useState<0 | 1>(0);
  const [topic, setTopic] = useState<SpecKey | "all">("all");
  const [pitchVersion, setPitchVersion] = useState<"short" | "detail">("detail");
  const [fontSize, setFontSize] = useState(18);
  const [fontReady, setFontReady] = useState(false);
  const [status, setStatus] = useState("");
  const [detailQuery, setDetailQuery] = useState("");
  const [differentOnly, setDifferentOnly] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    locationSearch.current = window.location.search;
    const restore = () => {
      const params = new URLSearchParams(window.location.search);
      const a = params.get("a"), b = params.get("b");
      if (a && b && a !== b && phoneData.some(p => p.id === a) && phoneData.some(p => p.id === b)) {
        setSelected([a, b]);
      } else if (a || b) {
        setStatus("공유 주소의 모델 조합이 유효하지 않아 기본 모델을 표시합니다.");
        setSelected([phoneData[0].id, phoneData[2].id]);
      }
      setShareUrl("");
    };
    restore();
    const restoreOnQueryChange = () => {
      if (window.location.search === locationSearch.current) return;
      locationSearch.current = window.location.search;
      restore();
    };
    window.addEventListener("popstate", restoreOnQueryChange);
    return () => window.removeEventListener("popstate", restoreOnQueryChange);
  }, []);
  useEffect(() => {
    try {
      const stored = Number(window.localStorage.getItem("phone-font-size"));
      if ([18, 20, 22, 24].includes(stored)) setFontSize(stored);
    } catch { /* 저장이 제한된 브라우저에서도 글자 조절은 사용할 수 있습니다. */ }
    setFontReady(true);
  }, []);
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    if (fontReady) {
      try { window.localStorage.setItem("phone-font-size", String(fontSize)); }
      catch { /* 크기 저장이 제한되어도 현재 화면의 크기는 유지합니다. */ }
    }
  }, [fontSize, fontReady]);
  const normalizedQuery = normalize(query.trim());
  const matches = useMemo(() => searchIndex.filter(({ phone, text }) => (brand === "all" || phone.brand === brand) && (family === "all" || modelInfo[phone.id].family === family) && text.includes(normalizedQuery)).map(({ phone }) => phone), [brand, family, normalizedQuery]);
  const visibleModels = normalizedQuery || showAllModels || brand !== "all" || family !== "all" ? matches : matches.slice(0, 8);
  const left = phoneData.find((phone) => phone.id === selected[0])!;
  const right = phoneData.find((phone) => phone.id === selected[1])!;
  const selectedPhones = [left, right];
  const visibleCategories = categories.filter((item) => topic === "all" || item.key === topic);

  function choose(id: string, slot: 0 | 1 = target) {
    const other = slot === 0 ? 1 : 0;
    setSelected((current) => current[other] === id ? [current[1], current[0]] : slot === 0 ? [id, current[1]] : [current[0], id]);
    setStatus(selected[other] === id ? "A와 B 기종의 위치를 바꿨습니다." : `${slot === 0 ? "A" : "B"} 기종: ${phoneData.find((phone) => phone.id === id)!.model_name}`);
    setShareUrl("");
    if (slot === 0) setTarget(1);
  }

  async function shareComparison() {
    const url = new URL(window.location.href);
    url.search = new URLSearchParams({ a: left.id, b: right.id }).toString();
    url.hash = "comparison";
    window.history.replaceState(null, "", url);
    locationSearch.current = window.location.search;
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
    (!differentOnly || comparableDetail(row.key, row.values[detailIndexes[0]]) !== comparableDetail(row.key, row.values[detailIndexes[1]]) || [detailIndexes[0], detailIndexes[1]].some(index => /확인|미기재/.test(row.values[index])))
  );
  const storageOptions = [...new Set(selectedPhones.flatMap(phone => phone.prices.map(price => price.storage)))].sort((a, b) => {
    const size = (value: string) => parseFloat(value) * (value.includes("TB") ? 1024 : 1);
    return size(a) - size(b);
  });
  function resetModelFilters() { setQuery(""); setBrand("all"); setFamily("all"); }

  return (
    <main lang="ko" className={`min-h-screen bg-slate-50 text-base text-slate-900 selection:bg-blue-200 ${fontSize >= 22 ? "large-text" : ""}`}>
      <a href="#comparison" className="sr-only focus:not-sr-only focus:block focus:bg-white focus:p-4">비교 내용으로 바로가기</a>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-3 py-2 sm:px-6">
          <div><h1 className="text-xl font-bold sm:text-2xl">써니의 폰백과사전</h1><p className="mt-1 hidden text-base text-slate-600 lg:block">공식 사양 · 용량별 출시가 · 전화 안내</p></div>
          <button type="button" aria-expanded={fontControlsOpen} aria-controls="font-controls" onClick={() => setFontControlsOpen(!fontControlsOpen)} className={`${control} !px-3 !py-2 lg:hidden`}>글자 설정</button>
          <div id="font-controls" className={`${fontControlsOpen ? "flex" : "hidden"} w-full flex-wrap items-center gap-2 rounded-xl bg-slate-100 p-2 lg:flex lg:w-auto`} role="group" aria-label="글자 크기 조절">
            <span className="font-bold">글자</span>
            <button type="button" aria-label="글자 작게" onClick={() => setFontSize(current => Math.max(18, current - 2))} disabled={fontSize === 18} className={control}>가 −</button>
            <output aria-live="polite" aria-label="현재 글자 크기" className="min-w-12 text-center font-bold">{fontSize}px</output>
            <button type="button" aria-label="글자 크게" onClick={() => setFontSize(current => Math.min(24, current + 2))} disabled={fontSize === 24} className={control}>가 +</button>
            <button type="button" onClick={() => setFontSize(18)} aria-label="기본 크기" className={control}>기본</button>
          </div>
        </div>
      </header>
      <nav aria-label="비교 기종 선택" className="model-bar sticky top-0 z-30 border-b border-slate-200 bg-white px-3 py-2 shadow-sm print:hidden">
        <div className="mx-auto grid max-w-7xl gap-2 lg:grid-cols-[1fr_1fr_auto]">
          {selectedPhones.map((phone, slot) => <div key={slot} className={`flex min-w-0 items-center gap-2 rounded-xl border p-1 ${slot === 0 ? "border-blue-200 bg-blue-50" : "border-indigo-200 bg-indigo-50"}`}>
            <button type="button" onClick={() => setTarget(slot as 0 | 1)} aria-pressed={target === slot} aria-label={`${slot === 0 ? "A" : "B"} 기종 변경`} className={`min-h-11 min-w-11 shrink-0 rounded-lg font-bold ${target === slot ? "bg-blue-700 text-white" : "text-blue-900"}`}>{slot === 0 ? "A" : "B"}</button>
            <label htmlFor={`selected-${slot}`} className="sr-only">{slot === 0 ? "A" : "B"} 모델</label>
            <select id={`selected-${slot}`} value={phone.id} onChange={event => choose(event.target.value, slot as 0 | 1)} className="min-h-11 w-full min-w-0 flex-1 rounded-lg bg-transparent px-1 text-base font-bold">{phoneData.map(item => <option value={item.id} key={item.id}>{item.model_name}</option>)}</select>
          </div>)}
          <nav aria-label="빠른 이동" className="hidden items-center gap-2 lg:flex"><a href="#quick-comparison" className={`${control} section-nav-link tone-blue`}><span aria-hidden="true">↓</span>요약</a><a href="#prices" className={`${control} section-nav-link tone-amber`}><span aria-hidden="true">↓</span>가격</a><a href="#brief-title" className={`${control} section-nav-link tone-purple`}><span aria-hidden="true">↓</span>멘트</a><a href="#detail-title" className={`${control} section-nav-link tone-teal`}><span aria-hidden="true">↓</span>사양</a></nav>
        </div>
      </nav>
      <div className="mx-auto max-w-7xl space-y-4 px-3 py-3 sm:px-6 sm:py-5">
        <div className="grid items-start gap-3 lg:grid-cols-[20rem_minmax(0,1fr)]">
          <section id="model-picker" aria-labelledby="search-title" className="scroll-mt-40 min-w-0 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
            <div className="flex items-center justify-between gap-2"><h2 id="search-title" className="text-lg font-bold"><button type="button" aria-expanded={pickerOpen} aria-label={`기종 검색·목록 ${pickerOpen ? "닫기" : "열기"}`} aria-controls="picker-tools" onClick={() => setPickerOpen(!pickerOpen)} className="min-h-11 text-left lg:pointer-events-none">기종 검색 <span aria-hidden="true" className="lg:hidden">{pickerOpen ? "−" : "+"}</span></button></h2><button type="button" onClick={() => { setSelected([selected[1], selected[0]]); setShareUrl(""); setStatus("A와 B 기종의 위치를 바꿨습니다."); }} aria-label="A·B 교체" className={control}>교체</button></div>
            <p role="status" aria-live="polite" className="sr-only text-base text-blue-800 lg:not-sr-only lg:mt-2">{status}</p>
            <div id="picker-tools" className={`${pickerOpen ? "block" : "hidden"} lg:block`}>
            <p className="mt-2 text-base text-slate-600">검색 결과를 넣을 위치</p><div className="mt-2 flex gap-2">{[0, 1].map(slot => <button key={slot} type="button" aria-pressed={target === slot} onClick={() => setTarget(slot as 0 | 1)} className={`${control} flex-1 ${target === slot ? "!bg-blue-700 !text-white" : ""}`}>{slot === 0 ? "A 기종" : "B 기종"}</button>)}</div>
            <div className="mt-3 flex gap-2"><div className="min-w-0 flex-1"><label htmlFor="phone-search" className="mb-1 block font-bold">기종 이름 검색</label><input id="phone-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="예: A37, 아이폰18프로" autoComplete="off" className="min-h-12 w-full rounded-xl border-2 border-slate-300 bg-white px-3 text-base focus:border-blue-700" /></div>
            <div><label htmlFor="brand-filter" className="mb-1 block font-bold">제조사</label><select id="brand-filter" value={brand} onChange={event => { setBrand(event.target.value); setFamily("all"); }} className="min-h-12 rounded-xl border border-slate-300 bg-white px-2 text-base"><option value="all">전체</option><option value="Samsung">삼성</option><option value="Apple">애플</option></select></div></div>
            <details className="mt-2"><summary className="min-h-11 cursor-pointer py-2 font-bold">시리즈 필터</summary><div className="flex flex-wrap gap-2" role="group" aria-label="시리즈 필터">{["all", "S 시리즈", "폴더블", "A 시리즈", "Pro", "Air", "e"].map(value => <button key={value} type="button" aria-pressed={family === value} onClick={() => { setFamily(value); if (value !== "all") setBrand(["Pro", "Air", "e"].includes(value) ? "Apple" : "Samsung"); }} className={`${control} ${family === value ? "!border-slate-900 !bg-slate-900 !text-white" : ""}`}>{value === "all" ? "모든 시리즈" : value === "e" ? "아이폰 e" : value}</button>)}</div></details>
            <p className="mt-2 text-base text-slate-600">{matches.length}개 기종 · 선택 위치 {target === 0 ? "A" : "B"}</p>
            {(query || brand !== "all" || family !== "all") && <div className="mt-2 flex flex-wrap items-center gap-2" aria-label="적용 중인 검색 조건"><span className="rounded-lg bg-slate-100 px-2 py-1">{[query && `검색: ${query}`, brand !== "all" && (brand === "Apple" ? "애플" : "삼성"), family !== "all" && (family === "e" ? "아이폰 e" : family)].filter(Boolean).join(" · ")}</span><button type="button" onClick={resetModelFilters} className={control}>검색 조건 지우기</button></div>}
            {(normalizedQuery || brand !== "all" || family !== "all" || showAllModels) && <ul aria-label="검색된 기종" className="mt-2 grid max-h-[22rem] gap-2 overflow-y-auto overscroll-contain pr-1">{visibleModels.map(phone => <li key={phone.id}><button type="button" onClick={() => choose(phone.id)} aria-label={`${phone.model_name}, ${target === 0 ? "A" : "B"} 모델로 선택`} className={`${control} w-full !p-3 text-left ${selected.includes(phone.id) ? "!border-blue-500 !bg-blue-50" : ""}`}>
              <span className="flex items-start justify-between gap-2"><span className="font-bold">{phone.model_name}</span><span className="shrink-0 text-blue-700">{selected[0] === phone.id ? "A" : selected[1] === phone.id ? "B" : "+"}</span></span><span className="mt-1 block text-base font-normal text-slate-600">{phone.summary}</span><span className={`mt-1 block text-base ${modelInfo[phone.id].upcoming ? "font-bold text-amber-800" : "font-normal text-slate-500"}`}>{modelInfo[phone.id].date}</span>
            </button></li>)}</ul>}
            {!normalizedQuery && brand === "all" && family === "all" && <button type="button" onClick={() => setShowAllModels(!showAllModels)} className={`${control} mt-2 w-full`}>{showAllModels ? "기종 목록 접기" : `등록 기종 ${phoneData.length}종 보기`}</button>}
            {matches.length === 0 && <p className="mt-3 rounded-xl bg-slate-100 p-3">맞는 기종을 찾지 못했어요. 검색어나 위의 조건을 바꿔 보세요.</p>}
            </div>
          </section>
          <section id="quick-comparison" aria-labelledby="quick-title" className="scroll-mt-40 min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="section-heading tone-blue"><h2 id="quick-title" className="text-2xl font-bold">요약</h2><p>한눈에 비교</p></div>
            <div className="comparison-values grid grid-cols-2 border-y border-slate-200">{selectedPhones.map((phone, slot) => <div key={phone.id} className={`min-w-0 p-3 ${slot === 0 ? "bg-blue-50" : "bg-indigo-50"}`}><p className="font-bold text-blue-800">{slot === 0 ? "A" : "B"}</p><h3 className="mt-1 hidden break-words font-bold sm:block">{phone.model_name}</h3>{modelInfo[phone.id].upcoming && <p className="mt-1 text-base font-bold text-amber-800">출시 예정</p>}</div>)}</div>
            <dl>
              {[["기본 용량 출시가", ...selectedPhones.map(phone => `${phone.prices[0].storage} · ${money(phone.prices[0].krw)}${phone.price_basis === "preorder-announcement" ? " (발표가)" : ""}`)], ["화면", ...selectedPhones.map(phone => modelInfo[phone.id].screen)], ["무게", ...selectedPhones.map(phone => modelInfo[phone.id].weight)], ["카메라", ...selectedPhones.map(phone => modelInfo[phone.id].camera)]].map(([label, ...values]) => <div key={label} className="border-b border-slate-200 last:border-0"><dt className="bg-slate-50 px-3 py-2 font-bold text-slate-600">{label}</dt><dd className={`${label === "기본 용량 출시가" ? "price-values" : "comparison-values"} grid grid-cols-2`}>{values.map((value, slot) => <div key={slot} className={`min-w-0 break-words px-3 py-3 font-bold ${slot === 0 ? "bg-blue-50/40" : "bg-indigo-50/40"}`}><span className="large-price-label hidden text-blue-800">{slot === 0 ? "A · " : "B · "}</span>{value}</div>)}</dd></div>)}
            </dl>
            <p className="border-t border-slate-200 px-3 py-3 text-base text-slate-600">할인·지원금 적용 전. 출시 예정 기종은 발표 가격입니다. 화면은 대각선 기준이며 폴더블은 펼친 화면입니다.</p>
          </section>
        </div>

        <section id="prices" aria-labelledby="price-title" className="scroll-mt-40 rounded-2xl border border-slate-200 bg-white p-3 sm:p-5">
          <div className="section-heading tone-amber"><h2 id="price-title" className="text-2xl font-bold">가격</h2><p>용량별 출시가</p></div>
          <div className="mt-3 grid grid-cols-2 gap-2">{selectedPhones.map((phone, slot) => <div key={phone.id} className={`min-w-0 rounded-xl p-3 ${slot === 0 ? "bg-blue-50" : "bg-indigo-50"}`}>
            <h3 className="break-words font-bold">{slot === 0 ? "A" : "B"} · {phone.model_name}</h3><p className="mt-1 text-base text-slate-600">{phone.price_basis === "preorder-announcement" ? "국내 사전 주문 발표 가격" : modelInfo[phone.id].upcoming ? "국내 출시 예정 발표 가격" : "국내 출시 당시 가격"}</p>{modelInfo[phone.id].upcoming && <p className="mt-2 font-bold text-amber-800">{modelInfo[phone.id].date}</p>}
          </div>)}</div>
          <dl className="mt-3">{storageOptions.map(storage => <div key={storage} className="border-b border-slate-200">
            <dt className="bg-slate-50 px-3 py-2 font-bold">{storage}</dt>
            <div className="price-values grid grid-cols-2">{selectedPhones.map((phone, slot) => { const price = phone.prices.find(item => item.storage === storage); return <dd key={phone.id} className={`min-w-0 break-words px-3 py-3 font-bold ${slot === 0 ? "bg-blue-50/40" : "bg-indigo-50/40"}`}><span className="large-price-label hidden text-blue-800">{slot === 0 ? "A · " : "B · "}</span>{price ? money(price.krw) : "해당 용량 미등록"}</dd>; })}</div>
          </div>)}</dl>
          <div className="mt-2 grid grid-cols-2 gap-2">{selectedPhones.map((phone, slot) => <details key={phone.id} className="min-w-0"><summary className="min-h-11 cursor-pointer py-2 font-bold">{slot === 0 ? "A" : "B"} 가격 출처</summary><SourceLinks ids={[phone.price_source]} /></details>)}</div>
          <p className="mt-3 text-base text-slate-600">할인·지원금 적용 전. 확인되지 않은 용량의 출시가는 추정하지 않았습니다. iPhone 18 Pro·Pro Max는 공식 사전 주문 안내의 발표 가격이며, 출시일 당일 실판매가로 단정하지 않습니다.</p>
        </section>

        <section id="brief-title" aria-labelledby="brief-heading">
          <div className="section-heading tone-purple flex flex-wrap items-center justify-between gap-3"><div><h2 id="brief-heading" className="text-2xl font-bold">멘트</h2><p>항목별 비교·전화 안내</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={shareComparison} className={control}>비교 주소 복사</button><button type="button" onClick={() => window.print()} className={`${control} print:hidden`}>인쇄</button></div></div>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="비교 항목 필터">
            <button type="button" aria-pressed={topic === "all"} onClick={() => { setTopic("all"); }} className={`${control} category-tab category-all`}>전체 항목</button>
            {categories.map(({ key, label }) => <button key={key} type="button" aria-pressed={topic === key} onClick={() => { setTopic(key); }} className={`${control} category-tab category-${key}`}>{label}</button>)}
          </div>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="안내 길이 선택">{(["short", "detail"] as const).map(version => <button type="button" key={version} aria-pressed={pitchVersion === version} onClick={() => setPitchVersion(version)} className={`${control} color-control ${version === "short" ? "tone-blue" : "tone-teal"}`}>{version === "short" ? "짧게 안내" : "풀어서 안내"}</button>)}</div>
          
          {shareUrl && <div className="mt-3"><label htmlFor="share-url" className="block font-bold">현재 비교 주소</label><input id="share-url" readOnly value={shareUrl} onFocus={event => event.target.select()} className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 p-3 text-base" /></div>}
          <p className="mt-3 text-base leading-relaxed text-slate-600"><strong>전작 대비</strong>는 해당 기종의 이전 모델과 비교한 내용입니다. 공식 스펙과 적용 조건은 각 기종에서 펼쳐 확인할 수 있습니다.</p>
        </section>

        <div id="comparison" tabIndex={0} role="region" aria-label="두 모델 항목별 비교" className="scroll-mt-40 rounded-2xl border border-slate-200 bg-slate-100 p-3 focus-visible:outline-2 focus-visible:outline-blue-600 sm:p-5">
          <div className="space-y-6">
            {visibleCategories.map(({ key, label }, index) => <section key={key} aria-labelledby={`category-${key}`}>
              <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 px-1"><h2 id={`category-${key}`} className="text-2xl font-bold">{String(index + 1).padStart(2, "0")} · {label}</h2></div>
              <div className={`brief-pair brief-${pitchVersion} grid items-stretch gap-3 sm:grid-cols-2 sm:gap-4`}><BriefCard phone={left} specKey={key} version={pitchVersion} slot={0} /><BriefCard phone={right} specKey={key} version={pitchVersion} slot={1} /></div>
            </section>)}
          </div>
        </div>

        <section id="detail-title" aria-labelledby="detail-heading" className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="section-heading tone-teal"><h2 id="detail-heading" className="text-2xl font-bold">사양</h2><p>배터리 · 연결 · 지원 사양</p></div>
          <p className="mt-2 text-slate-600">공식 사양 재확인 {detailCheckedAt}. 표의 값이 같아도 시험 조건이나 실제 성능까지 같다는 뜻은 아닙니다.</p>
          <div className="my-4 flex flex-wrap items-end gap-4">
            <div className="min-w-0 flex-1"><label htmlFor="detail-search" className="mb-2 block font-bold">세부 항목 검색</label><input id="detail-search" value={detailQuery} onChange={event => setDetailQuery(event.target.value)} placeholder="예: Bluetooth, USB, 배터리" className="min-h-12 w-full rounded-xl border border-slate-300 p-3 text-base" /></div>
            <button type="button" aria-pressed={differentOnly} onClick={() => setDifferentOnly(!differentOnly)} className={control}>{differentOnly ? "모든 세부 항목" : "다른 값만 보기"}</button>
            {(detailQuery || differentOnly) && <button type="button" onClick={() => { setDetailQuery(""); setDifferentOnly(false); }} className={control}>세부 조건 지우기</button>}
          </div>
          <p className="mb-3 text-slate-600" role="status">표시 항목 {matchingDetails.length}개 · 확인 불가 항목은 차이 필터에서도 유지합니다.</p>
          <div tabIndex={0} role="region" aria-label="세부 사양 비교 표" className="detail-table">
            <table className={`w-full border-collapse text-left leading-relaxed text-base`}>
              <caption className="sr-only">선택한 두 모델의 공식 세부 사양 비교</caption>
              <thead><tr className="bg-slate-100"><th scope="col" className="p-4">항목</th>{selectedPhones.map(phone => <th scope="col" key={phone.id} className="p-4 text-xl">{phone.model_name}</th>)}</tr></thead>
              <tbody>{matchingDetails.map(row => <tr key={row.key} className="border-b border-slate-200 align-top"><th scope="row" className="w-1/4 p-4 font-bold">{row.label}{row.note && <p className="mt-2 text-base font-normal text-slate-600">{row.note}</p>}</th>{detailIndexes.map((index, slot) => <td key={slot} className="p-3 [overflow-wrap:anywhere] sm:p-4"><span className="detail-model-label mb-2 hidden font-bold text-blue-800">{slot === 0 ? "A" : "B"} · {selectedPhones[slot].model_name}</span>{row.values[index]}</td>)}</tr>)}</tbody>
            </table>
          </div>
          {matchingDetails.length === 0 && <p className="rounded-xl bg-slate-100 p-4">조건에 맞는 세부 항목이 없습니다.</p>}
          <div className="mt-4"><SourceLinks ids={detailIndexes.map(index => detailSourceIds[index])} /></div>
        </section>

        <section aria-labelledby="source-title">
          <h2 id="source-title" className="scroll-mt-40 text-2xl font-bold">제조사 공식 상세 사양</h2>
          <p className="mb-4 mt-2 text-base leading-relaxed text-slate-600">한국 공식 사양 문서의 항목을 모델별로 확인하세요. 기술 항목·목록은 유지하고 홍보 문장과 각주는 사실·조건 중심으로 정리했습니다. 삼성 용량별 차이는 메모리/스토리지에 표시합니다. 비교하는 값에 적용되는 각주도 함께 확인하세요.</p>
          <div className="grid items-start gap-3 lg:grid-cols-2">{selectedPhones.map(phone => <OfficialSpecs key={phone.id} phone={phone} />)}</div>
          <p className="mt-4 text-base leading-relaxed text-slate-600">기존 4종 상담 요약 확인 {checkedAt} · 추가 10종 및 상세 사양 확인 {detailCheckedAt}. 자동 갱신되지 않습니다. 제조사 원문 범위 밖의 미확인 정보나 검증되지 않은 출시가는 추정하지 않습니다.</p>
        </section>
      </div>
      <nav aria-label="모바일 빠른 이동" className="mobile-bottom-nav fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 gap-1 border-t border-slate-200 bg-white/95 px-2 pt-2 shadow-lg backdrop-blur lg:hidden print:hidden">{[["#quick-comparison", "요약", "tone-blue"], ["#prices", "가격", "tone-amber"], ["#brief-title", "멘트", "tone-purple"], ["#detail-title", "사양", "tone-teal"]].map(([href, label, tone]) => <a key={href} href={href} className={`section-nav-link ${tone} min-h-12 font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}><span aria-hidden="true">↓</span>{label}</a>)}</nav>
    </main>
  );
}
