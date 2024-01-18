import UserCard from "./UserCard";
import { render } from "@testing-library/react";
import UserCardCmp from "./UserCardCmp";

it("should render a user card", () => {
  const utils = render(<UserCard name="gon" id="1" />);
  expect(utils.container).toMatchSnapshot();
});

it("should render a user card with name", () => {
  const utils = render(<UserCardCmp name="gon" id="1" />);
  utils.getByText("NAME : gon");
});
