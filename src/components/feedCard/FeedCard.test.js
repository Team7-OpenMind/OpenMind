import FeedCard from "./FeedCard";
import { render } from "@testing-library/react";

// it("should render a user card", () => {
//   const utils = render(<UserCard name="이Test름" qeustionCount="1" />);
//   expect(utils.container).toMatchSnapshot();
// });

it("should render a user card with name", () => {
  const utils = render(
    <FeedCard
      answer={true}
      content="내용"
      question={{ createdAt: "", imageSource: "", name: "" }}
    />,
  );
  utils.getByText("답변완료");
  utils.getByText("내용");
});

it("should render a user card with name", () => {
  const utils = render(
    <FeedCard
      answer={false}
      content="내용"
      question={{ createdAt: "", imageSource: "", name: "" }}
    />,
  );
  utils.getByText("미답변");
  utils.getByText("내용");
});
