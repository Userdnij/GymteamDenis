import { useEffect, useState, useRef } from 'react';
import './MansGrafiks.scss';

import { Calendar } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'
import NewGrafikModal from '../NewGrafikModal/NewGrafikModal';
import EventDetailsModal from '../EventDetailsModal/EventDetailsModal';
import axios from 'axios';

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

export const MansGrafiks = () => {
    const calendarEl = useRef(null);
    const calendarInstance = useRef(null);
    const [isCreateNewEventOpen, setIsCreateNewEventOpen] = useState(false);
    const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

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
                    center: 'createNew'
                },
                eventClassNames: function(info) {
                    if (info.event.title && info.event.title !== '' && info.event.title !== 'undefined') {
                        return ['MansGrafiks-Event_Busy'];
                    }

                    return ['MansGrafiks-Event'];
                },
                eventClick: function(info) {
                    setSelectedEvent(info.event);
                    setIsEventDetailsOpen(true);
                },
                customButtons: {
                    createNew: {
                        text: 'Izveidot jauno notikumu',
                        click: function() {
                            setIsCreateNewEventOpen(true);
                        },
                    }
                },
            });

            calendarInstance.current.render();

            fetchEvents();
        }
    }

    const fetchEvents = () => {
        if (!calendarInstance.current) return;

        calendarInstance.current.removeAllEvents();

        const user = JSON.parse(localStorage.getItem('user'));
        axios.get(`/api/trainings/get?trener=${user._id}`)
            .then((response) => {
                const { trainings } = response.data;
                trainings.forEach(addTrainingToCalendar);
            })
            .catch(console.error);
    }

    useEffect(() => {
        if (!calendarInstance.current) {
            createCalendar();
        }
        // fetchEvents();
    }, []);

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
            trenerTalrunis: training.trener.talrunis
        });
    }

    // const addEvent = (dateStr, startTime, endTime, price, title, clientaTalrunis, trener, trenerTalrunis) => {
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
            allDay: false
        });
    }

    const submitAddEvent = (training) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const trenerName = `${user.vards} ${user.uzvards}`;

        addEvent({
            ...training,
            trener: trenerName,
            trenerTalrunis: user.talrunis,
        });
    }

    const removeEvent = () => {
        selectedEvent.remove();
    }

    return (
        <div className="MansGrafiks">
            <h1>Mans Grafiks</h1>
            <NewGrafikModal open={isCreateNewEventOpen} setOpen={setIsCreateNewEventOpen} submit={submitAddEvent} />
            <EventDetailsModal open={isEventDetailsOpen} setOpen={setIsEventDetailsOpen} event={selectedEvent} removeEvent={removeEvent} />
            <div ref={calendarEl} style={{backgroundColor: "white", padding: "20px"}}></div>
        </div>
    );
}

export default MansGrafiks;