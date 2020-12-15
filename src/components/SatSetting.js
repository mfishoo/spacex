import React, { Component } from 'react';

import { Form, Button, InputNumber } from 'antd';

class SatSettingForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const fromItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 11 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 },
      },
    };
    return (
      <Form
        {...fromItemLayout}
        className='sat-setting'
        onSubmit={this.showSatellite}
      >
        <Form.Item laber='Longitude(degrees)'>
          {getFieldDecorator('logitude', {
            rules: [
              {
                required: true,
                message: 'Please input your Logitude',
              },
            ],
          })(
            <InputNumber
              min={-180}
              max={180}
              style={{ width: '100%' }}
              placeholder='Please input Logitude'
            />
          )}
        </Form.Item>
        <Form.Item laber='Latitude(degrees)'>
          {getFieldDecorator('latitude', {
            rules: [
              {
                required: true,
                message: 'Please input your Latitude',
              },
            ],
          })(
            <InputNumber
              min={-90}
              max={90}
              style={{ width: '100%' }}
              placeholder='Please input Latitude'
            />
          )}
        </Form.Item>
        <Form.Item laber='Elevation(meter)'>
          {getFieldDecorator('elevation', {
            rules: [
              {
                required: true,
                message: 'Please input your Elevation',
              },
            ],
          })(
            <InputNumber
              min={-413}
              max={8850}
              style={{ width: '100%' }}
              placeholder='Please input Elevation'
            />
          )}
        </Form.Item>
        <Form.Item laber='Altitude(degrees)'>
          {getFieldDecorator('altitude', {
            rules: [
              {
                required: true,
                message: 'Please input your Altitude',
              },
            ],
          })(
            <InputNumber
              min={0}
              max={90}
              style={{ width: '100%' }}
              placeholder='Please input Altitude'
            />
          )}
        </Form.Item>
        <Form.Item laber='Duration(secs)'>
          {getFieldDecorator('duration', {
            rules: [
              {
                required: true,
                message: 'Please input your Duration',
              },
            ],
          })(
            <InputNumber
              min={0}
              max={90}
              style={{ width: '100%' }}
              placeholder='Please input Duration'
            />
          )}
        </Form.Item>
        <Form.Item className='show-nearby'>
          <Button
            type='primary'
            htmlType='submit'
            style={{ textAlign: 'center' }}
          >
            Finde Nearby Satellite
          </Button>
        </Form.Item>
      </Form>
    );
  }
  showSatellite = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onShow(values);
      }
    });
  };
}
const SatSetting = Form.create({ name: 'staellite-settiong' })(SatSettingForm);
export default SatSetting;
