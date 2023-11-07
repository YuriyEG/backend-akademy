import React from 'react';
import './Ticket.css';
import { Button, Flex } from 'antd';

const Ticket = ({ text, title }) => {
  return (
    <div className="ticket">
      <Flex wrap="wrap" gap="small" className="site-button-ghost-wrapper">
        <Button type="primary" ghost>
          {'< назад'}
        </Button>
        <Button type="primary" ghost>
          {'вперед >'}
        </Button>
        <Button type="primary" style={{ marginLeft: 'auto' }} danger ghost>
          X
        </Button>
      </Flex>
      <div
        style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.485)', marginTop: '20px' }}
      ></div>
      <h1>{title}</h1>
      <div style={{ marginBottom: '20px' }}>{text}</div>

      <div></div>
      <div></div>
      <div
        style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.485)', marginBottom: '20px' }}
      ></div>
      <Flex wrap="wrap" gap="small" className="site-button-ghost-wrapper">
        <Button type="primary" ghost>
          {'< назад'}
        </Button>
        <Button type="primary" ghost>
          {'вперед >'}
        </Button>
        <Button style={{ marginLeft: 'auto' }} ghost>
          Тестирование
        </Button>
      </Flex>
    </div>
  );
};

export default Ticket;
