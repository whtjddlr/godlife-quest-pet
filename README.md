# 갓생 퀘스트 펫

루틴을 미션으로 만들고, 친구 인증과 펫 성장 루프를 결합한 모바일 우선 웹앱 프로토타입입니다.

Live Demo: https://godlife-mu.vercel.app

## 핵심 기능

- 닉네임 기반 입장과 그룹 초대 코드
- 일일/주간/월간 루틴 미션 생성
- 사진 중심 미션 인증, 그룹원 상호 검증, 승인 후 보상 지급
- 컨디션, XP, 코인, 연속 달성일 기반 성장 루프
- 펫 밥주기와 레벨별 상호작용
- 랜덤 펫, 희소성 등급, 액세서리 보관함, 보상 캡슐
- 모바일 화면 비율을 기준으로 한 PWA 스타일 UI
- Vercel 서버리스 배포와 로컬 JSON 저장, Supabase 연동 옵션

## 기술 스택

- Vanilla JavaScript
- HTML/CSS
- Node.js HTTP server
- Vercel Functions
- Supabase/Postgres 연동 옵션

## 로컬 실행

```bash
npm install
npm start
```

기본 주소는 `http://localhost:5173`입니다.

## 환경 변수

필요한 값은 `.env.example`을 참고해 `.env`에 설정합니다.

- `UPSTAGE_API_KEY`: AI 미션 생성
- `ADMIN_KEY`: 관리자 API 보호
- `DATABASE_URL`: 온라인 DB 연결
- `SUPABASE_URL`, `SUPABASE_*`: Supabase 저장소 연동
- `STORAGE_PROVIDER`: 인증 이미지 저장소 선택

## 배포

Vercel 프로젝트로 배포할 수 있습니다.

```bash
vercel deploy --prod
```

## 데이터 주의

로컬 실행 중 생성되는 `data/state.json`, `.env`, `.vercel/`, 검증용 스크린샷은 저장소에 포함하지 않습니다.
