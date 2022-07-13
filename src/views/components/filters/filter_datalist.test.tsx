import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {MemoryDataLoader} from '../../../data/memory_data_loader';
import FilterDatalist from './filter_datalist';

it('Shows options after maps are loaded.', async () => {
  const mockLoader = new MemoryDataLoader();
  const setValue = jest.fn((_value: string) => {});
  const component = renderer.create(
      <FilterDatalist map={'SetCodeToSetName'} otherRequiredMaps={['IDToSetCode']} loader={mockLoader}
        visible={true} value={''} setValue={setValue}>
        Set
      </FilterDatalist>,
  );
  expect(component.root.findAllByType('div')[0].props.style.display).toEqual('inline-block');
  expect(component.root.findByType('datalist').children.length).toBe(0);

  // Load just one map. There should still be no options available, because we can't show results until the other maps
  // are loaded.
  await act(() => {
    mockLoader.setMapDataLoaded('SetCodeToSetName', {'setA': 'Set A Full', 'setB': 'Set B Full', 'setC': 'Set C Full'});
  });
  expect(component.root.findByType('datalist').children.length).toBe(0);

  // Load the remaining map, verify the options are present.
  await act(() => {
    mockLoader.setMapDataLoaded('IDToSetCode', {'1': 'setA', '2': 'setA', '3': 'setB'});
  });
  expect(component.root.findByType('datalist').children.length).toBe(3);
  expect(component.root.findByType('datalist').findAllByType('option').map((o) => o.props)).toEqual([
    {value: 'setA', children: 'Set A Full'},
    {value: 'setB', children: 'Set B Full'},
    {value: 'setC', children: 'Set C Full'},
  ]);
});

it('Hidden when not enabled.', async () => {
  const mockLoader = new MemoryDataLoader();
  const setValue = jest.fn((_value: string) => {});
  const component = renderer.create(
      <FilterDatalist map={'SetCodeToSetName'} otherRequiredMaps={['IDToSetCode']} loader={mockLoader}
        visible={false} value={''} setValue={setValue}>
        Set
      </FilterDatalist>,
  );

  expect(component.root.findAllByType('div')[0].props.style.display).toEqual('none');
});
