import {createRoot} from 'react-dom/client';
import React from 'react';
import {UrlDataLoader} from '../data/url_data_loader';
import ImageLoadTracker from './components/image_load_tracker';
import URLLoader from './components/url_loader';
import IndexPage from './index_page';

const loader = new UrlDataLoader('https://s3-us-west-2.amazonaws.com/frogtown.apricot.data/{MapName}.json.gz',
    (url: string) => {
      return new Promise((resolve) => {
        const fetchAndResolve = () => {
          if (!url.endsWith('.gz')) {
            return fetch(url).then((response) => {
              resolve(response.json());
            });
          }
          return fetch(url)
              .then((response) => {
                return response.body!.pipeThrough(new (window as any).DecompressionStream('gzip'));
              })
              .then((decompressedStream) => {
                const reader = decompressedStream.getReader();
                return new ReadableStream({
                  start: async (controller) => {
                    while (true) {
                      const {done, value} = await reader.read();
                      if (done) {
                        break;
                      }
                      controller.enqueue(value);
                    }
                    controller.close();
                    reader.releaseLock();
                  },
                });
              })
              .then((stream) => new Response(stream))
              .then((response) => {
                resolve(response.json());
              });
        };
        fetchAndResolve().catch(async () => {
          console.warn(`Fetch for ${url} failed, trying again in 1s...`);
          await new Promise((r) => setTimeout(r, 1000));
          fetchAndResolve().catch(async () => {
            console.warn(`Fetch for ${url} failed twice, trying again in 1s...`);
            await new Promise((r) => setTimeout(r, 1000));
            fetchAndResolve().catch(async () => {
              console.error(`Fetch for ${url} failed three times, aborting`);
            });
          });
        });
      });
    });
const root = createRoot(document.getElementById('content')!);
const imageLoadTracker = new ImageLoadTracker();
const urlLoader = new URLLoader();

root.render(<IndexPage
  imageLoadTracker={imageLoadTracker}
  loader={loader}
  urlLoader={urlLoader}
/>);
