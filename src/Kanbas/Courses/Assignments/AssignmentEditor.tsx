export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
        your Web Application running on Netlif. The landing page should include
        the following: Your full name and section Links to each of the lab
        assignments Link to the Kanbas applcation Links to all relevant source
        code repositories. The kanbas application should include a link to
        navigate back to the landing page.
      </textarea>
      <br />
      <table>
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
            <label htmlFor="wd-points">Assignment Group</label>
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
            <label htmlFor="wd-points">Display Grade as</label>
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
            <label htmlFor="wd-points">Submission Type</label>
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
            <label htmlFor="wd-chkbox-comedy">Text Entry</label>
            <br />

            <input type="checkbox" name="entry-option" id="wd-chkbox-website" />
            <label htmlFor="wd-chkbox-drama">Website URL</label>
            <br />

            <input type="checkbox" name="entry-option" id="wd-chkbox-media" />
            <label htmlFor="wd-chkbox-scifi">Media Recordings</label>
            <br />

            <input type="checkbox" name="entry-option" id="wd-chkbox-student" />
            <label htmlFor="wd-chkbox-fantasy">Student Annotation</label>
            <br />

            <input type="checkbox" name="entry-option" id="wd-chkbox-file" />
            <label htmlFor="wd-chkbox-fantasy">File Uploads</label>
          </td>
        </tr>
        <br />

        <tr>
          <td>Assign Assign to</td>
        </tr>
        <tr>
          <td>
            <input type="text" placeholder="Everyone"></input>
          </td>
        </tr>
        <br />

        <tr>
          <td>Due</td>
        </tr>
        <tr>
          <td>
            <input type="date" placeholder="05 / 13 / 2024"></input>
          </td>
        </tr>
        <br />

        <tr>
          <td>Available from</td>
          <td>Until</td>
        </tr>
        <tr>
          <td>
            <input type="date" placeholder="05 / 06 / 2024"></input>
          </td>
          <td>
            <input type="date" placeholder="05 / 20 / 2024"></input>
          </td>
        </tr>
        <br />
        <hr />
        <tr>
          <td>
            <button>Cancel</button>
          </td>
          <td>
            <button>Save</button>
          </td>
        </tr>
      </table>
    </div>
  );
}
