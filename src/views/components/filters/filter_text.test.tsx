import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {MemoryDataLoader} from '../../../data/memory_data_loader';
import FilterText from './filter_text';

it('renders correctly', async () => {
  const mockLoader = new MemoryDataLoader();
  const component = renderer.create(
      <FilterText maps={['IDToText']} loader={mockLoader} visible={true} value={'test value'}
        setValue={(_v: string) => {}}>
        Label
      </FilterText>,
  );
  expect(component.root.findAllByType('div')[0].props.style.display).toEqual('inline-block');
  expect(component.root.findAllByType('div')[2].props.children).toEqual('Label');
  expect(component.root.findByType('input').props.value).toEqual('test value');
  expect(component.root.findByType('input').props.disabled).toBeTruthy();

  // Indicate that the map is loaded, and verify the field is no longer disabled.
  await act(async () => {
    mockLoader.setMapDataLoaded('IDToText', {'id': 'name'});
  });
  expect(component.root.findByType('input').props.disabled).toBeFalsy();
});
