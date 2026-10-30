# Domain glossary

Terms used across the CV / experience feature. Code lives in `app/utils/cv/`
and `server/utils/`.

**CV Selection** (`CvSelection`): what to put on a CV, expressed as ids and
text: position, summary, experience ids, project ids, skills by category, and
optional bullet overrides. Produced by a Preset or by Tailoring. Never
rendered directly.

**CV Document** (`CvDocument`): a CV Selection resolved against a content
source (`buildCvDocument`): full experience/project objects, resolved
bullets, contact, education. The exact shape the PDF renders.

**Preset** (`cvPresets`): a hand-written CV Selection. `all` is the full
history shown on the page (keeps Deprecated entries); `front` and `full` sit
behind the fixed download buttons. `resolveCv` turns a Preset or a Tailored
CV into a CV Document plus filename.

**Tailored CV**: a CV Selection produced by the AI from a job description
(`tailorCv` on the server). The server returns a finished CV Selection; the
client does not re-validate it.

**Deprecated entry**: an experience or personal project with
`deprecated: true`. Shown on the experience timeline page, excluded from
every download path (the `front`/`full` Presets, Tailoring, skills offered
to the AI).

**Content locale** (`CvLocale`): `en` or `pt-BR`. English data is the source
of truth; pt-BR overrides are merged on top. A Tailored CV is generated in
the requested Content locale, from the localized content.

**CV Export** (`exportCv`, `app/utils/cv/export/`): CV Document in, one-page
A4 PDF with real text and links out. Drawn with pdfmake (loaded on first
download), Roboto, fixed accent color; never a screenshot of the page.

**One-page fit** (`fitToOnePage`): how CV Export keeps a CV on one page.
Trims the least relevant content in small steps (bullets down to 2 per
experience, then projects, then experiences down to 2), then lowers the
font to 8pt, then allows a second page. Applies to every CV Selection.
