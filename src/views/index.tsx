import {createRoot} from 'react-dom/client';
import React from 'react';
import {UrlDataLoader} from '../data/url_data_loader';
import ImageLoadTracker from './components/image_load_tracker';
import URLLoader from './components/url_loader';
import IndexPage from './index_page';

const loader = new UrlDataLoader('https://s3-us-west-2.amazonaws.com/frogtown.apricot.data/{MapName}.json',
    (url: string) => {
      return new Promise((resolve) => {
        const fetchAndResolve = () => {
          return fetch(url).then((response) => {
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
