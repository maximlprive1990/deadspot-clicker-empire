import { useState, useEffect } from "react";

export function GothicClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      // Heure du Québec (UTC-5 ou UTC-4 selon la saison)
      const now = new Date();
      const quebecTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Montreal"}));
      setTime(quebecTime);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-CA', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-CA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="gothic-clock-container mb-8">
      <div className="gothic-clock">
        <div className="clock-frame">
          <div className="time-display">
            {formatTime(time)}
          </div>
          <div className="date-display">
            {formatDate(time)}
          </div>
        </div>
      </div>
    </div>
  );
}