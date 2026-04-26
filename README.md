# 벼락치기 도우미 (Thunderheat)

[![Live](https://img.shields.io/badge/live-thunderheat.vercel.app-D9684A?style=flat-square)](https://thunderheat.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square)](https://nextjs.org)

한국 중·고등학생이 시험 전날 폰으로 벼락치기 하는 학습 앱.
시험범위를 올리면 AI가 카드로 만들어주고, 게임처럼 풀면서 한 시간 반에 시험범위를 마스터.

**Live:** https://thunderheat.vercel.app
**Mirror:** https://thunderheat-rdjb.vercel.app

## 기능

- **11 화면 모바일 UX** — 온보딩 / 홈 / PDF 업로드 3단계 / 학습 / 결과 / 약점 보스 / 실전 모의 / 마이 / 결제 / 단어장
- **8 문제 유형** — 어휘 영↔한 / 빈칸 / 어법 OX / 어법 5지선다 / 요약 / 주제 / 제목 (총 56문제)
- **단어장 85개** — 카드 플립 + 외움/즐겨찾기 토글 + 레슨 필터 (Lesson 1·2·3·4)
- **약점 SRS** — 오답 5분 / 30분 / 24시간 큐, 매 5문제마다 복습 주입, 3회 연속 정답 시 마스터리
- **localStorage 저장** — 콤보·XP·스트릭·진도·약점 노트 영구 보관

## 디자인 원칙

- 빨강(오답)/초록(정답) 신호색 **금지** — 정답=LAVENDER, 오답=INK + 취소선
- 그라디언트·드롭섀도우·글로우·캐릭터 X
- 모바일 380px 우선
- `word-break: keep-all` 전역 (한국어 가독성)

## 디자인 토큰

| Token | Hex | 용도 |
|---|---|---|
| `paper` | #FAF7F1 | 배경 |
| `terracotta` | #D9684A | 진행률·강조 |
| `butter` | #F5D26B | XP 칩·정답 하이라이트 |
| `lavender` | #D9D1EC | 정답 시그널 |
| `sage` | #C7E6BF | 미션·완료 |
| `ink/900` | #16120D | 본문 텍스트 |

## 개발

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## 배포

`main` 브랜치 push → Vercel 자동 production 배포.
다른 브랜치 push → preview 배포.

## 스택

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + framer-motion
- Pretendard (CDN)
- Playwright (스모크 테스트)
