import Fields from "./Fields";

export default function Card({
  id,
  title,
  keyBinding,
  search,
  action,
  command,
}) {
  return (
    <div className="container" id={id}>
      <div className="title-container">
        <div className="title">Title</div>
        <div className="card-title">{title}</div>
      </div>
      <div className="content-container">
        <Fields title="command" content={command} />
        <Fields title="KeyBinding" content={keyBinding} />
        <Fields title="action" content={action} />
        <Fields title="search" content={search} />
      </div>
      <style jsx>
        {`
          .container {
            font-family: inherit;
            box-shadow: 0 0 5px 1px var(--light);
            display: flex;
            align-items: center;
            border-radius: 8px;
            margin: 0.4rem;
            padding: 0.3rem;
            background: var(--secondary);
          }
          .container:hover {
            box-shadow: 0 0 10px 1px var(--font-color);
            cursor: pointer;
          }
          .title-container {
            display: flex;
            background: var(--secondary);
            height: 100%;
            font-family: "Lato", sans-serif;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 40%;
          }
          .title {
            text-transform: uppercase;
            letter-spacing: 3.5px;
            font-size: 1rem;
            color: #ccc;
            margin: 0.5rem 0;
            font-weight: bold;
          }
          .card-title {
            text-transform: capitalize;
            margin: 1.4rem 0;
            color: var(--white);
            word-wrap: break-word;
            width: 100%;
            text-align: center;
            font-size: 1.9rem;
          }
          .content-container {
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            border-radius: 8px;
            font-family: "Source Sans Pro", sans-serif;
            padding: 0.5rem 1rem;
            background: #ccc;
            width: 60%;
          }
        `}
      </style>
    </div>
  );
}
