import { render, screen } from "@testing-library/react";
import PicturesList from "../components/PicturesList";

import { mockPictures } from "./mocks";

describe("PicturesList", () => {
  test("no images", () => {
    render(<PicturesList pictures={[]} />);
    expect(screen.getByRole("list")).toBeEmptyDOMElement();
  });

  test("render images", () => {
    render(<PicturesList pictures={mockPictures} />);
    expect(screen.getByRole("list")).not.toBeEmptyDOMElement();
    expect(screen.getByAltText("pug, dog, pet")).toBeInTheDocument();
  });
});
