# Cardnews Studio 2

학원용 AI 카드뉴스 제작 도구입니다. 기존 `Cardnews_generator`와 분리된 독립 프로젝트이며, 고정 템플릿을 채우는 대신 콘텐츠 전략과 장면별 아트디렉션을 먼저 설계합니다.

## 파이프라인

1. 간단한 브리프 입력
2. Creative Director가 한 가지 관점과 7장 스토리 설계
3. 각 장의 문구와 아트디렉션 생성
4. 텍스트 없는 비주얼 생성 후 정확한 한국어·브랜드를 앱에서 합성
5. 완성 결과물 검수 및 문제 카드만 선택 재디자인

## 구조

- `server/domain`: 순수 도메인 모델
- `server/application`: 생성 유스케이스와 포트
- `server/infrastructure`: OpenAI/데모 어댑터
- `server/presentation`: HTTP 입력 검증
- `src`: React 제작 화면과 카드 렌더러

## 실행

```bash
npm install
npm run dev
```

`OPENAI_API_KEY`가 있으면 실제 텍스트·이미지 생성 어댑터를 사용합니다. 키가 없거나 API 호출이 실패하면 기본적으로 데모 어댑터가 전체 흐름을 유지합니다. 운영에서 fallback을 막으려면 `ALLOW_DEMO_FALLBACK=false`를 사용합니다.
