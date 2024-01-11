import React from "react";


interface ReminderProps {
  icon: string;
  title: string;
  time: string;
}

const Reminder: React.FC<ReminderProps> = ({ icon, title, time }) => (
  <div className="notification">
    <div className="icon">
      <span className="material-icons-sharp">{icon}</span>
    </div>
    <div className="content">
      <div className="info">
        <h3>{title}</h3>
        <small className="text-muted">{time}</small>
      </div>
      <span className="material-icons-sharp">more_vert</span>
    </div>
  </div>
);


const Reminders = () => (
  <div className="reminders">
    <div className="header">
      <h2>Reminders</h2>
      <span className="material-icons-sharp">notifications_none</span>
    </div>
    <Reminder icon="volume_up" title="Workshop" time="08:00 AM - 12:00 PM" />
    <Reminder icon="edit" title="Workshop" time="08:00 AM - 12:00 PM" />
    <div className="notification add-reminder">
      <div>
        <span className="material-icons-sharp">add</span>
        <h3>Add Reminder</h3>
      </div>
    </div>
  </div>
);

export default Reminders;
