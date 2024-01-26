export const LOCAL_URL = "http://localhost:3000";
export const DEV_URL = "http://10.130.100.40:3000"; // TODO : change to deploy url

const title = document
  .querySelector("meta[property='og:title']")
  .getAttribute("content");
const description = document
  .querySelector("meta[property='og:description']")
  .getAttribute("content");
const imageURL = document
  .querySelector("meta[property='og:image']")
  .getAttribute("content");

if (!window.Kakao.isInitialized()) {
  window.Kakao.init(process.env.REACT_APP_KAKAO_APPKEY_JS);
}

export function shareKakao(shareURL) {
  window.Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: title,
      description: description,
      imageUrl: imageURL,
      link: {
        mobileWebUrl: shareURL,
        webUrl: shareURL,
      },
    },
  });
}

export function shareFacebook(shareURL) {
  // TODO : Facebook 공유 배포 후 테스트 필요
  const url = encodeURIComponent(shareURL);
  window.open("https://www.facebook.com/sharer.php?u=" + url);
}

export function copyClipboard(shareURL) {
  return window.navigator.clipboard.writeText(shareURL);
}

// How to use
//
// copyClipboard("https://www.naver.com")
//       .then(() => {
//         setToastMsg("클립보드에 복사되었습니다.");
//       })
//       .catch(() => {
//         setToastMsg("클립보드 복사에 실패했습니다.");
//       });
