import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Blog from "../components/Blog";
import PostBlog from "../components/PostBlog";

describe("Blog tests", () => {
  let testuser;
  let blog;
  beforeEach(() => {
    testuser = {
      name: "M S L",
      username: "root",
    };
    blog = {
      title: "A blog",
      author: "A person",
      url: "www.ablog.com",
      likes: "1",
      user: { name: "A creator" },
    };
  });
  test("blog renders", () => {
    const container = render(<Blog blog={blog} user={testuser} />).container;
    const element = container.querySelector(".blog");
    expect(element).toBeDefined();
  });
  test("blog renders title and author but not url and likes", () => {
    const container = render(<Blog blog={blog} user={testuser} />).container;
    const shown = screen.getByText("A blog A person");
    expect(shown).not.toHaveStyle("display:none");
    const info = container.querySelector(".info");
    expect(info).toHaveStyle("display:none");
  });
  test("additional info is shown after pressing button", async () => {
    const container = render(<Blog blog={blog} user={testuser} />).container;
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);
    const info = container.querySelector(".info");
    expect(info).not.toHaveStyle("display:none");
  });
  test("like button is clicked correctly", async () => {
    const increaseLikes = jest.fn();
    render(<Blog blog={blog} user={testuser} increaseLikes={increaseLikes} />);
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);
    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);
    expect(increaseLikes.mock.calls).toHaveLength(2);
  });
});

describe("Blog form", () => {
  test("Blog form function receives correct arguments", async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();
    render(<PostBlog createBlog={createBlog} />);

    const titleInput = screen.getByPlaceholderText(`Title`);
    const authorInput = screen.getByPlaceholderText(`Author`);
    const urlInput = screen.getByPlaceholderText(`url`);
    const sendButton = screen.getByText("create");

    await user.type(titleInput, "Random Title");
    await user.type(authorInput, "Random Name");
    await user.type(urlInput, "Random Url");
    await user.click(sendButton);
    expect(createBlog.mock.calls[0][0].title).toBe("Random Title");
    expect(createBlog.mock.calls[0][0].url).toBe("Random Url");
    expect(createBlog.mock.calls[0][0].author).toBe("Random Name");
  });
});
