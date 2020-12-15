import React, { Component } from 'react';
import { List, Avatar, Button, Checkbox, Spin } from 'antd';
import satellite from '../assets/images/satellite.svg';

export default class SatelliteList extends Component {
  constructor() {
    super();
    this.state = {
      selected: [],
      isLoad: false,
    };
  }
  render() {
    const satList = this.props.satInfo ? this.props.satInfo.above : [];
    const { isLoad } = this.props;
    const { selected } = this.state;
    return (
      <div className='sat-list-box'>
        <Button
          className='sat-list-btn'
          type='primary'
          size='large'
          disabled={selected.length === 0}
          onClick={this.onShowSatPosOnMap}
        >
          Track on the map
        </Button>
        <hr />
        {isLoad ? (
          <div className='spin-box'>
            <Spin tip='Loading...' size='large' />
          </div>
        ) : (
          <List
            className='sat-list'
            itemLayout='horizontal'
            size='small'
            dataSource={satList}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Checkbox dataInfo={item} onChange={this.onChange} />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar size={50} src={satellite} />}
                  title={<p>{item.satname}</p>}
                  description={`Launch Date: ${item.launchDate}`}
                />
              </List.Item>
            )}
          />
        )}
      </div>
    );
  }

  onShowSatPosOnMap = () => {
    this.props.onShowMap(this.state.selected);
  };
  onChange = (e) => {
    console.log('selected checkbox ', e.target);
    console.log('data -> ', e.target.dataInfo);

    const { dataInfo, checked } = e.target;
    const { selected } = this.state;

    // 1. get current selected sat info
    const list = this.addOrRemove(dataInfo, checked, selected);

    // 2. add or remove current selected sat to / from selected array

    // 3. update selected state
    this.setState({ selected: list });
  };

  addOrRemove = (item, status, list) => {
    // case1: check is true
    //        -> item not in the list => add the item
    //        -> item in the list => do nothing

    // case2: check is false
    //        -> item not => do nothing
    //        -> item is => remove

    const found = list.some((entry) => entry.satid === item.satid);
    console.log('found->', found);

    if (status && !found) {
      list = [...list, item];
      // list.push(item)
    }

    if (!status && found) {
      list = list.filter((entry) => {
        return entry.satid !== item.satid;
      });
    }

    return list;
  };
}
