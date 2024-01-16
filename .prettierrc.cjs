module.exports = {
  printWidth: 80, // 줄 바꿈 할 폭 길이
  tabWidth: 2, // 탭 너비
  semi: true, // 모든 구문 끝에 세미콜론 출력
  useTabs: false, // 탭 대신 공백으로 들여쓰기
  singleQuote: false, // 쌍따옴표 사용
  quoteProps: "as-needed", // 객체 속성에 쿼테이션 적용 방식
  jsxSingleQuote: false, // JSX에 singe 쿼테이션 사용 여부
  trailingComma: "all", // 여러 줄을 사용할 때, 후행 콤마 사용 방식
  bracketSpacing: true, // {} 사이에 spacing 설정 여부 (기본값: true)
  bracketSameLine: false, // > 를 같은 줄에 넣을지 여부 (기본값: false)
  arrowParens: "always", // 화살표 함수 괄호 사용 방식
  proseWrap: "preserve", // markdown 텍스트의 줄바꿈 방식 (v1.8.2)
  endOfLine: "lf", // EoF 방식, OS별로 처리 방식이 다름
  singleAttributePerLine: false, // 파일 상단에 미리 정의된 주석을 작성하고 Pragma로 포맷팅 사용 여부 지정 (v1.8.0)
  requirePragma: false, // 파일 상단에 미리 정의된 주석을 작성하고 Pragma로 포맷팅 사용 여부 지정 (v1.8.0)
  insertPragma: false, // 미리 정의된 @format marker의 사용 여부 (v1.8.0)
  htmlWhitespaceSensitivity: "css", // HTML 공백 감도 설정
  embeddedLanguageFormatting: "auto", // 파일 안에 또다른 형식의 코드에도 Prettier를 적용할지 여부
  vueIndentScriptAndStyle: false, // Vue 파일의 script와 style 태그의 들여쓰기 여부 (v1.19.0)
};
