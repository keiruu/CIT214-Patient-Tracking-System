import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

export default function ClockComp() {
    const [value, setValue] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => setValue(new Date()), 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    return (
      <div >
        <Clock value={value} size="220" />
      </div>
    );
}
