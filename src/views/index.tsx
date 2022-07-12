import {createRoot} from 'react-dom/client';
import React from 'react';
import {UrlDataLoader} from '../data/url_data_loader';
import ImageLoadTracker from './components/image_load_tracker';
import URLLoader from './components/url_loader';
import IndexPage from './index_page';

const loader = new UrlDataLoader('https://s3-us-west-2.amazonaws.com/frogtown.apricot.data/{MapName}.json');
const root = createRoot(document.getElementById('content')!);
const imageLoadTracker = new ImageLoadTracker();
const urlLoader = new URLLoader();

root.render(<IndexPage
  imageLoadTracker={imageLoadTracker}
  loader={loader}
  urlLoader={urlLoader}
/>);
