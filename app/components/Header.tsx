import type { JSX } from "hono/jsx/jsx-runtime";

type Props = {
  children: JSX.Element;
};
export const Header = (props: Props) => {
  return (
    <header
      class={
        "text-center border-b px-4 mx-2 border-gray-300 max-md:px-2 dark:border-gray-500 w-full h-16 tracking-widest dark:text-gray-100 flex justify-between items-center max-md:flex-col max-md:h-auto"
      }
    >
      <a href="/" class="flex items-center max-md:justify-center max-md:w-full">
        <h2 class="font-semibold text-center text-2xl max-md:text-xl max-md:py-2">
          Tomoki Ota's Blog
        </h2>
      </a>
      {/* <div class="flex justify-center max-md:justify-end max-md:w-full"> */}
      <div class="flex justify-center">
        <div class="mr-2">{props.children}</div>
        <a
          href="https://www.instagram.com/tomomon1227"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            class="dark:text-white  h-10 w-10 flex justify-center rounded-xl transition-opacity hover:opacity-70 items-center"
            type="button"
          >
            <svg
              class="dark:stroke-white dark:fill-white"
              width="35"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
            >
              <title>instagram icon</title>
              <path d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z" />
            </svg>
          </button>
        </a>
        <a
          href="https://x.com/tomomon1227"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            class="dark:text-white  h-10 w-10 flex justify-center rounded-xl transition-opacity hover:opacity-70 items-center"
            type="button"
          >
            <svg
              class="dark:stroke-white dark:fill-white"
              width="31"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>X account link</title>
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </g>
            </svg>
          </button>
        </a>
        <a
          href="https://github.com/tomo1227/blog"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            class="dark:text-white h-10 w-10 flex justify-center rounded-xl transition-opacity hover:opacity-70 items-center"
            type="button"
          >
            <svg
              class="dark:stroke-white dark:fill-white"
              focusable="false"
              viewBox="0 0 24 25"
              width="30"
              data-testid="GitHubIcon"
            >
              <title>github account link</title>
              <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27" />
            </svg>
          </button>
        </a>
        <a
          href={import.meta.env.PROD ? "/rss.txt" : "/rss"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            class="dark:text-white h-10 w-10 flex justify-center rounded-xl transition-opacity hover:opacity-70 items-center"
            type="button"
          >
            <svg
              class="dark:stroke-white dark:fill-white"
              fill="#000000"
              width="34"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>rss link</title>
              <path d="M368 448Q366 364 327 295 288 226 220 186 151 145 64 144L64 64Q171 66 258 116 345 166 396 253 446 339 448 448L368 448ZM232 448Q229 373 184 328 138 282 64 280L64 200Q133 202 189 234 245 265 278 321 310 376 312 448L232 448ZM112 448Q92 448 78 434 64 420 64 400 64 380 78 366 92 352 112 352 132 352 146 366 160 380 160 400 160 420 146 434 132 448 112 448Z" />
            </svg>
          </button>
        </a>
      </div>
    </header>
  );
};
