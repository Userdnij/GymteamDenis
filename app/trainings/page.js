"use client"

import Header from "@/components/Header/Header";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Calendar } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'
import { render } from "preact/compat"
import './TrainingsPage.scss';
import SubscribeTraining from "@/components/SubscribeTraining/SubscribeTraining";

const lvLocale = {
  code: "lv",
  week: {
    dow: 1,
    doy: 4
  },
  buttonText: {
    prev: "Iepriekšējais",
    next: "Nākamais",
    today: "Šodien",
    month: "Mēnesis",
    week: "Nedēļa",
    day: "Diena",
    list: "Dienas kārtība"
  },
  weekText: "Ned.",
  allDayText: "Visu dienu",
  moreLinkText: function(n) {
    return "+vēl " + n;
  },
  noEventsText: "Nav notikumu, ko parādīt",
  dayNames: ['Svētdiena', 'Pirmdiena', 'Otrdiena', 'Trešdiena', 'Ceturtdiena', 'Piektdiena', 'Sestdiena'],
  dayNamesShort: ['Sv', 'P', 'O', 'T', 'C', 'Pk', 'S'],
  monthNames: ['Janvāris', 'Februāris', 'Marts', 'Aprīlis', 'Maijs', 'Jūnijs', 'Jūlijs', 'Augusts', 'Septembris', 'Oktobris', 'Novembris', 'Decembris'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jūn', 'Jūl', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
};

export default function Trainings() {
  const calendarEl = useRef(null);
  const calendarInstance = useRef(null);
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);

  const createCalendar = () => {
    if (calendarEl.current) {
        calendarInstance.current = new Calendar(calendarEl.current, {
            plugins: [timeGridPlugin],
            initialView: 'timeGridWeek',
            firstDay: 1,
            locale: lvLocale,
            slotLabelFormat: {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            },
            allDaySlot: false,
            headerToolbar: {
                left: 'prev,next',
                center: 'title',
                right: 'timeGridWeek,timeGridDay',
            },
            eventClassNames: function(info) {
                if (info.event.title && info.event.title !== '' && info.event.title !== 'undefined') {
                    console.log(info.event.title)
                    return ['TrainingsPage-Event_Busy'];
                }

                return ['TrainingsPage-Event'];
            },
            eventClick: function(info) {
                setSelectedEvent(info.event);
                setIsEventDetailsOpen(true);
            },
            customButtons: {
            },
        });

        calendarInstance.current.render();
    }
  }

  useEffect(() => {
    if (!calendarInstance.current) {
        createCalendar();
    }
  }, []);

  useEffect(() => {
    if (!calendarInstance.current) {
      createCalendar();
    }
    if (selectedTrainer) {
      fetchEvents();
    }
  }, [selectedTrainer]);

  const addEvent = (training) => {
    const date = new Date(`${training.dateStr}T${training.startTime}:00`);
    const endDate = new Date(`${training.dateStr}T${training.endTime}:00`);

    calendarInstance.current.addEvent({
        title: training.title || '',
        clientaTalrunis: training.clientaTalrunis,
        start: date,
        end: endDate,
        price: training.price,
        trener: training.trener,
        trenerTalrunis: training.trenerTalrunis,
        id: training.id,
        allDay: false
    });
}

  const addTrainingToCalendar = (training) => {
    const clientName = training.client?.vards && training.client?.uzvards ? `${training.client?.vards} ${training.client?.uzvards}` : '';
    const trenerName = `${training.trener.vards} ${training.trener.uzvards}`;

    addEvent({
        dateStr: training.date,
        startTime: training.startTime,
        endTime: training.endTime,
        price: training.price.$numberDecimal,
        title: clientName || '',
        clientaTalrunis: training.client?.talrunis,
        trener: trenerName,
        trenerTalrunis: training.trener.talrunis,
        id: training._id
    });
  }


  const fetchEvents = () => {
    if (!calendarInstance.current) return;

    calendarInstance.current.removeAllEvents();

    axios.get(`/api/trainings/get?trener=${selectedTrainer._id}`)
        .then((response) => {
          console.log(response.data)
            const { trainings } = response.data;
            trainings.forEach(addTrainingToCalendar);
        }).catch(err => {
          console.log(err)
        });
  }

  useEffect(() => {
      axios.get('/api/trainers/get')
          .then((response) => {
              setTrainers(response.data.trainers)
          })
          .catch((error) => {
              console.log(error)
          });
  }, []);

  const renderCalendar = () => {
    return (
      <div style={!selectedTrainer ? {opacity: '0'} : {opacity: '1'}} className="text-center mt-20">
        <button className="Button mb-10" onClick={() => setSelectedTrainer(null)}>Atpakaļ</button>
        <h1 className="text-3xl font-semibold mb-5">{selectedTrainer?.vards + ' ' + selectedTrainer?.uzvards}</h1>
        <div ref={calendarEl} className={`ml-auto mr-auto w-4/6 h-4/6`} style={{backgroundColor: "white", padding: "20px"}}></div>
      </div>
    );
  }

  const handleSubmitSubscribe = () => {
    fetchEvents();
  }

  const renderTrainers = () => {
    if (selectedTrainer) return null;
    return (
      <div className="flex justify-center mt-20">
              <ul role="list" className="divide-y divide-gray-100 grid grid-cols-2 gap-4">
                  {trainers.map((person) => (
                      <li key={person.email} className="flex justify-between gap-x-6 py-5 px-5 max-w-100 mr-40" style={{backgroundColor: "white", borderRadius: "15px", alignItems: "center", boxShadow: "gray 1px 1px 10px 1px"}}>
                          <div className="flex min-w-0 gap-x-4">
                              <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">{person.vards + ' ' + person.uzvards}</p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email + ' | ' + person.talrunis}</p>
                              </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-center">
                              {/* <p className="text-sm leading-6 text-gray-900">{person.role}</p> */}
                              <button className="Button" onClick={() => setSelectedTrainer(person)}>Pierakstities</button>
                          </div>
                      </li>
                  ))}
              </ul>
          </div>
    );
  }

  return (
      <div>
          <Header />
          { renderTrainers() }
          { renderCalendar() }

          <SubscribeTraining open={isEventDetailsOpen} setOpen={setIsEventDetailsOpen} event={selectedEvent} handleSubmit={handleSubmitSubscribe} />
      </div>
  );
}