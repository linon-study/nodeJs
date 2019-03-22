import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, Table, Modal, Icon, Input, Button, Divider, } from 'antd';
import s from './index.css';

import { doLogin, getUserList } from '../../redux/actions/home'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch(doLogin(values))
      }
    });
  }

  hlandClick() {
    const { dispatch } = this.props;
    dispatch(getUserList())
  }

  render() {
    const { userList } = this.props;
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const columns = [
      { title: '姓名', dataIndex: 'username', key: 'username', width: 150, },
      { title: '密码', dataIndex: 'password', key: 'password', width: 200 },
      
    ]
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
          >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Log in
          </Button>
          </Form.Item>
        </Form>
        <Button onClick={this.hlandClick.bind(this)} >查询</Button>
        {
              userList && userList.length > 0 ?
                <div>
                  <Table
                    dataSource={userList}
                    rowKey={'id'}
                    columns={columns}
                    pagination={false}
                    scroll={{ x: 1200 }}
                    onChange={() => { console.warn('000') }}
                  />
                </div> : null
            }
      </div>
    )
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

const mapState = (state) => {
  // console.log(state)
  const {
    home: {
      userList=[]
    }
  } = state;
  return {
    userList,
  }
};
export default connect(mapState)(WrappedHorizontalLoginForm);