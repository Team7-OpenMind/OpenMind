# <p align="center">OpenMind</p>

<p align="center"><img src="https://github.com/Team7-OpenMind/OpenMind/assets/68732996/1de010d9-c973-4491-8035-23150b0bc981" width="500" /></p>


## 🔍 프로젝트 정보
* React를 이용해 사용자들이 질의응답할 수 있는 페이지를 간단한 게시판 형식으로 구현
* 개발기간: 2023.1.18 ~ 2024.1.31(2주)

<br/>

## 📖 주요기능
* 질문받을 대상을 등록하는 기능
* 질문대상에 대한 전체 질문목록 조회 및 질문 등록, 수정 및 삭제 기능 구현
* 질문에 대한 답변하기 기능 구현
* 좋아요, 싫어요 기능 구현
<br/>

## 🔥 개발 중 겪었던 이슈
* 게시물에 대한 좋아요, 싫어요 처리
  * 제공된 API를 사용하여 개발을 진행했는데 좋아요, 싫어요에 대한 get 요청은 없고 1씩 증가시키는 post 요청만 있는 상태로 이를 어떻게 처리해야할 지에 대한 고민이 있었는데
  localStorage에 저장 후 페이지에서 나갔다가 다시 진입했을 때 localStorage에 저장된 정보를 post 하여 서버에서 데이터를 받아오는 방식으로 구현
* 새로고침 시 유저 상태 유지
  * Redux를 이용해서 컴포넌트가 마운트되거나 상태가 변경됬을 때만 값을 업데이트 하여 새로고침했을 경우 값이 유지되도록 구현

<br/>

## ✏ 기술스택
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/styledcomponents-efac97?style=for-the-badge&logo=styledcomponents&logoColor=black"> <img src="https://img.shields.io/badge/react-black?style=for-the-badge&logo=react&logoColor=61DAFB"> <img src="https://img.shields.io/badge/redux-7f42c1?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/webpack-black?style=for-the-badge&logo=webpack&logoColor=#8ED5FA">  
<br/>

## 🎮 배포 주소
> [OpenMind 바로가기](https://open-mind-7.vercel.app/)  
<br/>

## 📝 Notion
> [Notion 바로가기](https://www.notion.so/ada25783baab447fb9b2727b565946bf?pvs=4)
<br/>


## 담당 기능

https://jinahp.notion.site/d4fa8ecc0c1c42229da22d7e76061d47

## 코딩 컨벤션

https://jinahp.notion.site/57dbc5b81c344b5faa253bd0ef37b2c4

## 커밋 컨벤션

https://jinahp.notion.site/443d8c8d3d194214ba88e8dac938e6cf  
<br/>

## ⛵ 이후 업데이트
