import React from 'react'

function DarkModeToggle() {
     const toggleDarkMode = () => {
       document.body.classList.toggle("dark-mode-variables");
       const firstSpan = document.querySelector(".dark-mode span:nth-child(1)");
       const secondSpan = document.querySelector(
         ".dark-mode span:nth-child(2)"
       );

       if (firstSpan && secondSpan) {
         firstSpan.classList.toggle("active");
         secondSpan.classList.toggle("active");
       }
     };
  return (
      <div className="dark-mode" onClick={toggleDarkMode}>
      <span className="material-icons-sharp active">light_mode</span>
      <span className="material-icons-sharp">dark_mode</span>
    </div>
  );
};

export default DarkModeToggle