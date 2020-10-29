import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";

import App from "../App";
import { mockPictures } from "./mocks";

jest.mock("axios");

describe("App", () => {
  test("fetches pictures from an API and displays them", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { hits: mockPictures, totalHits: 2, total: 2 },
      })
    );

    render(<App />);
    await fireEvent.submit(screen.getByTestId("form"));
    const items = await screen.findAllByTestId("picture");

    expect(items).toHaveLength(2);
  });

  test("fetches stories from an API and fails", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error("Network Error"))
    );

    render(<App />);
    await fireEvent.submit(screen.getByTestId("form"));
    const message = await screen.findByText(/Network Error/);

    expect(message).toBeInTheDocument();
  });

  test("fetches 0 pictures from API", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { hits: [], total: 0 } })
    );

    render(<App />);
    await fireEvent.submit(screen.getByTestId("form"));
    const message = await screen.findByText(/We don't found any picture/);

    expect(message).toBeInTheDocument();
  });
});
