import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function Module() {
  return (
    <div>
      <h4> Modules</h4>
      <a
        id="wd-modules"
        href={`${REMOTE_SERVER}/lab5/module`}
        className="btn btn-primary"
      >
        Get Modules
      </a>
      <hr />
      <h4>Retrieving Module name</h4>
      <a
        id="wd-modules"
        href={`${REMOTE_SERVER}/lab5/module/name`}
        className="btn btn-primary"
      >
        Get Module name
      </a>
      <hr />
    </div>
  );
}
