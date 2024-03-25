import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import App from "./App";
import { beforeEach, describe, expect, it } from "vitest";
import { initalizeMswServer } from "./test-utils/initialize-msw-server";

const server = initalizeMswServer();

describe("App", () => {
  describe("Sections", () => {
    it("should render sections correctly", async () => {
      server.use(
        http.get("https://api.vidio.com/sections", () => {
          return HttpResponse.json({
            data: [
              {
                id: 1,
                title: "section title 1",
                contents: [
                  {
                    id: 1,
                    title: "content title 1 - section 1",
                    cover_url: "https://cover_1_section_1_url",
                  },
                  {
                    id: 2,
                    title: "content title 2 - section 1",
                    cover_url: "https://cover_2_section_1_url",
                  },
                ],
              },
              {
                id: 2,
                title: "section title 2",
                contents: [
                  {
                    id: 1,
                    title: "content title 1 - section 2",
                    cover_url: "https://cover_1_section_2_url",
                  },
                ],
              },
            ],
          });
        })
      );

      render(<App />);

      const sections = await screen.findAllByTestId("section");
      expect(sections).toHaveLength(2);

      const firstSection = within(sections[0]);
      expect(firstSection.getByText("section title 1")).toBeInTheDocument();

      // li
      const content = within(firstSection.getAllByRole("listitem")[0]);

      expect(content.getByText("1"));
      expect(
        content.getByRole("img", {
          name: "content title 1 - section 1",
        })
      ).toHaveAttribute("src", "https://cover_1_section_1_url");
      expect(
        content.getByRole("button", {
          name: "Favorites ♥",
        })
      );
    });
  });

  describe("Favorites", () => {
    beforeEach(() => {
      server.use(
        http.get("https://api.vidio.com/sections", () => {
          return HttpResponse.json({
            data: [
              {
                id: 1,
                title: "section title 1",
                contents: [
                  {
                    id: 1,
                    title: "content title 1 - section 1",
                    cover_url: "https://cover_1_section_1_url",
                  },
                  {
                    id: 2,
                    title: "content title 2 - section 1",
                    cover_url: "https://cover_2_section_1_url",
                  },
                ],
              },
            ],
          });
        })
      );
    });

    it("should render default Favorites UI", async () => {
      render(<App />);

      const favoritesContainer = within(
        screen.getByTestId("favorites-container")
      );

      expect(favoritesContainer.getByText("Favorites 💕")).toBeInTheDocument();
      expect(favoritesContainer.getByText("No Data")).toBeInTheDocument();
    });

    it("should add content to Favorites", async () => {
      render(<App />);

      const favoriteButtons = await screen.findAllByRole("button", {
        name: "Favorites ♥",
      });

      await userEvent.click(favoriteButtons[0]);

      expect(favoriteButtons[0]).toHaveTextContent("Unfavorite 💔");

      const favoritesContainer = within(
        screen.getByTestId("favorites-container")
      );
      expect(favoritesContainer.queryByText("No Data")).not.toBeInTheDocument();

      const favoriteItem = within(favoritesContainer.getByRole("listitem"));
      expect(
        favoriteItem.getByText("content title 1 - section 1")
      ).toBeInTheDocument();
      expect(
        favoriteItem.getByRole("img", {
          name: "content title 1 - section 1",
        })
      ).toHaveAttribute("src", "https://cover_1_section_1_url");

      expect(favoritesContainer.getAllByRole("listitem")).toHaveLength(1);
      await userEvent.click(favoriteButtons[1]);
      expect(favoriteButtons[1]).toHaveTextContent("Unfavorite 💔");
      expect(favoritesContainer.getAllByRole("listitem")).toHaveLength(2);
      expect(
        favoritesContainer
          .getAllByRole("listitem")
          .map((element) => element.textContent)
      ).toEqual(["content title 2 - section 1", "content title 1 - section 1"]);
    });

    it("should remove content from Favorites", async () => {
      render(<App />);

      const favoriteButtons = await screen.findAllByRole("button", {
        name: "Favorites ♥",
      });

      await userEvent.click(favoriteButtons[0]);
      await userEvent.click(favoriteButtons[1]);

      const favoritesContainer = within(
        screen.getByTestId("favorites-container")
      );
      expect(
        favoritesContainer
          .getAllByRole("listitem")
          .map((element) => element.textContent)
      ).toEqual(["content title 2 - section 1", "content title 1 - section 1"]);

      const unfavoriteButton = favoriteButtons[0];
      expect(unfavoriteButton).toHaveTextContent("Unfavorite 💔");
      await userEvent.click(unfavoriteButton);

      expect(
        favoritesContainer
          .queryAllByRole("listitem")
          .map((element) => element.textContent)
      ).toEqual(["content title 2 - section 1"]);
    });
  });
});
