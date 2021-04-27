import React from "react";
import "../css/Note.css";

export default function Note() {
  return (
    <div className="note">
      <div className="message">
        You have used API calls limit, please wait a minute and refresh to
        continue.
      </div>
    </div>
  );
}
