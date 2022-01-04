const Contact = ({}) => (
  <section className="mt-16">
    <h2 className="font-semibold">Contact</h2>
    <div className="mt-6 grid grid-cols-split gap-x-9 gap-y-4">
      <div className="text-dim">LinkedIn</div>
      <a
        href="https://www.linkedin.com/in/harrisjose"
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby="Open linked-in profile in a new tab"
        className="text-light underline hover:text-dark"
      >
        linkedin.com/in/harrisjose
      </a>
      <div className="text-dim mr-9">Twitter</div>
      <a
        href="https://twitter.com/harrispjose"
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby="Open twitter profile in a new tab"
        className="text-light underline hover:text-dark"
      >
        @harrispjose
      </a>
      <div className="text-dim mr-9">Github</div>
      <a
        href="https://github.com/harrisjose"
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby="Open github profile in a new tab"
        className="text-light underline hover:text-dark"
      >
        github.com/harrisjose
      </a>
    </div>
  </section>
)

export default Contact
