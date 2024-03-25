import { HttpResponse, http } from "msw";
import { setupWorker } from "msw/browser";

export const worker = setupWorker(
  http.get("https://api.vidio.com/sections", () => {
    return HttpResponse.json({
      data: [
        {
          id: 1,
          title: "Top 10 Chart This Week",
          contents: [
            {
              id: 101,
              title: "Ratu Adil",
              cover_url:
                "https://thumbor.prod.vidiocdn.com/G3ETtIWjACl6cftaD01T9VARgbo=/288x416/filters:quality(70)/vidio-media-production/uploads/image/source/8250/e01718.jpg",
            },
            {
              title: "Santri Pilihan Bunda",
              id: 102,
              cover_url:
                "https://thumbor.prod.vidiocdn.com/jF34sekgc0TL6j5mqmqzslIYEmA=/288x416/filters:quality(70)/vidio-media-production/uploads/image/source/8323/e97290.jpg",
            },
            {
              id: 103,
              title: "Cinta Pertama Ayah",
              cover_url:
                "https://thumbor.prod.vidiocdn.com/9tYWAU2EW5ovYv0ujlfBmKESXYM=/288x416/filters:quality(70)/vidio-media-production/uploads/image/source/8156/003f8d.jpg",
            },
            {
              id: 104,
              title: "Happy Birth-Die",
              cover_url:
                "https://thumbor.prod.vidiocdn.com/h8zlZwBANaTAQ-thcP2JX2Gfpjw=/288x416/filters:quality(70)/vidio-media-production/uploads/image/source/7691/c1471f.jpg",
            },
            {
              id: 105,
              title: "Merajut Dendam",
              cover_url:
                "https://thumbor.prod.vidiocdn.com/kQl0_bVdlG88-kijrVTCf89krNU=/288x416/filters:quality(70)/vidio-media-production/uploads/image/source/4166/37e203.jpg",
            },
            {
              id: 106,
              title: "Pertaruhan 2",
              cover_url:
                "https://thumbor.prod.vidiocdn.com/EqKBXVBAbRytiScmpe_cczXx3_0=/288x416/filters:quality(70)/vidio-media-production/uploads/image/source/4786/ef051d.jpg",
            },

            {
              id: 107,
              title: "Argantara",
              cover_url:
                "https://thumbor.prod.vidiocdn.com/oFRLFjgBpryCIhjay0qg8UvXb-g=/288x416/filters:quality(70)/vidio-media-production/uploads/image/source/5941/c827f5.jpg",
            },
            {
              id: 108,
              title: "Teman Tapi Menikah",
              cover_url:
                "https://thumbor.prod.vidiocdn.com/RBaaOJOebP9DUdz20FUORWyt_-k=/288x416/filters:quality(70)/vidio-web-prod-film/uploads/film/image_portrait/8601/teman-tapi-menikah-ac7730.jpg",
            },
            {
              id: 109,
              title: "Si Doel 2",
              cover_url:
                "https://thumbor.prod.vidiocdn.com/iLQYRLn8o30dhRnPLwSx6NrfHOA=/288x416/filters:quality(70)/vidio-web-prod-film/uploads/film/image_portrait/8600/si-doel-the-movie-2-0cb02c.jpg",
            },
            {
              id: 110,
              title: "Jujutsu Kaisen",
              cover_url:
                "https://thumbor.prod.vidiocdn.com/FmylUYImzmX57GTfPcelh_EZnts=/288x416/filters:quality(70)/vidio-media-production/uploads/image/source/5412/d0bd6e.jpg",
            },
          ],
        },
      ],
    });
  })
);
