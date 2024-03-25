/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

type Section = {
  id: string;
  title: string;
  contents: any[];
};

type Content = {
  id: string;
  title: string;
  cover_url: string;
};

function App() {
  const [sections, setSections] = useState<Section[]>();
  const [favorites, setFavorites] = useState<Content[]>([]);

  useEffect(() => {
    fetch("https://api.vidio.com/sections").then((res) => {
      res.json().then(({ data }) => setSections(data));
    });
  }, []);

  return (
    <div className="flex h-full">
      <div className="overflow-hidden w-full">
        {sections?.map(({ id, title, contents }) => {
          return (
            <div key={id} data-testid="section">
              <h2 className="font-bold text-2xl m-2">{title}</h2>
              <ul className="flex gap-4 overflow-x-scroll overflow-y-hidden">
                {contents.map((content, index) => {
                  return (
                    <li className="flex-shrink-0 m-2" key={content.id}>
                      <div className="flex">
                        <p className="self-end text-6xl font-bold">
                          {index + 1}
                        </p>
                        <img
                          className="h-[178px] w-[120px]"
                          src={content.cover_url}
                          alt={content.title}
                        />
                      </div>
                      {favorites.find(
                        (favorite) => favorite.id === content.id
                      ) ? (
                        <button
                          className="border-2 border-white p-2 rounded-md w-full"
                          onClick={() => {
                            setFavorites((prev) => {
                              const newFavorites = prev.filter(
                                (favorite) => favorite.id !== content.id
                              );
                              return newFavorites;
                            });
                          }}
                        >
                          Unfavorite 💔
                        </button>
                      ) : (
                        <button
                          className="bg-red-500 p-2 rounded-md w-full"
                          onClick={() => {
                            setFavorites((prev) => {
                              const newFavorites = [content, ...prev];
                              return newFavorites;
                            });
                          }}
                        >
                          Favorites ♥
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <div
        className="w-[250px] shadow-lg  flex-shrink-0 h-full border border-slate-500 border-t-0 overflow-x-hidden"
        data-testid="favorites-container"
      >
        <h2 className="font-bold text-2xl p-2 sticky top-0 bg-gray-700">
          Favorites 💕
        </h2>
        {favorites.length === 0 && <p className="text-center p-4">No Data</p>}
        <ul className="flex flex-col justify-center gap-4 overflow-x-hidden flex-1 ">
          {favorites.map((content) => {
            return (
              <li className="flex-shrink-0 p-2 w-full" key={content.id}>
                <img
                  className="h-[380px]"
                  src={content.cover_url}
                  alt={content.title}
                />
                <p className="font-bold text-lg">{content.title}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
