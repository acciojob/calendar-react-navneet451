import React, { useState } from 'react';

const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

function Calendar() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [isEditingYear, setIsEditingYear] = useState(false);

    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

    const updateCalendar = () => {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const days = daysInMonth(currentMonth, currentYear);

        let calendar = [];
        let day = 1;

        for (let i = 0; i < 6; i++) {
            let row = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay || day > days) {
                    row.push(<td key={`empty-${i}-${j}`}></td>);
                } else {
                    row.push(<td key={`day-${day}`}>{day}</td>);
                    day++;
                }
            }
            calendar.push(<tr key={`row-${i}`}>{row}</tr>);
            if (day > days) break;
        }

        return calendar;
    };

    const handleYearChange = (event) => {
        if (event.key === 'Enter' || event.type === 'blur') {
            const newYear = parseInt(event.target.value);
            if (!isNaN(newYear)) {
                setCurrentYear(newYear);
            }
            setIsEditingYear(false);
        }
    };

    return (
        <div className="calendar">
            <h1>Calendar</h1>
            <div>
                <select 
                    id="monthSelector" 
                    value={currentMonth} 
                    onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                >
                    {monthNames.map((month, index) => (
                        <option value={index} key={month}>{month}</option>
                    ))}
                </select>
                {isEditingYear ? (
                    <input
                        type="text"
                        id="yearInput"
                        defaultValue={currentYear}
                        onKeyDown={handleYearChange}
                        onBlur={handleYearChange}
                        autoFocus
                    />
                ) : (
                    <span
                        id="year"
                        onDoubleClick={() => setIsEditingYear(true)}
                    >
                        {currentYear}
                    </span>
                )}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody id="daysTable">
                    {updateCalendar()}
                </tbody>
            </table>
            <div>
                <button onClick={() => setCurrentYear(currentYear - 1)}>&lt;&lt;</button>
                <button 
                    onClick={() => {
                        if (currentMonth === 0) {
                            setCurrentMonth(11);
                            setCurrentYear(currentYear - 1);
                        } else {
                            setCurrentMonth(currentMonth - 1);
                        }
                    }}
                >&lt;</button>
                <button 
                    onClick={() => {
                        if (currentMonth === 11) {
                            setCurrentMonth(0);
                            setCurrentYear(currentYear + 1);
                        } else {
                            setCurrentMonth(currentMonth + 1);
                        }
                    }}
                >&gt;</button>
                <button onClick={() => setCurrentYear(currentYear + 1)}>&gt;&gt;</button>
            </div>
        </div>
    );
}

export default Calendar;
