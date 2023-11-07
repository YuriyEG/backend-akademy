/* eslint-disable */

import React, { useState, useEffect, Suspense } from 'react';
import getSortedList from '../sortFilter';
import { connect } from 'react-redux';
import { Online, Offline } from 'react-detect-offline';

import Filter from '../Filter';
import Alert from '../Alert';
import FilterOptions from '../FilterOptions';
import TicketList from '../TicketList';
import Ticket from '../Ticket';
import { searchIdLoad, loadTickets,  setSuccess } from '../store/actions';
import Loader from '../Loader';

const text = 'И в реализация образом позволяет направлений структура реализация модель от соответствующий требуют анализа разработке реализация форм эксперимент практика и нашей порядка, эксперимент показывает, важные сложившаяся дальнейших рамки особенности активности реализации форм рост активности рост нас сфера в активизации. Оценить соображения модель количественный соображения а условий новая организационной плановых соображения повседневная таким организационной роль заданий организации рост порядка, задания структура оценить позиций, подготовки количественный равным развития. Показывает, также и в реализация соответствующий позволяет реализация финансовых рамки в играет новая образом соображения активизации. Практика участниками позиций, практика нашей соображения условий. Существенных интересный задания проверки представляет рамки идейные высшего намеченных занимаемых место проверк.'

const AppAviasales = ({ state, initSearchIdLoad, initLoadTickets, setSuccessStatus }) => {

  const [serverError, setServerError] = useState(false);

  const showServerError = () => {
    setServerError(true);
    setTimeout(() => {
      setServerError(false);
    }, 8000);
  }


  let ticks = getSortedList(state);

  useEffect(() => {
    fetch('https://aviasales-test-api.kata.academy/search')
      .then((res) => res.json())
      .then((json) => {
        
        initSearchIdLoad(json.searchId);
      })
      .catch( () => setSuccessStatus(false))
  }, []);

  async function subscribe() {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${state.searchId}`);

    if (response.status === 502 || response.status === 500) {
      if(!serverError) showServerError();
      
      await subscribe();
    } else if (response.status !== 200) {
      await subscribe();
    } else {
      const ticksPart = await response.json();

      initLoadTickets(ticksPart.tickets);
      if (!ticksPart.stop) {
        await subscribe();
      } 
    }
  }
  useEffect(() => {
    if (state.searchId !== null) {
      subscribe();
    }
  }, [state.searchId]);

  const percents = Math.round(100*(state.tickets.length)/5000);

  return (
    <div className="app-aviasales">
      {/* <div className="app-aviasales__logo"></div> */}
      <div className="app-aviasales__main">
{/*        
        
        <Filter />
        <Offline>
          <Alert message={'Нет соединения'}/>
        </Offline>
        <Loader percents={percents}/>
        

        <FilterOptions />
        {
          !ticks.length ? <div className='app-aviasales__note'>Рейсов, подходящих под заданные фильтры, не найдено</div> : null
        }
         */}
        {
          [1].map( node => <Ticket text={text} title={'Основы NODE.js'}/>)
        }
        
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { state };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initSearchIdLoad: (searchId) => {
      dispatch(searchIdLoad(searchId));
    },
    initLoadTickets: (tickets) => {
      dispatch(loadTickets(tickets));
    },  
    setSuccessStatus: (flag) => {
      dispatch(setSuccess(flag))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppAviasales);
