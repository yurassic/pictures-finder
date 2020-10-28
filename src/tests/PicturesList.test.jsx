import { render, screen } from "@testing-library/react";
import PicturesList from "../components/PicturesList";

const mockPictures = [
  {
    id: 801826,
    pageURL: "https://pixabay.com/photos/pug-dog-pet-animal-puppy-cute-801826/",
    type: "photo",
    tags: "pug, dog, pet",
    previewURL:
      "https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826_150.jpg",
    previewWidth: 150,
    previewHeight: 99,
    webformatURL:
      "https://pixabay.com/get/5ee0d44b4854b10ff3d8992cc62b337f123edae04e50774976277cd3924ccd_640.jpg",
    webformatWidth: 640,
    webformatHeight: 426,
    largeImageURL:
      "https://pixabay.com/get/5ee0d44b4854b108f5d084609629347a1438dfe1564c704f752c73d39048c450_1280.jpg",
    imageWidth: 4951,
    imageHeight: 3301,
    imageSize: 3959900,
    views: 547010,
    downloads: 217440,
    favorites: 1203,
    likes: 1334,
    comments: 171,
    user_id: 242387,
    user: "Free-Photos",
    userImageURL:
      "https://cdn.pixabay.com/user/2014/05/07/00-10-34-2_250x250.jpg",
  },
];

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
