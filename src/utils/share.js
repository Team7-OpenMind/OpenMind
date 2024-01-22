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
  console.log("Kakao pre init");
  window.Kakao.init(process.env.REACT_APP_KAKAO_APPKEY_JS);
  console.log("Kakao init");
}

export const shareKakao = (shareURL = "") => {
  console.log(shareURL);

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
};
