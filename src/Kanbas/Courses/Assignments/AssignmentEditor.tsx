export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <table>
        <td>
          <tr>
            <label htmlFor="wd-name">Assignment Name</label>
          </tr>
          <tr>
            <input id="wd-name" value="A1 - ENV + HTML" />
          </tr>
        </td>
        <br />
        <br />
        {/* <td> */}
        <tr>
          <textarea id="wd-description">
            The assignment is available online Submit a link to the landing page
            of your Web Application running on Netlif. The landing page should
            include the following: Your full name and section Links to each of
            the lab assignments Link to the Kanbas applcation Links to all
            relevant source code repositories. The kanbas application should
            include a link to navigate back to the landing page.
          </textarea>
        </tr>
        {/* </td> */}

        <br />
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-points">
              <option>ASSIGNMENTS</option>
              <option>ASSIGNMENTS</option>
              <option>ASSIGNMENTS</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-points">
              <option>Percentage</option>
              <option>Percentage</option>
              <option>Percentage</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-points">
              <option>Online</option>
              <option>Online</option>
              <option>Online</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top"></td>
          <td id="wd-points">
            <label>Online Entry Options</label>
            <br />

            <input type="checkbox" name="entry-option" id="wd-chkbox-text" />
            <label htmlFor="wd-text-entry">Text Entry</label>
            <br />

            <input type="checkbox" name="entry-option" id="wd-chkbox-website" />
            <label htmlFor="wd-website-url">Website URL</label>
            <br />

            <input type="checkbox" name="entry-option" id="wd-chkbox-media" />
            <label htmlFor="wd-media-recordings">Media Recordings</label>
            <br />

            <input type="checkbox" name="entry-option" id="wd-chkbox-student" />
            <label htmlFor="wd-student-annotation">Student Annotation</label>
            <br />

            <input type="checkbox" name="entry-option" id="wd-chkbox-file" />
            <label htmlFor="wd-file-upload">File Uploads</label>
          </td>
        </tr>
        <br />

        <tr>
          {/* <td align="right" valign="top"></td> */}
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Assign</label>
          </td>
          <tr>
            <td id="wd-assign-to">Assign to</td>
          </tr>
          <tr>
            <td>
              <input type="text" placeholder="Everyone"></input>
            </td>
          </tr>
        </tr>

        <br />

        <tr>
          <td align="right" valign="top"></td>

          <tr>
            <td id="wd-due-date">Due</td>
          </tr>
          <tr>
            <td>
              <input type="date" placeholder="05 / 13 / 2024"></input>
            </td>
          </tr>
        </tr>

        <br />
        <tr>
          <td align="right" valign="top"></td>
          <tr>
            <td wd-available-from>Available from</td>
            <td wd-available-until>Until</td>
          </tr>
          <tr>
            <td>
              <input type="date" placeholder="05 / 06 / 2024"></input>
            </td>
            <td>
              <input type="date" placeholder="05 / 20 / 2024"></input>
            </td>
          </tr>
        </tr>

        <br />
      </table>

      <hr />
      <div>
        <table>
          <tr>
            <td align="right" valign="top"></td>
            <tr>
              <td>
                <button>Cancel</button>
              </td>
              <td>
                <button>Save</button>
              </td>
            </tr>
          </tr>
        </table>
      </div>
    </div>
  );
}
