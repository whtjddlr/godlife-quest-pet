# Godlife Quest Pet 온라인 실행 가이드

## 1. Supabase 테이블 만들기

Supabase 대시보드의 SQL Editor에서 `supabase.schema.sql` 내용을 실행하세요.

필수 테이블:

- `user_states`: 사용자/펫/미션 저장
- `room_states`: 친구 방, 초대코드, 인증 요청 저장

현재 서버는 `room_states`가 아직 없어도 `user_states` 안의 방 레지스트리로 임시 동작합니다. 그래도 친구들과 안정적으로 온라인 플레이하려면 `room_states`를 꼭 만드는 것을 권장합니다.

## 2. 환경 변수 설정

`.env.example`을 참고해서 로컬에는 `.env`를 만들고, Vercel에는 같은 값을 Environment Variables에 넣으세요.

필수:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SECRET_KEY=your-supabase-secret-or-service-role-key
SUPABASE_STATE_TABLE=user_states
SUPABASE_ROOM_TABLE=room_states
```

AI 미션 생성 사용 시:

```env
GEMINI_API_KEY=your-gemini-key
GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta
GEMINI_MODEL=gemini-2.5-flash
```

또는 Solar 사용 시:

```env
UPSTAGE_API_KEY=your-upstage-key
UPSTAGE_BASE_URL=https://api.upstage.ai/v1
UPSTAGE_SOLAR_MODEL=solar-pro3
```

## 3. 로컬 실행

```bash
npm start
```

브라우저에서 `http://localhost:5173`을 열면 됩니다.

## 4. Vercel 배포

Vercel 프로젝트에 환경 변수를 넣은 뒤 배포하세요.

```bash
vercel --prod
```

배포 후 친구들은 같은 URL에서 닉네임으로 시작하고, 방 만들기 또는 초대코드로 같은 그룹에 들어가면 됩니다.

## 5. 앱처럼 설치하기

배포 URL을 모바일 또는 데스크톱 브라우저에서 열고 상단의 `설치` 버튼을 누르면 웹앱으로 설치할 수 있습니다.

설치 아이콘은 설치 시점에 선택되어 있는 펫 캐릭터로 생성됩니다. 이미 설치한 뒤 대표 펫을 바꿨다면 기존 앱을 삭제하고 다시 설치해야 OS 홈 화면 아이콘이 바뀝니다.
