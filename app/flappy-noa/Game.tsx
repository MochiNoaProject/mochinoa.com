"use client";

import { css } from "../../styled-system/css";
import { useEffect, useRef, useState } from "react";

export const Game = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.src = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";

    // general settings
    let gamePlaying = false;
    const gravity = 0.5;
    const speed = 4;
    const size: [number, number] = [51, 36];
    const jump = -11.5;
    const cTenth = canvas.width / 10;

    let index = 0,
      bestScore = 0,
      flight: number,
      flyHeight: number,
      currentScore: number,
      pipes: number[][] = [];

    // pipe settings
    const pipeWidth = 78;
    const pipeGap = 270;
    const pipeLoc = () =>
      Math.random() * (canvas.height - (pipeGap + pipeWidth) - pipeWidth) +
      pipeWidth;

    const setup = () => {
      currentScore = 0;
      flight = jump;

      // set initial flyHeight (middle of screen - size of the bird)
      flyHeight = canvas.height / 2 - size[1] / 2;

      // setup first 3 pipes
      pipes = Array(3)
        .fill(undefined)
        .map((a, i) => [canvas.width + i * (pipeGap + pipeWidth), pipeLoc()]);
    };

    const render = () => {
      // make the pipe and bird moving
      index++;

      // ctx.clearRect(0, 0, canvas.width, canvas.height);

      // background first part
      ctx.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height,
        -((index * (speed / 2)) % canvas.width) + canvas.width,
        0,
        canvas.width,
        canvas.height
      );
      // background second part
      ctx.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height,
        -(index * (speed / 2)) % canvas.width,
        0,
        canvas.width,
        canvas.height
      );

      // pipe display
      if (gamePlaying) {
        pipes.map((pipe) => {
          // pipe moving
          pipe[0] -= speed;

          // top pipe
          ctx.drawImage(
            img,
            432,
            588 - pipe[1],
            pipeWidth,
            pipe[1],
            pipe[0],
            0,
            pipeWidth,
            pipe[1]
          );
          // bottom pipe
          ctx.drawImage(
            img,
            432 + pipeWidth,
            108,
            pipeWidth,
            canvas.height - pipe[1] + pipeGap,
            pipe[0],
            pipe[1] + pipeGap,
            pipeWidth,
            canvas.height - pipe[1] + pipeGap
          );

          // give 1 point & create new pipe
          if (pipe[0] <= -pipeWidth) {
            currentScore++;
            // check if it's the best score
            bestScore = Math.max(bestScore, currentScore);

            // remove & create new pipe
            pipes = [
              ...pipes.slice(1),
              [pipes[pipes.length - 1][0] + pipeGap + pipeWidth, pipeLoc()],
            ];
          }

          // if hit the pipe, end
          if (
            [
              pipe[0] <= cTenth + size[0],
              pipe[0] + pipeWidth >= cTenth,
              pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1],
            ].every((elem) => elem)
          ) {
            gamePlaying = false;
            setup();
          }
        });
      }
      // draw bird
      if (gamePlaying) {
        ctx.drawImage(
          img,
          432,
          Math.floor((index % 9) / 3) * size[1],
          ...size,
          cTenth,
          flyHeight,
          ...size
        );
        flight += gravity;
        flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]);

        ctx.font = "bold 16px courier";
        ctx.fillText(`Best score : ${bestScore}`, 32, 48);
        ctx.fillText(`Current score : ${currentScore}`, 32, 72);
      } else {
        ctx.drawImage(
          img,
          432,
          Math.floor((index % 9) / 3) * size[1],
          ...size,
          canvas.width / 2 - size[0] / 2,
          flyHeight,
          ...size
        );
        flyHeight = canvas.height / 2 - size[1] / 2;
        // text accueil

        ctx.font = "bold 30px courier";
        ctx.fillText(`Best score : ${bestScore}`, 85, 245);
        ctx.fillText("Click to play", 90, 535);
      }

      setBestScore(bestScore);
      setCurrentScore(currentScore);

      // tell the browser to perform anim
      window.requestAnimationFrame(render);
    };

    // launch setup
    setup();
    img.onload = render;

    const jumpListener = () => {
      flight = jump;
    };
    const startListener = () => {
      gamePlaying = true;
    };
    const listenerBySpaceKey = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        startListener();
        jumpListener();
      }
    };

    // start game
    document.addEventListener("click", jumpListener);
    document.addEventListener("keydown", listenerBySpaceKey);
    canvas.addEventListener("click", startListener);
    return () => {
      document.removeEventListener("click", jumpListener);
      document.removeEventListener("keydown", listenerBySpaceKey);
      canvas.removeEventListener("click", startListener);
    };
  }, []);
  return (
    <div>
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          paddingInline: "6px",
          paddingBlock: "8px",
          background: "#5EE270",
        })}
      >
        <div>Best: {bestScore}</div>
        <div>Current: {currentScore}</div>
      </div>
      <canvas ref={ref} width="431" height="768" />
    </div>
  );
};
