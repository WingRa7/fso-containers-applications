import { render, screen } from "@testing-library/react";
import Todo from "./Todo";
import { expect, vi } from "vitest";

describe("<Todo/>", () => {
  let container;

  const mockDelete = vi.fn();
  const mockComplete = vi.fn();

  const todo = {
    _id: "69370bd0c4cb737fd924e5e0",
    text: "Learn NeoVim",
    done: true,
    __v: 0,
  };

  beforeEach(() => {
    container = render(
      <Todo todo={todo} deleteTodo={mockDelete} completeTodo={mockComplete} />
    ).container;

    screen.debug();
  });

  test("Renders Todo Text", () => {
    const text = screen.getByTestId("todoText");

    expect(text).toHaveTextContent(todo.text);
  });
});
