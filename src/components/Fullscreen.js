import { FullScreen, useFullScreenHandle } from "react-full-screen";

function Fullscreen(props) {
  const handle = useFullScreenHandle();

  return (
    <>
        <button onClick={handle.enter} className="icon-button fullscreen-button" title="Enter fullscreen">
          <svg className="icon" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M700,350h25l25-300l-300,25v25h225l-200,175l50,50l175-200ZM50,750l300-25v-25h-225l200-175l-50-50l-175,200v-225h-25ZM50,50l25,300h25v-225l175,200l50-50l-200-175h225v-25ZM450,725l300,25l-25-300h-25v225l-175-200l-50,50l200,175h-225Z"></path></svg>
        </button>

        <FullScreen handle={handle}>
            {props.children}
        </FullScreen>
    </>
  );
}

export default Fullscreen;