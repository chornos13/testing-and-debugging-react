import { HttpResponse, http } from 'msw';
import { setupWorker } from 'msw/browser';

export const worker = setupWorker(
  http.get('https://api.vidio.com/sections', () => {
    return HttpResponse.json({
      data: [],
    });
  })
);
