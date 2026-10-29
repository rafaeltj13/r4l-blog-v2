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

**Preset** (`cvPresets`): a hand-written CV Selection behind a fixed download
button (`front`, `full`).

**Tailored CV**: a CV Selection produced by the AI from a job description
(`tailorCv` on the server). The server returns a finished CV Selection; the
client does not re-validate it.

**Deprecated entry**: an experience or personal project with
`deprecated: true`. Shown on the experience timeline page, excluded from
every download path (Presets, Tailoring, skills offered to the AI).

**Content locale** (`CvLocale`): `en` or `pt-BR`. English data is the source
of truth; pt-BR overrides are merged on top. A Tailored CV is generated in
the requested Content locale, from the localized content.
