export const BASIC_BOOK = (
    <p>
        Author, A. A. (Year of publication).
        <span className="italic"> Title of work: Capital letter also for subtitle. </span>
        Publisher Name. DOI (if available)
    </p>
);

export const EDITED_BOOK_NO_AUTHOR = (
    <p>
        Editor, E. E. (Ed.). (Year of publication).
        <span className="italic"> Title of work: Capital letter also for subtitle. </span>
        Publisher. DOI (if available)
    </p>
);

// For string exports, you can't use italics directly. If you want italics, export as JSX like above.
export const EDITED_BOOK_AUTHOR = (
    <p>
        Author, A. A. (Year of publication).
        <span className="italic"> Title of work: Capital letter also for subtitle </span>
        (E. Editor, Ed.). Publisher. DOI (if available)
    </p>
);

export const TRANSLATION = (
    <p>
        Author, A. A. (Year of publication).
        <span className="italic"> Title of work: Capital letter also for subtitle </span>
        (T. Translator, Trans.). Publisher. (Original work published YEAR) DOI (if available)
    </p>
);

export const EDITION_NOT_FIRST = (
    <p>
        Author, A. A. (Year of publication).
        <span className="italic"> Title of work: Capital letter also for subtitle (# edition). </span>
        Publisher. DOI (if available)
    </p>
);