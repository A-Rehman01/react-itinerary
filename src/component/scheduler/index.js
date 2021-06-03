import React from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar, getJson, toast, setOptions } from '@mobiscroll/react';
import moment from 'moment';

setOptions({
  theme: 'ios',
  themeVariant: 'light',
});

function Scheduler() {
  const [myEvents, setEvents] = React.useState([]);
  const inv = [
    {
      recurring: {
        repeat: 'weekly',
        weekDays: 'SA,SU',
      },
    },
    {
      start: '12:00',
      end: '13:00',
      title: 'Lunch break',
      recurring: {
        repeat: 'weekly',
        weekDays: 'MO,TU,WE,TH,FR',
      },
    },
    {
      start: '00:00',
      end: '08:00',
      title: 'Night time',
      recurring: {
        repeat: 'weekly',
        weekDays: 'MO,TU,WE,TH,FR',
      },
    },
    {
      start: '17:00',
      end: '23:59',
      recurring: {
        repeat: 'weekly',
        weekDays: 'MO,TU,WE,TH,FR',
      },
    },
  ];

  React.useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/workday-events/',
      (events) => {
        setEvents(events);
        // console.log({ events });
      },
      'jsonp'
    );
    //editibale false to fixed hojae ga is ko cher nh sakte
  }, []);

  const view = React.useMemo(() => {
    return {
      schedule: {
        type: 'week',
        // type: 'day',

        // startDay: 1, // Monday
        // endDay: 5, // Friday
        // startTime: '07:30',
        // endTime: '18:30',
      },
      //   calendar: { labels: true, type: 'month' },

      //   calendar: { type: 'week' },
      // agenda: { type: 'week' }
      //   calendar: { labels: true },
    };
  }, []);

  const onEventCreateFailed = React.useCallback((event) => {
    toast({
      message: "Can't create event on this date",
    });
  });

  const onEventUpdateFailed = React.useCallback((event) => {
    toast({
      message: "Can't add event on this date",
    });
  });

  const dayHover = React.useCallback((event) => {
    toast({
      message: event.event.title,
    });
  }, []);

  const onEventClick = React.useCallback((event) => {
    toast({
      message: event.event.title,
    });
  }, []);

  const renderAgenda = React.useCallback((data) => {
    return (
      <div className='custom-event-list'>
        {data.map((day) => (
          <ul className='custom-event-group' key={day.timestamp}>
            <li className='custom-event-day'>{day.date}</li>
            {day.events.map((event) => (
              <li key={event.id} className='custom-event'>
                {event.title}
              </li>
            ))}
          </ul>
        ))}
      </div>
    );
  });

  const myTitle = 'My Awesome title';
  const customWithNavButtons = () => {
    return (
      <>
        {/* <CalendarPrev />
        <CalendarNext /> */}
        <div className='my-custom-title'>{myTitle}</div>
      </>
    );
  };

  const onSelectedDateChange = React.useCallback((event, inst) => {
    console.log(event.date);
  });

  const onPageLoading = React.useCallback((event, inst) => {
    console.log('pageloading', event);
    event.firstDay = myEvents[0].start;

    event.viewStart = myEvents[0].start;

    console.log(myEvents[0].start);
  });
  return (
    // <div style={{ width: '70%' }}>
    myEvents.length !== 0 && (
      <Eventcalendar
        data={myEvents}
        view={view}
        dragToCreate={false}
        dragToMove={true}
        dragToResize={true}
        invalidateEvent='strict'
        invalid={inv}
        onEventCreateFailed={onEventCreateFailed}
        onEventUpdateFailed={onEventUpdateFailed}
        onEventClick={onEventClick}
        onEventUpdated={(Updated) => console.log({ Updated })}
        allDayText={false}
        renderAgenda={renderAgenda}
        onDayHoverIn={dayHover}
        //   timeFormat={false}
        // timeText={false}
        //   selectedDate={new Date()}
        //   renderHeader={customWithNavButtons}
        //   colors={[
        //     { date: new Date(2020, 2, 23), background: 'pink' },
        //     { date: new Date(2020, 2, 24), background: 'green' },
        //     {
        //       background: 'black',
        //       recurring: { repeat: 'weekly', weekDays: 'SU' },
        //     },
        //     {
        //       background: 'black',
        //       recurring: { repeat: 'weekly', weekDays: 'SA' },
        //     },
        //   ]}

        // selectedDate={new Date()}  phr onChange pr is pr set krwa do
        // onSelectedDateChange={onSelectedDateChange}

        // min={moment().format('02-2-2022')}
        // min={new Date(2021, 4, 24)}
        dateText={false}
        showToday={false}
        // showLabelCount={false}
        firstDay={1}
        onPageLoading={onPageLoading}
      />
    )
    // </div>
  );
}

export default Scheduler;
