# 스크롤 이슈 수정 구현 계획

이 계획은 사용자가 보고한 웨딩 초대장 사이트의 스크롤 문제(불편함, 점프, 반응 없음)를 해결하기 위한 구체적인 단계입니다.

## 1. 전역 스타일 수정 (`src/index.css`)
- **전용 스크롤바 표시**: 숨겨져 있을 수 있는 스크롤바를 강제로 표시하고, `html`과 `body`가 항상 스크롤이 가능하도록 설정함.
- **`#root` 컨테이너 레이아웃 변경**: `#root`가 스크롤을 가로채는 방식이 아닌, `body/html`이 스크롤의 최상위 컨테이너가 되도록 보장함.

## 2. 컴포넌트 레이아웃 안정화 (`src/App.jsx`)
- **메인 이미지 컨테이너(`intro`)**: 메인 이미지가 로딩되기 전에도 일정 높이를 차지하도록 `aspect-ratio` 또는 `min-height`를 명시적으로 설정하여 레이아웃 시프트 방지.
- **스크롤 잠금 로직 최적화**: 갤러리 모달이 열릴 때만 `body` 스크롤을 막고, 그 외에는 항상 `overflow: auto` 상태를 유지하도록 확인.

## 3. 스크롤바 디자인 및 '데드존' 제거
- `overflow: hidden`이 `body`에 설정되어 있다면 이를 제거하고, `pointer-events: none` 같은 요소가 휠 이벤트를 막고 있는지 최종 점검.

## 구체적인 수정 코드 예시

```css
/* index.css */
html, body {
  overflow-y: auto !important; /* 강제로 스크롤 활성화 */
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

/* App.jsx 내 .main-image-container */
.main-image-container {
  aspect-ratio: 3 / 4; /* 메인 이미지 비율에 맞춤 */
  background: #f0f0f0; /* 로딩 전 배경색 */
}
```
